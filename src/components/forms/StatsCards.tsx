// components/StatsCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

interface StatsCardsProps {
  visits: number;
  submissions: number;
  submissionRate: number;
  bounceRate: number;
}

export function StatsCards({
  visits,
  submissions,
  submissionRate,
  bounceRate,
}: StatsCardsProps) {
  const statsConfig: StatsCardConfig[] = [
    {
      title: "Total Visits",
      icon: <LuView className="w-4 h-4 sm:w-5 sm:h-5" />,
      helperText: "All time form visits",
      value: visits.toLocaleString(),
      gradient: "from-blue-500/10 to-blue-600/5",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Total Submissions",
      icon: <FaWpforms className="w-4 h-4 sm:w-5 sm:h-5" />,
      helperText: "All time form submissions",
      value: submissions.toLocaleString(),
      gradient: "from-amber-500/10 to-amber-600/5",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-500/20",
    },
    {
      title: "Submission Rate",
      icon: <HiCursorClick className="w-4 h-4 sm:w-5 sm:h-5" />,
      helperText: "Visits that result in submission",
      value: `${submissionRate.toFixed(1)}%`,
      gradient: "from-green-500/10 to-green-600/5",
      iconBg: "bg-green-500/10 dark:bg-green-500/20",
      iconColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-500/20",
    },
    {
      title: "Bounce Rate",
      icon: <TbArrowBounce className="w-4 h-4 sm:w-5 sm:h-5" />,
      helperText: "Visits without interaction",
      value: `${bounceRate.toFixed(1)}%`,
      gradient: "from-red-500/10 to-red-600/5",
      iconBg: "bg-red-500/10 dark:bg-red-500/20",
      iconColor: "text-red-600 dark:text-red-400",
      borderColor: "border-red-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {statsConfig.map((stat, index) => (
        <StatsCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
}

interface StatsCardConfig {
  title: string;
  value: string;
  helperText: string;
  icon: ReactNode;
  gradient: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
}

interface StatsCardProps extends StatsCardConfig {
  index: number;
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  gradient,
  iconBg,
  iconColor,
  borderColor,
}: StatsCardProps) {
  return (
    <Card
      className={`
        relative overflow-hidden border ${borderColor}
        bg-gradient-to-br ${gradient}
        backdrop-blur-sm
        transition-all duration-300 ease-out
        group
      `}
    >
      {/* Decorative corner */}
      <div
        className={`
          absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20
          bg-gradient-to-bl ${gradient}
          opacity-50 rounded-bl-full
          group-hover:opacity-70 transition-opacity
        `}
      />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-1 sm:pb-2 relative z-10 p-3 sm:p-4 lg:p-6">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`
            ${iconBg} ${iconColor}
            p-1.5 sm:p-2 rounded-md sm:rounded-lg
            group-hover:scale-110 transition-transform duration-300
          `}
        >
          {icon}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 p-3 sm:p-4 lg:p-6 pt-0">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight tabular-nums">
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">
          {helperText}
        </p>
      </CardContent>
    </Card>
  );
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border-border">
          <CardHeader className="p-3 sm:p-4 lg:p-6 pb-1 sm:pb-2">
            <div className="flex items-start justify-between">
              <Skeleton className="h-4 w-20 sm:w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <Skeleton className="h-7 sm:h-8 w-14 sm:w-16 mb-1" />
            <Skeleton className="h-3 w-24 sm:w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
