import { IssueEditor } from "@/components/admin/IssueEditor";
import { demoIssues } from "@/lib/demoContent";

export default function AdminIssuesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Issue authoring
        </p>
        <h1 className="font-serif text-5xl text-emerald-950">
          Author structured perspectives for each community issue.
        </h1>
      </section>
      <IssueEditor issue={demoIssues[0]} />
    </div>
  );
}
