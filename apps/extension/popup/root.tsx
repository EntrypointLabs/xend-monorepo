import {
  useAuth,
  useCrossmintAuth,
  useWallet
} from "@crossmint/client-sdk-react-ui"
import { useEffect, useState } from "react"

import "../style.css"

import { usePrivy } from "@privy-io/react-auth"

import Loading from "~components/loading"
import HistoryPage from "~pages/history"
import PopupHomePage from "~pages/home"
import ProfilePage from "~pages/profile"
import { useTab } from "~store/tabs"
import { CROSSMINT_CLIENT_API_KEY, getCrossmintWallets } from "~utils/crossmint"

function PopupRoot() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab] = useTab()
  const { ready, authenticated, user } = usePrivy()

  console.log("user :>> ", { user, authenticated, ready })

  const [data, setData] = useState("")
  const auth = useAuth()
  const wallet = useWallet()
  const crossmintAuth = useCrossmintAuth()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCreateWallet = async () => {
    const crossmintWallets = getCrossmintWallets("client")

    const wallet = await crossmintWallets.getOrCreateWallet({
      chain: "solana",
      signer: {
        type: "api-key"
      },
      delegatedSigners: [
        { signer: "x:_0xgifted" },
        { signer: `api-key:${CROSSMINT_CLIENT_API_KEY}` }
      ],
      owner: "x:_0xgifted"
    })

    console.log("wallet", wallet)
  }
  if (isLoading || !ready) {
    return <Loading />
  }

  if (!authenticated || !user) {
    return <div>Please login to continue</div>
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
