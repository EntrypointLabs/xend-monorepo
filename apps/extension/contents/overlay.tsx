import OverlayPanel from "~components/overlay-panel"
import ToggleButton from "~components/toggle-button"
import { useSharedAuth } from "~utils/auth-service"

import "../style.css"

import { useEffect } from "react"

// Main Component that renders both ToggleButton and OverlayPanel
function XendExtensionOverlay() {
  const { isAuthenticated, ready, isLoading } = useSharedAuth()

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === "AUTH_STATE_CHANGED") {
        console.log("message :>> ", message)
        localStorage.setItem(
          "AUTH_STATE_CHANGED",
          JSON.stringify(message.authState)
        )
      }
    }

    chrome.runtime?.onMessage?.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  console.log("ready :>> ", {
    ready,
    isAuthenticated,
    isLoading,
    chrome: chrome.storage?.local
  })

  if (isLoading) {
    return null // or show loading spinner
  }

  // Only render if user is authenticated
  // if (!ready || !isAuthenticated) {
  //   return null
  // }

  return (
    <>
      <ToggleButton />
      <OverlayPanel />
    </>
  )
}

export const config = {
  matches: ["*://*.twitter.com/*", "*://*.x.com/*"]
}

export const getRootContainer = () => {
  const root = document.createElement("div")
  root.id = "xend-twitter-extension"
  document.body.appendChild(root)
  return root
}

export default XendExtensionOverlay
