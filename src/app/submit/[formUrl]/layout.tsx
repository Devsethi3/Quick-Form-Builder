import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import Link from "next/link";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
            <div className="flex h-20 items-center justify-between border-b px-4 py-0">
                <Link href="/">
                    <h2 className="font-bold text-[1.3rem]">QuickForm</h2>
                </Link>
                <ThemeSwitcher />   
            </div>
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    );
}

export default Layout;