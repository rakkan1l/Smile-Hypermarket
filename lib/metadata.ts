import type { Metadata } from "next";
import { site } from "@/data/site";
import { images } from "@/data/images";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/** Builds consistent metadata (title, description, canonical, Open Graph, Twitter) for any page. */
export function buildMetadata({ title, description, path, image = images.hero }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
