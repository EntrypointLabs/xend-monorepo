import { useEffect, useState } from "react"

export default function OverlayPanel() {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")

  //   useEffect(() => {
  //     // Detect Twitter profile pages: twitter.com/username
  //     const match = window.location.pathname.match(/^\/([A-Za-z0-9_]+)$/)
  //     if (match) {
  //       setUsername(match[1])
  //       setOpen(true) // auto open when on profile page
  //     }
  //   }, [])

  // 🔹 Detect Twitter profile pages (for username extraction only)
  useEffect(() => {
    const detectProfile = () => {
      const match = window.location.pathname.match(/^\/([A-Za-z0-9_]+)$/)
      if (match && !window.location.pathname.includes("/status/")) {
        setUsername(match[1])
      } else {
        setUsername("")
      }
    }

    // Run initially
    detectProfile()

    // Handle Twitter SPA navigation (URL changes without reload)
    const observer = new MutationObserver(() => detectProfile())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  // 🔹 Listen for toggle messages from Chrome action
  useEffect(() => {
    const listener = (msg: any) => {
      if (msg.action === "toggle-overlay") {
        setOpen((prev) => !prev)
      }
    }

    chrome.runtime.onMessage.addListener(listener)
    return () => chrome.runtime.onMessage.removeListener(listener)
  }, [])

  // 🔹 Broadcast overlay state changes
  useEffect(() => {
    chrome.runtime.sendMessage({
      action: "overlay-state-changed",
      isOpen: open
    })
  }, [open])

  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "320px",
        height: "100vh",
        backgroundColor: "#ffffff",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        zIndex: 100000,
        borderLeft: "1px solid #e5e7eb"
      }}>
      <div
        style={{
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e5e7eb"
        }}>
        <h2
          style={{
            fontWeight: "600",
            fontSize: "18px",
            margin: 0
          }}>
          Profile Info
        </h2>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px"
          }}>
          ✕
        </button>
      </div>

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
        <p
          style={{
            color: "#6b7280",
            margin: 0
          }}>
          Viewing @{username}
        </p>
        <button
          style={{
            width: "100%",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
          }}
          onClick={() => alert(`Fetch contact info for ${username}`)}>
          Get Contact Info
        </button>
      </div>
    </div>
  )
}
