type MemoryCommentComposerProps = {
  label: string;
  buttonLabel: string;
};

export function MemoryCommentComposer({
  label,
  buttonLabel,
}: MemoryCommentComposerProps) {
  return (
    <form className="space-y-3 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-emerald-950">{label}</span>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white"
          placeholder="Share context that helps this memory stay visible."
        />
      </label>
      <button
        className="inline-flex rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
        type="submit"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
