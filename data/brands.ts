/**
 * Brands shown in the homepage "Top Brands" marquee.
 * Logo files live in /public/images/brands. To add a brand, drop its logo
 * there and add an entry below. Entries without a `logo` are set in type.
 */
export interface Brand {
  name: string;
  /** Colour used on hover for text-only entries. */
  color?: string;
  logo?: string;
}

export const brandsRowOne: Brand[] = [
  { name: "Ajmi", logo: "/images/brands/ajmi.png" },
  { name: "Amul", logo: "/images/brands/amul.png" },
  { name: "Britannia", logo: "/images/brands/britannia.png" },
  { name: "Aashirvaad", logo: "/images/brands/aashirvaad.png" },
];

export const brandsRowTwo: Brand[] = [
  { name: "Nestlé", logo: "/images/brands/nestle.png" },
  { name: "Cadbury", logo: "/images/brands/cadbury.png" },
  { name: "Almarai", logo: "/images/brands/almarai.png" },
  { name: "Chandrika", logo: "/images/brands/chandrika.png" },
];
