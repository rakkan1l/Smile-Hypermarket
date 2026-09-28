import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { outlets } from "@/data/outlets";
import { offers } from "@/data/offers";
import { openJobs } from "@/data/jobs";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/leadership", "/outlets", "/offers", "/careers", "/contact", "/privacy-policy", "/terms"];
  const dynamicRoutes = [
    ...outlets.map((o) => `/outlets/${o.slug}`),
    ...offers.map((o) => `/offers/${o.slug}`),
    ...openJobs.map((j) => `/careers/${j.slug}`),
  ];
  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/offers") || path.startsWith("/careers") ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
