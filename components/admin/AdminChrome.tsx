"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Briefcase, Images, LogOut, Phone, Store, Users, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/admin/outlets",    label: "Outlets",     Icon: Store },
  { href: "/admin/careers",    label: "Vacancies",   Icon: Briefcase },
  { href: "/admin/leadership", label: "Leadership",  Icon: Users },
  { href: "/admin/images",     label: "Site images", Icon: Images },
  { href: "/admin/contact",    label: "Contact",     Icon: Phone },
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // The login page supplies its own full-screen layout.
  if (pathname === "/admin/login") return <>{children}</>;

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-off-white">
      <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-8">
          <Link href="/admin" className="font-display text-lg tracking-[-0.02em] text-ink">
            Smile <span className="text-ink-muted">Admin</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-2 rounded-full px-4 py-2 font-ui text-sm text-ink-soft transition hover:text-ink sm:inline-flex"
            >
              View site <ExternalLink aria-hidden className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-ui text-sm text-ink-soft transition hover:border-ink hover:text-ink"
            >
              <LogOut aria-hidden className="size-4" /> Sign out
            </button>
          </div>
        </div>

        <nav aria-label="Admin sections" className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <ul className="no-scrollbar -mb-px flex gap-1 overflow-x-auto">
            {nav.map(({ href, label, Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 font-ui text-sm transition",
                      active
                        ? "border-smile-blue text-ink"
                        : "border-transparent text-ink-soft hover:text-ink",
                    )}
                  >
                    <Icon aria-hidden className="size-4" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-14">{children}</main>
    </div>
  );
}
