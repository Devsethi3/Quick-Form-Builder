import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              width={28}
              height={28}
              alt="QuickForm logo"
            />
            <span className="text-base font-semibold">QuickForm</span>
          </div>

          {/* Tagline */}
          <p className="text-center text-sm text-muted-foreground max-w-sm">
            Build beautiful forms in minutes with our intuitive drag-and-drop
            builder.
          </p>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground pt-2">
            <span>&copy; {new Date().getFullYear()} QuickForm</span>
            <span className="mx-2">·</span>
            <span>
              Built by{" "}
              <Link
                href="https://x.com/imsethidev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Dev
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
