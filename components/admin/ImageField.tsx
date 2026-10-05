"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImageUp, LoaderCircle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";
import { Label } from "./Fields";

const MAX_BYTES = 15 * 1024 * 1024; // matches the storage bucket limit
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/**
 * Uploads a photo to Supabase Storage and hands back its public URL.
 *
 * Files get a unique name rather than overwriting, so a replaced photo can
 * never be served stale from a cache — the URL itself changes.
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!ACCEPTED.includes(file.type)) {
    throw new Error("Please choose a JPG, PNG or WebP image.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error(`That image is ${(file.size / 1024 / 1024).toFixed(1)} MB. Please use one under 15 MB.`);
  }

  const supabase = createClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000", // safe to cache forever: the name is unique
    upsert: false,
  });
  if (error) throw new Error(error.message);

  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

export function ImageField({
  label, hint, value, folder, onChange, aspect = "aspect-[16/10]", className,
}: {
  label: string;
  hint?: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
  aspect?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pick(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file, folder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <Label hint={hint}>{label}</Label>

      <div
        className={cn(
          "relative mt-2 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-soft-grey",
          aspect,
        )}
      >
        {value ? (
          <Image src={value} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-content-center text-sm text-ink-muted">
            No photo yet
          </span>
        )}

        {busy && (
          <span className="absolute inset-0 grid place-content-center bg-background/70 backdrop-blur-sm">
            <LoaderCircle aria-hidden className="size-6 animate-spin text-smile-blue" />
          </span>
        )}

        {value && !busy && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={`Remove ${label}`}
            className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-background/90 text-ink-soft shadow-[var(--shadow-soft)] transition hover:text-ink"
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-ui text-sm text-ink-soft transition hover:border-ink hover:text-ink disabled:opacity-60"
      >
        <ImageUp aria-hidden className="size-4" />
        {value ? "Replace photo" : "Upload photo"}
      </button>

      {error && <p role="alert" className="mt-2 text-sm text-[#c2410c]">{error}</p>}
    </div>
  );
}

/** Up to `max` photos for an outlet's slider, reorderable by removal. */
export function GalleryField({
  value, folder, onChange, max = 8,
}: {
  value: string[];
  folder: string;
  onChange: (next: string[]) => void;
  max?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function add(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const room = max - value.length;
      const chosen = Array.from(files).slice(0, Math.max(room, 0));
      if (chosen.length === 0) throw new Error(`You can have at most ${max} photos.`);
      const urls = await Promise.all(chosen.map((f) => uploadImage(f, folder)));
      onChange([...value, ...urls]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <Label hint={`${value.length} of ${max} · shown in the slider`}>Gallery photos</Label>

      <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {value.map((src, i) => (
          <li key={`${src}-${i}`} className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-line bg-soft-grey">
            <Image src={src} alt="" fill sizes="25vw" className="object-cover" />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              aria-label={`Remove photo ${i + 1}`}
              className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-full bg-background/90 text-ink-soft opacity-0 shadow-[var(--shadow-soft)] transition group-hover:opacity-100 focus-visible:opacity-100"
            >
              <X aria-hidden className="size-3.5" />
            </button>
            <span className="absolute bottom-2 left-2 rounded-full bg-background/85 px-2 py-0.5 font-ui text-[11px] text-ink-soft">
              {i + 1}
            </span>
          </li>
        ))}

        {value.length < max && (
          <li>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-line-strong text-ink-muted transition hover:border-smile-blue hover:text-smile-blue disabled:opacity-60"
            >
              {busy
                ? <LoaderCircle aria-hidden className="size-5 animate-spin" />
                : <ImageUp aria-hidden className="size-5" />}
              <span className="font-ui text-xs">{busy ? "Uploading…" : "Add photos"}</span>
            </button>
          </li>
        )}
      </ul>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED.join(",")}
        className="sr-only"
        onChange={(e) => add(e.target.files)}
      />

      {error && <p role="alert" className="mt-2 text-sm text-[#c2410c]">{error}</p>}
    </div>
  );
}
