"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PrayerTimesSettings() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [calcMethod, setCalcMethod] = useState("auto"); // 'auto' or 'manual'
    const [manualTimes, setManualTimes] = useState({
        subuh: "04:30",
        syuruq: "05:45",
        dzuhur: "12:00",
        ashar: "15:15",
        maghrib: "18:00",
        isya: "19:15"
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const savedLat = localStorage.getItem("mosque_latitude");
        const savedLong = localStorage.getItem("mosque_longitude");
        const savedMethod = localStorage.getItem("calculation_method"); // 'auto' or 'manual'
        const savedTimes = localStorage.getItem("manual_prayer_times");

        if (savedLat) setLatitude(savedLat);
        else setLatitude("-7.6732302");

        if (savedLong) setLongitude(savedLong);
        else setLongitude("109.0458187");

        if (savedMethod) setCalcMethod(savedMethod);

        if (savedTimes) {
            setManualTimes(JSON.parse(savedTimes));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("mosque_latitude", latitude);
        localStorage.setItem("mosque_longitude", longitude);
        localStorage.setItem("calculation_method", calcMethod);
        localStorage.setItem("manual_prayer_times", JSON.stringify(manualTimes));

        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="container mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Prayer Times Settings</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Mosque Location</CardTitle>
                    <CardDescription>
                        Set the coordinates to calculate accurate prayer times.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {message && (
                        <Alert className="bg-green-50 text-green-800 border-green-200">
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-4 mb-4">
                        <Button
                            variant={calcMethod === 'auto' ? "default" : "outline"}
                            onClick={() => setCalcMethod('auto')}
                            className="w-1/2"
                        >
                            Automatic (Lat/Long)
                        </Button>
                        <Button
                            variant={calcMethod === 'manual' ? "default" : "outline"}
                            onClick={() => setCalcMethod('manual')}
                            className="w-1/2"
                        >
                            Manual (Offline)
                        </Button>
                    </div>

                    {calcMethod === 'auto' ? (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="latitude">Latitude</Label>
                                <Input
                                    id="latitude"
                                    type="text"
                                    placeholder="-6.200000"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">Ex: Jakarta is approx -6.2088</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="longitude">Longitude</Label>
                                <Input
                                    id="longitude"
                                    type="text"
                                    placeholder="106.8456"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">Ex: Jakarta is approx 106.8456</p>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(manualTimes).map(([key, value]) => (
                                <div key={key} className="grid gap-2">
                                    <Label htmlFor={key} className="capitalize">{key}</Label>
                                    <Input
                                        id={key}
                                        type="time"
                                        value={value}
                                        onChange={(e) => setManualTimes({ ...manualTimes, [key]: e.target.value })}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave}>Save Settings</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
