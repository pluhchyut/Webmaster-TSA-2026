type Reply = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  replies?: Reply[];
};

type UnsentReplyListProps = {
  replies: Reply[];
};

export function UnsentReplyList({ replies }: UnsentReplyListProps) {
  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <div key={reply.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-semibold text-emerald-950">{reply.author}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
              {new Date(reply.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm leading-7 text-stone-700">{reply.body}</p>
          {reply.replies?.length ? (
            <div className="mt-4 space-y-3 border-l border-stone-200 pl-4">
              {reply.replies.map((nestedReply) => (
                <div key={nestedReply.id} className="rounded-2xl bg-stone-50 p-3">
                  <p className="mb-1 font-semibold text-emerald-900">{nestedReply.author}</p>
                  <p className="text-sm leading-6 text-stone-700">{nestedReply.body}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
