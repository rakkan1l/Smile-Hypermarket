/** Helpers for contact links so the logic is never repeated in components. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const whatsappHref = (number: string, message?: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/** Formats a stored WhatsApp number ("919000000001") for display ("+91 90000 00001"). */
export function formatWhatsapp(number: string) {
  const d = number.replace(/\D/g, "");
  if (d.startsWith("91") && d.length === 12) return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
  if (d.startsWith("971") && d.length === 12) return `+971 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  return `+${d}`;
}

export const mailHref = (email: string) => `mailto:${email}`;
