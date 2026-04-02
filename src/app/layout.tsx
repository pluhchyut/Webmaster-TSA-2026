import type { Metadata } from "next";
import Link from "next/link";

import { COMMUNITY_COPY } from "@/lib/constants";
import { optionalUser } from "@/lib/auth";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Community Hub",
  description:
    "A no-AI community platform for shared memory, reflective messages, and structured civic perspective switching.",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/memories", label: "Memories" },
  { href: "/unsent", label: "Unsent" },
  { href: "/issues", label: "Issues" },
  { href: "/admin", label: "Admin" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await optionalUser();

  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <div className="min-h-screen">
          <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
              <div>
                <Link className="font-serif text-3xl text-emerald-950" href="/">
                  {COMMUNITY_COPY.appName}
                </Link>
                <p className="text-sm text-stone-600">{COMMUNITY_COPY.noAiNotice}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <nav className="flex flex-wrap items-center gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 hover:text-emerald-900"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <span className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white">
                  {user ? `${user.displayName} · ${user.role}` : "Guest"}
                </span>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
