import { usePrivy } from "@privy-io/react-auth"
import React, { useEffect } from "react"

import PrivyProvider from "~providers/privy"
import { usePrivyAuth } from "~utils/auth-service"

function AuthPage() {
  const { login, authenticated, user } = usePrivyAuth()

  useEffect(() => {
    // If user is already authenticated, close this tab and notify popup
    if (authenticated && user) {
      // Send message to background script to notify popup
      chrome.runtime.sendMessage({ type: "AUTH_SUCCESS" })

      // Close this tab after a short delay
      setTimeout(() => {
        chrome.tabs.getCurrent((tab) => {
          if (tab?.id) {
            chrome.tabs.remove(tab.id)
          }
        })
      }, 100)
    }
  }, [authenticated, user])

  const handleLogin = async () => {
    try {
      await login()
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please authenticate to continue using the extension
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            Sign in with Privy
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              This tab will close automatically after successful authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthTab() {
  return (
    <PrivyProvider>
      <AuthPage />
    </PrivyProvider>
  )
}

export default AuthTab
