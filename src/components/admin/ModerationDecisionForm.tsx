export function ModerationDecisionForm() {
  return (
    <form className="space-y-3 rounded-2xl bg-stone-50 p-4">
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-emerald-950">Moderator note</span>
        <textarea
          className="min-h-20 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none"
          placeholder="Document the deterministic rule or report outcome."
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {["Approve", "Reject", "Remove"].map((label) => (
          <button
            key={label}
            className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </form>
  );
}
