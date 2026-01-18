'use client'

const RunningText = ({ messages }) => {
    const fullText = messages.join("   •   ")
  
    return (
      <div className="w-full overflow-hidden bg-secondary/80 backdrop-blur-sm border-t border-border/30">
        <div className="py-3 whitespace-nowrap animate-marquee">
          <span className="text-base md:text-lg font-inter text-foreground/90 tracking-wide">
            {fullText} • {fullText}
          </span>
        </div>
      </div>
    )
  }
  
  export default RunningText
  