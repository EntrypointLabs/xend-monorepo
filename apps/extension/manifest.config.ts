export const manifest = {
  permissions: ["storage", "activeTab", "scripting"],
  host_permissions: [
    "*://*.x.com/*",
    "*://*.twitter.com/*",
    "*://api.twitter.com/*"
  ],
  background: { service_worker: "background/index.ts" },
  icons: {
    16: "assets/icon.png",
    48: "assets/icon.png",
    128: "assets/icon.png"
  },
  action: {
    default_popup: "popup.html"
  }
}
