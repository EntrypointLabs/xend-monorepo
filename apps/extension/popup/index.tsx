import {
  useAuth,
  useCrossmintAuth,
  useWallet
} from "@crossmint/client-sdk-react-ui"
import { useEffect, useState } from "react"

import "../style.css"

import Loading from "~components/loading"
import { CROSSMINT_CLIENT_API_KEY, getCrossmintWallets } from "~utils/crossmint"

import PopupLayout from "./layout"

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(true)
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

  if (isLoading) {
    return (
      <PopupLayout>
        <Loading />
      </PopupLayout>
    )
  }

  return (
    <PopupLayout>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input
        onChange={(e) => setData(e.target.value)}
        value={data}
        className="w-full border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={handleCreateWallet}
        className="bg-blue-500 text-white p-2 rounded-md">
        Create Wallet
      </button>
    </PopupLayout>
  )
}

export default IndexPopup
