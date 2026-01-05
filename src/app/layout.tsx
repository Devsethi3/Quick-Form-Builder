import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import DesignerContextProvider from "@/context/DesignerContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "QuickForm — Drag & Drop Form Builder for Modern Web Apps",
    template: "%s | QuickForm",
  },
  description:
    "QuickForm is a modern drag-and-drop form builder that lets you create, customize, and publish responsive forms in minutes — no code required.",

  keywords: [
    "drag and drop form builder",
    "online form builder",
    "no code form builder",
    "custom forms",
    "QuickForm",
  ],

  authors: [
    {
      name: "Dev Prasad Sethi",
      url: "https://twitter.com/iamsethidev",
    },
  ],

  creator: "Dev Prasad Sethi",

  openGraph: {
    title: "QuickForm — Drag & Drop Form Builder",
    description:
      "Build powerful, responsive forms faster using an intuitive drag-and-drop form builder. No code required.",
    url: "https://quickform.app", 
    siteName: "QuickForm",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QuickForm — Drag & Drop Form Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "QuickForm — Drag & Drop Form Builder",
    description:
      "Create and publish forms in minutes with a modern drag-and-drop form builder. Clean UI, fast setup, no code.",
    creator: "@iamsethidev",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
        </head>
        <body className={font.className}>
          <NextTopLoader
            color="#D97757"
            crawlSpeed={200}
            height={4}
            crawl={true}
            easing="ease"
          />
          <DesignerContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
