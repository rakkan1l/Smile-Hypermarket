import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { outlets } from "@/data/outlets";
import { openJobs } from "@/data/jobs";

export default function sitemap(): MetadataRoute.Sitemap {
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
