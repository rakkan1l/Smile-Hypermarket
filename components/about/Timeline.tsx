"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { milestones } from "@/data/story";
import { cn } from "@/lib/cn";

/** Editorial vertical timeline with alternating image/text and a scroll-linked progress line. */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line lg:left-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-smile-green lg:left-1/2"
      />
      {milestones.map((m, i) => {
        const flip = i % 2 === 1;
        return (
          <li key={m.label} className="relative grid gap-8 pb-20 pl-12 last:pb-0 lg:grid-cols-2 lg:gap-24 lg:pb-32 lg:pl-0">
            <span aria-hidden className="absolute left-[5px] top-2 size-[13px] rounded-full border-2 border-white bg-smile-green ring-1 ring-line lg:left-1/2 lg:-translate-x-1/2" />

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={cn("lg:pt-0", flip ? "lg:order-2 lg:pl-4" : "lg:pr-4 lg:text-right")}
            >
              <p className="font-ui text-xs uppercase tracking-[0.24em] text-smile-green-dark">
                {String(i + 1).padStart(2, "0")} — {m.label}
              </p>
              <h3 className="mt-4 text-balance text-3xl leading-[1.08] tracking-[-0.03em] sm:text-4xl">{m.title}</h3>
              <p className={cn("mt-4 max-w-md text-pretty leading-relaxed text-ink-soft", !flip && "lg:ml-auto")}>{m.body}</p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, clipPath: "inset(10% 0% 0% 0%)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn("relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-soft-grey", flip && "lg:order-1")}
            >
              <Image src={m.image} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
