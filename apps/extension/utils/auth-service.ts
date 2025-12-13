import {
  useIdentityToken,
  useLinkAccount,
  useLoginWithOAuth,
  usePrivy,
  useSolanaWallets,
  type LinkedAccountWithMetadata,
  type OAuthFlowState,
  type User,
  type WalletWithMetadata
} from "@privy-io/react-auth"
import { useCallback, useEffect, useState } from "react"

// Utility function to check if Chrome APIs are available
function isChromeAPIAvailable(): boolean {
  return typeof chrome !== "undefined" && !!chrome.storage?.local
}

// Shared authentication state management
export interface AuthState {
  isAuthenticated: boolean
  user: any
  ready: boolean
  authState: OAuthFlowState
  isAuthenticating: boolean
  accessToken: string | null
}

// Extended interface for contexts that have PrivyProvider
export interface PrivyAuthState extends AuthState {
  // Privy methods that require context
  login: () => void
  logout: () => void
  signTransaction: (transaction: any) => Promise<any>
  sendTransaction: (transaction: any) => Promise<any>
  // Add other Privy methods as needed
  connectWallet: () => void
}

class AuthService {
  private listeners: Set<(state: AuthState) => void> = new Set()
  private privyListeners: Set<(state: PrivyAuthState) => void> = new Set()
  private currentState: AuthState = {
    isAuthenticated: false,
    user: null,
    ready: false,
    authState: {
      status: "initial"
    },
    isAuthenticating: false,
    accessToken: null
  }
  private privyMethods: Partial<PrivyAuthState> = {}

  // Subscribe to basic auth state changes
  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener)
    // Immediately call with current state
    listener(this.currentState)

    return () => this.listeners.delete(listener)
  }

  // Subscribe to full Privy auth state (includes methods)
  subscribePrivy(listener: (state: PrivyAuthState) => void) {
    this.privyListeners.add(listener)
    // Immediately call with current state + methods
    listener({ ...this.currentState, ...this.privyMethods } as PrivyAuthState)

    return () => this.privyListeners.delete(listener)
  }

  // Update auth state and notify all listeners
  updateState(state: Partial<AuthState>) {
    this.currentState = { ...this.currentState, ...state }
    this.listeners.forEach((listener) => listener(this.currentState))
    this.privyListeners.forEach((listener) =>
      listener({ ...this.currentState, ...this.privyMethods } as PrivyAuthState)
    )

    // Store in Chrome storage for persistence across contexts (only if available)
    if (isChromeAPIAvailable()) {
      try {
        chrome.storage.local.set({ authState: this.currentState })
      } catch (error) {
        console.warn("Failed to save auth state to Chrome storage:", error)
      }
    }
  }

  // Update Privy methods (called from contexts with PrivyProvider)
  updatePrivyMethods(methods: Partial<PrivyAuthState>) {
    this.privyMethods = { ...this.privyMethods, ...methods }
    this.privyListeners.forEach((listener) =>
      listener({ ...this.currentState, ...this.privyMethods } as PrivyAuthState)
    )
  }

  // Get current state
  getState(): AuthState {
    return this.currentState
  }

  // Get current Privy state (includes methods)
  getPrivyState(): PrivyAuthState | null {
    if (Object.keys(this.privyMethods).length === 0) {
      return null // No Privy context available
    }
    return { ...this.currentState, ...this.privyMethods } as PrivyAuthState
  }

  // Load state from Chrome storage
  async loadFromStorage() {
    if (!isChromeAPIAvailable()) {
      console.warn("Chrome storage not available, skipping auth state load")
      return
    }

    try {
      const result = await chrome.storage.local.get(["authState"])
      if (result.authState) {
        this.currentState = result.authState
        this.listeners.forEach((listener) => listener(this.currentState))
        this.privyListeners.forEach((listener) =>
          listener({
            ...this.currentState,
            ...this.privyMethods
          } as PrivyAuthState)
        )
      }
    } catch (error) {
      console.error("Failed to load auth state from storage:", error)
    }
  }

  // NEW: Execute Privy methods via messaging (for contexts without PrivyProvider)
  async executePrivyMethod(method: string, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!isChromeAPIAvailable()) {
        reject(new Error("Chrome APIs not available"))
        return
      }

      chrome.runtime.sendMessage(
        {
          type: "EXECUTE_PRIVY_METHOD",
          method,
          args
        },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message))
          } else if (response.error) {
            reject(new Error(response.error))
          } else {
            resolve(response.result)
          }
        }
      )
    })
  }
}

// Singleton instance
export const authService = new AuthService()

