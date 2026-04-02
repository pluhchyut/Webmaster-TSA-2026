import { UnsentFeed } from "@/components/unsent/UnsentFeed";
import { demoUnsentMessages } from "@/lib/demoContent";

export default function UnsentPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Unsent Messages
        </p>
        <h1 className="font-serif text-5xl text-emerald-950">
          Reflective messages with calm replies and deterministic moderation.
        </h1>
        <p className="text-lg leading-8 text-stone-700">
          The product keeps this space intentionally soft: no downvotes, shallow thread depth,
          supportive reactions, and clear rule-based moderation.
        </p>
      </section>
      <UnsentFeed messages={demoUnsentMessages} />
    </div>
  );
}
