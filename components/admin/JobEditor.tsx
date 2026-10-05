"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { publishChanges } from "@/app/admin/actions";
import { Card, ListField, SelectField, TextArea, TextField } from "./Fields";
import { SaveBar, type SaveState } from "./SaveBar";

export type JobDraft = {
  id?: string;
  slug: string;
  position: string;
  department: string;
  branch: string;
  country: "India" | "UAE";
  employment_type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: "open" | "closed";
};

export const emptyJob: JobDraft = {
  slug: "", position: "", department: "", branch: "", country: "India",
  employment_type: "Full-time", experience: "", description: "",
  responsibilities: [], requirements: [], status: "open",
};

/** Builds a URL-safe slug from the job title and branch. */
const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

export function JobEditor({ initial, isNew }: { initial: JobDraft; isNew: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  const set = <K extends keyof JobDraft>(key: K, value: JobDraft[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
    if (state !== "idle") setState("idle");
  };

  async function save() {
    if (!form.position.trim()) {
      setState("error");
      setError("Please give the vacancy a job title.");
      return;
    }

    setState("saving");
    setError("");

    // Derive a slug on first save; keep it stable afterwards so any link
    // already shared to a candidate keeps working.
    const slug = form.slug || slugify(`${form.position}-${form.branch}`) || slugify(form.position);
    const payload = { ...form, slug };
    const supabase = createClient();

    const { error } = isNew
      ? await supabase.from("jobs").insert(payload)
      : await supabase.from("jobs").update(payload).eq("id", form.id!);

    if (error) {
      setState("error");
      setError(
        error.code === "23505"
          ? "A vacancy with that title and branch already exists. Try a slightly different title."
          : error.message,
      );
      return;
    }

    const published = await publishChanges(["/careers", `/careers/${slug}`]);
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
    if (isNew) router.push("/admin/careers");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/careers" className="inline-flex items-center gap-2 font-ui text-sm text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden className="size-4" /> All vacancies
      </Link>

      <Card title="The role">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Job title" className="sm:col-span-2"
            placeholder="Cashier"
            value={form.position} onChange={(e) => set("position", e.target.value)}
          />
          <TextField label="Department" placeholder="Front End"
            value={form.department} onChange={(e) => set("department", e.target.value)} />
          <TextField label="Branch" placeholder="Kakkad"
            value={form.branch} onChange={(e) => set("branch", e.target.value)} />
          <SelectField label="Country" value={form.country}
            onChange={(e) => set("country", e.target.value as JobDraft["country"])}>
            <option value="India">India</option>
            <option value="UAE">UAE</option>
          </SelectField>
          <SelectField label="Employment type" value={form.employment_type}
            onChange={(e) => set("employment_type", e.target.value)}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </SelectField>
          <TextField label="Experience required" className="sm:col-span-2"
            placeholder="0–2 years; freshers welcome"
            value={form.experience} onChange={(e) => set("experience", e.target.value)} />
        </div>
      </Card>

      <Card title="Description" description="A short paragraph telling candidates what the job is really like.">
        <TextArea label="About the role" rows={5}
          value={form.description} onChange={(e) => set("description", e.target.value)} />
      </Card>

      <Card title="Details" description="These appear as bullet lists on the vacancy page.">
        <div className="grid gap-5 lg:grid-cols-2">
          <ListField label="Responsibilities" value={form.responsibilities}
            onChange={(v) => set("responsibilities", v)} />
          <ListField label="Requirements" value={form.requirements}
            onChange={(v) => set("requirements", v)} />
        </div>
      </Card>

      <Card title="Visibility">
        <SelectField
          label="Status"
          hint={form.status === "open" ? "Shown on the careers page" : "Hidden from the website"}
          value={form.status}
          onChange={(e) => set("status", e.target.value as JobDraft["status"])}
        >
          <option value="open">Advertised</option>
          <option value="closed">Closed</option>
        </SelectField>
      </Card>

      <SaveBar state={state} error={error} dirty={dirty} onSave={save} />
    </div>
  );
}