// React hook for using shared auth state (basic - no Privy methods)
export function useSharedAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    ready: false,
    authState: { status: "initial" },
    isAuthenticating: false,
    accessToken: null
  })

  useEffect(() => {
    // // Request current auth state from background/popup
    // const requestAuthState = async () => {
    //   try {
    //     const response = await chrome.runtime.sendMessage({
    //       type: "GET_AUTH_STATE"
    //     })

    //     console.log("response :>> ", response)

    //     if (response?.authState) {
    //       setAuthState(response.authState)
    //     }
    //   } catch (error) {
    //     console.error("Failed to request auth state:", error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    // requestAuthState()

    // Listen for auth state updates
    // const handleMessage = (message: any) => {
    //   if (message.type === "AUTH_STATE_UPDATE") {
    //     console.log("message :>> ", message)
    //     setAuthState(message.authState)
    //   }
    // }

    const handleMessage = (message: any) => {
      if (message.type === "AUTH_STATE_CHANGED") {
        localStorage.setItem(
          "AUTH_STATE_CHANGED",
          JSON.stringify(message.authState)
        )

        setAuthState(message.authState)
      }
    }

    chrome.runtime?.onMessage?.addListener(handleMessage)

    // chrome.runtime.onMessage.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  const localAuthState = localStorage.getItem("AUTH_STATE_CHANGED")
    ? (JSON.parse(localStorage.getItem("AUTH_STATE_CHANGED")!) as AuthState)
    : null

  return localAuthState || authState
}

export function isEmbeddedPrivyWallet(
  account: LinkedAccountWithMetadata
): account is WalletWithMetadata {
  return account.type === "wallet" && account.connectorType === "embedded"
}

export function useCreateSolanaWallet() {
  const { createWallet: createSolanaWallet } = useSolanaWallets()

  const onCreateWallet = useCallback(
    async (user: User) => {
      const walletsWithMeta = user.linkedAccounts.filter((account) =>
        isEmbeddedPrivyWallet(account)
      )
      const solanaEmbedded = walletsWithMeta.find(
        (account) => account.chainType === "solana"
      )
      if (!solanaEmbedded) {
        const sss = await createSolanaWallet({ createAdditional: true }).catch(
          (error) => {
            console.log("Error:onCreateWallet:createSolanaWallet", error)
          }
        )
      }
    },
    [createSolanaWallet]
  )

  return { createWallet: onCreateWallet }
}

// Hook for Privy integration (use this in contexts that have PrivyProvider)
export function usePrivyAuth() {
  const privyAuth = usePrivy()
  const { createWallet: createSolanaWallet } = useCreateSolanaWallet()

  const { initOAuth, loading, state } = useLoginWithOAuth({
    onComplete: ({ user }) => {
      createSolanaWallet(user)
    }
  })

  const { linkTwitter } = useLinkAccount({
    onSuccess: ({ user }) => {
      createSolanaWallet(user)
    }
  })

  const { identityToken } = useIdentityToken()
  const {
    authenticated,
    user,
    ready,
    logout,
    signTransaction,
    sendTransaction,
    connectWallet,
    getAccessToken
  } = privyAuth

  const loginWithTwitter = () => initOAuth({ provider: "twitter" })

  useEffect(() => {
    // Update basic auth state
    authService.updateState({
      isAuthenticated: authenticated,
      user,
      ready,
      authState: state,
      isAuthenticating: loading
    })

    // Update Privy methods
    authService.updatePrivyMethods({
      login: loginWithTwitter,
      logout,
      signTransaction,
      sendTransaction,
      connectWallet
    })
  }, [
    authenticated,
    user,
    ready,
    state,
    loading,
    loginWithTwitter,
    logout,
    signTransaction,
    sendTransaction,
    connectWallet
  ])

  useEffect(() => {
    if (!identityToken) return

    const authStateData = {
      isAuthenticated: authenticated,
      user,
      ready,
      authState: state,
      isAuthenticating: loading
    }

    // localStorage.setItem("myIdentityToken", identityToken)

    console.log("identityToken :>> ", identityToken)

    try {
      getAccessToken()
        .then((accessToken) => {
          // Broadcast to content scripts via background
          chrome.runtime
            ?.sendMessage({
              type: "AUTH_STATE_UPDATE",
              authState: { ...authStateData, accessToken }
            })
            .catch((error) => {
              // Background might not be ready, that's ok
              console.warn("Error trying to broadcast auth state:", error)
            })
        })
        .catch((error) => {
          console.warn("Error trying to get access token:", error)
        })
      // Store to chrome.storage (for popup persistence)
      chrome.storage?.local?.set({
        identityToken,
        authState: authStateData
      })
    } catch (error) {
      console.warn("Failed to save/broadcast auth state:", error)
    }

    const handleMessage = (message: any) => {
      if (message.type === "GET_AUTH_STATE") {
        console.log("message :>> ", message)
        // setAuthState(message.authState)
      }
    }

    chrome.runtime?.onMessage?.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [identityToken, authenticated, user, ready, state, loading])

  return {
    ...privyAuth,
    login: loginWithTwitter,
    loginWithEmail: () => privyAuth.login({ loginMethods: ["email"] }),
    linkTwitter
  }
}

// Hook for accessing Privy methods from any context (returns null if no Privy context available)
export function usePrivyMethods() {
  const [privyState, setPrivyState] = useState<PrivyAuthState | null>(
    authService.getPrivyState()
  )

  useEffect(() => {
    const unsubscribe = authService.subscribePrivy(setPrivyState)
    return () => {
      unsubscribe()
    }
  }, [])

  return privyState
}

// NEW: Hook for executing Privy methods from contexts without PrivyProvider
export function usePrivyMethodExecutor() {
  return {
    login: () => authService.executePrivyMethod("login"),
    logout: () => authService.executePrivyMethod("logout"),
    signTransaction: (transaction: any) =>
      authService.executePrivyMethod("signTransaction", transaction),
    sendTransaction: (transaction: any) =>
      authService.executePrivyMethod("sendTransaction", transaction),
    connectWallet: () => authService.executePrivyMethod("connectWallet")
  }
}
