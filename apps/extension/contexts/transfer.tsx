import { createContext, useContext } from "react"

interface TransferContextType {
  toAddress: string | null
  amount: number | null
  setToAddress: (address: string) => void
  setAmount: (amount: number) => void
}

export const TransferContext = createContext<TransferContextType>({
  toAddress: null,
  amount: null,
  setToAddress: () => {},
  setAmount: () => {}
})

export const useTransferContext = () => useContext(TransferContext)
