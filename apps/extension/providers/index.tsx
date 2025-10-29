import PrivyProvider from "./privy"
import TanstackProvider from "./tanstack"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <PrivyProvider>{children}</PrivyProvider>
    </TanstackProvider>
  )
}
