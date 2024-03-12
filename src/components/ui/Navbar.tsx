"use client"
import Link from "next/link"
import ThemeSwitcher from "./ThemeSwitcher"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { UserButton, useUser } from "@clerk/nextjs"

const Navbar = () => {

    const router = useRouter();
    const { user } = useUser();

    return (
        <>
            <div className="flex items-center justify-between border-b px-9 py-4">
                <Link href="/">
                    <h2 className="font-bold text-2xl">QuickForm</h2>
                </Link>
                <div>
                    <ul className="flex items-center gap-16">
                        <li className="font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white">
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li className="font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white">
                            <Link href="/">Pricing</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />
                    {user ? (
                        <UserButton />
                    ) : (
                        <>
                            <Button onClick={() => router.push("/sign-in")}>Login</Button>
                            <Button variant="secondary" onClick={() => router.push("/sign-up")}>Register</Button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar