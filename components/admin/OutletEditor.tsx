"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { publishChanges } from "@/app/admin/actions";
import { Card, ListField, SelectField, TextField } from "./Fields";
import { GalleryField, ImageField } from "./ImageField";
import { SaveBar, type SaveState } from "./SaveBar";

export type Outlet = {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  format: "Hypermarket" | "Xpress";
  country: "India" | "UAE";
  city: string;
  area: string;
  address: string;
  phone: string;
  whatsapp: string;
  opening_hours: string;
  image: string;
  gallery: string[];
  map_url: string;
  latitude: number | null;
  longitude: number | null;
  status: "open" | "coming-soon";
  departments: string[];
};

const digits = (s: string) => s.replace(/\D/g, "");

export function OutletEditor({ initial }: { initial: Outlet }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  const set = <K extends keyof Outlet>(key: K, value: Outlet[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
    if (state !== "idle") setState("idle");
  };

  async function save() {
    setState("saving");
    setError("");

    const { id, ...fields } = form;
    const { error } = await createClient()
      .from("outlets")
      .update({ ...fields, whatsapp: digits(fields.whatsapp) })
      .eq("id", id);

    if (error) { setState("error"); setError(error.message); return; }

    await publishChanges(["/outlets", `/outlets/${form.slug}`, "/contact"]);
    setState("saved");
    setDirty(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/outlets" className="inline-flex items-center gap-2 font-ui text-sm text-ink-soft hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" /> All outlets
        </Link>
        <Link
          href={`/outlets/${form.slug}`} target="_blank"
          className="inline-flex items-center gap-2 font-ui text-sm text-ink-soft hover:text-ink"
        >
          View on website <ExternalLink aria-hidden className="size-3.5" />
        </Link>
      </div>

      <Card title="Photos" description="The main photo heads the outlet page; the gallery feeds the slider beneath it.">
        <ImageField
          label="Main photo"
          hint="Usually the storefront"
          value={form.image}
          folder={`outlets/${form.slug}`}
          onChange={(url) => set("image", url)}
        />
        <div className="mt-8">
          <GalleryField
            value={form.gallery}
            folder={`outlets/${form.slug}`}
            onChange={(v) => set("gallery", v)}
          />
        </div>
      </Card>

      <Card title="Contact" description="Shown on the outlet page and behind its Call and WhatsApp buttons.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Phone" placeholder="+91 90742 89657"
            value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          <TextField label="WhatsApp" hint="Include country code" placeholder="+91 90742 89657"
            value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          <TextField label="Address" className="sm:col-span-2"
            value={form.address} onChange={(e) => set("address", e.target.value)} />
          <TextField label="Opening hours" className="sm:col-span-2"
            hint="Leave empty to hide"
            value={form.opening_hours} onChange={(e) => set("opening_hours", e.target.value)} />
        </div>
      </Card>

      <Card title="Details">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          <TextField label="Short name" hint="Used in lists"
            value={form.short_name} onChange={(e) => set("short_name", e.target.value)} />
          <TextField label="City" value={form.city} onChange={(e) => set("city", e.target.value)} />
          <TextField label="Area" value={form.area} onChange={(e) => set("area", e.target.value)} />
          <SelectField label="Format" value={form.format}
            onChange={(e) => set("format", e.target.value as Outlet["format"])}>
            <option value="Hypermarket">Hypermarket</option>
            <option value="Xpress">Xpress</option>
          </SelectField>
          <SelectField label="Status" value={form.status}
            onChange={(e) => set("status", e.target.value as Outlet["status"])}>
            <option value="open">Open</option>
            <option value="coming-soon">Coming soon</option>
          </SelectField>
          <TextField label="Google Maps link" className="sm:col-span-2"
            value={form.map_url} onChange={(e) => set("map_url", e.target.value)} />
        </div>
      </Card>

      <Card title="Departments" description="Listed on the outlet page.">
        <ListField label="Departments" value={form.departments}
          onChange={(v) => set("departments", v)} rows={9} />
      </Card>

      <SaveBar state={state} error={error} dirty={dirty} onSave={save} />
    </div>
  );
}
