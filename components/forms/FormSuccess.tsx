"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

export function FormSuccess({ title, message, action }: { title: string; message: string; action?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="status"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start rounded-[var(--radius-lg)] border border-line bg-light-green/60 p-8 outline-none sm:p-12"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-smile-green">
        <CircleCheck aria-hidden className="size-7" strokeWidth={1.5} />
      </span>
      <h3 className="mt-6 text-3xl tracking-[-0.03em]">{title}</h3>
      <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{message}</p>
      {action && <div className="mt-8">{action}</div>}
    </motion.div>
  );
}
