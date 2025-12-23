import xendIcon from "data-base64:~assets/xend-icon.png"
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
import { useTab, type TabTypes } from "~store/tabs"
import { shortenAddress } from "~utils/address"
import { usePrivyAuth } from "~utils/auth-service"
import { cn } from "~utils/classname"
import { USDC_TOKEN_ADDRESS } from "~utils/constant"

const actions: {
  label: string
  accent: string
  tab: TabTypes
  icon: React.JSX.Element
}[] = [
  {
    label: "Deposit",
    accent: "#389BFF",
    tab: "deposit",
    icon: <CashIcon width={13} height={13} />
  },
  {
    label: "Transfer",
    accent: "#FF4838",
    tab: "transfer",
    icon: <MoneySendIcon width={13} height={13} />
  },
  {
    label: "Swap",
    accent: "#FFA238",
    tab: "swap",
    icon: <MoneyChangeIcon width={13} height={13} />
  },
  {
    label: "Bulk Transfer",
    accent: "#6638FF",
    tab: "bulk-transfer",
    icon: <ReceiptDiscountIcon width={13} height={13} />
  }
]

const PopupHomePage = () => {
  const { user } = usePrivyAuth()
  const profilePicture = user?.twitter?.profilePictureUrl

  const [, setActiveTab] = useTab()

  const { data: balance } = useBalance({
    owner: user?.wallet?.address || "",
    tokenAddress: USDC_TOKEN_ADDRESS
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
      <div className="border-y border-[#F2F2F2] py-3 px-5 flex items-center gap-1">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="profile picture"
            className="size-7 rounded bg-gray-100 object-cover"
          />
        ) : (
          <div className="size-7 rounded bg-[#A387FF]" />
        )}
        <div className="flex items-center gap-x-1">
          <p
            className={cn("text-base", {
              "animate-pulse h-4 w-7 rounded-full bg-[#F2F2F2]": !user?.wallet
            })}>
            {user?.wallet && shortenAddress(user.wallet.address)}
          </p>
          <ArrowDownIcon width={16} height={16} />
        </div>
      </div>
      {/* Body */}
      <div className="py-6 px-5 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-y-[1.125rem]">
          <p className="text-lg font-medium text-black/40 leading-[22px] tracking-normal">
            Total Balance
          </p>
          <p className="text-[2rem] leading-[22px] tracking-normal font-black">
            {totalBalanceFormattedInteger}
            <span className="text-black/30">
              .{totalBalanceFormattedDecimal}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-0.5 items-center justify-center max-w-[277px] mx-auto">
            <p className="font-medium text-base text-black leading-[22px] tracking-normal">
              Your wallet is empty
            </p>
            <p className="font-medium text-sm text-black/40 leading-[22px] tracking-normal">
              Deposit funds to start sending tokens seamlessly
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={() => setActiveTab(action.tab)}
                className="border border-dashed border-[#C4C4C4] bg-[#f3f3f3] hover:bg-[#f3f3f3]/50 transition-colors duration-200 ease-in-out rounded-lg py-3 px-2 flex flex-col items-center gap-1">
                <div
                  className="size-[22px] flex items-center justify-center rounded"
                  style={{
                    backgroundColor: action.accent,
                    boxShadow: "inset 0 0 12px 4px rgba(255, 255, 255, 0.21)"
                  }}>
                  {action.icon}
                </div>

                <p className="text-xs text-black tracking-[-2%] text-nowrap">
                  {action.label}
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <p className="underline text-left text-[#115EBF] text-lg font-medium leading-8 tracking-normal">
            Activity
          </p>
          {/* Loop of transactions */}
          <div className="flex flex-col gap-y-[22px]">
            <div className="flex flex-col gap-y-4">
              <p className="text-base text-left font-medium text-black/40 leading-[22px] tracking-normal">
                Today
              </p>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={profilePicture}
                      alt="profile picture"
                      className="size-9 rounded-full bg-gray-100 object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-black leading-[20.22px] tracking-normal">
                        Transfer to
                      </p>
                      <p className="text-sm text-black leading-[20.22px] tracking-normal">
                        @0xGiFTED
                      </p>
                    </div>
                  </div>
                  <p className="text-[14.7px] text-black leading-[20.22px] tracking-normal text-right">
                    $190.00
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={profilePicture}
                      alt="profile picture"
                      className="size-9 rounded-full bg-gray-100 object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-black leading-[20.22px] tracking-normal">
                        Transfer from
                      </p>
                      <p className="text-sm text-black leading-[20.22px] tracking-normal">
                        Gabitha
                      </p>
                    </div>
                  </div>
                  <p className="text-[14.7px] text-black leading-[20.22px] tracking-normal text-right">
                    $200.00
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <p className="text-base text-left font-medium text-black/40 leading-[22px] tracking-normal">
                12nd Oct, 2025
              </p>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={profilePicture}
                      alt="profile picture"
                      className="size-9 rounded-full bg-gray-100 object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-black leading-[20.22px] tracking-normal">
                        Transfer to
                      </p>
                      <p className="text-sm text-black leading-[20.22px] tracking-normal">
                        @0xGiFTED
                      </p>
                    </div>
                  </div>
                  <p className="text-[14.7px] text-black leading-[20.22px] tracking-normal text-right">
                    $190.00
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={profilePicture}
                      alt="profile picture"
                      className="size-9 rounded-full bg-gray-100 object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-black leading-[20.22px] tracking-normal">
                        Transfer from
                      </p>
                      <p className="text-sm text-black leading-[20.22px] tracking-normal">
                        Gabitha
                      </p>
                    </div>
                  </div>
                  <p className="text-[14.7px] text-black leading-[20.22px] tracking-normal text-right">
                    $200.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col items-center justify-center gap-y-1.5 mt-16 pb-24">
        <img
          src={xendIcon}
          alt="xend icon"
          className="size-[18px] rounded-full bg-gray-100 object-cover"
        />
        <p className="text-[10.37px] leading-[16.3px] text-black/60 tracking-normal text-center">
          Xend Wallet version 1.0
        </p>
      </div>
      <PopupFooter />
    </>
  )
}

export default PopupHomePage
