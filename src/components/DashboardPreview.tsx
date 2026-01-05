"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function DashboardPreview() {
  const { theme } = useTheme();

  const imageSrc =
    theme === "dark" ? "/dashboard-dark.png" : "/dashboard-light.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl border border-border bg-card/60 p-2 backdrop-blur shadow-sm"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="mx-auto text-xs text-muted-foreground">
            quick-form
          </div>
        </div>

        {/* Dashboard Image */}
        <Image
          src={imageSrc}
          alt="QuickForm Dashboard Preview"
          width={1600}
          height={900}
          priority
          className="w-full h-auto object-cover"
        />
      </div>
    </motion.div>
  );
}
