"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  QrCode,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShareFormQRProps {
  shareUrl: string;
  formName?: string;
  className?: string;
  variant?: "default" | "compact" | "card" | "mobile-full";
}

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

const qrVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};

export default function ShareFormQR({
  shareUrl,
  formName = "Form",
  className,
  variant = "default",
}: ShareFormQRProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const fullUrl = useMemo(
    () => `${origin}/submit/${shareUrl}`,
    [origin, shareUrl]
  );

  const sanitizedFormName = useMemo(
    () => formName.replace(/\s+/g, "-").toLowerCase(),
    [formName]
  );

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

  const handleDownloadQR = useCallback(() => {
    const svg = document.getElementById("share-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${sanitizedFormName}-qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast({
        title: "QR Code downloaded!",
        description: "Check your downloads folder",
      });
    };

    img.src = `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(svgData))
    )}`;
  }, [sanitizedFormName]);

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
      // User cancelled
    }
  }, [formName, fullUrl, handleCopy]);

  const triggerButton = useMemo(() => {
    const variants = {
      compact: (
        <Button
          variant="outline"
          size="icon"
          className={cn("h-9 w-9 shrink-0", className)}
        >
          <QrCode className="h-4 w-4" />
          <span className="sr-only">QR Code</span>
        </Button>
      ),
      card: (
        <Button
          variant="outline"
          className={cn("flex-col h-auto py-3 gap-1.5 shrink-0", className)}
        >
          <QrCode className="h-4 w-4" />
          <span className="text-xs">QR Code</span>
        </Button>
      ),
      "mobile-full": (
        <Button
          variant="outline"
          className={cn("h-10 gap-2 w-full", className)}
        >
          <QrCode className="h-4 w-4" />
          <span className="text-sm">QR Code</span>
        </Button>
      ),
      default: (
        <Button
          variant="outline"
          size="sm"
          className={cn("h-9 gap-2 shrink-0", className)}
        >
          <QrCode className="h-4 w-4" />
          <span>QR Code</span>
        </Button>
      ),
    };

    return variants[variant];
  }, [variant, className]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto rounded-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <QrCode className="h-4 w-4 text-primary" />
            </div>
            <span className="truncate">Share Form</span>
          </DialogTitle>
          <DialogDescription className="text-sm">
            Share your form via QR code or copy the link
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* QR Code Display */}
          <motion.div
            variants={qrVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-border">
              <QRCodeSVG
                id="share-qr-code"
                value={fullUrl}
                size={180}
                level="H"
                includeMargin
                className="rounded-lg w-[140px] h-[140px] sm:w-[180px] sm:h-[180px]"
              />
            </div>
          </motion.div>

          {/* Form Name */}
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-foreground truncate px-4">
              {formName}
            </p>
            <p className="text-xs text-muted-foreground">
              Scan to open the form
            </p>
          </div>

          {/* URL Input with Copy */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Form URL
            </label>
            <div className="flex gap-2">
              <div className="flex-1 min-w-0">
                <Input
                  readOnly
                  value={fullUrl}
                  className="w-full text-xs sm:text-sm bg-muted/50 font-mono truncate"
                />
              </div>
              <Button
                onClick={handleCopy}
                variant={copied ? "default" : "outline"}
                size="icon"
                className="h-9 w-9 shrink-0"
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
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.15 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="flex-col h-auto py-2.5 sm:py-3 gap-1 sm:gap-1.5"
              onClick={handleDownloadQR}
            >
              <Download className="h-4 w-4" />
              <span className="text-[10px] sm:text-xs">Download</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-2.5 sm:py-3 gap-1 sm:gap-1.5"
              onClick={handleNativeShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-[10px] sm:text-xs">Share</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-2.5 sm:py-3 gap-1 sm:gap-1.5"
              asChild
            >
              <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="text-[10px] sm:text-xs">Open</span>
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
