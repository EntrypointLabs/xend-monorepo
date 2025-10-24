// Twitter API v2 Types and Interfaces

export interface TwitterUser {
  id: string
  username: string
  name: string
  profile_image_url: string
}

export interface TwitterApiResponse {
  data: TwitterUser
}

export interface TwitterApiError {
  errors: Array<{
    code: number
    message: string
    resource_type: string
    resource_id: string
    parameter: string
  }>
}

export interface CachedUserData {
  user: TwitterUser
  timestamp: number
  expiresAt: number
}

export interface FetchUserMessage {
  action: "fetch-twitter-user"
  username: string
}

export interface FetchUserResponse {
  success: boolean
  data?: TwitterUser
  error?: string
  fromCache?: boolean
}

// Cache configuration
export const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 900 // Twitter API v2 user lookup limit
