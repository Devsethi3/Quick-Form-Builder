"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface FormHeaderProps {
  name: string;
  published: boolean;
  createdAt: Date;
  visits: number;
  shareUrl: string;
}

export default function FormHeader({
  name,
  published,
  createdAt,
  visits,
  shareUrl,
}: FormHeaderProps) {
  const fullUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/submit/${shareUrl}`;

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-6">
          {/* Left Section */}
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 h-9 w-9"
              asChild
            >
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to dashboard</span>
              </Link>
            </Button>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[500px]">
                  {name}
                </h1>
                <Badge
                  variant={published ? "default" : "secondary"}
                  className={
                    published
                      ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                      : ""
                  }
                >
                  {published ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {visits.toLocaleString()} views
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 pl-12 sm:pl-0">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden xs:inline">Visit Form</span>
                <span className="xs:hidden">View</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}