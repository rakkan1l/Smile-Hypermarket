import { Navigation, Phone } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { getDirectionsUrl } from "@/lib/maps";
import { telHref, whatsappHref } from "@/lib/links";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Directions / Call / WhatsApp buttons, shared by every outlet view. */
export function OutletActions({
  outlet,
  size = "sm",
  className,
  labels = { call: "Call Branch" },
  tone = "default",
  layout = "inline",
}: {
  outlet: Outlet;
  size?: "sm" | "md" | "lg";
  className?: string;
  labels?: { call?: string };
  tone?: "default" | "light";
  /** "stacked": Directions full-width, Call + WhatsApp side by side — for narrow cards. */
  layout?: "inline" | "stacked";
}) {
  const light = tone === "light";
  const stacked = layout === "stacked";
  return (
    <div className={cn(stacked ? "grid grid-cols-2 gap-2 [&>*:first-child]:col-span-2" : "flex flex-wrap gap-2", className)}>
      <ButtonLink
        href={getDirectionsUrl(outlet)}
        size={size}
        variant={light ? "light" : "primary"}
        icon={<Navigation aria-hidden className="size-4" />}
        aria-label={`Get directions to Smile ${outlet.shortName}`}
      >
        Get Directions
      </ButtonLink>
      <ButtonLink
        href={telHref(outlet.phone)}
        size={size}
        variant={light ? "ghost-light" : "outline"}
        icon={<Phone aria-hidden className="size-4" />}
        aria-label={`Call Smile ${outlet.shortName}`}
      >
        {labels.call ?? "Call Branch"}
      </ButtonLink>
      <ButtonLink
        href={whatsappHref(outlet.whatsapp, `Hello Smile ${outlet.shortName}, `)}
        size={size}
        variant={light ? "ghost-light" : "outline"}
        icon={<WhatsAppIcon className={cn("size-4", !light && "text-[#1faa59]")} />}
        aria-label={`WhatsApp Smile ${outlet.shortName}`}
      >
        WhatsApp
      </ButtonLink>
    </div>
  );
}
