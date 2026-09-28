import type { Offer, OfferStatus } from "@/lib/types";
import { images } from "./images";

/**
 * Smile campaigns.
 *
 * To publish a finished campaign poster: add it to /public/images/offers,
 * set `poster` to its path and `posterIsArtwork: true` so the site shows the
 * artwork as-is instead of drawing the title over a photo.
 *
 * `status` is optional — when omitted it is worked out from the dates.
 */
export const offers: (Omit<Offer, "status"> & { status?: OfferStatus; posterIsArtwork?: boolean })[] = [
  {
    slug: "mega-diwali-fest",
    title: "Mega Diwali Fest",
    tagline: "Light up the season with bigger savings",
    poster: images.shoppingBags,
    startDate: "2026-10-20",
    endDate: "2026-11-10",
    participatingOutlets: "all",
    category: "Festival",
    featured: true,
    description:
      "Our biggest festive campaign of the year. Sweets, dry fruits, gifting hampers, home essentials and kitchen upgrades — specially priced across every Smile outlet in India and the UAE.",
    highlights: [
      "Festive gift hampers for family and colleagues",
      "Special prices on sweets, dry fruits and snacks",
      "Home & kitchen offers for the celebrations",
    ],
    terms: [
      "Offers are valid while stocks last.",
      "Prices and participating products may vary by outlet and country.",
      "Offers cannot be combined with other promotions unless stated.",
      "Smile Hypermarket reserves the right to amend or withdraw offers without notice.",
    ],
  },
  {
    slug: "fresh-fridays",
    title: "Fresh Fridays",
    tagline: "The week's best produce, priced to smile",
    poster: images.produce,
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    participatingOutlets: "all",
    category: "Fresh",
    description:
      "Every Friday our fresh teams hand-pick the best fruits, vegetables, fish and meat of the week and bring them to you at special prices.",
    highlights: ["New fresh deals every Friday", "Fruits, vegetables, fish and meat", "Available in-store only"],
    terms: [
      "Valid on Fridays only, during store opening hours.",
      "Fresh offers vary weekly and by outlet.",
      "Quantities may be limited per customer.",
    ],
  },
  {
    slug: "back-to-school",
    title: "Back to School Savings",
    tagline: "Everything for the new term, in one trip",
    poster: images.groceryBasket,
    startDate: "2026-09-15",
    endDate: "2026-10-15",
    participatingOutlets: ["varam", "kakkad", "kambil", "al-jurf", "al-nuaimiya"],
    category: "Seasonal",
    description:
      "Stationery, lunch boxes, school snacks and breakfast favourites at prices that make the new term easier on the family budget.",
    highlights: ["Stationery and school bags", "Lunch box snacks and drinks", "Breakfast cereals and spreads"],
    terms: ["Valid while stocks last.", "Selected products only.", "Available at participating outlets."],
  },
  {
    slug: "home-essentials-month",
    title: "Home Essentials Month",
    tagline: "Stock up on the everyday",
    poster: images.shelves,
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    participatingOutlets: "all",
    category: "Household",
    description:
      "A full month of value on cleaning, laundry, personal care and household staples — the things every home runs on.",
    highlights: ["Laundry and cleaning bundles", "Personal care multipacks", "Kitchen staples in family sizes"],
    terms: ["Valid on selected products only.", "Prices may vary between India and UAE outlets."],
  },
  {
    slug: "uae-national-day",
    title: "UAE National Day Celebration",
    tagline: "Celebrating the nation we call home",
    poster: images.retailFloor,
    startDate: "2026-11-28",
    endDate: "2026-12-03",
    participatingOutlets: ["al-jurf", "al-nuaimiya"],
    category: "Festival",
    description:
      "Join us as we celebrate UAE National Day with special offers across our Ajman outlets, festive treats and family favourites.",
    highlights: ["Festive offers across departments", "Family packs and party essentials", "UAE outlets only"],
    terms: ["Valid at Al Jurf and Al Nuaimiya outlets only.", "Valid while stocks last."],
  },
  {
    slug: "onam-harvest-sale",
    title: "Onam Harvest Sale",
    tagline: "Everything for the perfect sadhya",
    poster: images.freshMarket,
    startDate: "2026-08-20",
    endDate: "2026-09-05",
    participatingOutlets: ["varam", "kambil", "kakkad", "dharmadam"],
    category: "Festival",
    description:
      "Kerala's harvest festival, celebrated the Smile way — banana leaves, fresh vegetables, payasam essentials and festive kits for the whole family.",
    highlights: ["Onam kits and sadhya essentials", "Fresh vegetables and banana leaves", "Payasam mixes and jaggery"],
    terms: ["Valid at Kerala outlets only.", "Valid while stocks last."],
  },
];

/** Worked out from the dates unless an explicit status is set. */
export function getOfferStatus(offer: { startDate: string; endDate: string; status?: OfferStatus }, now = new Date()): OfferStatus {
  if (offer.status) return offer.status;
  const start = new Date(`${offer.startDate}T00:00:00`);
  const end = new Date(`${offer.endDate}T23:59:59`);
  if (now < start) return "upcoming";
  if (now > end) return "expired";
  return "active";
}

export type ResolvedOffer = Offer & { posterIsArtwork?: boolean };

export function getOffers(): ResolvedOffer[] {
  const order: Record<OfferStatus, number> = { active: 0, upcoming: 1, expired: 2 };
  return offers
    .map((o) => ({ ...o, status: getOfferStatus(o) }))
    .sort((a, b) => order[a.status] - order[b.status] || a.startDate.localeCompare(b.startDate));
}

export function getFeaturedOffer(): ResolvedOffer {
  const all = getOffers();
  return all.find((o) => o.featured && o.status !== "expired") ?? all.find((o) => o.status !== "expired") ?? all[0];
}

export const getOffer = (slug: string) => getOffers().find((o) => o.slug === slug);
