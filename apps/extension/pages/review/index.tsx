import usdcLarge from "data-base64:~assets/usdc-large.png"
import React from "react"

import { ChevronLeftIcon, RightArrow, UserIcon } from "~assets/icons"
import { useTab } from "~store/tabs"

const ReviewPage = () => {
  const [, setActiveTab] = useTab()
  return (
    <div className="flex flex-col gap-y-14 py-6 px-5 h-full font-sans">
      <div className="flex items-center justify-between">
        <button className="p-1.5" onClick={() => setActiveTab("home")}>
          <ChevronLeftIcon />
        </button>
        <p className="font-medium text-black text-lg leading-[22px]">Review</p>
        <div className="p-1.5 w-8" aria-hidden="true" />
      </div>
      <div className="self-center flex items-center relative">
        <img
          src={usdcLarge}
          alt="Solana icon"
          className="size-10 rounded-full bg-gray-100 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4.5 rounded-full bg-white p-0.5">
          <RightArrow />
        </div>
        <img
          src={usdcLarge}
          alt="Solana icon"
          className="size-10 rounded-full bg-gray-100 object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-start justify-between">
          <p className="text-sm text-black leading-none">To</p>
          <div className="flex flex-col gap-1">
            <p className="text-black text-[12.73px] leading-none text-right">
              @0xGiFTED
            </p>
            <p className="text-black/60 text-[12.73px] leading-none text-right">
              0xt765...B8164f
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <p className="text-sm text-black leading-none">Amount</p>
          <div className="flex flex-col gap-1">
            <p className="text-black text-[12.73px] leading-none text-right">
              666 USDC
            </p>
            <p className="text-black/60 text-[12.73px] leading-none text-right">
              $665.12
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <p className="text-sm text-black leading-none">Network fee</p>
          <div className="flex flex-col gap-1">
            <p className="text-black text-[12.73px] leading-none text-right">
              0.00002 USDC
            </p>
            <p className="text-black/60 text-[12.73px] leading-none text-right">
              $0.00002
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <p className="text-sm text-black leading-none">Total</p>
          <div className="flex flex-col gap-1">
            <p className="text-black text-[12.73px] leading-none text-right">
              666.00002 USDC
            </p>
            <p className="text-black/60 text-[12.73px] leading-none text-right">
              $666.00002
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center gap-x-[30px] mt-auto">
        <button className="rounded-lg bg-[#E9E9E9] p-3 text-black text-base font-medium leading-none w-full">
          Cancel
        </button>
        <button
          onClick={() => setActiveTab("success")}
          className="rounded-lg bg-brand-blue p-3 text-white text-base font-medium leading-none w-full">
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ReviewPage
