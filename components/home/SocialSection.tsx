import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SocialCard, type SocialCardProps } from "./SocialCard";

const cards: SocialCardProps[] = [
  {
    platform: "Instagram",
    handle: "@smilehypermarket",
    description: "New arrivals, fresh finds and behind-the-scenes moments from our stores.",
    cta: "Follow Instagram",
    href: site.social.instagram,
    Icon: InstagramIcon,
    accent: "#d62976",
  },
  {
    platform: "Facebook",
    handle: "Smile Hypermarket",
    description: "Store news, community events and every new campaign as it launches.",
    cta: "Visit Facebook",
    href: site.social.facebook,
    Icon: FacebookIcon,
    accent: "#1877f2",
  },
  {
    platform: "WhatsApp Channel",
    handle: "Smile Updates",
    description: "Weekly offers and outlet announcements, delivered straight to your phone.",
    cta: "Join WhatsApp Channel",
    href: site.social.whatsappChannel,
    Icon: WhatsAppIcon,
    accent: "#1faa59",
  },
];

export function SocialSection() {
  return (
    <section aria-labelledby="social-heading" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="social-heading"
          eyebrow="Social"
          title="Stay Connected With Smile"
          description="Be the first to hear about offers, new outlets and everything happening across the Smile family."
        />
        <Reveal className="mt-12 grid overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line gap-px md:grid-cols-3">
          {cards.map((c) => (
            <SocialCard key={c.platform} {...c} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
