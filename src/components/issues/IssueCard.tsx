import Link from "next/link";

import { type demoIssues } from "@/lib/demoContent";

type IssueCardProps = {
  issue: (typeof demoIssues)[number];
};

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <article className="space-y-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
        {issue.category}
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl text-emerald-950">{issue.title}</h3>
        <p className="text-sm leading-7 text-stone-700">{issue.summary}</p>
      </div>
      <Link className="inline-flex font-semibold text-emerald-800" href={`/issues/${issue.id}`}>
        Open perspectives →
      </Link>
    </article>
  );
}
