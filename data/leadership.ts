import type { Leader } from "@/lib/types";
import { images } from "./images";

/**
 * Leadership profiles.
 *
 * PLACEHOLDER CONTENT: names, portraits and biographies below are
 * placeholders written to show the layout. Replace every field with the
 * confirmed details and official photographs before launch.
 * Leave `image` as "" to show an elegant monogram instead of a photo.
 */
export const leadership: Leader[] = [
  {
    id: "chairman",
    name: "Muhammad Ali",
    position: "Chairman",
    image: images.portraitA,
    summary:
      "The founding vision behind Smile — a belief that a neighbourhood store can be run with the discipline of a great retailer and the warmth of a family home.",
    biography:
      "The Chairman laid the foundations of Smile Hypermarket with a simple conviction: families in Kannur deserved a modern, dependable place to shop, without losing the personal trust of the local store.",
    personalHistory:
      "Rooted in Kannur, the Chairman grew up around local trade and learned early that customers return to people they trust. That lesson still guides how Smile does business today.",
    journey:
      "From the first Smile outlet to a group serving customers in India and the UAE, the Chairman has guided each step of expansion with a steady focus on quality, fair pricing and long-term relationships.",
    contribution:
      "Set the values that define Smile — trust, quality and value — and continues to guide the group's long-term direction and community commitments.",
    quote: "Every store we open is a promise to a neighbourhood. We intend to keep it.",
  },
  {
    id: "managing-director",
    name: "Habeeb Madathil",
    position: "Managing Director",
    image: "/images/leadership/habeeb-madathil.jpg",
    summary:
      "Leads day-to-day strategy across the group, turning Smile's founding values into a modern, scalable retail operation.",
    biography:
      "The Managing Director oversees operations, buying and growth across all Smile outlets, making sure every branch — in Kerala or the UAE — delivers the same standard.",
    personalHistory:
      "With a background in retail management and a deep understanding of Kerala's shoppers, the Managing Director brings both commercial rigour and local insight to the business.",
    journey:
      "Led the professionalisation of Smile's operations, from supplier partnerships and store formats to the systems that support a multi-country business.",
    contribution:
      "Drove Smile's international expansion into the UAE and continues to shape the group's growth plans across both countries.",
    quote: "Growth only matters if every customer still feels the same Smile when they walk in.",
  },
  {
    id: "executive-director",
    name: "Naseem Kamal",
    position: "Executive Director",
    image: images.portraitC,
    summary:
      "Brings operational precision to Smile — from supply chain and store standards to the people who serve our customers every day.",
    biography:
      "The Executive Director is responsible for store performance, supply chain and team development across the group.",
    personalHistory:
      "A hands-on leader who believes great retail is built on the shop floor, the Executive Director spends much of the week inside Smile stores.",
    journey:
      "Built the operating standards that allow new Smile outlets to open quickly and consistently, in Kannur and beyond.",
    contribution:
      "Strengthened freshness, availability and service standards, and leads training programmes for Smile teams.",
  },
  {
    id: "managing-partner-1",
    name: "Noushad Keelath",
    position: "Managing Partner",
    image: "/images/leadership/noushad-keelath.jpg",
    summary:
      "Partners in Smile's growth, with a particular focus on new markets, partnerships and the customer experience in the UAE.",
    biography:
      "As Managing Partner, this leader supports Smile's strategic partnerships and new outlet development.",
    personalHistory:
      "Having lived and worked between Kerala and the Gulf, the Managing Partner understands what families on both sides of the Arabian Sea look for in a hypermarket.",
    journey:
      "Played a central role in establishing Smile's presence in Ajman, from site selection to launch.",
    contribution:
      "Brings cross-border perspective to Smile's range, service and brand, helping the group serve expatriate families across the UAE.",
  },
  {
    id: "managing-partner-2",
    name: "Rajeev Puthiyaveettil",
    position: "Managing Partner",
    image: "",
    summary:
      "Focused on finance, governance and the long-term strength of the Smile group as it grows across borders.",
    biography:
      "This Managing Partner oversees finance, governance and investment planning for the group.",
    personalHistory:
      "With a background in business and finance, the Managing Partner brings a disciplined, long-term view to every decision.",
    journey:
      "Helped put in place the financial foundations that support Smile's expansion into new cities and countries.",
    contribution:
      "Ensures that Smile grows responsibly, with strong governance and sustainable investment in new outlets.",
  },
];
