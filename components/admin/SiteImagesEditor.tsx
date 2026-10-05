"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { publishChanges } from "@/app/admin/actions";
import { Card } from "./Fields";
import { ImageField } from "./ImageField";
import { SaveBar, type SaveState } from "./SaveBar";

export function SiteImagesEditor({ initial }: { initial: { hero_image: string } }) {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  async function save() {
    setState("saving");
    setError("");
    const { error } = await createClient().from("site_settings").update(form).eq("id", true);
    if (error) { setState("error"); setError(error.message); return; }
    await publishChanges(["/"]);
    setState("saved");
    setDirty(false);
  }

  return (
    <div className="space-y-6">
      <Card
        title="Home page hero"
        description="The large photo behind the headline on the home page. It is also the preview image when someone shares your website on WhatsApp or Facebook."
      >
        <ImageField
          label="Hero photo"
          hint="A wide shot works best"
          value={form.hero_image}
          folder="site"
          aspect="aspect-[16/9]"
          onChange={(url) => { setForm({ hero_image: url }); setDirty(true); setState("idle"); }}
        />
      </Card>

      <SaveBar state={state} error={error} dirty={dirty} onSave={save} />
    </div>
  );
}
