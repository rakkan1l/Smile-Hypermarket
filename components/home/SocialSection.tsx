"use client";

import { Bell, ShoppingBag, Gift, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

const features = [
  { Icon: Bell, label: "Latest Offers", sub: "Never miss a deal" },
  { Icon: ShoppingBag, label: "New Outlets", sub: "Be the first to know" },
  { Icon: Gift, label: "Exclusive Updates", sub: "Straight to your phone" },
];

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
        {/* Top: headline + pills left, visual right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
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
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">
              Be the first to hear about offers, new outlets and everything happening across the Smile family.
            </p>

            {/* Feature pills */}
            <div className="mt-10 flex flex-wrap gap-4">
              {features.map(({ Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-sm">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-light-blue text-smile-blue">
                    <Icon className="size-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-none text-ink">{label}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: decorative phones visual */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Blobs */}
            <div className="absolute -left-8 top-4 size-56 rounded-full bg-light-green opacity-60 blur-3xl" />
            <div className="absolute right-0 bottom-0 size-40 rounded-full bg-light-blue opacity-70 blur-3xl" />

            {/* Three phone cards stacked */}
            <div className="relative flex items-end gap-3">
              {/* Left phone — Instagram */}
              <div className="relative mb-6 w-[130px] overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
                <div className="bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-white/30" />
                    <div className="h-1.5 w-16 rounded bg-white/50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0.5 bg-gray-100 p-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-sm bg-smile-green/20" />
                  ))}
                </div>
                <div className="p-2">
                  <div className="h-1.5 w-full rounded bg-gray-100" />
                  <div className="mt-1 h-1.5 w-3/4 rounded bg-gray-100" />
                </div>
              </div>

              {/* Centre phone — Facebook (tallest) */}
              <div className="w-[150px] overflow-hidden rounded-3xl border border-line bg-white shadow-2xl">
                <div className="bg-[#1877f2] px-3 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FacebookIcon className="size-5 text-white" />
                    <div className="h-1.5 w-14 rounded bg-white/50" />
                  </div>
                </div>
                <div className="p-2 space-y-2">
                  <div className="h-20 rounded-lg bg-smile-blue/10" />
                  <div className="h-1.5 w-full rounded bg-gray-100" />
                  <div className="h-1.5 w-4/5 rounded bg-gray-100" />
                  <div className="mt-3 rounded-lg bg-[#1877f2] py-1.5 text-center">
                    <div className="mx-auto h-1.5 w-12 rounded bg-white/70" />
                  </div>
                </div>
              </div>

              {/* Right phone — WhatsApp */}
              <div className="relative mb-6 w-[130px] overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
                <div className="bg-[#25d366] px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <WhatsAppIcon className="size-4 text-white" />
                    <div>
                      <div className="h-1.5 w-16 rounded bg-white/70" />
                      <div className="mt-0.5 h-1 w-10 rounded bg-white/40" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 p-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <div className="mt-0.5 size-5 shrink-0 rounded-full bg-smile-green/20" />
                      <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-full rounded bg-gray-100" />
                        <div className="h-1.5 w-3/4 rounded bg-gray-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating social icons */}
            <div className="absolute -top-2 left-[calc(50%-60px)] flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-lg">
              <InstagramIcon className="size-6 text-white" />
            </div>
            <div className="absolute top-8 right-4 flex size-12 items-center justify-center rounded-full bg-[#1877f2] shadow-lg">
              <FacebookIcon className="size-6 text-white" />
            </div>
            <div className="absolute bottom-8 right-0 flex size-12 items-center justify-center rounded-full bg-[#25d366] shadow-lg">
              <WhatsAppIcon className="size-6 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom: three platform cards */}
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
