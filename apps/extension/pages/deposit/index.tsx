import solanaIcon from "data-base64:~assets/solana-icon.png"
import xIcon from "data-base64:~assets/x-icon.png"
import xendIcon from "data-base64:~assets/xend-icon.png"
import React from "react"

import { ChevronLeftIcon, CopyIcon } from "~assets/icons"
import { useTab } from "~store/tabs"

const DepositPage = () => {
  const [, setActiveTab] = useTab()
  return (
    <div className="flex flex-col gap-y-[2.875rem] py-6 px-5 h-full">
      <div className="flex items-center justify-between">
        <button className="p-1.5" onClick={() => setActiveTab("home")}>
          <ChevronLeftIcon />
        </button>
        <p className="font-medium text-black text-lg leading-[22px]">Deposit</p>
        <div className="p-1.5 w-8" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <img
              src={xIcon}
              alt="X(fka. Twitter) icon"
              className="size-[34px] rounded-[7.12px] bg-gray-100 object-cover"
            />
            <div>
              <p className="font-medium text-black text-base leading-[22px] text-left">
                X( formerly twitter)
              </p>
              <p className="font-medium text-black/60 text-sm leading-[22px] text-left">
                @tomiwa_mooney
              </p>
            </div>
          </div>
          <button className="p-1.5">
            <CopyIcon />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <img
              src={solanaIcon}
              alt="Solana icon"
              className="size-[34px] rounded-[7.12px] bg-gray-100 object-cover"
            />
            <div>
              <p className="font-medium text-black text-base leading-[22px] text-left">
                Solana
              </p>
              <p className="font-medium text-black/60 text-sm leading-[22px] text-left">
                Bkl3c....M5jHb
              </p>
            </div>
          </div>
          <button className="p-1.5">
            <CopyIcon />
          </button>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col items-center justify-center gap-y-1.5 mt-auto">
        <img
          src={xendIcon}
          alt="xend icon"
          className="size-[18px] rounded-full bg-gray-100 object-cover"
        />
        <p className="text-[10.37px] leading-[16.3px] text-black/60 tracking-normal text-center">
          Xend Wallet version 1.0
        </p>
      </div>
    </div>
  )
}

export default DepositPage
