import { MapPin } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { getMapEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/cn";

/**
 * Map area. Uses a Google Maps embed today; swap the <iframe> for a
 * Google Maps JS component later without touching any caller —
 * callers only pass the outlet to display.
 */
export function MapPanel({ outlet, className, zoom = 15 }: { outlet: Outlet; className?: string; zoom?: number }) {
  return (
    <div className={cn("relative overflow-hidden bg-soft-grey", className)}>
      <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-muted">
        <MapPin className="size-6" />
        <span className="font-ui text-sm">Loading map…</span>
      </div>
      <iframe
        key={outlet.slug}
        title={`Map showing Smile ${outlet.name}`}
        src={getMapEmbedUrl(outlet, zoom)}
        className="relative size-full border-0 grayscale-[35%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
