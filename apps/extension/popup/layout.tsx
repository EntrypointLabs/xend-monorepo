import React from "react"

export default function PopupLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white text-black p-4 w-[400px] h-[600px] text-center">
      {children}
    </div>
  )
}
