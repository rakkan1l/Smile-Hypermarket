"use client";

import { FileText, Upload, X } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { describedBy } from "./Field";

/** Accessible drop-zone style file input. */
export function FileInput({
  id,
  name,
  accept,
  file,
  onChange,
  error,
  hint,
}: {
  id: string;
  name: string;
  accept: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 rounded-[var(--radius)] border border-dashed bg-off-white px-4 py-4 transition-colors focus-within:border-smile-blue focus-within:ring-4 focus-within:ring-smile-blue/10",
        error ? "border-[#c2410c]" : "border-line-strong hover:border-ink-muted",
      )}
    >
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-smile-blue">
        {file ? <FileText aria-hidden className="size-5" /> : <Upload aria-hidden className="size-5" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-ui text-[15px] text-ink">{file ? file.name : "Upload your resume"}</p>
        <p className="text-sm text-ink-muted">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF or Word, up to 5 MB"}</p>
      </div>
      {file && (
        <button
          type="button"
          onClick={() => {
            onChange(null);
            if (ref.current) ref.current.value = "";
          }}
          aria-label="Remove file"
          className="relative z-10 inline-flex size-9 items-center justify-center rounded-full text-ink-soft hover:bg-white"
        >
          <X aria-hidden className="size-4" />
        </button>
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type="file"
        accept={accept}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className={cn("absolute inset-0 cursor-pointer opacity-0", file && "right-14")}
      />
    </div>
  );
}
