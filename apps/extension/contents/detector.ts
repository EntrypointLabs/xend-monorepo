export const config = {
  matches: ["*://*.linkedin.com/*"]
}

const isProfilePage = () => window.location.pathname.startsWith("/in/")

if (isProfilePage()) {
  chrome.runtime.sendMessage({ action: "show-overlay" })
}
