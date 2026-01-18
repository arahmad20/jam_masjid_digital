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
      hour12: true
    })
  }

  return (
    <div className="text-center">
      <div className="text-6xl md:text-7xl lg:text-8xl font-inter font-light tracking-wider text-foreground">
        {formatTime(time)}
      </div>
    </div>
  )
}

export default DigitalClock
