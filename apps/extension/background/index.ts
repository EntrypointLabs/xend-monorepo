// Import Twitter service to register its message handlers
import "~background/twitter-service"
import "~background/dev-auto-open"

// Initialize auth service on startup
import { authService } from "~utils/auth-service"

// Load stored auth state when background script starts
authService.loadFromStorage()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "find-email") {
    // Connect to your backend
    fetch("https://api.yourapp.com/find-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileUrl: message.profileUrl })
    })
      .then((r) => r.json())
      .then((data) => sendResponse(data))
      .catch((err) => sendResponse({ error: err.message }))
    return true // keep channel open
  }

  // Handle toggle overlay messages - Chrome action as source of truth
  if (message.action === "toggle-overlay") {
    // Forward the toggle message to all content scripts
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message)
      }
    })
  }

  // Handle auth state updates from popup/tabs - broadcast to all content scripts
  if (message.type === "AUTH_STATE_UPDATE") {
    // Broadcast to all tabs with content scripts
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs
            .sendMessage(tab.id, {
              type: "AUTH_STATE_CHANGED",
              authState: message.authState
            })
            .catch(() => {
              // Tab might not have content script, ignore
            })
        }
      })
    })
    sendResponse({ success: true, authState: message.authState })
    return true
  }

  // Handle requests for current auth state
  if (message.type === "GET_AUTH_STATE") {
    // sendResponse({ authState: {} })
    console.log("GET_AUTH_STATE:>> ", message, chrome.storage.local)
    // Read from chrome.storage and send to requester
    chrome.storage.local.get(["authState"], (result) => {
      console.log("result Of Auth State:>> ", result)
      sendResponse({ authState: result.authState || null })
    })
    return true // keep channel open
  }

  // NEW: Handle Privy method execution requests
  if (message.type === "EXECUTE_PRIVY_METHOD") {
    // Forward the request to the popup (which has PrivyProvider)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          sendResponse(response)
        })
      } else {
        sendResponse({ error: "No active tab found" })
      }
    })
    return true // keep channel open
  }
})
