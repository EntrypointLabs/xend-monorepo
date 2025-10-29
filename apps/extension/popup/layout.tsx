import React from "react"

import Providers from "~providers"

export default function PopupLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="bg-white text-black w-[400px] max-w-[400px] mx-auto h-[600px] text-center overflow-hidden xend-popup-layout">
        {children}
      </div>
    </Providers>
  )
}
