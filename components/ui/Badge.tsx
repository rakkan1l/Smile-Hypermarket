import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "blue" | "green" | "neutral" | "amber" | "dark";

const tones: Record<Tone, string> = {
  blue: "bg-light-blue text-smile-blue-dark",
  green: "bg-light-green text-smile-green-dark",
  neutral: "bg-soft-grey text-ink-soft",
  amber: "bg-[#fdf4e3] text-[#8a5a00]",
  dark: "bg-ink-fixed/75 text-white backdrop-blur-md",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-ui text-xs tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}

export function CountryBadge({ country, className, onImage }: { country: "India" | "UAE"; className?: string; onImage?: boolean }) {
  if (onImage) return <Badge tone="dark" className={className}>{country}</Badge>;
  return <Badge tone={country === "India" ? "green" : "blue"} className={className}>{country}</Badge>;
}
