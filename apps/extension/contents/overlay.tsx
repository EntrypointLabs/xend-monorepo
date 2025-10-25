import OverlayPanel from "~components/overlay-panel"
import ToggleButton from "~components/toggle-button"
import { useSharedAuth } from "~utils/auth-service"

import "../style.css"

// Main Component that renders both ToggleButton and OverlayPanel
function XendExtensionOverlay() {
  const { isAuthenticated, ready } = useSharedAuth()

  // Only render if user is authenticated
  if (!ready || !isAuthenticated) {
    return null
  }

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
