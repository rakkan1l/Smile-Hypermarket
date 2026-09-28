import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, tone = "green", className }: { children: ReactNode; tone?: "green" | "blue" | "light"; className?: string }) {
  const dot = tone === "blue" ? "bg-smile-blue" : tone === "light" ? "bg-[#ffffff]" : "bg-smile-green";
  const text = tone === "light" ? "text-white/85" : "text-ink-soft";
  return (
    <p className={cn("inline-flex items-center gap-2.5 font-ui text-xs uppercase tracking-[0.22em]", text, className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", dot)} />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: "md" | "lg";
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", action, as: Tag = "h2", className, size = "md", id }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action && !centered && "md:flex-row md:items-end md:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex max-w-3xl flex-col gap-5", centered && "items-center")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Tag
          id={id}
          className={cn(
            "text-balance leading-[1.05]",
            size === "lg" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl",
          )}
        >
          {title}
        </Tag>
        {description && <p className="max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
