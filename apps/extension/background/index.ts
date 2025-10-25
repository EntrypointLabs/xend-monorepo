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
