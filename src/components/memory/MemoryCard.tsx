import Link from "next/link";

import { MemoryStrengthBar } from "@/components/memory/MemoryStrengthBar";
import { type demoMemories } from "@/lib/demoContent";

type MemoryCardProps = {
  memory: (typeof demoMemories)[number];
};

export function MemoryCard({ memory }: MemoryCardProps) {
  const { clarity } = memory;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div
        className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(200,161,90,0.18),transparent_42%)]"
        style={{ opacity: clarity.noiseOpacity }}
      />
      <div
        className="relative space-y-4"
        style={{
          opacity: clarity.opacity,
          filter: `blur(${clarity.blurPx}px) grayscale(${clarity.grayscale})`,
        }}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          <span>{memory.locationName ?? "Community memory"}</span>
          {memory.revivedRecently ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 tracking-[0.14em] text-emerald-800">
              Revived
            </span>
          ) : null}
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl text-emerald-950">{memory.title}</h3>
          <p className="text-sm leading-7 text-stone-700">{memory.excerpt}</p>
        </div>
        <MemoryStrengthBar score={memory.strengthScore} />
      </div>
      <div className="relative mt-5 flex items-center justify-between text-sm">
        <span className="text-stone-500">{memory.comments.length} discussion threads</span>
        <Link
          className="inline-flex items-center gap-2 font-semibold text-emerald-800 transition group-hover:gap-3"
          href={`/memories/${memory.id}`}
        >
          Open memory <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
