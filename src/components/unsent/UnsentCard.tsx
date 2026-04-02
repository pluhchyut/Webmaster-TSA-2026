import Link from "next/link";

import { SupportReactionBar } from "@/components/unsent/SupportReactionBar";
import { type demoUnsentMessages } from "@/lib/demoContent";

type UnsentCardProps = {
  message: (typeof demoUnsentMessages)[number];
};

export function UnsentCard({ message }: UnsentCardProps) {
  return (
    <article className="space-y-4 rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
        <span>{message.toneTag}</span>
        {message.featured ? (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Featured</span>
        ) : null}
      </div>
      <div className="space-y-2">
        {message.title ? (
          <h3 className="font-serif text-2xl text-emerald-950">{message.title}</h3>
        ) : null}
        <p className="text-sm leading-7 text-stone-700">{message.body}</p>
      </div>
      <SupportReactionBar reactions={message.reactionCounts} />
      <div className="flex items-center justify-between text-sm">
        <span className="text-stone-500">{message.replies.length} supportive replies</span>
        <Link className="font-semibold text-emerald-800" href={`/unsent/${message.id}`}>
          Open thread →
        </Link>
      </div>
    </article>
  );
}
