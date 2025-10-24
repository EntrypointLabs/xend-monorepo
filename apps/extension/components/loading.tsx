import appIcon from "data-base64:~assets/icon.png"
import React from "react"

const Loading = () => {
  return (
    <div className="flex items-center justify-center bg-white text-black p-4 text-center">
      <div className="flex items-center justify-center">
        {/* <div className="w-10 h-10 bg-black rounded-full animate-spin"></div> */}
        <img src={appIcon} alt="loading" className="w-10 h-10" />
        <span className="text-2xl font-bold">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
