"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Plus } from "lucide-react";
import RunningText from "@/components/RunningText";

const DEFAULT_ANNOUNCEMENTS = [
    "Welcome to Masjid Energi Kebaikan — May peace and blessings be upon you",
    "Friday Khutbah starts at 1:00 PM",
    "Islamic classes every Saturday after Maghrib",
    "\"The best among you are those who learn the Quran and teach it.\" — Prophet Muhammad ﷺ",
    "Ramadan preparation workshop next Sunday",
    "Donate to support our mosque expansion project",
];

export default function AdminRunningText() {
    const [announcements, setAnnouncements] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("mosque_announcements");
        if (saved) {
            setAnnouncements(JSON.parse(saved));
        } else {
            setAnnouncements(DEFAULT_ANNOUNCEMENTS);
        }
    }, []);

    const saveAnnouncements = (newAnnouncements) => {
        setAnnouncements(newAnnouncements);
        localStorage.setItem("mosque_announcements", JSON.stringify(newAnnouncements));
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
    };

    const addAnnouncement = () => {
        if (newMessage.trim()) {
            const newAnnouncements = [...announcements, newMessage.trim()];
            saveAnnouncements(newAnnouncements);
            setNewMessage("");
        }
    };

    const removeAnnouncement = (index) => {
        const newAnnouncements = announcements.filter((_, i) => i !== index);
        saveAnnouncements(newAnnouncements);
    };

    const updateAnnouncement = (index, value) => {
        const newAnnouncements = [...announcements];
        newAnnouncements[index] = value;
        setAnnouncements(newAnnouncements); // Just update state, save on blur or separate save button? 
        // For simplicity, let's just update state and have a "Save All" or auto-save.
        // Given the previous function `saveAnnouncements` does both, let's use a explicit save for edits or auto-save?
        // Let's go with auto-save for add/remove, but for editing existing, maybe on blur?
        // Actually, let's simplify: Edit in place, and have a "Save Changes" button?
        // Or just save immediately on change? Saving immediately on every keystroke might be too much I/O to localStorage?
        // Let's just update state on change, and save on blur.
    };

    const handleBlur = () => {
        localStorage.setItem("mosque_announcements", JSON.stringify(announcements));
        setMessage("Changes saved.");
        setTimeout(() => setMessage(""), 2000);
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Running Text Settings</h1>
                <p className="text-muted-foreground">Manage the announcements displayed on the digital clock.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>This is how the running text will appear.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 overflow-hidden relative min-h-[60px] bg-black">
                        {announcements.length > 0 && <RunningText messages={announcements} />}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Announcements List</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {message && (
                            <Alert className="bg-green-50 text-green-800 border-green-200">
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex gap-2">
                            <Input
                                placeholder="Type new announcement..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addAnnouncement()}
                            />
                            <Button onClick={addAnnouncement}>
                                <Plus className="w-4 h-4 mr-2" /> Add
                            </Button>
                        </div>

                        <div className="space-y-2 mt-4">
                            {announcements.map((text, index) => (
                                <div key={index} className="flex gap-2 items-center group">
                                    <Input
                                        value={text}
                                        onChange={(e) => updateAnnouncement(index, e.target.value)}
                                        onBlur={handleBlur}
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeAnnouncement(index)}
                                        aria-label="Remove announcement"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            {announcements.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">No announcements yet.</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button onClick={() => {
                            localStorage.setItem("mosque_announcements", JSON.stringify(announcements));
                            setMessage("All changes saved!");
                            setTimeout(() => setMessage(""), 3000);
                        }}>
                            Force Save
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
