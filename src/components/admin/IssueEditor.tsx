import { type demoIssues } from "@/lib/demoContent";

type IssueEditorProps = {
  issue: (typeof demoIssues)[number];
};

export function IssueEditor({ issue }: IssueEditorProps) {
  return (
    <div className="space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          Structured issue authoring
        </p>
        <h2 className="mt-2 font-serif text-3xl text-emerald-950">{issue.title}</h2>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-emerald-950">Neutral summary</span>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none"
          defaultValue={issue.summary}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        {issue.perspectives.map((perspective) => (
          <div key={perspective.perspectiveKey} className="rounded-2xl bg-stone-50 p-4">
            <h3 className="font-semibold text-emerald-950">{perspective.displayName}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-700">{perspective.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
