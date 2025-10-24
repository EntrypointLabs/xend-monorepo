"use client"

import { PrivyProvider as ReactPrivyProvider } from "@privy-io/react-auth"

export default function PrivyProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ReactPrivyProvider
      appId={process.env.PLASMO_PUBLIC_APP_ID}
      clientId={process.env.PLASMO_PUBLIC_CLIENT_ID}
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets"
          }
        }
      }}>
      {children}
    </ReactPrivyProvider>
  )
}
