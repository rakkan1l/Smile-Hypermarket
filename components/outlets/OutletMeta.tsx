import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { formatWhatsapp, mailHref, telHref, whatsappHref } from "@/lib/links";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

type Field = "address" | "phone" | "whatsapp" | "email" | "hours";

/** Contact detail list for an outlet. Choose which fields to show. */
export function OutletMeta({
  outlet,
  fields = ["address", "phone", "hours"],
  className,
}: {
  outlet: Outlet;
  fields?: Field[];
  className?: string;
}) {
  const rows: Record<Field, { icon: React.ReactNode; label: string; value: React.ReactNode }> = {
    address: { icon: <MapPin className="size-4" />, label: "Address", value: outlet.address },
    phone: {
      icon: <Phone className="size-4" />,
      label: "Phone",
      value: (
        <a href={telHref(outlet.phone)} className="hover:text-smile-blue">
          {outlet.phone}
        </a>
      ),
    },
    whatsapp: {
      icon: <WhatsAppIcon className="size-4" />,
      label: "WhatsApp",
      value: (
        <a href={whatsappHref(outlet.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-smile-blue">
          {formatWhatsapp(outlet.whatsapp)}
        </a>
      ),
    },
    email: {
      icon: <Mail className="size-4" />,
      label: "Email",
      value: (
        <a href={mailHref(outlet.email)} className="break-all hover:text-smile-blue">
          {outlet.email}
        </a>
      ),
    },
    hours: { icon: <Clock className="size-4" />, label: "Opening hours", value: outlet.openingHours },
  };

  return (
    <dl className={cn("space-y-3 text-[15px] text-ink-soft", className)}>
      {fields.map((f) => (
        <div key={f} className="flex gap-3">
          <dt className="mt-[3px] shrink-0 text-ink-muted">
            <span aria-hidden>{rows[f].icon}</span>
            <span className="sr-only">{rows[f].label}</span>
          </dt>
          <dd className="leading-relaxed">{rows[f].value}</dd>
        </div>
      ))}
    </dl>
  );
}
