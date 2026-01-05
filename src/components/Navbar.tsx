"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, memo } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { NavbarAuthActions } from "./NavbarAuthActions";

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/60 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={32} height={32} priority />
            <span className="text-lg font-semibold">QuickForm</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>

            <NavbarAuthActions />

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simple fade transition */}
      {isOpen && (
        <div className="md:hidden border-t bg-background animate-in fade-in duration-150">
          <div className="flex flex-col gap-4 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeSwitcher />
            </div>

            <NavbarAuthActions mobile />
          </div>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
