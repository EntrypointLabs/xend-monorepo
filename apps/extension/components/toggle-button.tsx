import { useEffect, useState } from "react"

// Toggle Button Component
function ToggleButton() {
  const [isOnProfile, setIsOnProfile] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  // Detect if we're on a profile page
  useEffect(() => {
    const detectProfile = () => {
      const match = window.location.pathname.match(/^\/([A-Za-z0-9_]+)$/)
      const isProfile = match && !window.location.pathname.includes("/status/")
      setIsOnProfile(isProfile)
    }

    // Run initially
    detectProfile()

    // Handle Twitter SPA navigation
    const observer = new MutationObserver(() => detectProfile())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  // Listen for overlay state changes
  useEffect(() => {
    const listener = (msg: any) => {
      if (msg.action === "overlay-state-changed") {
        setIsOverlayOpen(msg.isOpen)
      }
    }

    chrome.runtime.onMessage.addListener(listener)
    return () => chrome.runtime.onMessage.removeListener(listener)
  }, [])

  const handleToggle = () => {
    const newState = !isOverlayOpen
    setIsOverlayOpen(newState)

    // Send message to overlay to toggle
    chrome.runtime.sendMessage({
      action: "toggle-overlay",
      isOpen: newState
    })
  }

  return (
    <button
      onClick={handleToggle}
      style={{
        position: "fixed",
        right: "32px",
        top: "50%",
        zIndex: 99999,
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "2px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: isOnProfile ? "#3b82f6" : "#ffffff",
        borderColor: isOnProfile ? "#60a5fa" : "#d1d5db",
        color: isOnProfile ? "#ffffff" : "#4b5563",
        boxShadow: isOnProfile
          ? "0 10px 15px -3px rgba(59, 130, 246, 0.5)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        transform: `translateY(-50%) ${isOverlayOpen ? "rotate(45deg)" : ""}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `translateY(-50%) scale(1.1) ${isOverlayOpen ? "rotate(45deg)" : ""}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `translateY(-50%) scale(1) ${isOverlayOpen ? "rotate(45deg)" : ""}`
      }}
      title={
        isOnProfile ? "Toggle Profile Panel (On Profile)" : "Toggle Panel"
      }>
      {isOverlayOpen ? "✕" : "+"}
    </button>
  )
}

export default ToggleButton
