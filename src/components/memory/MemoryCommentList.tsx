type MemoryComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  replies?: MemoryComment[];
};

type MemoryCommentListProps = {
  comments: MemoryComment[];
};

export function MemoryCommentList({ comments }: MemoryCommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-semibold text-emerald-950">{comment.author}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm leading-7 text-stone-700">{comment.body}</p>
          {comment.replies?.length ? (
            <div className="mt-4 space-y-3 border-l border-stone-200 pl-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="rounded-2xl bg-stone-50 p-3">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="font-semibold text-emerald-900">{reply.author}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
                      {new Date(reply.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-stone-700">{reply.body}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
