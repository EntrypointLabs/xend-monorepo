import OverlayPanel from "~components/overlay-panel"
import ToggleButton from "~components/toggle-button"
import { useSharedAuth } from "~utils/auth-service"

import "../style.css"

import Providers from "~providers"

// Main Component that renders both ToggleButton and OverlayPanel
function XendExtensionOverlay() {
  const { isAuthenticated, ready } = useSharedAuth()

  // TEMP: Hide for now
  return null

  // Only render if user is authenticated
  if (!ready || !isAuthenticated) {
    return null
  }

  return (
    <Providers>
      <ToggleButton />
      <OverlayPanel />
    </Providers>
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
