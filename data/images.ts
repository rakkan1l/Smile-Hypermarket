/**
 * Central image library.
 *
 * Every photo on the site is referenced from here, so swapping placeholder
 * photography for real Smile photos is a one-file change:
 *   1. Drop the file into /public/images (e.g. /public/images/outlets/varam.jpg)
 *   2. Replace the URL below with the local path ("/images/outlets/varam.jpg")
 *
 * The current URLs are temporary Unsplash placeholders.
 */
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const images = {
  hero: unsplash("1604719312566-8912e9227c6a"),
  aisle: unsplash("1578916171728-46686eac8d58"),
  produce: unsplash("1542838132-92c53300491e"),
  shopper: unsplash("1534723452862-4c874018d66d"),
  shelves: unsplash("1579113800032-c38bd7635818"),
  groceryBasket: unsplash("1543168256-418811576931"),
  storeInterior: unsplash("1588964895597-cfccd6e2dbf9"),
  freshMarket: unsplash("1488459716781-31db52582fe9"),
  fruits: unsplash("1506617420156-8e4536971650"),
  checkout: unsplash("1556742049-0cfed4f6a45d"),
  supermarketWide: unsplash("1601600576337-c1d8a0d1373c"),
  groceryAisle: unsplash("1583258292688-d0213dc5a3a8"),
  shoppingBags: unsplash("1607083206869-4c7672e72a8a"),
  retailFloor: unsplash("1441986300917-64674bd600d8"),
  bakery: unsplash("1509440159596-0249088772ff"),
  kerala: unsplash("1602216056096-3b40cc0c9944"),

  // Leadership portraits — replace with official photographs.
  portraitA: unsplash("1560250097-0b93528c311a"),
  portraitB: unsplash("1507003211169-0a1dd7228f2d"),
  portraitC: unsplash("1519085360753-af0119f7cbe7"),
  portraitD: unsplash("1500648767791-00dcc994a43e"),
} as const;

export type ImageKey = keyof typeof images;
