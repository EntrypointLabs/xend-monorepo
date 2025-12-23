// atoms.ts
import { atom, useAtom } from "jotai"

export type TabTypes =
  | "home"
  | "history"
  | "profile"
  | "deposit"
  | "transfer"
  | "swap"
  | "bulk-transfer"
  | "review"
  | "success"
  | "keys-and-recovery"

export const tabAtom = atom<TabTypes>("home")

export const useTab = () => {
  return useAtom(tabAtom)
}
