import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, Clock3, Plane, ShieldCheck, ShoppingBasket } from "lucide-react";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const departments = ["Fresh produce", "Fish & meat", "Bakery", "Dairy", "Grocery", "Household", "Personal care", "Home & kitchen"];

function Tile({ className, children, delay = 0 }: { className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn("relative overflow-hidden rounded-[var(--radius-lg)]", className)}>
      {children}
    </Reveal>
  );
}

function TileText({ title, body, light }: { title: string; body: string; light?: boolean }) {
  return (
    <div>
      <h3 className={cn("text-2xl tracking-[-0.025em] sm:text-[28px]", light && "text-white")}>{title}</h3>
      <p className={cn("mt-2 max-w-sm text-[15px] leading-relaxed", light ? "text-white/80" : "text-ink-soft")}>{body}</p>
    </div>
  );
}

export function WhyChooseBento() {
  return (
    <section aria-labelledby="why-heading" className="bg-off-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="Why Smile"
          title="Why Families Choose Smile"
          description="Five promises we keep in every store — from our first outlet in Kannur to our newest in Ajman."
        />

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(260px,auto))_minmax(240px,auto)]">
          {/* 1. Premium Quality — tall image tile */}
          <Tile className="group min-h-[420px] lg:col-span-7 lg:row-span-2">
            <Image
              src={images.produce}
              alt="Fresh fruit and vegetables neatly displayed"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 sm:p-10">
              <TileText light title="Premium Quality" body="Trusted products selected for everyday families." />
              <ShieldCheck aria-hidden className="hidden size-8 shrink-0 text-white/80 sm:block" strokeWidth={1.4} />
            </div>
          </Tile>

          {/* 2. Best Prices — typographic tile */}
          <Tile delay={0.05} className="flex flex-col justify-between gap-10 bg-light-green p-7 sm:p-9 lg:col-span-5">
            <div className="flex items-start justify-between">
              <BadgePercent aria-hidden className="size-7 text-smile-green" strokeWidth={1.4} />
              <p className="font-display text-6xl leading-none tracking-[-0.05em] text-smile-green-dark/90 sm:text-7xl">
                ₹<span className="text-smile-green-dark/40">/</span>AED
              </p>
            </div>
            <TileText title="Best Prices" body="Great value with competitive everyday pricing." />
          </Tile>

          {/* 3. One-Stop Shopping — department chips */}
          <Tile delay={0.1} className="flex flex-col justify-between gap-8 border border-line bg-white p-7 sm:p-9 lg:col-span-5">
            <ShoppingBasket aria-hidden className="size-7 text-smile-blue" strokeWidth={1.4} />
            <ul className="flex flex-wrap gap-2" aria-label="Departments">
              {departments.map((d) => (
                <li key={d} className="rounded-full border border-line px-3 py-1.5 font-ui text-xs text-ink-soft">
                  {d}
                </li>
              ))}
            </ul>
            <TileText title="One-Stop Shopping" body="Everything your family needs in one destination." />
          </Tile>

          {/* 4. Convenient Service */}
          <Tile className="flex flex-col justify-between gap-10 border border-line bg-white p-7 sm:p-9 lg:col-span-4">
            <Clock3 aria-hidden className="size-7 text-smile-blue" strokeWidth={1.4} />
            <TileText title="Convenient Service" body="Comfortable and easy shopping experiences." />
          </Tile>

          {/* 5. Cross-Border Shopping — route graphic */}
          <Tile delay={0.05} className="flex flex-col justify-between gap-10 bg-light-blue p-7 sm:p-9 lg:col-span-8">
            <div className="flex items-center gap-4 font-ui text-sm text-smile-blue-dark sm:gap-6">
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] text-smile-blue-dark/60">India</span>
                <span className="font-display text-2xl tracking-[-0.02em] sm:text-3xl">Kannur</span>
              </span>
              <span aria-hidden className="relative flex flex-1 items-center">
                <span className="h-px flex-1 border-t border-dashed border-smile-blue/40" />
                <Plane className="mx-2 size-5 text-smile-blue" strokeWidth={1.4} />
                <span className="h-px flex-1 border-t border-dashed border-smile-blue/40" />
              </span>
              <span className="flex flex-col text-right">
                <span className="text-xs uppercase tracking-[0.2em] text-smile-blue-dark/60">UAE</span>
                <span className="font-display text-2xl tracking-[-0.02em] sm:text-3xl">Ajman</span>
              </span>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <TileText title="Cross-Border Shopping" body="Taking the trusted Smile experience from India to the UAE." />
              <Link href="/outlets" className="group inline-flex items-center gap-2 font-ui text-[15px] text-smile-blue">
                See all outlets
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Tile>
        </div>
      </Container>
    </section>
  );
}
