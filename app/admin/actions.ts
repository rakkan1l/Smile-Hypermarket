"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Clears the cached public pages after an admin saves.
 *
 * Revalidating the root layout invalidates every page beneath it in one go.
 * That is deliberately broad: a save is rare and a stale page is the exact
 * failure this exists to prevent, so correctness beats surgical precision.
 * Public pages additionally carry a short `revalidate` window, so even if
 * this call fails the site self-heals rather than staying stale forever.
 *
 * Guarded by the session so it cannot be triggered from outside.
 */
export async function publishChanges(paths: string[] = []) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { ok: false as const, error: "Your session expired — please sign in again." };

    // Everything under the public layout, which covers the header, footer
    // and any page that reads the same content.
    revalidatePath("/", "layout");

    // Then the specific pages, which also catches dynamic routes.
    for (const path of new Set(paths)) revalidatePath(path);

    return { ok: true as const };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "Could not refresh the website.",
    };
  }
}
