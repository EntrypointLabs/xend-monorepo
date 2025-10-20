import { createCrossmint, CrossmintWallets } from "@crossmint/wallets-sdk"

export const CROSSMINT_CLIENT_API_KEY =
  process.env.PLASMO_PUBLIC_CROSSMINT_CLIENT_API_KEY
export const CROSSMINT_SERVER_API_KEY =
  process.env.PLASMO_PUBLIC_CROSSMINT_SERVER_API_KEY

console.log("CROSSMINT_CLIENT_API_KEY :>> ", CROSSMINT_CLIENT_API_KEY)
console.log("CROSSMINT_SERVER_API_KEY :>> ", CROSSMINT_SERVER_API_KEY)

export const getCrossmint = (env: "client" | "server") =>
  createCrossmint({
    apiKey:
      env === "client" ? CROSSMINT_CLIENT_API_KEY : CROSSMINT_SERVER_API_KEY
    // jwt: env === "client" ? "<your-jwt>" : undefined // required for client-side calls, optional for server-side calls
  })

export const getCrossmintWallets = (env: "client" | "server") =>
  CrossmintWallets.from(getCrossmint(env))
