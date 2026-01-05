import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import Link from "next/link";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
      <div className="flex max-w-7xl w-full mx-auto h-20 items-center justify-between border-b px-4 py-0">
        <Link href="/">
          <h2 className="font-medium text-[1.3rem] bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent dark:from-foreground dark:to-foreground/40">
            QuickForm
          </h2>
        </Link>
        <ThemeSwitcher />
      </div>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
