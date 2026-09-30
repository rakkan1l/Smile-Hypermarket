"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Swipeable photo slider for an outlet.
 *
 * Built on native CSS scroll-snap rather than a carousel library: touch
 * swiping, momentum and accessibility come from the browser, and the
 * arrows/dots simply drive scrollTo. The active slide is derived from
 * scroll position, so dragging and button presses stay in sync.
 */
export function OutletGallery({ photos, name }: { photos: string[]; name: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Derive the active slide from scroll position so swiping updates the dots.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive((prev) => (prev === index ? prev : Math.min(Math.max(index, 0), photos.length - 1)));
  }, [photos.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }, []);

  if (photos.length === 0) return null;

  // A single photo needs no slider chrome.
  const isSlider = photos.length > 1;
  const atStart = active === 0;
  const atEnd = active === photos.length - 1;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Photos of Smile ${name}`}
    >
      <ul
        ref={trackRef}
        className={cn(
          "no-scrollbar flex overflow-x-auto rounded-[var(--radius-lg)] bg-soft-grey",
          isSlider && "snap-x snap-mandatory",
        )}
        // Arrow keys move between slides when the track has focus.
        tabIndex={isSlider ? 0 : -1}
        onKeyDown={(e) => {
          if (!isSlider) return;
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(Math.min(active + 1, photos.length - 1)); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(Math.max(active - 1, 0)); }
        }}
      >
        {photos.map((src, i) => (
          <li
            key={`${src}-${i}`}
            className="relative aspect-[16/10] w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${photos.length}`}
          >
            <Image
              src={src}
              alt={`Inside Smile ${name}, photo ${i + 1} of ${photos.length}`}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </li>
        ))}
      </ul>

      {isSlider && (
        <>
          {/* Arrows — pointer users. Hidden from touch-only layouts where
              swiping is the natural gesture, but still keyboard reachable. */}
          <button
            type="button"
            onClick={() => goTo(Math.max(active - 1, 0))}
            disabled={atStart}
            aria-label="Previous photo"
            className={cn(
              "absolute left-4 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full",
              "bg-background/85 text-ink shadow-[var(--shadow-soft)] backdrop-blur-sm transition",
              "hover:bg-background disabled:pointer-events-none disabled:opacity-0 sm:inline-flex",
            )}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(active + 1, photos.length - 1))}
            disabled={atEnd}
            aria-label="Next photo"
            className={cn(
              "absolute right-4 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full",
              "bg-background/85 text-ink shadow-[var(--shadow-soft)] backdrop-blur-sm transition",
              "hover:bg-background disabled:pointer-events-none disabled:opacity-0 sm:inline-flex",
            )}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 ease-[var(--ease-premium)]",
                  i === active ? "w-7 bg-smile-blue" : "w-1.5 bg-line-strong hover:bg-ink-muted",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
