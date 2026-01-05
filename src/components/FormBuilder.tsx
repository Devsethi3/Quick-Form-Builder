// components/FormBuilder.tsx
"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import Confetti from "react-confetti";
import useDesigner from "@/hooks/useDesigner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Eye,
  Loader2,
  MoreVertical,
  PartyPopper,
  Save,
  Send,
  Link as LinkIcon,
} from "lucide-react";
import ShareFormQR from "@/components/forms/ShareFormQR";

function FormBuilder({ form }: { form: Form }) {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  // Loading State
  if (!isReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Loading form builder
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Setting up your workspace...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share URL has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Published State
  if (form.published) {
    return (
      <>
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.1}
        />

        <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
          {/* Background decoration */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-lg"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {/* Header */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-center sm:p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 sm:h-20 sm:w-20"
                >
                  <PartyPopper className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2 text-2xl font-bold text-foreground sm:text-3xl"
                >
                  Form Published! 
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-muted-foreground sm:text-base"
                >
                  Your form is now live and ready to collect responses
                </motion.p>
              </div>

              {/* Content */}
              <div className="space-y-6 p-6 sm:p-8">
                {/* Share Link Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <LinkIcon className="h-4 w-4 text-primary" />
                    Share this form
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    Anyone with the link can view and submit the form
                  </p>

                  <div className="flex gap-2">
                    <Input
                      className="flex-1 bg-muted/50 font-mono text-xs sm:text-sm"
                      readOnly
                      value={shareUrl}
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant={copied ? "default" : "outline"}
                      className="flex-shrink-0 gap-2"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Copy className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="hidden sm:inline">
                        {copied ? "Copied!" : "Copy"}
                      </span>
                    </Button>
                  </div>
                </motion.div>

                {/* Quick Actions - Using the SAME ShareFormQR component */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-2"
                >
                  {/* 
                    Using ShareFormQR with variant="card" 
                    This uses the SAME component from before
                  */}
                  <ShareFormQR
                    shareUrl={form.shareURL}
                    formName={form.name}
                    variant="card"
                  />

                  <Button
                    variant="outline"
                    className="flex-col h-auto py-3 gap-1.5"
                    asChild
                  >
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-xs">Preview</span>
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-col h-auto py-3 gap-1.5"
                    asChild
                  >
                    <Link href={`/forms/${form.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="text-xs">Details</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between border-t border-border bg-muted/30 px-6 py-4 sm:px-8"
              >
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                    <span className="sm:hidden">Back</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <Link href={`/forms/${form.id}`}>
                    <span className="hidden sm:inline">View Submissions</span>
                    <span className="sm:hidden">Submissions</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // Builder State (unchanged)
  return (
    <DndContext sensors={sensors}>
      <main className="flex h-screen flex-col w-full bg-background overflow-hidden">
        {/* Navigation Bar */}
        <nav className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9"
                asChild
              >
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to dashboard</span>
                </Link>
              </Button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-sm font-semibold sm:text-base max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">
                    {form.name}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="hidden xs:flex bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs"
                  >
                    Draft
                  </Badge>
                </div>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Drag and drop to build your form
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <PreviewDialogBtn />

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-2">
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </div>

              {/* Mobile/Tablet Dropdown */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Form
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-primary">
                      <Send className="h-4 w-4" />
                      Publish Form
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>

        {/* Designer Area */}
        <div className="relative flex-1 w-full overflow-hidden bg-muted/30">
          <div
            className="absolute inset-0 opacity-50 dark:opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 h-full overflow-auto">
            <Designer />
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="flex-shrink-0 md:hidden border-t border-border bg-background/95 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <SaveFormBtn id={form.id} />
            <PublishFormBtn id={form.id} />
          </div>
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
