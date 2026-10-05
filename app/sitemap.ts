import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getOutlets, getOpenJobs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [outlets, openJobs] = await Promise.all([getOutlets(), getOpenJobs()]);
  const staticRoutes = ["", "/about", "/leadership", "/outlets", "/careers", "/contact", "/privacy-policy", "/terms"];
  const dynamicRoutes = [
    ...outlets.map((o) => `/outlets/${o.slug}`),
    ...openJobs.map((j) => `/careers/${j.slug}`),
  ];
  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/careers") ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
