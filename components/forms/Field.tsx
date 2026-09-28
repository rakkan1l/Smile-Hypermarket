import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const control =
  "peer w-full rounded-[var(--radius)] border bg-white px-4 font-body text-[15px] text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4";
const controlState = (error?: string) =>
  error
    ? "border-[#c2410c] focus:border-[#c2410c] focus:ring-[#c2410c]/10"
    : "border-line-strong hover:border-ink-muted focus:border-smile-blue focus:ring-smile-blue/10";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Label + control + hint/error wrapper with correct aria wiring. */
export function Field({ id, label, error, hint, required, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-ui text-sm text-ink">
        {label}
        {required ? <span className="ml-0.5 text-smile-blue" aria-hidden>*</span> : <span className="ml-1.5 text-ink-muted">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-[#c2410c]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

type InputProps = ComponentPropsWithoutRef<"input"> & { error?: string; hint?: string };

export function TextInput({ id, error, hint, className, ...rest }: InputProps & { id: string }) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      className={cn(control, controlState(error), "h-12", className)}
      {...rest}
    />
  );
}

export function TextArea({ id, error, hint, className, ...rest }: ComponentPropsWithoutRef<"textarea"> & { id: string; error?: string; hint?: string }) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      className={cn(control, controlState(error), "min-h-[140px] resize-y py-3", className)}
      {...rest}
    />
  );
}

export function Select({
  id,
  error,
  hint,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"select"> & { id: string; error?: string; hint?: string }) {
  return (
    <div className="relative">
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, controlState(error), "h-12 appearance-none pr-11", className)}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
    </div>
  );
}
