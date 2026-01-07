import PrivyProvider from "./privy"
import TanstackProvider from "./tanstack"
import { TransferProvider } from "./transfer"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <PrivyProvider>
        <TransferProvider>{children}</TransferProvider>
      </PrivyProvider>
    </TanstackProvider>
  )
}
