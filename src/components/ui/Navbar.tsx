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
                    <h2 className="font-bold text-2xl">PAGEFORM</h2>
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />
                    {user ? (
                        <UserButton />
                    ) : (
                        <>
                            <Button onClick={() => router.push("/sign-up")}>Login</Button>
                            <Button variant="secondary" onClick={() => router.push("/sign-in")}>Register</Button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar