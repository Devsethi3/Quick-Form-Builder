import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GetFormById } from "@/action/form";
import FormHeader from "../../../components/forms/FormHeader";
import ShareSection from "../../../components/forms/ShareSection";
import { StatsCards, StatsCardsSkeleton } from "../../../components/forms/StatsCards";
import SubmissionsTable, { SubmissionsTableSkeleton } from "../../../components/forms/SubmissionsTable";


interface FormDetailPageProps {
  params: {
    id: string;
  };
}

export default async function FormDetailPage({ params }: FormDetailPageProps) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    notFound();
  }

  const { visits, submissions } = form;
  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <FormHeader
          name={form.name}
          published={form.published}
          createdAt={form.createdAt}
          visits={form.visits}
          shareUrl={form.shareURL}
        />

        {/* Content */}
        <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Share Section */}
          <ShareSection shareUrl={form.shareURL} formName={form.name} />

          {/* Stats Cards */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
              Analytics
            </h2>
            <Suspense fallback={<StatsCardsSkeleton />}>
              <StatsCards
                visits={visits}
                submissions={submissions}
                submissionRate={submissionRate}
                bounceRate={bounceRate}
              />
            </Suspense>
          </section>

          {/* Submissions Table */}
          <section>
            <Suspense fallback={<SubmissionsTableSkeleton />}>
              <SubmissionsTable id={form.id} />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  );
}
