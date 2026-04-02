type CommonGroundPanelProps = {
  items: string[];
};

export function CommonGroundPanel({ items }: CommonGroundPanelProps) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
        Common ground
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  );
}
