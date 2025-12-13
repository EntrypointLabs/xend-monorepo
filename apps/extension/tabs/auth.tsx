import React, { useEffect } from "react"

import Providers from "~providers"
import { usePrivyAuth } from "~utils/auth-service"

function AuthPage() {
  const { login, loginWithEmail, linkTwitter, authenticated, user } =
    usePrivyAuth()

  useEffect(() => {
    // If user is already authenticated, close this tab and notify popup
    // if (authenticated && user && user.twitter) {
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

  const handleLinkTwitter = async () => {
    try {
      linkTwitter()
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  // if (!authenticated || !user) {
  //   return (
  //     <div>
  //       <p>Log in or Sign up</p>

  //       <button
  //         onClick={() => {
  //           console.log("loginWithEmails :>> ")
  //           loginWithEmail()
  //         }}>
  //         Continue with Email
  //       </button>
  //     </div>
  //   )
  // }

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
            // onClick={handleLinkTwitter}
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            Link Twitter Account
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
    <Providers>
      <AuthPage />
    </Providers>
  )
}

export default AuthTab
