"use client";

import { createContext, useContext } from "react";
import { site as staticSite } from "@/data/site";
import type { SiteSettings } from "@/lib/content";

/**
 * Makes the editable brand settings available to Client Components
 * (the WhatsApp button, social links, forms) without each of them
 * importing the static data file.
 *
 * The static file is the default, so a component rendered outside the
 * provider still gets sensible values rather than blanks.
 */
const fallback: SiteSettings = {
  name: staticSite.name,
  shortName: staticSite.shortName,
  tagline: staticSite.tagline,
  email: staticSite.email,
  careersEmail: staticSite.careersEmail,
  officePhone: "",
  whatsapp: staticSite.whatsapp,
  social: { ...staticSite.social },
  heroImage: "",
};

const SiteSettingsContext = createContext<SiteSettings>(fallback);

export const useSiteSettings = () => useContext(SiteSettingsContext);

export function SiteSettingsProvider({
  value, children,
}: { value: SiteSettings; children: React.ReactNode }) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}
