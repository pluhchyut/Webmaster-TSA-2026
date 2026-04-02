import { ModerationQueue } from "@/components/admin/ModerationQueue";
import { demoModerationQueue } from "@/lib/demoContent";

export default function ModerationPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Moderation queue
        </p>
        <h1 className="font-serif text-5xl text-emerald-950">
          Explainable decisions, not black-box filtering.
        </h1>
        <p className="text-lg leading-8 text-stone-700">
          Every moderation action is tied to deterministic flags, human review, and an audit trail.
        </p>
      </section>
      <ModerationQueue items={demoModerationQueue} />
    </div>
  );
}
