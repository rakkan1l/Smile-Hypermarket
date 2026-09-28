/**
 * Global brand settings. Update social links, the main WhatsApp number
 * and navigation here.
 */
export const site = {
  name: "Smile Hypermarket",
  shortName: "Smile",
  tagline: "Your Family's Trusted Shopping Partner — Across Borders.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://smilehypermarket.com",
  email: "hello@smilehypermarket.com",
  careersEmail: "careers@smilehypermarket.com",
  /** Main WhatsApp number in international format, no "+" or spaces. Placeholder. */
  whatsapp: "919000000000",
  social: {
    instagram: "https://www.instagram.com/smilehypermarket",
    facebook: "https://www.facebook.com/smilehypermarket",
    whatsappChannel: "https://whatsapp.com/channel/smilehypermarket",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Outlets", href: "/outlets" },
  { label: "Offers", href: "/offers" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;
