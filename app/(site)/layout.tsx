import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { getSiteSettings, getOpenOutlets } from "@/lib/content";

// Content comes from the database. A short window means an admin save
// appears right away via revalidatePath, and the page still refreshes
// itself within a minute if that ever fails.
export const revalidate = 60;

/** Chrome for the public website. The admin area deliberately skips this. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, outlets] = await Promise.all([getSiteSettings(), getOpenOutlets()]);

  return (
    <SiteSettingsProvider value={settings}>
      <Navbar />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat outlets={outlets} />
    </SiteSettingsProvider>
  );
}
