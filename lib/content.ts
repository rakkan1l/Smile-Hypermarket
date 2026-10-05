import "server-only";
import { createClient } from "@supabase/supabase-js";
import { site as staticSite } from "@/data/site";
import { outlets as staticOutlets } from "@/data/outlets";
import { leadership as staticLeadership } from "@/data/leadership";
import { jobs as staticJobs } from "@/data/jobs";
import { images } from "@/data/images";
import type { Job, Leader, Outlet } from "@/lib/types";

/**
 * Read-only Supabase client for the public website.
 *
 * Deliberately session-free: it never touches cookies, so the public pages
 * stay statically rendered and cheap. Admin saves call revalidatePath, which
 * is what makes an edit appear within seconds.
 */
const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

/**
 * The content files under /data remain the fallback. If the database is
 * unreachable mid-build, the site renders its last known-good content
 * instead of failing — a storefront going blank is far worse than it being
 * briefly out of date.
 */
function fallback<T>(label: string, value: T, err?: unknown): T {
  if (err) console.error(`[content] ${label} fell back to static data:`, err);
  return value;
}

export type SiteSettings = {
  name: string; shortName: string; tagline: string;
  email: string; careersEmail: string; officePhone: string; whatsapp: string;
  social: { instagram: string; facebook: string; whatsappChannel: string };
  heroImage: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const shape = (r: Record<string, string>): SiteSettings => ({
    name: r.name, shortName: r.short_name, tagline: r.tagline,
    email: r.email, careersEmail: r.careers_email,
    officePhone: r.office_phone, whatsapp: r.whatsapp,
    social: {
      instagram: r.instagram, facebook: r.facebook, whatsappChannel: r.whatsapp_channel,
    },
    heroImage: r.hero_image || images.hero,
  });

  try {
    const { data, error } = await db.from("site_settings").select("*").single();
    if (error || !data) throw error;
    return shape(data);
  } catch (e) {
    return fallback("site settings", {
      name: staticSite.name, shortName: staticSite.shortName, tagline: staticSite.tagline,
      email: staticSite.email, careersEmail: staticSite.careersEmail,
      officePhone: "", whatsapp: staticSite.whatsapp,
      social: { ...staticSite.social },
      heroImage: images.hero,
    }, e);
  }
}

const toOutlet = (r: Record<string, unknown>): Outlet => ({
  id: r.id as string,
  slug: r.slug as string,
  name: r.name as string,
  shortName: r.short_name as string,
  format: r.format as Outlet["format"],
  country: r.country as Outlet["country"],
  city: r.city as string,
  area: r.area as string,
  address: r.address as string,
  intro: (r.intro as string) ?? "",
  phone: r.phone as string,
  whatsapp: r.whatsapp as string,
  email: (r.email as string) ?? "",
  openingHours: (r.opening_hours as string) ?? "",
  image: r.image as string,
  gallery: (r.gallery as string[]) ?? [],
  mapQuery: r.map_query as string,
  mapUrl: r.map_url as string,
  latitude: r.latitude as number,
  longitude: r.longitude as number,
  status: r.status as Outlet["status"],
  departments: (r.departments as string[]) ?? [],
});

export async function getOutlets(): Promise<Outlet[]> {
  try {
    const { data, error } = await db.from("outlets").select("*").order("sort_order");
    if (error || !data?.length) throw error;
    return data.map(toOutlet);
  } catch (e) {
    return fallback("outlets", staticOutlets as unknown as Outlet[], e);
  }
}

export async function getOutlet(slug: string): Promise<Outlet | undefined> {
  return (await getOutlets()).find((o) => o.slug === slug);
}

export async function getLeadership(): Promise<Leader[]> {
  try {
    const { data, error } = await db.from("leadership").select("*").order("sort_order");
    if (error || !data?.length) throw error;
    return data.map((r) => ({
      id: r.slug,
      name: r.name,
      position: r.position,
      image: r.image,
      summary: r.summary,
      biography: r.biography,
      personalHistory: r.personal_history,
      journey: r.journey,
      contribution: r.contribution,
      quote: r.quote || undefined,
    }));
  } catch (e) {
    return fallback("leadership", staticLeadership as unknown as Leader[], e);
  }
}

export async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await db.from("jobs").select("*").order("sort_order");
    if (error || !data) throw error;
    return data.map((r) => ({
      id: r.id,
      slug: r.slug,
      position: r.position,
      department: r.department,
      branch: r.branch,
      country: r.country,
      employmentType: r.employment_type,
      postedDate: r.posted_date,
      status: r.status,
      experience: r.experience,
      description: r.description,
      responsibilities: r.responsibilities ?? [],
      requirements: r.requirements ?? [],
    }));
  } catch (e) {
    return fallback("jobs", staticJobs as unknown as Job[], e);
  }
}

export const getOpenJobs = async () => (await getJobs()).filter((j) => j.status === "open");
export const getJob = async (slug: string) => (await getJobs()).find((j) => j.slug === slug);
export const getOpenOutlets = async () => (await getOutlets()).filter((o) => o.status === "open");
export const getComingSoonOutlets = async () => (await getOutlets()).filter((o) => o.status === "coming-soon");
