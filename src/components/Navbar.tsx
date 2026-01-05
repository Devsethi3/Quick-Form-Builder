"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-2 mx-auto">
        <div className="flex lg:h-14 h-12 items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.svg"
              width={32}
              height={32}
              alt="logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl font-medium tracking-tight">QuickForm</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>

            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9",
                  },
                }}
                afterSignOutUrl="/"
              />
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign-in")}
                >
                  Log in
                </Button>
                <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden text-muted-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="container py-4 space-y-4 flex flex-col px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium py-2 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between py-2 border-t pt-4">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeSwitcher />
              </div>
              {!user && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/sign-in")}
                  >
                    Log in
                  </Button>
                  <Button onClick={() => router.push("/sign-up")}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

