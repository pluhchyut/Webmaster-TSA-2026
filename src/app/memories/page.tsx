import { MemoryFeed } from "@/components/memory/MemoryFeed";
import { demoMemories } from "@/lib/demoContent";

export default function MemoriesPage() {
  const memories = [...demoMemories].sort((a, b) => b.feedScore - a.feedScore);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Community Memory
        </p>
        <h1 className="font-serif text-5xl text-emerald-950">Shared memories stay visible when the community keeps them alive.</h1>
        <p className="text-lg leading-8 text-stone-700">
          Cards below visually fade as their strength score drops. Reactions, comments, context
          additions, and location verification revive them.
        </p>
      </section>
      <MemoryFeed memories={memories} />
    </div>
  );
}
