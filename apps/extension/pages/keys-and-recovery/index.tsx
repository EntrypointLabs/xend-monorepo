import xendIcon from "data-base64:~assets/xend-icon.png"

import { ChevronLeftIcon, InfoIcon } from "~assets/icons"
import PopupFooter from "~components/footer"
import { useTab } from "~store/tabs"

const KeysAndRecovery = () => {
  const [, setActiveTab] = useTab()
  return (
    <div className="flex flex-col py-6 px-5 h-full">
      <div className="flex items-center justify-between mb-8">
        <button className="p-1.5" onClick={() => setActiveTab("home")}>
          <ChevronLeftIcon />
        </button>
        <p className="font-medium text-black text-lg leading-[22px]">Deposit</p>
        <div className="p-1.5 w-8" aria-hidden="true" />
      </div>
      <div className="flex flex-col">
        <p className="text-base text-black/60 leading-[22px] mb-8 text-left">
          Back up your Secret Recovery Phrase so you never lose access to your
          wallet. Be sure to store it in a safe place that only you can access
          and won’t forget.
        </p>
        <div className="bg-[#B8B8B8]/10 border-[#B8B8B8] border-l-4 rounded px-4 py-[11px] flex items-center gap-x-2 mb-6">
          <InfoIcon />
          <span className="text-black/60 text-base font-medium leading-[100%] text-left">
            Secret Recovery phrase not backed up
          </span>
        </div>
        <button className="cursor-pointer bg-[#115EBF] text-white rounded-lg p-3 w-full text-base font-medium leading-[100%]">
          Back up secret recovery phrase
        </button>
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
      <PopupFooter />
    </div>
  )
}

export default KeysAndRecovery
