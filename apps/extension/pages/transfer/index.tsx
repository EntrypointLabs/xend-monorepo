import usdcLarge from "data-base64:~assets/usdc-large.png"
import React from "react"

import { ChevronLeftIcon, UserIcon } from "~assets/icons"
import { useTab } from "~store/tabs"

const TransferPage = () => {
  const [, setActiveTab] = useTab()
  return (
    <div className="flex flex-col gap-y-[4.5rem] py-6 px-5 h-full">
      <div className="flex items-center justify-between">
        <button className="p-1.5" onClick={() => setActiveTab("home")}>
          <ChevronLeftIcon />
        </button>
        <p className="font-medium text-black text-lg leading-[22px]">
          Transfer
        </p>
        <div className="p-1.5 w-8" aria-hidden="true" />
      </div>
      <img
        src={usdcLarge}
        alt="Solana icon"
        className="size-11 rounded-full bg-gray-100 object-cover self-center"
      />
      <div className="flex flex-col gap-y-3.5">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full border-[0.92px] border-[#000915] rounded-[10px] py-[18px] pl-[60px] pr-5 text-sm font-medium text-black"
          />
          <UserIcon className="absolute top-1/2 -translate-y-1/2 left-5" />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border-[0.92px] border-[#000915] rounded-[10px] py-[18px] pl-5 pr-[4.5rem] text-xl leading-[20.18px] font-black text-black"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#115EBF] font-black text-sm leading-[12.35px]">
              USDC
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/40 text-[9.68px] leading-[17.74px]">
              Balance: 190,000
            </span>
            <button className="text-[#0757BB] font-medium text-[9.68px] leading-[17.74px]">
              Max
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col items-center justify-center gap-y-1.5 mt-auto">
        <button
          onClick={() => setActiveTab("review")}
          className="rounded-[100px] bg-[#115EBF] p-3 text-white text-base font-medium leading-[100%] w-full">
          Transfer
        </button>
      </div>
    </div>
  )
}

export default TransferPage
