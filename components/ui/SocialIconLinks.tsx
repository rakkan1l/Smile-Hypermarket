"use client";

import { whatsappHref } from "@/lib/links";
import { cn } from "@/lib/cn";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";

export function SocialIconLinks({ className }: { className?: string }) {
  const site = useSiteSettings();
  const links = [
    { href: site.social.instagram, label: "Smile on Instagram", Icon: InstagramIcon },
    { href: site.social.facebook, label: "Smile on Facebook", Icon: FacebookIcon },
    { href: whatsappHref(site.whatsapp), label: "Chat with Smile on WhatsApp", Icon: WhatsAppIcon },
  ];

  return (
    <ul className={cn("flex gap-3", className)}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-smile-blue hover:text-smile-blue"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
