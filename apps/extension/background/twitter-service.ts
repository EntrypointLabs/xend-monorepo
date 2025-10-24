// Twitter API Service with Caching
import type {
  CachedUserData,
  FetchUserMessage,
  FetchUserResponse,
  TwitterApiError,
  TwitterApiResponse,
  TwitterUser
} from "~utils/twitter-api"
import {
  CACHE_TTL,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW
} from "~utils/twitter-api"

const TWITTER_BEARER_TOKEN = process.env.PLASMO_PUBLIC_TWITTER_BEARER_TOKEN

// In-memory cache for same-session requests
const memoryCache = new Map<string, CachedUserData>()

// Rate limiting tracking
let requestCount = 0
let windowStart = Date.now()

export class TwitterService {
  private async checkRateLimit(): Promise<boolean> {
    const now = Date.now()

    // Reset window if 15 minutes have passed
    if (now - windowStart > RATE_LIMIT_WINDOW) {
      requestCount = 0
      windowStart = now
    }

    if (requestCount >= RATE_LIMIT_MAX_REQUESTS) {
      console.warn(
        `Twitter API rate limit reached: ${requestCount}/${RATE_LIMIT_MAX_REQUESTS} requests in current window`
      )
      return false
    }

    return true
  }

  private async getFromChromeStorage(
    username: string
  ): Promise<CachedUserData | null> {
    try {
      const result = await chrome.storage.local.get([
        `twitter_user_${username}`
      ])
      const cached = result[`twitter_user_${username}`] as
        | CachedUserData
        | undefined

      if (cached && cached.expiresAt > Date.now()) {
        return cached
      }

      // Remove expired cache
      if (cached) {
        await chrome.storage.local.remove([`twitter_user_${username}`])
      }

      return null
    } catch (error) {
      console.error("Error reading from Chrome storage:", error)
      return null
    }
  }

  private async saveToChromeStorage(
    username: string,
    userData: TwitterUser
  ): Promise<void> {
    try {
      const cached: CachedUserData = {
        user: userData,
        timestamp: Date.now(),
        expiresAt: Date.now() + CACHE_TTL
      }

      await chrome.storage.local.set({
        [`twitter_user_${username}`]: cached
      })
    } catch (error) {
      console.error("Error saving to Chrome storage:", error)
    }
  }

  private async fetchFromTwitterAPI(username: string): Promise<TwitterUser> {
    if (!TWITTER_BEARER_TOKEN) {
      throw new Error("Twitter Bearer token not configured")
    }

    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=id,name,username,profile_image_url`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      const errorData: TwitterApiError = await response.json()
      throw new Error(
        `Twitter API error: ${errorData.errors?.[0]?.message || response.statusText}`
      )
    }

    const data: TwitterApiResponse = await response.json()
    return data.data
  }

  async fetchUser(username: string): Promise<FetchUserResponse> {
    try {
      // Check memory cache first
      const memoryCached = memoryCache.get(username)
      if (memoryCached && memoryCached.expiresAt > Date.now()) {
        return {
          success: true,
          data: memoryCached.user,
          fromCache: true
        }
      }

      // Check Chrome storage cache
      const storageCached = await this.getFromChromeStorage(username)
      if (storageCached) {
        // Update memory cache
        memoryCache.set(username, storageCached)
        return {
          success: true,
          data: storageCached.user,
          fromCache: true
        }
      }

      // Check rate limit before API call
      if (!(await this.checkRateLimit())) {
        return {
          success: false,
          error: "Rate limit exceeded. Please try again later."
        }
      }

      // Fetch from Twitter API
      const userData = await this.fetchFromTwitterAPI(username)
      requestCount++

      // Cache the result
      const cached: CachedUserData = {
        user: userData,
        timestamp: Date.now(),
        expiresAt: Date.now() + CACHE_TTL
      }

      memoryCache.set(username, cached)
      await this.saveToChromeStorage(username, userData)

      return {
        success: true,
        data: userData,
        fromCache: false
      }
    } catch (error) {
      console.error("Error fetching Twitter user:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }
    }
  }
}

// Initialize service
const twitterService = new TwitterService()

// Message listener
chrome.runtime.onMessage.addListener(
  (message: FetchUserMessage, sender, sendResponse) => {
    if (message.action === "fetch-twitter-user") {
      twitterService
        .fetchUser(message.username)
        .then((response) => sendResponse(response))
        .catch((error) =>
          sendResponse({
            success: false,
            error: error.message
          })
        )

      return true // Keep message channel open for async response
    }
  }
)
