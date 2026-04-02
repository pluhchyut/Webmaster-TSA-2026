import { notFound } from "next/navigation";

import { MemoryCommentComposer } from "@/components/memory/MemoryCommentComposer";
import { MemoryCommentList } from "@/components/memory/MemoryCommentList";
import { MemoryStrengthBar } from "@/components/memory/MemoryStrengthBar";
import { demoMemories } from "@/lib/demoContent";

export default async function MemoryDetailPage({
  params,
}: {
  params: Promise<{ memoryId: string }>;
}) {
  const { memoryId } = await params;
  const memory = demoMemories.find((entry) => entry.id === memoryId);

  if (!memory) notFound();

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            {memory.locationName ?? "Community memory"}
          </p>
          <h1 className="mt-4 font-serif text-5xl text-emerald-950">{memory.title}</h1>
          <p className="mt-5 text-base leading-8 text-stone-700">{memory.body}</p>
          <div className="mt-8 space-y-4">
            <MemoryStrengthBar score={memory.strengthScore} />
            <div className="flex flex-wrap gap-2">
              {["React", "Comment", "Context add", "Verify location"].map((label) => (
                <button
                  key={label}
                  className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700"
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Discussion
            </p>
            <h2 className="mt-2 font-serif text-3xl text-emerald-950">Community context</h2>
          </div>
          <MemoryCommentList comments={memory.comments} />
        </div>
      </section>

      <aside className="space-y-5">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Memory signals
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
            <li>• Weighted interactions: {memory.metrics.weightedInteractions}</li>
            <li>• Recent interaction weight: {memory.metrics.recentWeightedInteractions}</li>
            <li>• Unique participants: {memory.metrics.uniqueParticipants}</li>
            <li>• Feed score: {memory.feedScore}</li>
          </ul>
        </div>
        <MemoryCommentComposer buttonLabel="Add context" label="Add a comment or reply" />
      </aside>
    </div>
  );
}
