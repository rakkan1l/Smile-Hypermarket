"use client";

import { cn } from "@/lib/cn";

const inputBase =
  "mt-2 w-full rounded-[var(--radius)] border border-line bg-background px-4 py-2.5 text-[15px] text-ink outline-none transition placeholder:text-ink-muted focus:border-smile-blue";

export function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="flex items-baseline justify-between gap-3">
      <span className="font-ui text-xs uppercase tracking-[0.18em] text-ink-muted">{children}</span>
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </span>
  );
}

export function TextField({
  label, hint, className, ...props
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("block", className)}>
      <Label hint={hint}>{label}</Label>
      <input {...props} className={inputBase} />
    </label>
  );
}

export function TextArea({
  label, hint, rows = 4, className, ...props
}: { label: string; hint?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={cn("block", className)}>
      <Label hint={hint}>{label}</Label>
      <textarea {...props} rows={rows} className={cn(inputBase, "resize-y leading-relaxed")} />
    </label>
  );
}

export function SelectField({
  label, hint, children, className, ...props
}: { label: string; hint?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className={cn("block", className)}>
      <Label hint={hint}>{label}</Label>
      <select {...props} className={inputBase}>{children}</select>
    </label>
  );
}

/**
 * Edits a list of short strings (departments, responsibilities, …) as one
 * line per item. Far easier to use than a repeater of inputs, and it maps
 * cleanly onto the jsonb arrays in the database.
 */
export function ListField({
  label, hint, value, onChange, rows = 6, className,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (next: string[]) => void;
  rows?: number;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <Label hint={hint ?? "One per line"}>{label}</Label>
      <textarea
        rows={rows}
        value={value.join("\n")}
        onChange={(e) =>
          onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))
        }
        className={cn(inputBase, "resize-y leading-relaxed")}
      />
    </label>
  );
}

export function Card({ title, description, children }: {
  title?: string; description?: string; children: React.ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-lg)] border border-line bg-background p-6 sm:p-8">
      {title && (
        <header className="mb-6">
          <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink">{title}</h2>
          {description && <p className="mt-1.5 text-sm text-ink-soft">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
