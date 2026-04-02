import { MemoryCard } from "@/components/memory/MemoryCard";
import { type demoMemories } from "@/lib/demoContent";

type MemoryFeedProps = {
  memories: typeof demoMemories;
};

export function MemoryFeed({ memories }: MemoryFeedProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  );
}
