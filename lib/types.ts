export type Country = "India" | "UAE";
export type OutletStatus = "open" | "coming-soon";

export interface Outlet {
  id: string;
  slug: string;
  name: string;
  /** Short label used in compact lists, e.g. "Dharmadam" for "Smile Xpress – Dharmadam". */
  shortName: string;
  format: "Hypermarket" | "Xpress";
  country: Country;
  city: string;
  area: string;
  address: string;
  phone: string;
  /** International format without "+" or spaces, e.g. "919000000001". */
  whatsapp: string;
  email: string;
  openingHours: string;
  image: string;
  gallery: string[];
  /** Search phrase used for Google Maps embeds and directions. */
  mapQuery: string;
  mapUrl: string;
  latitude: number;
  longitude: number;
  status: OutletStatus;
  departments: string[];
  featured?: boolean;
  intro: string;
}

export type OfferStatus = "active" | "upcoming" | "expired";

export interface Offer {
  slug: string;
  title: string;
  tagline: string;
  poster: string;
  startDate: string; // ISO yyyy-mm-dd
  endDate: string;
  /** Outlet slugs, or "all" for every open outlet. */
  participatingOutlets: string[] | "all";
  description: string;
  highlights: string[];
  terms: string[];
  status: OfferStatus;
  category: string;
  featured?: boolean;
}

export type EmploymentType = "Full-time" | "Part-time" | "Contract";

export interface Job {
  id: string;
  slug: string;
  position: string;
  department: string;
  branch: string;
  country: Country;
  employmentType: EmploymentType;
  postedDate: string;
  status: "open" | "closed";
  description: string;
  responsibilities: string[];
  requirements: string[];
  experience: string;
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  image: string;
  summary: string;
  biography: string;
  personalHistory: string;
  journey: string;
  contribution: string;
  quote?: string;
}
