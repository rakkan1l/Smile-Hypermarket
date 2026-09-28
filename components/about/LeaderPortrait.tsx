import Image from "next/image";
import type { Leader } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Portrait with an elegant monogram fallback when no photo is set. */
export function LeaderPortrait({ leader, sizes, className }: { leader: Leader; sizes: string; className?: string }) {
  const initials = leader.position
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <div className={cn("relative overflow-hidden bg-light-blue", className)}>
      {leader.image ? (
        <Image
          src={leader.image}
          alt={`Portrait of ${leader.name}, ${leader.position} of Smile Hypermarket`}
          fill
          sizes={sizes}
          className="object-cover object-top grayscale-[20%] transition-all duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" role="img" aria-label={`Portrait of ${leader.name} coming soon`}>
          <span aria-hidden className="font-display text-7xl tracking-[-0.05em] text-smile-blue/40">{initials}</span>
          <span aria-hidden className="font-ui text-xs uppercase tracking-[0.24em] text-smile-blue/60">Portrait coming soon</span>
        </div>
      )}
    </div>
  );
}
