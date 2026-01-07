import usdcLarge from "data-base64:~assets/usdc-large.png"
import React from "react"

import { ChevronLeftIcon, UserIcon } from "~assets/icons"
import { useTab } from "~store/tabs"

const SuccessPage = () => {
  const [, setActiveTab] = useTab()
  return (
    <div className="flex flex-col items-center justify-center py-6 px-5 h-full font-sans">
      <div className="flex flex-col items-center justify-center gap-y-4 text-center h-full">
        <img
          src={usdcLarge}
          alt="Solana icon"
          className="size-20 rounded-full bg-gray-100 object-cover"
        />
        <p className="font-medium text-black text-base leading-[22px]">
          Successfully sent
        </p>
        <p className="font-bold text-brand-blue text-2xl leading-[22px]">
          $500
        </p>
      </div>

      {/* Footer */}
      <div className="flex w-full mt-auto">
        <button
          onClick={() => setActiveTab("home")}
          className="rounded-lg w-full bg-brand-blue p-3 text-white text-base font-medium leading-none">
          Confirm
        </button>
      </div>
    </div>
  )
}

export default SuccessPage
