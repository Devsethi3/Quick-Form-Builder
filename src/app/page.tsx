"use client";

import CTASection from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
