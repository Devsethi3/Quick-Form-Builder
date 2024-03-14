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
            <header className="border-b sticky top-0 z-10">
                <div className="py-0.5 lg:py-2 dark:bg-[#030712]  bg-[#fcfdff] backdrop-blur-md">
                    <div className="flex items-center justify-between container">
                        <Link href="/" className="flex items-center gap-3">
                            <Image src="/logo.svg" width={45} height={45} alt="logo" />
                            <h1 className="text-3xl font-bold md:block hidden">QuickForm</h1>
                        </Link>

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
                                <Button variant="secondary" className="px-2">
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

