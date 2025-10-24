// atoms.ts
import { atom, useAtom } from "jotai"

export const tabAtom = atom<"home" | "history" | "profile">("home")

export const useTab = () => {
  return useAtom(tabAtom)
}
