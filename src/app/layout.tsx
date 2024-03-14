import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800",] });
import NextTopLoader from 'nextjs-toploader'
import { ClerkProvider } from "@clerk/nextjs";
import DesignerContextProvider from "@/context/DesignerContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "QuickForm - Build Custom Forms with Drag and Drop",
  description: "Create your custom forms effortlessly with QuickForm. Simply drag and drop elements to generate tailored forms for your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <NextTopLoader color="#884DEE" crawlSpeed={200}
            height={4}
            crawl={true}
            easing="ease" />
          <DesignerContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}