import { ModerationDecisionForm } from "@/components/admin/ModerationDecisionForm";

type ModerationItem = {
  id: string;
  targetType: string;
  title: string;
  reason: string;
  status: string;
};

type ModerationQueueProps = {
  items: ModerationItem[];
};

export function ModerationQueue({ items }: ModerationQueueProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                {item.targetType}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-emerald-950">{item.title}</h3>
            </div>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
              {item.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-stone-700">{item.reason}</p>
          <div className="mt-5">
            <ModerationDecisionForm />
          </div>
        </article>
      ))}
    </div>
  );
}
