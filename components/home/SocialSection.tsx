"use client";

import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

const cards = [
  {
    platform: "Instagram",
    description: "New arrivals, fresh finds and behind-the-scenes moments from our stores.",
    cta: "Follow Instagram",
    href: site.social.instagram,
    Icon: InstagramIcon,
    gradient: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    iconBg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    btnClass: "border-[#ee2a7b] text-[#ee2a7b] hover:bg-[#ee2a7b] hover:text-white",
    cardBg: "bg-pink-50",
  },
  {
    platform: "Facebook",
    description: "Store news, community events and every new campaign as it launches.",
    cta: "Visit Facebook",
    href: site.social.facebook,
    Icon: FacebookIcon,
    gradient: "from-[#1877f2] to-[#0a5dc2]",
    iconBg: "bg-[#1877f2]",
    btnClass: "border-[#1877f2] text-[#1877f2] hover:bg-[#1877f2] hover:text-white",
    cardBg: "bg-blue-50",
  },
  {
    platform: "WhatsApp Channel",
    description: "Weekly offers and outlet announcements, delivered straight to your phone.",
    cta: "Join WhatsApp Channel",
    href: site.social.whatsappChannel,
    Icon: WhatsAppIcon,
    gradient: "from-[#25d366] to-[#128c7e]",
    iconBg: "bg-[#25d366]",
    btnClass: "border-[#25d366] text-[#1faa59] hover:bg-[#25d366] hover:text-white",
    cardBg: "bg-green-50",
  },
];

export function SocialSection() {
  return (
    <section aria-labelledby="social-heading" className="py-20 sm:py-28">
      <Container>
        {/* Headline */}
        <div className="max-w-2xl">
          <p className="font-ui text-xs uppercase tracking-[0.22em] text-smile-blue flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-smile-green inline-block" />
            Social
          </p>
          <h2
            id="social-heading"
            className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl"
          >
            Stay Connected<br />
            With{" "}
            <span className="text-smile-blue">Smile</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            Be the first to hear about offers, new outlets and everything happening across the Smile family.
          </p>
        </div>

        {/* Three platform cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {cards.map(({ platform, description, cta, href, Icon, iconBg, btnClass, cardBg }) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col gap-5 rounded-2xl ${cardBg} p-6 transition-shadow hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex size-12 items-center justify-center rounded-2xl ${iconBg} shadow-sm`}>
                  <Icon className="size-6 text-white" />
                </span>
                <ArrowRight className="size-5 text-ink-muted transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{platform}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{description}</p>
              </div>
              <span className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${btnClass}`}>
                {cta} <ArrowRight className="size-3.5" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
