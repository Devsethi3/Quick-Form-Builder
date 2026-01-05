"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Shield, Zap, HandIcon } from "lucide-react";

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

const SignUpPage = () => {
  const features = [
    {
      icon: HandIcon,
      title: "Drag-n-Drop",
      desc: "Customize forms effortlessly drag-n-drop interface.",
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      desc: "Receive detailed analysis after each creation",
    },
    {
      icon: Shield,
      title: "Privacy First",
      desc: "Your data is encrypted and never shared",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-screen">
        {/* Left Side - Branding & Features (Hidden on mobile/tablet) */}
        <aside className="relative hidden lg:flex lg:col-span-5 xl:col-span-5 2xl:col-span-6 bg-muted/30 border-r border-border">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute -top-24 -left-24 w-72 lg:w-80 xl:w-96 h-72 lg:h-80 xl:h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 lg:w-72 xl:w-80 h-64 lg:h-72 xl:h-80 bg-primary/5 rounded-full blur-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.006]"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
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
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs lg:text-sm font-medium mb-4 lg:mb-6">
                  Best user experience
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight text-foreground mb-3 lg:mb-4"
              >
                Start your journey to{" "}
                <span className="text-primary">building better forms</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-sm lg:text-base xl:text-lg mb-6 lg:mb-8 xl:mb-10"
              >
                Create powerful forms faster with an intuitive drag-and-drop
                builder.
              </motion.p>

              {/* Features */}
              <motion.div variants={stagger} className="space-y-3 lg:space-y-4">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeUp}
                    className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg lg:rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-md lg:rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-foreground text-sm lg:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground mt-0.5">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
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

        {/* Right Side - Sign Up Form */}
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
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1.5 sm:mb-2"
                >
                  Create an account
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base text-muted-foreground"
                >
                  Join Quick Form — it&apos;s quick, easy, and free!
                </motion.p>
              </div>

              {/* Clerk SignUp Component with comprehensive styling */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="w-full clerk-container"
              >
                <SignUp
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
                      phoneInputBox:
                        "border border-border bg-background rounded-lg",
                      formFieldAction:
                        "text-primary hover:text-primary/80 text-sm",
                      badge: "bg-primary/10 text-primary text-xs rounded-full",

                      // Internal elements
                      internal: "text-foreground",
                      main: "text-foreground",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    },
                  }}
                />
              </motion.div>

              {/* Mobile/Tablet Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="lg:hidden mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border"
              >
                <p className="text-center text-xs text-muted-foreground mb-4">
                  Trusted by many of users
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    </div>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    </div>
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <HandIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    </div>
                    <span>Drag/Drop</span>
                  </div>
                </div>
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

export default SignUpPage;
