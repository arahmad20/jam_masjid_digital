'use client'

import { useState, useEffect } from "react"
import PrayerTimeCard from "./PrayerTimeCard"

const fetchPrayerTimes = async (latitude, longitude) => {
  try {
    // Gunakan API Aladhan untuk production
    // Method 2 = Islamic Society of North America (bisa diganti sesuai kebutuhan, misal Kemenag gunakan method tertentu atau custom params)
    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return formatPrayerTimes(data.data.timings);

  } catch (error) {
    console.log("Offline mode or API error, using demo data");
    // Data demo saat offline (disesuaikan dengan lokasi Anda)
    // Nama disesuaikan dengan format bahasa Indonesia (Subuh, dll) agar konsisten dengan tampilan online
    return [
      { name: "Subuh", arabicName: "الفجر", time: "05:30" },
      { name: "Syuruq", arabicName: "الشروق", time: "06:45" },
      { name: "Dzuhur", arabicName: "الظهر", time: "12:15" },
      { name: "Ashar", arabicName: "العصر", time: "15:45" },
      { name: "Maghrib", arabicName: "المغرب", time: "18:15" },
      { name: "Isya", arabicName: "العشاء", time: "19:45" }
    ];
  }
};

const parseTimeToMinutes = timeStr => {
  const [time, period] = timeStr.split(" ")
  const [hours, minutes] = time.split(":").map(Number)
  let totalMinutes = hours * 60 + minutes
  if (period === "PM" && hours !== 12) totalMinutes += 12 * 60
  if (period === "AM" && hours === 12) totalMinutes -= 12 * 60
  return totalMinutes
}

const PrayerTimesGrid = () => {
  const [prayerTimes, setPrayerTimes] = useState([])
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0)

  useEffect(() => {
    // Default coordinates (Makkah) - replace with your mosque's coordinates
    const latitude = -7.6731086
    const longitude = 109.0459973

    fetchPrayerTimes(latitude, longitude).then(setPrayerTimes)
  }, [])

  useEffect(() => {
    const updateNextPrayer = () => {
      const now = new Date()
      const currentMinutes = now.getHours() * 60 + now.getMinutes()

      // Find the next prayer (skip Syuruq for "next prayer" as it's not a prayer time)
      const prayerIndices = [0, 2, 3, 4, 5] // Fajr, Dhuhr, Asr, Maghrib, Isha

      let nextIndex = 0
      for (const idx of prayerIndices) {
        if (prayerTimes[idx]) {
          const prayerMinutes = parseTimeToMinutes(prayerTimes[idx].time)
          if (currentMinutes < prayerMinutes) {
            nextIndex = idx
            break
          }
        }
      }

      setNextPrayerIndex(nextIndex)
    }

    if (prayerTimes.length > 0) {
      updateNextPrayer()
      const interval = setInterval(updateNextPrayer, 60000)
      return () => clearInterval(interval)
    }
  }, [prayerTimes])

  if (prayerTimes.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Loading prayer times...
      </div>
    )
  }

  return (
    <div className="grid grid-cols-6 gap-3 md:gap-4 lg:gap-6 px-6 md:px-8 lg:px-12">
      {prayerTimes.map((prayer, index) => (
        <PrayerTimeCard
          key={prayer.name}
          name={prayer.name}
          arabicName={prayer.arabicName}
          time={prayer.time}
          isNext={index === nextPrayerIndex}
        />
      ))}
    </div>
  )
}

export default PrayerTimesGrid