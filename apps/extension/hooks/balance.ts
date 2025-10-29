import { useQuery } from "@tanstack/react-query"

export function useBalance({
  owner,
  tokenAddress
}: {
  owner: string
  tokenAddress: string
}) {
  return useQuery({
    enabled: !!owner && !!tokenAddress,
    queryKey: ["balance", owner, tokenAddress],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}/wallet/balance?owner=${owner}&tokenAddress=${tokenAddress}`,
        {
          headers: {
            "x-api-key": process.env.PLASMO_PUBLIC_API_KEY || "1234567890"
          }
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch balance")
      }

      const data = await res.json()

      return data as {
        amount: string
        uiAmount: number
        decimals: number
        mint: string
      }
    },
    retry: 2,
    refetchInterval: 100_000
  })
}
