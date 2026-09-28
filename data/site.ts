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
  careersEmail: "smilehyperhr@gmail.com",
  /** Main WhatsApp number in international format, no "+" or spaces. Placeholder. */
  whatsapp: "919000000000",
  social: {
    instagram: "https://www.instagram.com/smile_hypermarket",
    facebook: "https://www.facebook.com/share/1AEHmXHjT5/",
    whatsappChannel: "https://whatsapp.com/channel/0029VbArqAkBVJl7Z2oqEE2D",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Outlets", href: "/outlets" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;
