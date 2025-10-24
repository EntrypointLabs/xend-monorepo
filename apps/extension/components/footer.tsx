import React, { useState } from "react"

import { ClockIcon, HomeIcon, ProfileIcon } from "~assets/icons"
import { useTab } from "~store/tabs"

const PopupFooter = () => {
  const [activeTab, setActiveTab] = useTab()
  return (
    <div className="bg-[#E7F2FF] py-5 w-full flex items-center justify-between px-10 fixed bottom-0 inset-x-0">
      <button onClick={() => setActiveTab("home")}>
        <HomeIcon
          fill={activeTab === "home" && "#115EBF"}
          className="transition-colors duration-300 ease-in-out"
        />
      </button>
      <button onClick={() => setActiveTab("history")}>
        <ClockIcon
          fill={activeTab === "history" && "#115EBF"}
          className="transition-colors duration-300 ease-in-out"
        />
      </button>
      <button onClick={() => setActiveTab("profile")}>
        <ProfileIcon
          fill={activeTab === "profile" && "#115EBF"}
          className="transition-colors duration-300 ease-in-out"
        />
      </button>
    </div>
  )
}

export default PopupFooter
