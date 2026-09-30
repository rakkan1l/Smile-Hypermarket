import { images } from "./images";

/** Brand story milestones and values. Edit the copy here. */
export const milestones = [
  {
    label: "The Beginning",
    title: "A neighbourhood store with a bigger idea",
    body: "Smile began in Kannur with one belief — that families deserve a modern, reliable place to shop, run with the care of a local store.",
    image: images.freshMarket,
  },
  {
    label: "Growing Across Kannur",
    title: "Varam, Kambil, Kakkad and beyond",
    body: "As word spread, Smile opened in more neighbourhoods across Kannur, each store built around fresh food, fair prices and friendly service.",
    image: images.supermarketWide,
  },
  {
    label: "Building Customer Trust",
    title: "Earned one family at a time",
    body: "Consistent quality, honest pricing and teams who know their customers by name turned first visits into lifelong habits.",
    image: images.checkout,
  },
  {
    label: "Expanding the Smile Family",
    title: "New formats for new needs",
    body: "Smile Xpress in Dharmadam brought the Smile promise to quick daily shopping, and the team grew with every new opening.",
    image: images.shelves,
  },
  {
    label: "Smile Goes International",
    title: "From Kannur to Ajman",
    body: "With outlets in Al Jurf and Al Nuaimiya, Smile now serves families across the UAE — many of whom first knew Smile back home in Kerala.",
    image: images.retailFloor,
  },
  {
    label: "The Future",
    title: "Growing with the families we serve",
    body: "Chakkarakkal is next. Wherever Smile goes, the promise stays the same: quality, value and care, across borders.",
    image: images.kerala,
  },
] as const;

export const values = [
  { title: "Trust", body: "Earned daily through honesty in every price, product and conversation." },
  { title: "Quality", body: "Carefully chosen products, fresh counters and standards we never relax." },
  { title: "Value", body: "Competitive everyday prices so families can do more with every shop." },
  { title: "Community", body: "Local teams, local suppliers and a genuine place in every neighbourhood." },
  { title: "Growth", body: "Growing responsibly — for our customers, our people and our partners." },
] as const;
