"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const SignInPage = () => {
  const stats = [
    { value: "10+", label: "Form Fields", icon: Users },
    { value: "2 min", label: "Setup Time", icon: TrendingUp },
    { value: "100%", label: "Responsive Forms", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-screen">
        {/* Left Side - Branding & Stats (Hidden on mobile/tablet) */}
        <aside className="relative hidden lg:flex lg:col-span-5 xl:col-span-5 2xl:col-span-6 bg-muted/30 border-r border-border">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs - positioned differently from signup */}
            <div className="absolute -bottom-24 -left-24 w-72 lg:w-80 xl:w-96 h-72 lg:h-80 xl:h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-64 lg:w-72 xl:w-80 h-64 lg:h-72 xl:h-80 bg-primary/5 rounded-full blur-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Decorative rings - offset from center */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] lg:w-[400px] xl:w-[450px] h-[350px] lg:h-[400px] xl:h-[450px]">
              <div className="absolute inset-0 rounded-full border border-border/20" />
              <div className="absolute inset-6 lg:inset-8 rounded-full border border-border/15" />
              <div className="absolute inset-12 lg:inset-16 rounded-full border border-border/10" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-6 lg:p-8 xl:p-10 2xl:p-12 w-full">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-flex items-center gap-2 group">
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Back to home
                </span>
              </Link>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="flex-1 flex flex-col justify-center max-w-sm xl:max-w-md"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={fadeUp}
                className="text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight text-foreground mb-3 lg:mb-4"
              >
                Welcome back to <span className="text-primary">Quick Form</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-sm lg:text-base xl:text-lg mb-8 lg:mb-10"
              >
                Create forms visually by dragging and arranging fields in
                seconds.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-3 gap-3 lg:gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={scaleIn}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="relative p-3 lg:p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm text-center hover:bg-card/70 transition-colors">
                      <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary mx-auto mb-2" />
                      <div className="text-lg lg:text-xl xl:text-2xl font-medium text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* How It Works */}
              <motion.div
                variants={fadeUp}
                className="mt-8 lg:mt-10 p-4 lg:p-5 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <p className="text-sm font-medium text-foreground mb-2">
                  How Quick Form works
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Drag and drop form fields visually</li>
                  <li>• Customize styles and validation</li>
                  <li>• Publish and start collecting responses</li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs lg:text-sm text-muted-foreground"
            >
              © 2026 Quick Form. All rights reserved.
            </motion.div>
          </div>
        </aside>

        {/* Right Side - Sign In Form */}
        <main className="flex flex-col lg:col-span-7 xl:col-span-7 2xl:col-span-6 min-h-screen lg:min-h-0">
          {/* Mobile/Tablet Header */}
          <div className="lg:hidden p-3 sm:p-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Back to home
              </span>
            </Link>
          </div>

          {/* Form Container */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-12">
            <motion.div
              className="w-full max-w-sm sm:max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-1.5 sm:mb-2"
                >
                  Sign in to your account
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base text-muted-foreground"
                >
                  Pick up where you left off
                </motion.p>
              </div>

              {/* Clerk SignIn Component */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="w-full clerk-container"
              >
                <SignIn
                  appearance={{
                    elements: {
                      // Root & Card
                      rootBox: "w-full",
                      cardBox: "w-full shadow-none",
                      card: "w-full shadow-none border border-border bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-xl",

                      // Header (hidden - we use our own)
                      header: "hidden",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",

                      // Social Buttons
                      socialButtons: "gap-2 sm:gap-3",
                      socialButtonsBlockButton:
                        "border border-border bg-background hover:bg-muted/50 dark:hover:bg-muted/30 transition-all duration-200 rounded-lg py-2.5 sm:py-3",
                      socialButtonsBlockButtonText:
                        "text-foreground font-medium text-sm",
                      socialButtonsProviderIcon:
                        "w-5 h-5 dark:brightness-0 dark:invert",

                      // Divider
                      dividerLine: "bg-border",
                      dividerText: "text-muted-foreground text-xs sm:text-sm",
                      dividerRow: "my-4 sm:my-5",

                      // Form Fields
                      form: "gap-3 sm:gap-4",
                      formFieldRow: "mb-0",
                      formFieldLabel:
                        "text-foreground text-sm font-medium mb-1.5",
                      formFieldLabelRow: "mb-1.5",
                      formFieldInput:
                        "border border-border bg-background dark:bg-background text-foreground rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground",
                      formFieldInputShowPasswordButton:
                        "text-muted-foreground hover:text-foreground transition-colors",
                      formFieldInputShowPasswordIcon: "w-4 h-4 sm:w-5 sm:h-5",

                      // Form Field States
                      formFieldHintText:
                        "text-muted-foreground text-xs sm:text-sm mt-1.5",
                      formFieldSuccessText:
                        "text-green-600 dark:text-green-400 text-xs sm:text-sm mt-1.5",
                      formFieldErrorText:
                        "text-destructive text-xs sm:text-sm mt-1.5",
                      formFieldWarningText:
                        "text-amber-600 dark:text-amber-400 text-xs sm:text-sm mt-1.5",

                      // Primary Button
                      formButtonPrimary:
                        "bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm rounded-lg py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-200 mt-2",
                      formButtonReset:
                        "text-primary hover:text-primary/80 text-sm",

                      // Footer
                      footer: "mt-4 sm:mt-6",
                      footerAction: "mt-4",
                      footerActionText:
                        "text-muted-foreground text-sm text-center",
                      footerActionLink:
                        "text-primary hover:text-primary/80 font-medium transition-colors",

                      // Forgot Password / Alternative Actions
                      formFieldAction:
                        "text-primary hover:text-primary/80 text-sm font-medium",

                      // Identity Preview
                      identityPreview:
                        "bg-muted/50 border border-border rounded-lg p-3",
                      identityPreviewText: "text-foreground text-sm",
                      identityPreviewEditButton:
                        "text-primary hover:text-primary/80 text-sm",
                      identityPreviewEditButtonIcon: "w-4 h-4",

                      // Other Elements
                      alertText: "text-foreground text-sm",
                      alertTextDanger: "text-destructive",
                      formResendCodeLink:
                        "text-primary hover:text-primary/80 text-sm",
                      otpCodeFieldInput:
                        "border border-border bg-background text-foreground rounded-lg text-center",

                      // Internal elements
                      internal: "text-foreground",
                      main: "text-foreground",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                    },
                  }}
                />
              </motion.div>

              {/* Mobile Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="lg:hidden mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border"
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  {stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <stat.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary" />
                      </div>
                      <div className="text-base sm:text-lg font-medium text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile Security Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="lg:hidden mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground"
              >
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>Your data is encrypted and secure</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile/Tablet Footer */}
          <div className="lg:hidden p-3 sm:p-4 text-center text-xs text-muted-foreground border-t border-border bg-background">
            © 2026 Quick Form. All rights reserved.
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignInPage;
