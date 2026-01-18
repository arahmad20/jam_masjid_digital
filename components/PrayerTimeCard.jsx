'use client'

import { cn } from "@/lib/utils"

const PrayerTimeCard = ({ name, arabicName, time, isNext }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-5 rounded-xl transition-all duration-500",
        "border backdrop-blur-sm",
        isNext
          ? "bg-gold/20 border-gold/50 animate-pulse-glow"
          : "bg-secondary/50 border-border/30 hover:bg-secondary/70"
      )}
    >
      {/* Arabic Name */}
      <span
        className={cn(
          "text-lg md:text-xl font-amiri mb-1",
          isNext ? "text-gold" : "text-muted-foreground"
        )}
      >
        {arabicName}
      </span>

      {/* English Name */}
      <span
        className={cn(
          "text-sm md:text-base font-inter font-medium tracking-wide uppercase mb-2",
          isNext ? "text-gold" : "text-foreground"
        )}
      >
        {name}
      </span>

      {/* Time */}
      <span
        className={cn(
          "text-2xl md:text-3xl font-inter font-semibold",
          isNext ? "text-foreground" : "text-foreground/90"
        )}
      >
        {time}
      </span>

      {/* Next Prayer Indicator */}
      {isNext && (
        <span className="mt-2 text-xs font-inter uppercase tracking-widest text-gold text-center">
          Waktu Sholat Selanjutnya
        </span>
      )}
    </div>
  )
}

export default PrayerTimeCard