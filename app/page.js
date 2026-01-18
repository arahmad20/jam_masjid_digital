import MosqueHeader from "@/components/MosqueHeader";
import PrayerTimesGrid from "@/components/PrayerTimesGrid";
import RunningText from "@/components/RunningText";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  const mosqueName = "Masjid Energi Kebaikan";
  
  const announcements = [
    "Welcome to Masjid Energi Kebaikan — May peace and blessings be upon you",
    "Friday Khutbah starts at 1:00 PM",
    "Islamic classes every Saturday after Maghrib",
    "\"The best among you are those who learn the Quran and teach it.\" — Prophet Muhammad ﷺ",
    "Ramadan preparation workshop next Sunday",
    "Donate to support our mosque expansion project",
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Video Background */}
      <VideoBackground youtubeVideoId="HLRLOxRBnuU" />
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Section - Header with Clock & Date (30%) */}
        <div className="flex-shrink-0 h-[40%] flex items-center justify-center">
          <MosqueHeader mosqueName={mosqueName} />
        </div>
        
        {/* Middle Section - Video Area spacer (35%) */}
        <div className="flex-grow" />
        
        {/* Bottom Section - Prayer Times (30%) + Running Text (5%) */}
        <div className="flex-shrink-0">
          {/* Section Title */}
          <div className="text-center mb-4">
            <h2 className="text-lg md:text-xl font-playfair text-gold tracking-widest uppercase">
              Prayer Times
            </h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="w-12 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
              <div className="w-12 h-px bg-gold/40" />
            </div>
          </div>
          
          {/* Prayer Times Grid */}
          <div className="pb-6">
            <PrayerTimesGrid />
          </div>
          
          {/* Running Text */}
          <RunningText messages={announcements} />
        </div>
      </div>
      
      {/* Decorative Corner Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-gold/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-gold/30 rounded-tr-lg" />
      <div className="absolute bottom-16 left-4 w-16 h-16 border-l-2 border-b-2 border-gold/30 rounded-bl-lg" />
      <div className="absolute bottom-16 right-4 w-16 h-16 border-r-2 border-b-2 border-gold/30 rounded-br-lg" />
    </div> 
  );
}
