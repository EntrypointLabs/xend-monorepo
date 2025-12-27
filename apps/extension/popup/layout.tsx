import React from "react"

import Providers from "~providers"

export default function PopupLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="bg-white text-black w-[400px] max-w-[400px] mx-auto h-[600px] text-center scrollbar-hide overflow-y-auto overflow-x-hidden pb-24 xend-popup-layout">
        {children}
      </div>
    </Providers>
  )
}
