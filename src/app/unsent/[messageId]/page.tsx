import { notFound } from "next/navigation";

import { SupportReactionBar } from "@/components/unsent/SupportReactionBar";
import { UnsentReplyComposer } from "@/components/unsent/UnsentReplyComposer";
import { UnsentReplyList } from "@/components/unsent/UnsentReplyList";
import { demoUnsentMessages } from "@/lib/demoContent";

export default async function UnsentDetailPage({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) {
  const { messageId } = await params;
  const message = demoUnsentMessages.find((entry) => entry.id === messageId);

  if (!message) notFound();

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            {message.toneTag}
          </p>
          {message.title ? (
            <h1 className="mt-4 font-serif text-5xl text-emerald-950">{message.title}</h1>
          ) : (
            <h1 className="mt-4 font-serif text-5xl text-emerald-950">Anonymous reflection</h1>
          )}
          <p className="mt-5 text-base leading-8 text-stone-700">{message.body}</p>
          <div className="mt-8">
            <SupportReactionBar reactions={message.reactionCounts} />
          </div>
        </article>
        <div className="space-y-4">
          <h2 className="font-serif text-3xl text-emerald-950">Replies</h2>
          <UnsentReplyList replies={message.replies} />
        </div>
      </section>
      <aside className="space-y-5">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Moderation model
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
            <li>• Rule-based filters only</li>
            <li>• Manual moderator approval queue</li>
            <li>• Max thread depth of two levels</li>
            <li>• No downvotes or rage-bait mechanics</li>
          </ul>
        </div>
        <UnsentReplyComposer disabled={!message.replyEnabled} />
      </aside>
    </div>
  );
}
