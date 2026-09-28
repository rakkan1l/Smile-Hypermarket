/**
 * Brands shown in the homepage marquee.
 * Add `logo: "/images/brands/amul.svg"` once official logo files are available;
 * until then the brand name is set in type. `color` is used on hover.
 */
export interface Brand {
  name: string;
  color: string;
  logo?: string;
}

export const brandsRowOne: Brand[] = [
  { name: "Nestlé", color: "#5f6a72" },
  { name: "Amul", color: "#d8232a" },
  { name: "Britannia", color: "#c8102e" },
  { name: "Tata", color: "#486aae" },
  { name: "Aashirvaad", color: "#b5651d" },
  { name: "Eastern", color: "#e2231a" },
  { name: "MTR", color: "#c4161c" },
  { name: "Brahmins", color: "#1f6a3a" },
];

export const brandsRowTwo: Brand[] = [
  { name: "Almarai", color: "#00843d" },
  { name: "Al Ain", color: "#0071bc" },
  { name: "Unilever", color: "#1f36c7" },
  { name: "Colgate", color: "#e4002b" },
  { name: "Dabur", color: "#00732f" },
  { name: "Kellogg's", color: "#d31245" },
  { name: "Milma", color: "#1b75bb" },
  { name: "Himalaya", color: "#0c7c3f" },
];
