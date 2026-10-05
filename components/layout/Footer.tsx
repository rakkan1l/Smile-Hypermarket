import Link from "next/link";
import { mainNav } from "@/data/site";
import { getOutlets } from "@/lib/content";
import type { SiteSettings } from "@/lib/content";
import type { Country, Outlet } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SocialIconLinks } from "@/components/ui/SocialIconLinks";
import { Logo } from "./Logo";

const exploreLinks = mainNav.map((l) => (l.href === "/about" ? { ...l, label: "Our Story" } : l));

function FooterHeading({ children }: { children: string }) {
  return <h2 className="font-ui text-xs uppercase tracking-[0.22em] text-ink-muted">{children}</h2>;
}

const linkClass = "text-[15px] text-ink-soft transition-colors duration-300 hover:text-smile-blue";

function CountryColumn({ country, outlets }: { country: Country; outlets: Outlet[] }) {
  return (
    <div>
      <FooterHeading>{country}</FooterHeading>
      <ul className="mt-5 space-y-3">
        {outlets.filter((o) => o.country === country).map((o) => (
          <li key={o.slug}>
            <Link href={`/outlets/${o.slug}`} className={linkClass}>
              {o.shortName}
              {o.status === "coming-soon" && <span className="ml-2 text-xs text-smile-green-dark">— Coming Soon</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer({ settings }: { settings: SiteSettings }) {
  const all = await getOutlets();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-off-white">
      <Container className="pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo height={52} />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug tracking-[-0.02em] text-ink">{settings.tagline}</p>
            <SocialIconLinks className="mt-8" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-2 lg:col-span-7">
            <div>
              <FooterHeading>Explore</FooterHeading>
              <ul className="mt-5 space-y-3">
                {exploreLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <CountryColumn country="India" outlets={all} />
            <CountryColumn country="UAE" outlets={all} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Smile Hypermarket. All Rights Reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="transition-colors hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-ink">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
