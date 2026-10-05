"use client";

import { Check, LoaderCircle, TriangleAlert } from "lucide-react";

export type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * Sticky footer for the editors. Staff need an unambiguous answer to
 * "did that save?", so the state is always shown rather than implied.
 */
export function SaveBar({
  state, error, dirty, onSave, children,
}: {
  state: SaveState;
  error?: string;
  dirty?: boolean;
  onSave: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-0 z-30 -mx-4 mt-10 border-t border-line bg-background/90 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm" aria-live="polite">
          {state === "saving" && (
            <><LoaderCircle aria-hidden className="size-4 animate-spin text-ink-muted" />
              <span className="text-ink-soft">Saving…</span></>
          )}
          {state === "saved" && (
            <><Check aria-hidden className="size-4 text-smile-green-dark" />
              <span className="text-ink-soft">Saved. Your website is updated.</span></>
          )}
          {state === "error" && (
            <><TriangleAlert aria-hidden className="size-4 text-[#c2410c]" />
              <span className="text-[#c2410c]">{error || "Could not save. Please try again."}</span></>
          )}
          {state === "idle" && dirty && <span className="text-ink-muted">Unsaved changes</span>}
        </p>

        <div className="flex items-center gap-3">
          {children}
          <button
            type="button"
            onClick={onSave}
            disabled={state === "saving"}
            className="inline-flex items-center justify-center rounded-full bg-smile-blue px-6 py-2.5 font-ui text-[15px] text-white transition hover:bg-smile-blue-dark disabled:opacity-60"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
