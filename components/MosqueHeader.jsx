'use client'

import DigitalClock from "./DigitalClock"
import DateDisplay from "./DateDisplay"

const MosqueHeader = ({ mosqueName }) => {
  return (
    <header className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4 px-8">
      {/* Mosque Name */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-medium text-foreground tracking-wide mb-4">
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