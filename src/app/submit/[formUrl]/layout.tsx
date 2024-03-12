import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import Link from "next/link";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
            <div className="flex items-center justify-between border-b px-9 py-4">
                <Link href="/">
                    <h2 className="font-bold text-2xl">QuickForm</h2>
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />
                </div>
            </div>
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    );
}

export default Layout;