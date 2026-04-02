type SupportReactionBarProps = {
  reactions: Record<string, number>;
};

export function SupportReactionBar({ reactions }: SupportReactionBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(reactions).map(([label, count]) => (
        <button
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-emerald-700 hover:text-emerald-900"
          type="button"
        >
          <span>{label.replaceAll("_", " ")}</span>
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">{count}</span>
        </button>
      ))}
    </div>
  );
}
