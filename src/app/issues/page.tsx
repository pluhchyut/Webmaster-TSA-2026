import { IssueCard } from "@/components/issues/IssueCard";
import { demoIssues } from "@/lib/demoContent";

export default function IssuesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Perspective Switcher
        </p>
        <h1 className="font-serif text-5xl text-emerald-950">
          Structured issue pages that switch viewpoints without changing the facts.
        </h1>
        <p className="text-lg leading-8 text-stone-700">
          Neutral issue context stays stable while stakeholder tabs update the right-hand panel
          with manually authored concerns, values, actions, and compromise ideas.
        </p>
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        {demoIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
