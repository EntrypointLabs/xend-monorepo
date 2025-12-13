import {
  usePrivy,
  useLogin as usePrivyLogin,
  useWallets
} from "@privy-io/react-auth"
import { useSignTransaction } from "@privy-io/react-auth/solana"
import { useCallback, useEffect, useState } from "react"

import {
  createSPLTransferTransaction,
  sendSplToken
} from "~functions/createSPLTransferTransaction"
import { useBalance } from "~hooks/balance"
import { usePrivyMethodExecutor, useSharedAuth } from "~utils/auth-service"
import { USDC_TOKEN_ADDRESS } from "~utils/constant"
import type { FetchUserResponse, TwitterUser } from "~utils/twitter-api"

const prefilledAmounts = [50, 100, 200, 500, 1000, 2000]

export default function OverlayPanel() {
  const privyAuth = usePrivy()
  const { login } = usePrivyLogin({
    onComplete: ({ user }) => {
      // const walletsWithMeta = user.linkedAccounts.filter((account) =>
      //   isEmbeddedPrivyWallet(account)
      // )
      // onCreateWallet(walletsWithMeta)
    }
  })
  const userHasXConnected = privyAuth.user?.twitter
  console.log("privyAuth :>> ", privyAuth)
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  // const [userProfile, setUserProfile] = useState<TwitterUser | null>(null)
  const [userProfile, setUserProfile] = useState<TwitterUser | null>({
    name: "Samuel",
    id: "1128608020454346752",
    username: "tomiwa_mooney",
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1985774905166589952/83VIrLAk_400x400.jpg"
  })
  const [profileStatus, setProfileStatus] = useState<
    "idle" | "loading" | "error"
  >("idle")
  const [isTransferring, setIsTransferring] = useState(false)

  // Get Privy method executor for transactions
  const privyExecutor = usePrivyMethodExecutor()

  const { wallets } = useWallets()
  const { signTransaction } = useSignTransaction()

  const { authState, user: loggedInUser, accessToken } = useSharedAuth()
  const { data: balance } = useBalance({
    owner: loggedInUser?.wallet?.address || "",
    tokenAddress: USDC_TOKEN_ADDRESS
  })

  // 🔹 Detect Twitter profile pages (for username extraction only) & 🔹 Listen for toggle messages from Chrome action
  useEffect(() => {
    const detectProfile = () => {
      const match = window.location.pathname.match(/^\/([A-Za-z0-9_]+)$/)
      if (match && !window.location.pathname.includes("/status/")) {
        setUsername(match[1])
      } else {
        setUsername("")
      }
    }

    const listener = (msg: any) => {
      if (msg.action === "toggle-overlay") {
        setOpen((prev) => !prev)
      }
    }

    // Run initially
    detectProfile()

    // Handle Twitter SPA navigation (URL changes without reload)
    const observer = new MutationObserver(() => detectProfile())
    observer.observe(document.body, { childList: true, subtree: true })

    chrome.runtime.onMessage.addListener(listener)

    return () => {
      observer.disconnect()
      chrome.runtime.onMessage.removeListener(listener)
    }
  }, [])

  // 🔹 Fetch Twitter user profile when username changes AND overlay is open
  // useEffect(() => {
  //   if (!username || !open) {
  //     setUserProfile(null)
  //     setProfileStatus("idle")
  //     return
  //   }

  //   const fetchUserProfile = async () => {
  //     setProfileStatus("loading")

  //     try {
  //       const response: FetchUserResponse = await new Promise(
  //         (resolve, reject) => {
  //           chrome.runtime.sendMessage(
  //             { action: "fetch-twitter-user", username },
  //             (response) => {
  //               if (chrome.runtime.lastError) {
  //                 reject(new Error(chrome.runtime.lastError.message))
  //               } else {
  //                 resolve(response)
  //               }
  //             }
  //           )
  //         }
  //       )

  //       if (response.success && response.data) {
  //         setUserProfile(response.data)
  //         setProfileStatus("idle")
  //       } else {
  //         setProfileStatus("error")
  //         console.error(response.error || "Failed to fetch user profile")
  //       }
  //     } catch (error) {
  //       setProfileStatus("error")
  //       console.error(
  //         error instanceof Error ? error.message : "Unknown error occurred"
  //       )
  //     }
  //   }

  //   fetchUserProfile()
  // }, [username, open])

  // 🔹 Broadcast overlay state changes
  useEffect(() => {
    chrome.runtime.sendMessage({
      action: "overlay-state-changed",
      isOpen: open
    })
  }, [open])

  // Handle transfer using Privy methods
  const handleTransfer = useCallback(async () => {
    if (!selectedAmount || !privyExecutor.sendTransaction) {
      alert("Transfer functionality not available")
      return
    }

    if (!userProfile) {
      alert("User profile not found")
      return
    }

    if (balance?.uiAmount < selectedAmount) {
      alert("Insufficient balance")
      return
    }

    setIsTransferring(true)
    try {
      const req = await fetch(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}/wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.PLASMO_PUBLIC_API_KEY || "1234567890"
          },
          body: JSON.stringify({
            platform: "twitter_oauth",
            name: userProfile.name,
            username: userProfile.username,
            subject: userProfile.id
          })
        }
      )

      const newUser = await req.json()

      const address = newUser.linked_accounts.find(
        (account) => account.type === "wallet"
      )?.address

      // TODO: Create address from user profile
      // const address = user.wallet.address

      // const transaction = await createSPLTransferTransaction(
      //   loggedInUser.wallet.address,
      //   address,
      //   USDC_TOKEN_ADDRESS,
      //   selectedAmount
      // )
      const { transaction } = await sendSplToken({
        fromAddress: loggedInUser.wallet.address,
        toAddress: address,
        mint: USDC_TOKEN_ADDRESS,
        amount: selectedAmount,
        decimals: 6
      })

      const serializedBuffer = transaction.serialize()
      const serializedTransaction =
        Buffer.from(serializedBuffer).toString("base64")

      const transferResponse = await fetch(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}/wallet/transfer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.PLASMO_PUBLIC_API_KEY || "1234567890",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            serializedTransaction,
            walletId: loggedInUser.wallet.id
          })
        }
      )

      const result = await transferResponse.json()
      // const result = await privyExecutor.sendTransaction(transaction)
      console.log("Transfer successful:", result)
      alert(`Transfer of $${selectedAmount} successful!`)

      // Reset form
      setSelectedAmount(null)
    } catch (error) {
      console.error("Transfer failed:", error)
      alert(
        `Transfer failed: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    } finally {
      setIsTransferring(false)
    }
  }, [balance, selectedAmount, privyExecutor, wallets, userProfile])

  if (!open) return null

  return (
    <div className="xend-overlay-panel">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginBottom: 32
        }}>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "4px",
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#000"
          }}>
          ✕
        </button>
        <h2
          style={{
            fontWeight: "600",
            fontSize: "18px",
            margin: 0
          }}>
          Transfer
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24
        }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {profileStatus === "loading" ? (
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#e5e7eb",
                borderRadius: "50%",
                animation: "pulse 2s infinite"
              }}
            />
          ) : userProfile ? (
            <img
              src={userProfile.profile_image_url}
              alt={`${userProfile.name} profile`}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          ) : (
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#2563eb",
                borderRadius: "50%"
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              lineHeight: "22px"
            }}>
            {profileStatus === "loading" ? (
              <>
                <div
                  style={{
                    width: 80,
                    height: 16,
                    backgroundColor: "#e5e7eb",
                    borderRadius: "4px",
                    animation: "pulse 2s infinite"
                  }}
                />
                <div
                  style={{
                    width: 60,
                    height: 14,
                    backgroundColor: "#e5e7eb",
                    borderRadius: "4px",
                    animation: "pulse 2s infinite"
                  }}
                />
              </>
            ) : userProfile ? (
              <>
                <p style={{ fontWeight: 500 }}>{userProfile.name}</p>
                <p>@{userProfile.username}</p>
              </>
            ) : profileStatus === "error" ? (
              <>
                <p style={{ fontWeight: 500, color: "#ef4444" }}>Error</p>
                <p style={{ color: "#ef4444", fontSize: "12px" }}>
                  {/* {profileError} */}
                  Failed to fetch user profile
                </p>
              </>
            ) : (
              <>
                <p style={{ fontWeight: 500 }}>Loading...</p>
                <p>@{username}</p>
              </>
            )}
          </div>
        </div>
        <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>Tip this X account</p>

        <div
          style={{
            // Displat grid of 3 fractions
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16
          }}>
          {prefilledAmounts.map((amount) => (
            <button
              key={amount}
              style={{
                border: "1px dashed #C4C4C4",
                borderRadius: 8,
                cursor: "pointer",
                width: "100%",
                height: 75,
                fontWeight: 700,
                background: selectedAmount === amount ? "#A387FF" : "none",
                fontSize: 24,
                color: selectedAmount === amount ? "#fff" : "#000"
              }}
              onClick={() => setSelectedAmount(amount)}>
              ${amount}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="$50, $10,000"
          style={{
            border: "none",
            borderBottom: "1px solid #115EBF",
            padding: 16,
            background: "none"
          }}
          value={selectedAmount ? `$${selectedAmount}` : ""}
          onChange={(e) => {
            const value = e.target.value
            const numericValue = value
              .replace(/[$,]/g, "")
              .replace(/[^0-9]/g, "")

            if (numericValue === "") {
              setSelectedAmount(null)
            } else {
              setSelectedAmount(Number(numericValue))
            }
          }}
        />

        {privyAuth.authenticated && (
          <button
            className="xend-transfer-button"
            disabled={
              !selectedAmount ||
              isTransferring ||
              !privyExecutor.sendTransaction ||
              !userHasXConnected
            }
            onClick={handleTransfer}>
            {isTransferring ? "Processing..." : "Transfer"}
          </button>
        )}

        {!privyAuth.authenticated && (
          <button
            className="xend-transfer-button"
            onClick={() =>
              login({
                loginMethods: ["email"]
              })
            }>
            Continue with Email
          </button>
        )}

        {privyAuth.authenticated && !userHasXConnected && (
          <p style={{}}>
            Please finish your setup on in the extension popup or mobile app to
            continue.
          </p>
        )}
      </div>
    </div>
  )
}
