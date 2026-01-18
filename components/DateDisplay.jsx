'use client'

import { useState, useEffect } from "react"

// Hijri date calculation (simplified approximation)
const getHijriDate = gregorianDate => {
  const gregorianDays = Math.floor(
    gregorianDate.getTime() / (1000 * 60 * 60 * 24)
  )
  const hijriEpoch = Math.floor(
    new Date(622, 6, 16).getTime() / (1000 * 60 * 60 * 24)
  )
  const daysSinceHijri = gregorianDays - hijriEpoch

  const hijriYear = Math.floor((30 * daysSinceHijri + 10646) / 10631)
  const monthDays =
    daysSinceHijri - Math.floor((10631 * hijriYear - 10617) / 30)
  const hijriMonth = Math.min(12, Math.ceil((monthDays + 0.5) / 29.5))
  const hijriDay = Math.max(
    1,
    monthDays - Math.floor(29.5 * hijriMonth - 29.5) + 1
  )

  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhul Qi'dah",
    "Dhul Hijjah"
  ]

  const monthIndex = Math.max(0, Math.min(11, hijriMonth - 1))
  return `${hijriDay} ${hijriMonths[monthIndex]} ${hijriYear} H`
}

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const gregorianDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const hijriDate = getHijriDate(currentDate)

  return (
    <div className="text-center space-y-1">
      <div className="text-lg md:text-xl text-gold font-amiri tracking-wide">
        {hijriDate}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-inter">
        {gregorianDate}
      </div>
    </div>
  )
}

export default DateDisplay