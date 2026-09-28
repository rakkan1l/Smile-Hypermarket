import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Eyebrow } from "./SectionHeading";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface BaseProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Full-bleed photographic hero for inner pages (navbar sits transparent over it). */
export function ImageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  image,
  imageAlt,
  className,
}: BaseProps & { image: string; imageAlt: string; className?: string }) {
  return (
    <section className={cn("relative isolate flex min-h-[600px] items-end overflow-hidden bg-ink h-[82svh]", className)}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 animate-[hero-zoom_14s_cubic-bezier(0.22,1,0.36,1)_both] object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/30" />
      <Container className="pb-14 sm:pb-20">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone="light" className="mb-8" />}
        <div className="max-w-4xl animate-[rise_1s_0.15s_cubic-bezier(0.22,1,0.36,1)_both]">
          {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
          <h1 className="mt-6 text-balance text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">{description}</p>}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

/** Typographic hero on white for utility pages. */
export function EditorialHero({ eyebrow, title, description, breadcrumbs, children, aside }: BaseProps & { aside?: ReactNode }) {
  return (
    <section className="pb-14 pt-32 sm:pb-20 sm:pt-40 lg:pt-44">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-10" />}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={cn("animate-[rise_1s_0.1s_cubic-bezier(0.22,1,0.36,1)_both]", aside ? "lg:col-span-8" : "lg:col-span-10")}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="mt-6 text-balance text-[44px] leading-[1] tracking-[-0.04em] sm:text-7xl lg:text-[88px]">{title}</h1>
            {description && <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{description}</p>}
            {children && <div className="mt-10">{children}</div>}
          </div>
          {aside && <div className="animate-[rise_1s_0.3s_cubic-bezier(0.22,1,0.36,1)_both] lg:col-span-4">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
