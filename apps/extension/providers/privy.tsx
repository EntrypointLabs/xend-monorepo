"use client"

import { PrivyProvider as ReactPrivyProvider } from "@privy-io/react-auth"

export default function PrivyProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ReactPrivyProvider
      appId={process.env.PLASMO_PUBLIC_PRIVY_APP_ID}
      clientId={process.env.PLASMO_PUBLIC_PRIVY_CLIENT_ID}
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets"
          }
        },
        // Custom OAuth redirect URL pointing to backend proxy
        // Backend will redirect to chrome-extension://<id>/popup.html with auth params
        customOAuthRedirectUrl: process.env.PLASMO_PUBLIC_BACKEND_URL
          ? `${process.env.PLASMO_PUBLIC_BACKEND_URL}/auth/twitter/callback`
          : "http://localhost:8800/auth/twitter/callback"
      }}>
      {children}
    </ReactPrivyProvider>
  )
}
