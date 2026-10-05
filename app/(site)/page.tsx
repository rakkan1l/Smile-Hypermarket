import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { BrandsMarquee } from "@/components/home/BrandsMarquee";
import { OutletPreview } from "@/components/home/OutletPreview";
import { StoryPreview } from "@/components/home/StoryPreview";
import { SocialSection } from "@/components/home/SocialSection";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Smile Hypermarket | Kannur & UAE",
    description: "Discover Smile Hypermarket locations, offers and services across Kannur and the UAE.",
    path: "/",
  }),
  title: { absolute: "Smile Hypermarket | Kannur & UAE" },
};

export default async function HomePage() {
  const { heroImage } = await getSiteSettings();
  return (
    <>
      <Hero heroImage={heroImage} />
      <BrandsMarquee />
      <SocialSection />
      <OutletPreview />
      <StoryPreview />
    </>
  );
}
