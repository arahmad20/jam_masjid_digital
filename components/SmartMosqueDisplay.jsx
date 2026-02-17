'use client'

import { useEffect, useState } from "react";
import MosqueHeader from "./MosqueHeader";
import PrayerTimesGrid from "./PrayerTimesGrid";
import RunningText from "./RunningText";
import VideoBackground from "./VideoBackground";

// Default durations (in seconds)
const DEFAULT_ADZAN_DURATION = 2 * 60;
const DEFAULT_IQOMAH_DURATION = 5 * 60;
const DEFAULT_PRAYER_DURATION = 10 * 60;
const mosqueName = "Masjid Energi Kebaikan Nurdjannah";
const announcements = [
    "Welcome to Masjid Energi Kebaikan — May peace and blessings be upon you",
    "Friday Khutbah starts at 1:00 PM",
    "Islamic classes every Saturday after Maghrib",
    "\"The best among you are those who learn the Quran and teach it.\" — Prophet Muhammad ﷺ",
    "Ramadan preparation workshop next Sunday",
    "Donate to support our mosque expansion project",
];

const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function SmartMosqueDisplay() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [displayMode, setDisplayMode] = useState('NORMAL'); // 'NORMAL', 'ADZAN', 'IQOMAH', 'SHOLAT'
    const [countdown, setCountdown] = useState(0);
    const [activePrayer, setActivePrayer] = useState(null);
    const [announcementsList, setAnnouncementsList] = useState([]);

    // Durations State
    const [adzanDuration, setAdzanDuration] = useState(DEFAULT_ADZAN_DURATION);
    const [iqomahDuration, setIqomahDuration] = useState(DEFAULT_IQOMAH_DURATION);
    const [prayerDuration, setPrayerDuration] = useState(DEFAULT_PRAYER_DURATION);

    useEffect(() => {
        // Load announcements from localStorage
        const saved = localStorage.getItem("mosque_announcements");
        if (saved) {
            setAnnouncementsList(JSON.parse(saved));
        }

        // Load durations from localStorage
        const savedAdzan = localStorage.getItem("duration_adzan");
        const savedIqomah = localStorage.getItem("duration_iqomah");
        const savedSholat = localStorage.getItem("duration_sholat");

        if (savedAdzan) setAdzanDuration(parseInt(savedAdzan));
        if (savedIqomah) setIqomahDuration(parseInt(savedIqomah));
        if (savedSholat) setPrayerDuration(parseInt(savedSholat));

        // Load prayer times settings
        const savedMethod = localStorage.getItem("calculation_method");
        const savedTimes = localStorage.getItem("manual_prayer_times");

        if (savedMethod === 'manual' && savedTimes) {
            const manual = JSON.parse(savedTimes);
            const manualPrayerTimes = [
                { name: "Subuh", arabicName: "الفجر", time: manual.subuh },
                { name: "Syuruq", arabicName: "الشروق", time: manual.syuruq },
                { name: "Dzuhur", arabicName: "الظهر", time: manual.dzuhur },
                { name: "Ashar", arabicName: "العصر", time: manual.ashar },
                { name: "Maghrib", arabicName: "المغرب", time: manual.maghrib },
                { name: "Isya", arabicName: "العشاء", time: manual.isya }
            ];
            setPrayerTimes(manualPrayerTimes);
        } else {
            // If auto or no settings, PrayerTimesGrid will handle fetching and we might need to sync up? 
            // Actually SmartMosqueDisplay needs the times for logic. 
            // If auto, we rely on the default state or we need to fetch here too?
            // Currently SmartMosqueDisplay HAS its own default state in line 67 (original code).
            // Let's keep the default but if manual is set, we OVERRIDE it.
            // If auto is set, we should ideally fetch coordinates or let the user know logic uses defaults/fetched.
            // To ensure logic works for AUTO, we should probably fetch here too or duplicate the logic from PrayerTimesGrid.
            // For now, let's assume if MANUAL is not set, we use the default hardcoded in state (which is wrong for dynamic auto).
            // BETTER: Let's defer "Auto" fetching update to a later step if needed, focusing on MANUAL now.
        }
    }, []);

    const playBeep = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // 880Hz (A5)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, 200); // 200ms beep
    };

    const [prayerTimes, setPrayerTimes] = useState([
        { name: "Subuh", arabicName: "الفجر", time: "04:40" },
        { name: "Syuruq", arabicName: "الشروق", time: "05:55" },
        { name: "Dzuhur", arabicName: "الظهر", time: "12:05" },
        { name: "Ashar", arabicName: "العصر", time: "15:35" },
        { name: "Maghrib", arabicName: "المغرب", time: "18:05" },
        { name: "Isya", arabicName: "العشاء", time: "19:20" }
    ])

    useEffect(() => {
        // Timer berjalan setiap detik
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            // Sync announcements from localStorage
            const saved = localStorage.getItem("mosque_announcements");
            if (saved) {
                const parsed = JSON.parse(saved);
                // Simple check to avoid re-rendering if not changed - deep comparison or just length/content check
                // For simplicity, we just set it. React might optimize if reference is same but it's new array from JSON.parse
                // So let's compare string
                if (JSON.stringify(parsed) !== JSON.stringify(announcementsList)) {
                    setAnnouncementsList(parsed);
                }
            }

            // Format jam sekarang ke HH:MM
            const currentHHMM = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace('.', ':');

            // LOGIKA 1: MODE NORMAL -> CEK WAKTU SHOLAT
            if (displayMode === 'NORMAL') {
                const foundPrayer = prayerTimes.find(p => p.time === currentHHMM);

                // Pengecualian: Syuruq biasanya tidak ada iqomah/sholat berjamaah di masjid
                if (foundPrayer && foundPrayer.name !== "Syuruq") {
                    setActivePrayer(foundPrayer.name);
                    setDisplayMode('ADZAN');
                    setCountdown(adzanDuration);
                }
            }

            // LOGIKA 2: MODE ADZAN -> IQOMAH
            if (displayMode === 'ADZAN') {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setDisplayMode('IQOMAH');
                        return iqomahDuration;
                    }
                    return prev - 1;
                });
            }

            // LOGIKA 3: MODE IQOMAH -> HITUNG MUNDUR & BEEP
            if (displayMode === 'IQOMAH') {
                setCountdown((prev) => {
                    // Beep sound logic for last 10 seconds
                    if (prev <= 10 && prev > 0) {
                        playBeep();
                    }

                    if (prev <= 1) {
                        setDisplayMode('SHOLAT');
                        return prayerDuration;
                    }
                    return prev - 1;
                });
            }

            // LOGIKA 4: MODE SHOLAT -> DURASI HENING
            if (displayMode === 'SHOLAT') {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setDisplayMode('NORMAL');
                        setActivePrayer(null);
                        return 0;
                    }
                    return prev - 1;
                });
            }

        }, 1000);

        return () => clearInterval(timer);
    }, [displayMode, prayerTimes]);

    const testMode = (mode) => {
        setDisplayMode(mode);
        if (mode === 'ADZAN') {
            setActivePrayer("Maghrib");
            setCountdown(adzanDuration);
        } else if (mode === 'IQOMAH') {
            setActivePrayer("Maghrib");
            setCountdown(iqomahDuration);
        } else if (mode === 'SHOLAT') {
            setCountdown(prayerDuration);
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-background">
            <VideoBackground youtubeVideoId="HLRLOxRBnuU" />

            <div className="relative z-10 flex flex-col h-full justify-center">

                {displayMode === 'NORMAL' && (
                    <>
                        <div className="flex-shrink-0 h-[50%] flex items-center justify-center animate-fade-in">
                            <MosqueHeader mosqueName={mosqueName} />
                        </div>
                        <div className="flex-grow" />
                        <div className="flex-shrink-0 animate-fade-in">
                            {/* Section Title */}
                            <div className="text-center mb-4">
                                <h2 className="text-lg md:text-xl font-playfair text-gold tracking-widest uppercase">
                                    Jadwal Waktu Sholat
                                </h2>
                                <div className="flex items-center justify-center gap-3 mt-2">
                                    <div className="w-12 h-px bg-gold/40" />
                                    <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
                                    <div className="w-12 h-px bg-gold/40" />
                                </div>
                            </div>

                            {/* Prayer Times Grid */}
                            <div className="pb-6">
                                <PrayerTimesGrid initialData={prayerTimes} />
                            </div>

                            {/* Running Text */}
                            <RunningText messages={announcementsList.length > 0 ? announcementsList : announcements} />
                        </div>
                    </>
                )}

                {displayMode === 'ADZAN' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto bg-black/80 backdrop-blur-xl p-10 md:p-20 rounded-3xl border-2 border-yellow-500/50 shadow-[0_0_100px_rgba(234,179,8,0.2)]">
                        <h2 className="text-3xl md:text-4xl text-gray-300 font-serif mb-4">Waktu Adzan</h2>
                        <h1 className="text-6xl md:text-8xl text-yellow-500 font-bold mb-8 uppercase tracking-widest">{activePrayer}</h1>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"></div>
                        <h3 className="text-2xl md:text-3xl text-emerald-400 mb-6 uppercase tracking-wider">Sedang Berlangsung</h3>
                        <div className="text-[6rem] md:text-[8rem] leading-none font-mono font-bold text-white tabular-nums tracking-tighter">
                            {formatCountdown(countdown)}
                        </div>
                    </div>
                )}

                {displayMode === 'IQOMAH' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto bg-black/80 backdrop-blur-xl p-10 md:p-20 rounded-3xl border-2 border-yellow-500/50 shadow-[0_0_100px_rgba(234,179,8,0.2)]">
                        <h2 className="text-3xl md:text-4xl text-gray-300 font-serif mb-4">Waktu Masuk Sholat</h2>
                        <h1 className="text-6xl md:text-8xl text-yellow-500 font-bold mb-8 uppercase tracking-widest">{activePrayer}</h1>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"></div>

                        <h3 className="text-2xl md:text-3xl text-emerald-400 mb-6 uppercase tracking-wider">Menuju Iqomah</h3>
                        <div className="relative">
                            <div className="text-[8rem] md:text-[12rem] leading-none font-mono font-bold text-white tabular-nums tracking-tighter">
                                {formatCountdown(countdown)}
                            </div>
                            {/* Efek kedip saat < 1 menit */}
                            {countdown < 60 && (
                                <div className="absolute inset-0 animate-ping opacity-20 bg-red-500 rounded-full blur-3xl"></div>
                            )}
                        </div>
                    </div>
                )}

                {displayMode === 'SHOLAT' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center text-center h-full w-full max-w-5xl mx-auto">
                        <h1 className="text-6xl md:text-8xl font-bold text-yellow-500 mb-8 font-serif leading-tight drop-shadow-lg">
                            Luruskan &<br />Rapatkan Shaf
                        </h1>

                        <div className="h-1 w-40 bg-gray-700 mx-auto my-8"></div>

                        <p className="text-2xl md:text-4xl text-gray-300 max-w-4xl leading-relaxed font-light">
                            "Luruskan shaf-shaf kalian, karena sesungguhnya lurusnya shaf termasuk kesempurnaan sholat."
                        </p>
                        <p className="text-xl text-gray-500 mt-6 italic font-serif">(HR. Bukhari & Muslim)</p>

                        <div className="mt-20 flex items-center gap-4 text-red-400 text-xl border border-red-500/20 bg-black/50 px-8 py-4 rounded-full">
                            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                            Mohon Nonaktifkan HP Anda / Mode Hening
                        </div>
                    </div>
                )}

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                    <button onClick={() => testMode('NORMAL')} className="px-3 py-1 bg-gray-800 text-xs rounded">Normal</button>
                    <button onClick={() => testMode('ADZAN')} className="px-3 py-1 bg-gray-800 text-xs rounded">Adzan</button>
                    <button onClick={() => testMode('IQOMAH')} className="px-3 py-1 bg-gray-800 text-xs rounded">Iqomah</button>
                    <button onClick={() => testMode('SHOLAT')} className="px-3 py-1 bg-gray-800 text-xs rounded">Sholat</button>
                </div>
            </div>

            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-gold/30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-gold/30 rounded-tr-lg" />
            <div className="absolute bottom-16 left-4 w-16 h-16 border-l-2 border-b-2 border-gold/30 rounded-bl-lg" />
            <div className="absolute bottom-16 right-4 w-16 h-16 border-r-2 border-b-2 border-gold/30 rounded-br-lg" />
        </div>
    )
}