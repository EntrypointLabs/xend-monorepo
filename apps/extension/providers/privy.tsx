"use client"

import { PrivyProvider as ReactPrivyProvider } from "@privy-io/react-auth"
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana"
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit"

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
        externalWallets: { solana: { connectors: toSolanaWalletConnectors() } },

        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          showWalletUIs: false
          // solana: {
          //   createOnLogin: "users-without-wallets"
          // }
        },
        solana: {
          rpcs: {
            "solana:mainnet": {
              rpc: createSolanaRpc(
                process.env.PLASMO_PUBLIC_SOLANA_MAINNET_RPC_URL ||
                  "https://api.mainnet-beta.solana.com"
              ),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                process.env.PLASMO_PUBLIC_SOLANA_MAINNET_RPC_URL?.replace(
                  "http",
                  "ws"
                ) || "wss://api.mainnet-beta.solana.com"
              )
            }
          }
        },
        // Custom OAuth redirect URL pointing to backend proxy
        // Backend will redirect to chrome-extension://<id>/popup.html with auth params
        customOAuthRedirectUrl: `${process.env.PLASMO_PUBLIC_BACKEND_URL}/auth/twitter/callback`
      }}>
      {children}
    </ReactPrivyProvider>
  )
}
