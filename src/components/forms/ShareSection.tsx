"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, Link as LinkIcon, Share2, QrCode } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import ShareFormQR from "./ShareFormQR";

interface ShareSectionProps {
  shareUrl: string;
  formName: string;
}

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

export default function ShareSection({
  shareUrl,
  formName,
}: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/submit/${shareUrl}`
      : `/submit/${shareUrl}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share URL has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, [fullUrl]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) {
      handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: formName,
        text: `Fill out this form: ${formName}`,
        url: fullUrl,
      });
    } catch {
      // User cancelled sharing
    }
  }, [formName, fullUrl, handleCopy]);

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <LinkIcon className="w-4 h-4 text-primary" />
            </div>
            <span>Share Link</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <Input
                readOnly
                value={fullUrl}
                className="w-full text-sm bg-muted/50 border-border"
              />
            </div>
            <Button
              onClick={handleCopy}
              variant={copied ? "default" : "outline"}
              size="sm"
              className="h-9 gap-2 shrink-0"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.div
                    key="check"
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Copied</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 shrink-0"
              onClick={handleNativeShare}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
            <ShareFormQR
              shareUrl={shareUrl}
              formName={formName}
              variant="default"
            />
          </div>

          <div className="flex flex-col gap-3 sm:hidden">
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <Input
                  readOnly
                  value={fullUrl}
                  className="w-full text-sm bg-muted/50 border-border truncate"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={handleNativeShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleCopy}
                variant={copied ? "default" : "outline"}
                className="h-10 gap-2 w-full"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.div
                      key="check"
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy Link</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              <ShareFormQR
                shareUrl={shareUrl}
                formName={formName}
                variant="mobile-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
