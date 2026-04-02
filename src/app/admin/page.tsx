import Link from "next/link";

const adminLinks = [
  {
    href: "/admin/moderation",
    title: "Moderation queue",
    body: "Review pending messages, replies, and reports with deterministic reasons and notes.",
  },
  {
    href: "/admin/issues",
    title: "Issue authoring",
    body: "Create issue pages and manage manually authored stakeholder perspectives.",
  },
];

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Admin
        </p>
        <h1 className="font-serif text-5xl text-emerald-950">
          Moderation and authorship stay human-controlled.
        </h1>
        <p className="text-lg leading-8 text-stone-700">
          The admin side is designed around auditability: moderator actions are logged, content
          changes are structured, and the perspective switcher is authored directly by people.
        </p>
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        {adminLinks.map((item) => (
          <article key={item.href} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-3xl text-emerald-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">{item.body}</p>
            <Link className="mt-5 inline-flex font-semibold text-emerald-800" href={item.href}>
              Open →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
