"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { publishChanges } from "@/app/admin/actions";
import { Card, TextField } from "./Fields";
import { SaveBar, type SaveState } from "./SaveBar";

export type SiteSettings = {
  name: string;
  short_name: string;
  tagline: string;
  email: string;
  careers_email: string;
  office_phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  whatsapp_channel: string;
};

/** Digits only — what WhatsApp's wa.me links require. */
const digits = (s: string) => s.replace(/\D/g, "");

export function ContactEditor({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
    if (state !== "idle") setState("idle");
  };

  async function save() {
    setState("saving");
    setError("");

    const supabase = createClient();
    const { error } = await supabase
      .from("site_settings")
      .update({
        ...form,
        // Store WhatsApp numbers as bare digits so the links always work,
        // however the number was typed in.
        whatsapp: digits(form.whatsapp),
      })
      .eq("id", true);

    if (error) {
      setState("error");
      setError(error.message);
      return;
    }

    await publishChanges(["/contact", "/careers"]);
    setState("saved");
    setDirty(false);
  }

  return (
    <div className="space-y-6">
      <Card title="Email" description="Where enquiries and job applications are sent.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="General enquiries"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <TextField
            label="Careers / HR"
            type="email"
            value={form.careers_email}
            onChange={(e) => set("careers_email", e.target.value)}
          />
        </div>
      </Card>

      <Card title="Phone" description="The head office line and the main WhatsApp number.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Office number"
            hint="Shown on the contact page"
            placeholder="+91 90742 89657"
            value={form.office_phone}
            onChange={(e) => set("office_phone", e.target.value)}
          />
          <TextField
            label="WhatsApp number"
            hint="Include the country code"
            placeholder="+91 90742 89657"
            value={form.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
          />
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          The WhatsApp number powers the floating chat button on every page, so a wrong
          number here means those messages go nowhere.
        </p>
      </Card>

      <Card title="Social links" description="Used in the footer and the Stay Connected section.">
        <div className="grid gap-5">
          <TextField
            label="Instagram"
            value={form.instagram}
            onChange={(e) => set("instagram", e.target.value)}
          />
          <TextField
            label="Facebook"
            value={form.facebook}
            onChange={(e) => set("facebook", e.target.value)}
          />
          <TextField
            label="WhatsApp channel"
            value={form.whatsapp_channel}
            onChange={(e) => set("whatsapp_channel", e.target.value)}
          />
        </div>
      </Card>

      <Card title="Brand" description="The tagline shown in the footer.">
        <TextField
          label="Tagline"
          value={form.tagline}
          onChange={(e) => set("tagline", e.target.value)}
        />
      </Card>

      <SaveBar state={state} error={error} dirty={dirty} onSave={save} />
    </div>
  );
}
