import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

export function ComingSoonCard({ outlet }: { outlet: Outlet }) {
  return (
    <article className="group grid overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white md:grid-cols-2">
      <div className="relative min-h-[260px] overflow-hidden bg-soft-grey">
        <Image
          src={outlet.image}
          alt={`${outlet.area}, Kannur`}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <Badge tone="amber" className="self-start">
          <Sparkles aria-hidden className="size-3.5" /> Coming Soon
        </Badge>
        <h3 className="mt-6 text-4xl tracking-[-0.035em] sm:text-5xl">{outlet.name}</h3>
        <p className="mt-2 font-ui text-sm uppercase tracking-[0.2em] text-ink-muted">
          {outlet.city}, {outlet.country}
        </p>
        <p className="mt-5 max-w-md leading-relaxed text-ink-soft">{outlet.intro}</p>
        <Link href={`/outlets/${outlet.slug}`} className="mt-8 self-start font-ui text-[15px] text-smile-blue underline-offset-4 hover:underline">
          Follow the opening
        </Link>
      </div>
    </article>
  );
}
