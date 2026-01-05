"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BadgeCheckIcon,
  CheckIcon,
  PlayCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const subtleFadeUp = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const headerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const ctaStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const statStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.4,
    },
  },
};

const staticRings = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const shapeReveal = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay: 0.2,
    },
  },
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background min-h-screen">
      {/* Main content - Proper z-index */}
      <div className="relative z-10 container pt-28 lg:pt-36">
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <motion.div
              className="mb-6 flex flex-col items-center justify-center gap-2 sm:flex-row"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={subtleFadeUp}>
                <Badge
                  variant="secondary"
                  className="relative overflow-hidden border border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-colors dark:text-foreground/70"
                >
                  <BadgeCheckIcon className="size-3 mr-2" />
                  <span className="relative z-10">No Credit Card Required</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
                </Badge>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-4xl text-center text-3xl font-medium tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent dark:from-foreground dark:to-foreground/40">
              Create and publish forms in minutes. No code required.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            Build and launch forms faster Design beautiful, responsive forms
            using drag and drop, collect submissions instantly
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={ctaStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.div variants={fadeUp}>
              <Button
                asChild
                size="lg"
                className="shadow-lg shadow-primary/20 relative z-10 group"
              >
                <Link href="/auth">
                  <motion.span variants={subtleFadeUp}>
                    Create Custom Form
                  </motion.span>
                  <motion.div variants={subtleFadeUp}>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative z-10 w-full group"
              >
                <Link href="#demo">
                  <motion.div variants={subtleFadeUp}>
                    <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <motion.span variants={subtleFadeUp}>Watch demo</motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature chips */}
          <motion.div
            variants={statStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2 relative z-10"
          >
            <motion.div variants={fadeUp}>
              <Stat
                title="Flexible form fields"
                desc="Text, email, select, checkbox, and more"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <Stat
                title="Live form preview"
                desc="See changes instantly as you build"
              />
            </motion.div>
          </motion.div>

          {/* Video section */}
          <motion.div
            id="demo"
            variants={fadeUp}
            className="relative mx-auto mt-12 w-full max-w-5xl z-10"
          >
            {/* Glow effect behind video */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-2xl opacity-30" />

            {/* Video frame with clean styling */}
            <motion.div className="relative rounded-2xl border border-border bg-card/60 p-1 backdrop-blur-sm shadow-2xl">
              <motion.div
                className="rounded-xl border border-border bg-card overflow-hidden"
                variants={subtleFadeUp}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="max-w-md mx-auto bg-background/50 rounded-md px-3 py-1.5 text-xs text-muted-foreground border border-border/50">
                      quick-form
                    </div>
                  </div>
                </div>

                {/* Video placeholder */}
                <motion.div
                  className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center"
                  variants={subtleFadeUp}
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlayCircle className="w-10 h-10 text-primary" />
                    </motion.div>
                    <p className="text-sm text-muted-foreground">
                      Watch the demo
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ title, desc }: { title: string; desc: string }) {
  const statContentStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.08,
      },
    },
  };

  const elementFadeUp = {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className="group rounded-xl bg-gradient-to-br from-primary/30 via-secondary/30 to-primary/30 p-[1px]"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="rounded-xl bg-card/80 p-4 ring-1 ring-border/50 backdrop-blur hover:bg-card/90 transition-colors"
        variants={statContentStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div className="flex items-start gap-3" variants={elementFadeUp}>
          <motion.div variants={elementFadeUp}>
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          </motion.div>
          <motion.div className="text-left" variants={elementFadeUp}>
            <motion.p variants={elementFadeUp} className="text-sm font-medium">
              {title}
            </motion.p>
            <motion.p
              variants={elementFadeUp}
              className="text-sm text-muted-foreground"
            >
              {desc}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
