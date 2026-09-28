import Image from "next/image";
import type { CSSProperties } from "react";
import { brandsRowOne, brandsRowTwo, type Brand } from "@/data/brands";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <li
      className="group/brand flex h-20 w-40 shrink-0 items-center justify-center sm:h-24 sm:w-52"
      style={{ "--brand": brand.color } as CSSProperties}
    >
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={140}
          height={56}
          className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-500 group-hover/brand:scale-105 group-hover/brand:opacity-100 group-hover/brand:grayscale-0"
        />
      ) : (
        <span className="font-display text-[22px] tracking-[-0.02em] text-ink-muted transition-all duration-500 ease-[var(--ease-premium)] group-hover/brand:scale-105 group-hover/brand:text-[var(--brand)] sm:text-[26px]">
          {brand.name}
        </span>
      )}
    </li>
  );
}

function MarqueeRow({ brands, reverse, label }: { brands: Brand[]; reverse?: boolean; label: string }) {
  // Each half must be wider than the widest screen, so short lists are repeated.
  const set = brands.length < 12 ? [...brands, ...brands] : brands;
  return (
    <div className="marquee-mask group/row overflow-hidden">
      <p className="sr-only">
        {label}: {brands.map((b) => b.name).join(", ")}
      </p>
      <div
        className={cn(
          "flex w-max group-hover/row:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        <ul aria-hidden className="flex">
          {set.map((b, i) => (
            <BrandItem key={`${b.name}-${i}`} brand={b} />
          ))}
        </ul>
        {/* Visual loop only; the names are announced once via the sr-only text above. */}
        <ul aria-hidden className="flex">
          {set.map((b, i) => (
            <BrandItem key={`${b.name}-${i}`} brand={b} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Reusable infinite brand marquee. Pass custom rows to reuse it elsewhere. */
export function BrandsMarquee({ rows = [brandsRowOne, brandsRowTwo] }: { rows?: Brand[][] }) {
  return (
    <section aria-labelledby="brands-heading" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionHeading eyebrow="Top Brands" id="brands-heading" title="Brands You Know. Quality You Trust." />
          </div>
          <p className="max-w-sm text-ink-soft md:col-span-5 md:justify-self-end">
            Household names from India, the Gulf and around the world — alongside the Kerala favourites our customers grew up with.
          </p>
        </div>
      </Container>
      <div className="mt-12 space-y-2 sm:mt-16">
        {rows.map((row, i) => (
          <MarqueeRow key={i} brands={row} reverse={i % 2 === 1} label={i === 0 ? "Featured brands" : "More brands"} />
        ))}
      </div>
    </section>
  );
}
