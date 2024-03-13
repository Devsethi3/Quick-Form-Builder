"use client"
import Link from "next/link"
import ThemeSwitcher from "./ThemeSwitcher"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { HiMenu } from "react-icons/hi"

const Navbar = () => {

    const router = useRouter();
    const { user } = useUser();

    return (
        <>
            <header className="border-b">
                <div className="container">
                    <div className="flex h-12 items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">QuickForm</h1>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-12">
                                    <li>
                                        <Link href="/" className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard" className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">Pricing</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <ThemeSwitcher />
                            {user ? (
                                <UserButton />
                            ) : (
                                <>
                                    <Button onClick={() => router.push("/sign-in")}>Login</Button>
                                    <Button variant="secondary" onClick={() => router.push("/sign-up")}>Register</Button>
                                </>
                            )}

                            <div className="block md:hidden">
                                <Button variant="secondary">
                                    <HiMenu className="text-xl" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar

