// app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { LuActivity } from "react-icons/lu";
import CreateFormBtn from "@/components/CreateFormBtn";
import { GetFormStats, GetForms } from "@/action/form";
import FormCard from "@/components/FormCard";
import SearchFilter from "@/components/SearchFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCards, StatsCardsSkeleton } from "@/components/forms/StatsCards";

interface DashboardPageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
    sort?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 pt-8 pb-16 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent dark:from-foreground dark:to-foreground/40">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your form performance and metrics.
        </p>
      </div>

      {/* Stats Section */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <CardStatsWrapper />
      </Suspense>

      <Separator className="my-10" />

      {/* Forms Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-medium tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent dark:from-foreground dark:to-foreground/40">
            Your Forms
          </h2>
        </div>

        {/* Search Filter */}
        <SearchFilter placeholder="Search forms by name..." />

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CreateFormBtn />
          <Suspense
            fallback={[1, 2, 3].map((el) => (
              <FormCardSkeleton key={el} />
            ))}
          >
            <FormCards searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return (
    <StatsCards
      visits={stats?.visits ?? 0}
      submissions={stats?.submissions ?? 0}
      submissionRate={stats?.submissionRate ?? 0}
      bounceRate={stats?.bounceRate ?? 0}
    />
  );
}

function FormCardSkeleton() {
  return (
    <Card className="h-[210px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <div className="p-6 pt-2">
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}

interface FormCardsProps {
  searchParams: {
    q?: string;
    status?: string;
    sort?: string;
  };
}

async function FormCards({ searchParams }: FormCardsProps) {
  let forms = await GetForms();

  if (!forms || forms.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed bg-muted/20">
        <LuActivity className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No forms created yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Click the button above to create your first form.
        </p>
      </div>
    );
  }

  // Apply search filter
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase();
    forms = forms.filter(
      (form) =>
        form.name.toLowerCase().includes(query) ||
        form.description?.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (searchParams.status && searchParams.status !== "all") {
    forms = forms.filter((form) =>
      searchParams.status === "published" ? form.published : !form.published
    );
  }

  // Apply sorting
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "oldest":
        forms = [...forms].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "name":
        forms = [...forms].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "submissions":
        forms = [...forms].sort((a, b) => b.submissions - a.submissions);
        break;
      default:
        forms = [...forms].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  } else {
    // Default sort by newest
    forms = [...forms].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // No results after filtering
  if (forms.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed bg-muted/20">
        <LuActivity className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No forms found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
