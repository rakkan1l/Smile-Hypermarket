import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { getOutlets, getSiteSettings } from "@/lib/content";

import { buildMetadata } from "@/lib/metadata";
import { mailHref, whatsappHref } from "@/lib/links";
import { EditorialHero } from "@/components/ui/PageHero";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ContactExplorer } from "@/components/contact/ContactExplorer";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contact Smile Hypermarket — phone, WhatsApp, email, opening hours and directions for every outlet in India and the UAE.",
  path: "/contact",
});

export default async function ContactPage() {
  const [outlets, site] = await Promise.all([getOutlets(), getSiteSettings()]);
  return (
    <>
      <EditorialHero
        eyebrow="Contact"
        title="We're Always Here to Help"
        description="Choose your nearest Smile to call, message or get directions — or send us a note and we'll get back to you."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        aside={
          <ul className="divide-y divide-line border-y border-line">
            <li>
              <a href={mailHref(site.email)} className="group flex items-center gap-4 py-5">
                <Mail aria-hidden className="size-5 text-smile-blue" />
                <span>
                  <span className="block font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">Email</span>
                  <span className="text-ink transition-colors group-hover:text-smile-blue">{site.email}</span>
                </span>
              </a>
            </li>
            {site.officePhone && (
              <li>
                <a href={`tel:${site.officePhone.replace(/\s+/g, "")}`} className="group flex items-center gap-4 py-5">
                  <Phone aria-hidden className="size-5 text-smile-blue" />
                  <span>
                    <span className="block font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">Office</span>
                    <span className="text-ink transition-colors group-hover:text-smile-blue">{site.officePhone}</span>
                  </span>
                </a>
              </li>
            )}
            <li>
              <a href={whatsappHref(site.whatsapp)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5">
                <WhatsAppIcon className="size-5 text-[#1faa59]" />
                <span>
                  <span className="block font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">WhatsApp</span>
                  <span className="text-ink transition-colors group-hover:text-smile-blue">Chat with Smile</span>
                </span>
              </a>
            </li>
          </ul>
        }
      />
      <ContactExplorer outlets={outlets} />
    </>
  );
}
