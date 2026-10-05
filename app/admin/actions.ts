"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Clears the cached public pages after an admin saves, so a change is live
 * within seconds rather than waiting for the next deploy or cache expiry.
 *
 * Guarded by the session: only a signed-in staff member can trigger it, so
 * it cannot be used to hammer the cache from outside.
 */
export async function publishChanges(paths: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "Not signed in." };

  // Always refresh the shared chrome (header/footer read site settings).
  for (const path of new Set([...paths, "/", "/layout"])) {
    revalidatePath(path, path === "/layout" ? "layout" : "page");
  }
  return { ok: true as const };
}
