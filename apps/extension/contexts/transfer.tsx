import { createContext, useContext } from "react"

interface TransferContextType {
  toAddress: string
  amount: number
  setToAddress: (address: string) => void
  setAmount: (amount: number) => void
}

export const TransferContext = createContext<TransferContextType>({
  toAddress: "",
  amount: 0,
  setToAddress: () => {},
  setAmount: () => {}
})

export const useTransferContext = () => useContext(TransferContext)
