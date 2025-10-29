import { useEffect, useState } from "react"

import "../style.css"

import { usePrivy } from "@privy-io/react-auth"

import Loading from "~components/loading"
import HistoryPage from "~pages/history"
import PopupHomePage from "~pages/home"
import ProfilePage from "~pages/profile"
import { useTab } from "~store/tabs"
import { usePrivyAuth } from "~utils/auth-service"

function PopupRoot() {
  const [isLoading, setIsLoading] = useState(true)
  const [authTabOpened, setAuthTabOpened] = useState(false)
  const [activeTab] = useTab()
  const privyAuth = usePrivyAuth() // Get the full Privy object for method execution
  const { ready, authenticated, user } = privyAuth

  console.log("user :>> ", { user, authenticated, ready })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // Handle authentication redirect
  useEffect(() => {
    if (ready && !authenticated && !authTabOpened) {
      // Open auth tab
      chrome.tabs.create({
        url: chrome.runtime.getURL("tabs/auth.html")
      })
      setAuthTabOpened(true)
    }
  }, [ready, authenticated, authTabOpened])

  // Listen for authentication success and Privy method execution requests
  useEffect(() => {
    const handleMessage = (message: any, sender: any, sendResponse: any) => {
      if (message.type === "AUTH_SUCCESS") {
        setAuthTabOpened(false) // Reset so popup can reopen auth tab if needed
      }

      // Handle Privy method execution requests from other contexts
      if (message.type === "EXECUTE_PRIVY_METHOD") {
        try {
          const { method, args } = message
          const privyMethod = privyAuth[method]

          if (typeof privyMethod === "function") {
            const result = privyMethod(...args)
            sendResponse({ result })
          } else {
            sendResponse({ error: `Method ${method} not found` })
          }
        } catch (error) {
          sendResponse({ error: error.message })
        }
        return true // keep channel open
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)
    return () => chrome.runtime.onMessage.removeListener(handleMessage)
  }, [privyAuth])

  if (isLoading || !ready) {
    return <Loading />
  }

  if (!authenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Opening login page in a new tab...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    )
  }
  return (
    <>
      {activeTab === "home" && <PopupHomePage />}
      {activeTab === "history" && <HistoryPage />}
      {activeTab === "profile" && <ProfilePage />}
    </>
  )
}

export default PopupRoot
