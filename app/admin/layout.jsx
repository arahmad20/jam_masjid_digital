"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Settings, Clock, Timer, LogOut, LayoutDashboard, MessageSquare } from "lucide-react";

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Running Text",
            href: "/admin/running-text",
            icon: MessageSquare
        },
        {
            name: "Prayer Times",
            href: "/admin/prayer-times",
            icon: Clock
        },
        {
            name: "Intervals & Durations",
            href: "/admin/intervals",
            icon: Timer
        }
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
                <div className="p-6">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Settings className="w-6 h-6" />
                        Admin Panel
                    </h1>
                </div>
                <nav className="px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <span
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>
                <div className="p-6 mt-auto border-t border-slate-100 absolute bottom-0 w-64">
                    <Link href="/login">
                        <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
