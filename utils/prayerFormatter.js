export function formatPrayerTimes(apiData) {
    // Definisi urutan dan pemetaan nama (Key API -> Nama Tampilan -> Arab)
    const prayerConfig = [
        { key: "Fajr",    name: "Subuh",    arabicName: "الفجر" },   
        { key: "Sunrise", name: "Syuruq",   arabicName: "الشروق" },
        { key: "Dhuhr",   name: "Dzuhur",   arabicName: "الظهر" },   
        { key: "Asr",     name: "Ashar",    arabicName: "العصر" },   
        { key: "Maghrib", name: "Maghrib",  arabicName: "المغرب" },
        { key: "Isha",    name: "Isya",     arabicName: "العشاء" },  
    ];
  
    // Mapping data
    return prayerConfig.map((prayer) => {
        // Ambil waktu mentah dari API berdasarkan key (misal: apiData["Fajr"])
        const rawTime = apiData[prayer.key]; 
    
        return {
            name: prayer.name,
            arabicName: prayer.arabicName,
            time: formatTime(rawTime) // Menggunakan format 24 jam
        };
    });
}