"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function IntervalSettings() {
    const [adzanDuration, setAdzanDuration] = useState("");
    const [iqomahDuration, setIqomahDuration] = useState("");
    const [sholatDuration, setSholatDuration] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const savedAdzan = localStorage.getItem("duration_adzan");
        const savedIqomah = localStorage.getItem("duration_iqomah");
        const savedSholat = localStorage.getItem("duration_sholat");

        setAdzanDuration(savedAdzan ? (parseInt(savedAdzan) / 60).toString() : "2"); // Stored in seconds, display in minutes
        setIqomahDuration(savedIqomah ? (parseInt(savedIqomah) / 60).toString() : "5");
        setSholatDuration(savedSholat ? (parseInt(savedSholat) / 60).toString() : "10");
    }, []);

    const handleSave = () => {
        // Save in seconds
        localStorage.setItem("duration_adzan", (parseFloat(adzanDuration) * 60).toString());
        localStorage.setItem("duration_iqomah", (parseFloat(iqomahDuration) * 60).toString());
        localStorage.setItem("duration_sholat", (parseFloat(sholatDuration) * 60).toString());

        setMessage("Interval settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="container mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Intervals & Durations</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Display Durations</CardTitle>
                    <CardDescription>
                        Set how long each phase should last (in minutes).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {message && (
                        <Alert className="bg-green-50 text-green-800 border-green-200">
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="adzan">Adzan Duration (Minutes)</Label>
                        <Input
                            id="adzan"
                            type="number"
                            min="1"
                            value={adzanDuration}
                            onChange={(e) => setAdzanDuration(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">How long "Waktu Adzan" is displayed.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="iqomah">Iqomah Countdown (Minutes)</Label>
                        <Input
                            id="iqomah"
                            type="number"
                            min="1"
                            value={iqomahDuration}
                            onChange={(e) => setIqomahDuration(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">Countdown time before prayer starts.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="sholat">Sholat Duration (Minutes)</Label>
                        <Input
                            id="sholat"
                            type="number"
                            min="1"
                            value={sholatDuration}
                            onChange={(e) => setSholatDuration(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">How long "Luruskan Shaf" is displayed (Silent Mode).</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave}>Save Settings</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
