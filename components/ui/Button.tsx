import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "green" | "outline" | "light" | "ghost-light" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap font-ui font-normal tracking-[0.01em] transition-all duration-300 ease-[var(--ease-premium)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-smile-blue text-white hover:bg-smile-blue-dark rounded-full",
  green: "bg-smile-green text-white hover:bg-smile-green-dark rounded-full",
  outline: "border border-line-strong text-ink hover:border-ink bg-white rounded-full",
  light: "bg-white text-ink hover:bg-off-white rounded-full",
  "ghost-light": "border border-white/40 text-white hover:bg-white/10 hover:border-white/70 rounded-full backdrop-blur-sm",
  text: "text-smile-blue hover:text-smile-blue-dark px-0! h-auto! underline-offset-4",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

function Inner({ children, arrow, icon }: Pick<CommonProps, "children" | "arrow" | "icon">) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
}

type ButtonLinkProps = CommonProps & { href: string; external?: boolean } & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

/** Link styled as a button. Uses next/link for internal routes, <a> for tel:, mailto: and external URLs. */
export function ButtonLink({ href, external, variant = "primary", size = "md", arrow, icon, className, children, ...rest }: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        <Inner arrow={arrow} icon={icon}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <Inner arrow={arrow} icon={icon}>{children}</Inner>
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Button({ variant = "primary", size = "md", arrow, icon, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner arrow={arrow} icon={icon}>{children}</Inner>
    </button>
  );
}
