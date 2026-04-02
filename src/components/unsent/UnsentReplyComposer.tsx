type UnsentReplyComposerProps = {
  disabled?: boolean;
};

export function UnsentReplyComposer({ disabled = false }: UnsentReplyComposerProps) {
  return (
    <form className="space-y-3 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-emerald-950">Send support</span>
        <textarea
          className="min-h-24 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled}
          placeholder="Keep replies calm, supportive, and non-identifying."
        />
      </label>
      <button
        className="inline-flex rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={disabled}
        type="submit"
      >
        Post reply
      </button>
    </form>
  );
}
