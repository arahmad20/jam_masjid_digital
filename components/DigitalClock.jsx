'use client'

import { useState, useEffect } from "react"

const DigitalClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = date => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    })
  }

  return (
    <div className="text-center">
      <div className="text-7xl md:text-9xl lg:text-[12rem] leading-none font-bold tracking-wider text-foreground drop-shadow-2xl">
        {formatTime(time)}
      </div>
    </div>
  )
}

export default DigitalClock
