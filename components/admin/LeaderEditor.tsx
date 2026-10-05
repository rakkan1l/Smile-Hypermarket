"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { publishChanges } from "@/app/admin/actions";
import { Card, TextArea, TextField } from "./Fields";
import { ImageField } from "./ImageField";
import { SaveBar, type SaveState } from "./SaveBar";

export type Leader = {
  id: string;
  slug: string;
  name: string;
  position: string;
  image: string;
  summary: string;
  biography: string;
  personal_history: string;
  journey: string;
  contribution: string;
  quote: string;
};

export function LeaderEditor({ initial }: { initial: Leader }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  const set = <K extends keyof Leader>(key: K, value: Leader[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
    if (state !== "idle") setState("idle");
  };

  async function save() {
    setState("saving");
    setError("");
    const { id, ...fields } = form;
    const { error } = await createClient().from("leadership").update(fields).eq("id", id);
    if (error) { setState("error"); setError(error.message); return; }
    const published = await publishChanges(["/about", "/leadership"]);
    if (!published.ok) {
      // The data saved, but the website is still showing the old
      // version. Say so rather than reporting a clean success.
      setState("error");
      setError(`Saved, but the website did not refresh: ${published.error}`);
      setDirty(false);
      return;
    }
    setState("saved");
    setDirty(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/leadership" className="inline-flex items-center gap-2 font-ui text-sm text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden className="size-4" /> All leadership
      </Link>

      <Card title="Portrait">
        <ImageField
          label="Photo"
          hint="A portrait orientation works best"
          value={form.image}
          folder="leadership"
          aspect="aspect-[3/4]"
          className="max-w-xs"
          onChange={(url) => set("image", url)}
        />
      </Card>

      <Card title="Name and role">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          <TextField label="Position" value={form.position} onChange={(e) => set("position", e.target.value)} />
        </div>
      </Card>

      <Card title="Profile" description="The text shown on the Our Story page.">
        <div className="grid gap-5">
          <TextArea label="Summary" rows={3} hint="The large introductory line"
            value={form.summary} onChange={(e) => set("summary", e.target.value)} />
          <TextArea label="Biography" rows={3}
            value={form.biography} onChange={(e) => set("biography", e.target.value)} />
          <TextArea label="Background" rows={3}
            value={form.personal_history} onChange={(e) => set("personal_history", e.target.value)} />
          <TextArea label="Journey" rows={3}
            value={form.journey} onChange={(e) => set("journey", e.target.value)} />
          <TextArea label="Contribution" rows={3}
            value={form.contribution} onChange={(e) => set("contribution", e.target.value)} />
          <TextArea label="Quote" rows={2} hint="Optional"
            value={form.quote} onChange={(e) => set("quote", e.target.value)} />
        </div>
      </Card>

      <SaveBar state={state} error={error} dirty={dirty} onSave={save} />
    </div>
  );
}
