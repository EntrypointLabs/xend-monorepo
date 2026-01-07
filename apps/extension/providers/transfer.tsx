import { useState } from "react"

import { TransferContext } from "~contexts/transfer"

export function TransferProvider({ children }) {
  const [toAddress, setToAddress] = useState<string | null>("")
  const [amount, setAmount] = useState<number | null>(0)
  return (
    <TransferContext.Provider
      value={{
        toAddress,
        amount,
        setToAddress,
        setAmount
      }}>
      {children}
    </TransferContext.Provider>
  )
}
