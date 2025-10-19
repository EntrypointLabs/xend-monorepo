import { useEffect, useState } from "react"

import "./style.css"

import Loading from "~components/loading"

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="bg-white text-black p-4 w-[400px] h-[600px] text-center">
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
