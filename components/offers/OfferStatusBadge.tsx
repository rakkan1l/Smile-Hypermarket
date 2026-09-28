import type { OfferStatus } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

const labels: Record<OfferStatus, string> = { active: "On now", upcoming: "Coming soon", expired: "Ended" };
const tones = { active: "green", upcoming: "blue", expired: "neutral" } as const;

export function OfferStatusBadge({ status, className }: { status: OfferStatus; className?: string }) {
  return (
    <Badge tone={tones[status]} className={className}>
      {status === "active" && <span aria-hidden className="size-1.5 rounded-full bg-smile-green" />}
      {labels[status]}
    </Badge>
  );
}
