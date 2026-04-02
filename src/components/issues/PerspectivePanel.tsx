import { type demoIssues } from "@/lib/demoContent";

type Perspective = (typeof demoIssues)[number]["perspectives"][number];

type PerspectivePanelProps = {
  perspective: Perspective;
};

export function PerspectivePanel({ perspective }: PerspectivePanelProps) {
  return (
    <div className="space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          {perspective.displayName}
        </p>
        <p className="mt-3 text-sm leading-7 text-stone-700">{perspective.summary}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-emerald-950">Top concerns</h3>
          <ul className="space-y-2 text-sm text-stone-700">
            {perspective.topConcerns.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-emerald-950">Top values</h3>
          <ul className="space-y-2 text-sm text-stone-700">
            {perspective.topValues.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-emerald-950">Suggested actions</h3>
        <ul className="space-y-2 text-sm text-stone-700">
          {perspective.suggestedActions.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
      {perspective.compromise ? (
        <div className="rounded-2xl bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Compromise idea
          </p>
          <h4 className="mt-2 font-serif text-xl text-emerald-950">
            {perspective.compromise.title}
          </h4>
          <p className="mt-2 text-sm leading-7 text-stone-700">{perspective.compromise.body}</p>
        </div>
      ) : null}
    </div>
  );
}
