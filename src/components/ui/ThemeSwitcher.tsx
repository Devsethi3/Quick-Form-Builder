"use client";

import { Monitor, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;
    return (
        <div className="theme-toggler">
            <Tabs defaultValue={theme} className="flex">
                <TabsList className="border">
                    <TabsTrigger value="light" onClick={() => setTheme("light")}>
                        <SunIcon className="h-[1rem] w-[1rem]" />
                    </TabsTrigger>
                </TabsList>
                <TabsList className="border">
                    <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
                        <MoonIcon className="h-[1rem] w-[1rem] rotate-0 transition-all dark:rotate-0" />
                    </TabsTrigger>
                </TabsList>
                <TabsList className="border">
                    <TabsTrigger value="system" onClick={() => setTheme("system")}>
                        <Monitor className="h-[1rem] w-[1rem]" />
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default ThemeSwitcher