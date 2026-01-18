'use client'

import { useState } from "react"
import mosqueBackground from "@/assets/mosque-background.jpg"

const VideoBackground = ({
  youtubeVideoId = "k2e7hUiF39E",
  useStaticBackground = true
}) => {
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Beautiful mosque background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mosqueBackground.src})`
        }}
      />
      

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/60" />

      {/* YouTube Embed - show if enabled and no static background preference */}
      {!useStaticBackground && !videoError && (
       
        <iframe 
          className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/k2e7hUiF39E?si=p7XIkzGRYXrHvc5k&amp;autoplay=1&controls=0" 
          title="Makkah Live Stream" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen 
          onError={() => setVideoError(true)}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, hsl(160 40% 6% / 0.95), transparent)"
        }}
      />

      {/* Bottom gradient for prayer times section */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50%]"
        style={{
          background:
            "linear-gradient(to top, hsl(160 40% 6% / 0.98), hsl(160 40% 6% / 0.85), transparent)"
        }}
      />
    </div>
  )
}

export default VideoBackground