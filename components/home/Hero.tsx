"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero({ heroImage }: { heroImage: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <section ref={ref} aria-label="Welcome to Smile Hypermarket" className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink-fixed h-[92svh] lg:h-[100svh]">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="Bright, well-stocked aisle inside a Smile hypermarket"
          fill
          priority
          sizes="100vw"
          className="animate-[hero-zoom_14s_cubic-bezier(0.22,1,0.36,1)_both] object-cover"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/35 to-black/30" />

      <motion.div style={{ y: contentY }} className="w-full">
        <Container className="pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-4xl">
            <p className="animate-[rise_0.9s_0.1s_cubic-bezier(0.22,1,0.36,1)_both] inline-flex items-center gap-3 font-ui text-xs uppercase tracking-[0.28em] text-white/80">
              <span>India</span>
              <ArrowRight aria-hidden className="size-3.5 text-smile-green" />
              <span>UAE</span>
            </p>
            <h1 className="animate-[rise_1s_0.2s_cubic-bezier(0.22,1,0.36,1)_both] mt-6 text-balance text-[40px] leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[84px]">
              Kannur&rsquo;s Trusted Hypermarket, <span className="text-white/70">Now Serving Families Across the UAE</span>
            </h1>
            <p className="animate-[rise_1s_0.35s_cubic-bezier(0.22,1,0.36,1)_both] mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              Freshness, quality, value and trust — bringing the Smile shopping experience from Kerala to families across borders.
            </p>
            <div className="animate-[rise_1s_0.5s_cubic-bezier(0.22,1,0.36,1)_both] mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/outlets" variant="light" size="lg" arrow>
                Explore Outlets
              </ButtonLink>
              <ButtonLink href="/about" variant="ghost-light" size="lg">
                Our Story
              </ButtonLink>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
