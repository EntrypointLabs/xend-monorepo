import OverlayPanel from "~components/overlay-panel"
import ToggleButton from "~components/toggle-button"

import "../style.css"

// Main Component that renders both ToggleButton and OverlayPanel
function XendExtensionOverlay() {
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
