'use client'

import DigitalClock from "./DigitalClock"
import DateDisplay from "./DateDisplay"
import Logo from "@/assets/icon_ek.png"

const MosqueHeader = ({ mosqueName }) => {
  return (
    <header className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4 px-8">
      {/* Mosque Name */}
      <img src={Logo.src} alt="Logo" className="w-28 h-28 mt-2" />
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-playfair font-medium text-foreground tracking-wide mb-2 opacity-90">
        {mosqueName}
      </h1>

      {/* Decorative Line */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/60 to-gold" />
        <div className="w-2 h-2 rotate-45 bg-gold/80" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent via-gold/60 to-gold" />
      </div>

      {/* Digital Clock */}
      <DigitalClock />

      {/* Date Display */}
      <div className="mt-4">
        <DateDisplay />
      </div>
    </header>
  )
}

export default MosqueHeader