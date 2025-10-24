import React from "react"

import PopupFooter from "~components/footer"
import { cn } from "~utils/classname"

const actions = [
  {
    label: "Cash",
    description: "deposit crypto",
    accent: "#389BFF"
  },
  {
    label: "Transfer",
    accent: "#FF4838"
  },
  {
    label: "Swap",
    accent: "#FFA238"
  },
  {
    label: "Bulk Transfer",
    accent: "#6638FF"
  }
]

const PopupHomePage = () => {
  return (
    <>
      {/* Header */}
      <div className="border-b border-[#F2F2F2] py-6 px-7 flex items-center gap-1">
        <div className="size-7 rounded bg-[#A387FF]" />
        <p className="text-base">Agi61My...mFioR</p>
      </div>
      {/* Body */}
      <div className="py-6 px-7 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-4">
          <p className="text-xl font-medium text-black/40">Total Balance</p>
          <p className="text-3xl font-black">
            $190<span className="text-black/30">.00</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {actions.map((action) => (
            <button
              key={action.label}
              className="border border-dashed border-[#C4C4C4] bg-[#f3f3f3] hover:bg-[#f3f3f3]/60 transition-colors duration-200 ease-in-out rounded-2xl h-full py-3.5 px-4 flex flex-col justify-between gap-10">
              <div
                className="size-10 flex items-center justify-center rounded-lg"
                style={{
                  backgroundColor: action.accent,
                  boxShadow: "inset 0 0 12px 4px rgba(255, 255, 255, 0.21)"
                }}></div>

              <div className="flex flex-col items-start gap-0.5">
                <p className="text-base">{action.label}</p>
                <p
                  className={cn(
                    "text-sm text-[#B3B3B3] leading-[100%] tracking-[-2%]",
                    {
                      invisible: !action.description
                    }
                  )}>
                  {action.description || action.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Footer */}
      <PopupFooter />
    </>
  )
}

export default PopupHomePage
