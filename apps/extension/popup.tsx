import {
  useAuth,
  useCrossmintAuth,
  useWallet
} from "@crossmint/client-sdk-react-ui"
import { useEffect, useState } from "react"

import "./style.css"

import Loading from "~components/loading"
import { CROSSMINT_CLIENT_API_KEY, getCrossmintWallets } from "~utils/crossmint"

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState("")
  const auth = useAuth()
  const wallet = useWallet()
  const crossmintAuth = useCrossmintAuth()

  // const crossmintWallets = getCrossmintWallets("client")

  // console.log("crossmintWallets :>> ", crossmintWallets)

  const CROSSMINT_CLIENT_API_KEY =
    process.env.PLASMO_PUBLIC_CROSSMINT_CLIENT_API_KEY
  const CROSSMINT_SERVER_API_KEY =
    process.env.PLASMO_PUBLIC_CROSSMINT_SERVER_API_KEY

  console.log("CROSSMINT_CLIENT_API_KEY :>> ", CROSSMINT_CLIENT_API_KEY)
  console.log("CROSSMINT_SERVER_API_KEY :>> ", CROSSMINT_SERVER_API_KEY)

  console.log("auth, wallet, crossmintAuth", {
    auth,
    wallet,
    crossmintAuth
    // crossmintWallets
  })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCreateWallet = async () => {
    const crossmintWallets = getCrossmintWallets("client")

    console.log("crossmintWallets :>> ", crossmintWallets)

    const wallet = await crossmintWallets.getOrCreateWallet({
      chain: "solana",
      signer: {
        // type: "external-wallet",
        type: "api-key"

        // email: "test@test.com",
        // address: "BhPJsbjXToWqGCQVc9ju1EcAxqosfVQCBVFbK5bSyD2z"
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
    return <Loading />
  }

  return (
    <div className="bg-black text-white p-4 w-[400px] h-[600px] text-center">
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
    </div>
  )
}

export default IndexPopup
