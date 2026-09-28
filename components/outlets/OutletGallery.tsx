import Image from "next/image";
import { cn } from "@/lib/cn";

/** Asymmetric gallery: first photo large, the rest stacked. */
export function OutletGallery({ photos, name }: { photos: string[]; name: string }) {
  if (photos.length === 0) return null;
  return (
    <ul className="grid auto-rows-[200px] gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((src, i) => (
        <li
          key={`${src}-${i}`}
          className={cn(
            "group relative overflow-hidden rounded-[var(--radius-lg)] bg-soft-grey",
            i === 0 && "sm:col-span-2 sm:row-span-2",
            i === 3 && "lg:col-span-2",
          )}
        >
          <Image
            src={src}
            alt={`Inside Smile ${name}, photo ${i + 1}`}
            fill
            sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
          />
        </li>
      ))}
    </ul>
  );
}
