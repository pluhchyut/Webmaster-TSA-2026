import { notFound } from "next/navigation";

import { CommonGroundPanel } from "@/components/issues/CommonGroundPanel";
import { PerspectiveTabs } from "@/components/issues/PerspectiveTabs";
import { demoIssues } from "@/lib/demoContent";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const { issueId } = await params;
  const issue = demoIssues.find((entry) => entry.id === issueId);

  if (!issue) notFound();

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_1fr]">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            {issue.category}
          </p>
          <h1 className="mt-4 font-serif text-5xl text-emerald-950">{issue.title}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-700">{issue.summary}</p>
          <p className="mt-5 text-sm leading-7 text-stone-700">{issue.body}</p>
        </div>
        <CommonGroundPanel items={issue.commonGround} />
      </section>
      <aside className="space-y-4">
        <PerspectiveTabs perspectives={issue.perspectives} />
      </aside>
    </div>
  );
}
