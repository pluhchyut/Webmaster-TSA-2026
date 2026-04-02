import Link from "next/link";

const featureCards = [
  {
    href: "/memories",
    title: "Community Memory",
    body:
      "Memories fade unless people bring them back with reactions, context, and discussion.",
  },
  {
    href: "/unsent",
    title: "Unsent Messages",
    body:
      "Reflective anonymous notes with calm, shallow-threaded support and deterministic moderation.",
  },
  {
    href: "/issues",
    title: "Perspective Switcher",
    body:
      "Human-authored civic issue pages that let people move across stakeholder viewpoints without AI summaries.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-12 md:py-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            Deterministic by design
          </p>
          <h1 className="font-serif text-5xl leading-tight text-emerald-950 md:text-7xl">
            A community hub that remembers, reflects, and compares perspectives.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-700">
            This foundation uses standard application code, relational data modeling, rule-based
            moderation, and manually authored content. No LLMs, no embeddings, and no AI-powered
            API calls are used anywhere in the platform.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/memories">
              Explore memories
            </Link>
            <Link className="btn-secondary" href="/issues">
              View issues
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Platform promise
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-stone-700">
            <li>• Memory clarity comes from deterministic scoring formulas.</li>
            <li>• Unsent moderation uses explainable rule checks and auditable logs.</li>
            <li>• Perspective switching is human-authored structured content only.</li>
            <li>• Role-based permissions and route guards live on the server.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {featureCards.map((card) => (
          <article key={card.href} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-3xl text-emerald-950">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">{card.body}</p>
            <Link className="mt-5 inline-flex font-semibold text-emerald-800" href={card.href}>
              Open section →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
