if (process.env.PLASMO_ENV === "development") {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.action.openPopup()
  })
}
