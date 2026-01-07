import keyIcon from "data-base64:~assets/key-icon.png"
import notification from "data-base64:~assets/notification-bing.png"
import socials from "data-base64:~assets/receipt-text.png"
import deleteIcon from "data-base64:~assets/trash.png"
import support from "data-base64:~assets/wallet-icon.png"
import xendIcon from "data-base64:~assets/xend-icon.png"
import React from "react"

import PopupFooter from "~components/footer"
import { useTab } from "~store/tabs"

const ProfilePage = () => {
  const [, setActiveTab] = useTab()
  return (
    <div className="flex flex-col py-6 px-5 h-full">
      <div className="flex justify-center mb-8">
        <p className="font-medium text-lg text-black leading-[22px]">
          Settings
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <button
          onClick={() => setActiveTab("keys-and-recovery")}
          className="flex items-center gap-x-3 cursor-pointer">
          <img
            src={keyIcon}
            alt="Keys & Recovery"
            className="size-5 object-contain"
          />
          <span className="text-base leading-[22px] text-black text-left">
            Keys & Recovery
          </span>
        </button>
        <button className="flex items-center gap-x-3 cursor-pointer">
          <img
            src={notification}
            alt="Notifications"
            className="size-5 object-contain"
          />
          <span className="text-base leading-[22px] text-black text-left">
            Notifications
          </span>
        </button>
        <button className="flex items-center gap-x-3 cursor-pointer">
          <img
            src={support}
            alt="Contact Support"
            className="size-5 object-contain"
          />
          <span className="text-base leading-[22px] text-black text-left">
            Contact Support
          </span>
        </button>
        <button className="flex items-center gap-x-3 cursor-pointer">
          <img
            src={socials}
            alt="socials icon"
            className="size-5 object-contain"
          />
          <span className="text-base leading-[22px] text-black text-left">
            Follow @Xendglobal
          </span>
        </button>
        <button className="flex items-center gap-x-3 cursor-pointer">
          <img
            src={deleteIcon}
            alt="trash icon"
            className="size-5 object-contain"
          />
          <span className="text-base leading-[22px] text-black text-left">
            Delete Wallet
          </span>
        </button>
      </div>
      {/* Footer */}
      <div className="flex flex-col items-center justify-center gap-y-1.5 mt-auto">
        <img
          src={xendIcon}
          alt="xend icon"
          className="size-4.5 rounded-full bg-gray-100 object-cover"
        />
        <p className="text-[10.37px] leading-[16.3px] text-black/60 tracking-normal text-center">
          Xend Wallet version 1.0
        </p>
      </div>
      <PopupFooter />
    </div>
  )
}

export default ProfilePage
