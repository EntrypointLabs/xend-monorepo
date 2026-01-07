import { useQuery } from "@tanstack/react-query"

export function useResolveWallet({
  accountId,
  chainType
}: {
  accountId: string
  chainType: string
}) {
  return useQuery({
    enabled: !!accountId && !!chainType,
    queryKey: ["resolveWallet", accountId, chainType],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}/wallet/privy/account`,
        {
          method: "POST",
          body: JSON.stringify({ accountId, chainType }),
          headers: {
            "x-api-key": process.env.PLASMO_PUBLIC_API_KEY || "1234567890"
          }
        }
      )

      if (!res.ok) {
        console.log(res.statusText)
        throw new Error("Failed to fetch balance")
      }

      const data = await res.json()

      return data
    },
    retry: 2,
    refetchInterval: 100_000
  })
}
