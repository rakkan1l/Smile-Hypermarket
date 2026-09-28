import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";

export interface SocialCardProps {
  platform: string;
  handle: string;
  description: string;
  cta: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Platform colour used only for the small icon accent on hover. */
  accent: string;
}

export function SocialCard({ platform, handle, description, cta, href, Icon, accent }: SocialCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col justify-between gap-8 sm:gap-12 bg-white p-7 transition-colors duration-500 hover:bg-off-white sm:p-9"
      style={{ ["--accent" as string]: accent }}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex size-14 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 ease-[var(--ease-premium)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
          <Icon className="size-6" />
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-5 text-ink-muted transition-transform duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
        />
      </div>
      <div>
        <p className="font-ui text-sm text-ink-muted">{handle}</p>
        <h3 className="mt-2 text-3xl tracking-[-0.03em]">{platform}</h3>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft">{description}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-ui text-[15px] text-smile-blue">
          {cta}
          <span aria-hidden className="h-px w-6 bg-current transition-all duration-500 ease-[var(--ease-premium)] group-hover:w-10" />
        </span>
      </div>
    </a>
  );
}
