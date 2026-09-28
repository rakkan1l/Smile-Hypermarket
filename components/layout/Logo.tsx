import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Official Smile Hypermarket logo.
 * Files live in /public/images/brand:
 *   logo-horizontal.png        full-colour lock-up (bag mark + wordmark)
 *   logo-horizontal-white.png  single-colour white version for dark photos
 *   logo-stacked.png           original stacked layout
 */
const RATIO = 765 / 240;

export function Logo({
  tone = "dark",
  className,
  height = 40,
}: {
  tone?: "dark" | "light";
  className?: string;
  /** Rendered height in px. */
  height?: number;
}) {
  const width = Math.round(height * RATIO);
  const light = tone === "light";
  return (
    <Link href="/" aria-label="Smile Hypermarket — Home" className={cn("relative inline-block shrink-0", className)} style={{ width, height }}>
      <Image
        src="/images/brand/logo-horizontal.png"
        alt="Smile Hypermarket"
        width={width}
        height={height}
        priority
        className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", light ? "opacity-0" : "opacity-100")}
      />
      <Image
        src="/images/brand/logo-horizontal-white.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
        priority
        className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", light ? "opacity-100" : "opacity-0")}
      />
    </Link>
  );
}
