import React from "react"

import {
  ArrowDownIcon,
  CashIcon,
  MoneyChangeIcon,
  MoneySendIcon,
  ReceiptDiscountIcon
} from "~assets/icons"
import PopupFooter from "~components/footer"
import { useBalance } from "~hooks/balance"
import { shortenAddress } from "~utils/address"
import { usePrivyAuth } from "~utils/auth-service"
import { cn } from "~utils/classname"

const actions = [
  {
    label: "Cash",
    description: "deposit crypto",
    accent: "#389BFF",
    icon: <CashIcon width={24} height={24} />
  },
  {
    label: "Transfer",
    accent: "#FF4838",
    icon: <MoneySendIcon width={24} height={24} />
  },
  {
    label: "Swap",
    accent: "#FFA238",
    description: "Validate your life",
    icon: <MoneyChangeIcon width={24} height={24} />
  },
  {
    label: "Bulk Transfer",
    accent: "#6638FF",
    icon: <ReceiptDiscountIcon width={24} height={24} />
  }
]

const PopupHomePage = () => {
  const { user } = usePrivyAuth()
  const profilePicture = user?.twitter?.profilePictureUrl

  const { data: balance } = useBalance({
    owner: user?.wallet?.address || "",
    tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" as const
  })

  const totalBalance = balance?.uiAmount || 0
  const totalBalanceFormatted = totalBalance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })

  const [totalBalanceFormattedInteger, totalBalanceFormattedDecimal] =
    totalBalanceFormatted.split(".")

  return (
    <>
      {/* Header */}
      <div className="border-b border-[#F2F2F2] py-6 px-7 flex items-center gap-1">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="profile picture"
            className="size-7 rounded"
          />
        ) : (
          <div className="size-7 rounded bg-[#A387FF]" />
        )}
        <p
          className={cn("text-base", {
            "animate-pulse h-4 w-7 rounded-full bg-[#F2F2F2]": !user?.wallet
          })}>
          {user?.wallet && shortenAddress(user.wallet.address)}
        </p>
        <ArrowDownIcon width={16} height={16} />
      </div>
      {/* Body */}
      <div className="py-6 px-7 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-4">
          <p className="text-xl font-medium text-black/40 leading-5 tracking-normal">
            Total Balance
          </p>
          <p className="text-3xl leading-6 tracking-normal font-black">
            {totalBalanceFormattedInteger}
            <span className="text-black/30">
              .{totalBalanceFormattedDecimal}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {actions.map((action) => (
            <button
              key={action.label}
              className="border border-dashed border-[#C4C4C4] bg-[#f3f3f3] hover:bg-[#f3f3f3]/50 transition-colors duration-200 ease-in-out rounded-2xl h-full py-3.5 px-4 flex flex-col justify-between gap-10">
              <div
                className="size-10 flex items-center justify-center rounded-lg"
                style={{
                  backgroundColor: action.accent,
                  boxShadow: "inset 0 0 12px 4px rgba(255, 255, 255, 0.21)"
                }}>
                {action.icon}
              </div>

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
