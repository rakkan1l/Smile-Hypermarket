import type { Job } from "@/lib/types";

/** Open positions. Set `status: "closed"` to hide a vacancy without deleting it. */
export const jobs: Job[] = [
  {
    id: "job-001",
    slug: "store-manager-al-jurf",
    position: "Store Manager",
    department: "Operations",
    branch: "Al Jurf",
    country: "UAE",
    employmentType: "Full-time",
    postedDate: "2026-09-18",
    status: "closed",
    experience: "8+ years in hypermarket operations, including 3+ years leading a store",
    description:
      "Lead our Al Jurf hypermarket and set the standard for how Smile looks, feels and serves customers in the UAE. You will own store performance, people and the everyday customer experience.",
    responsibilities: [
      "Deliver sales, margin and shrinkage targets for the store",
      "Lead, coach and schedule department managers and floor teams",
      "Keep merchandising, freshness and cleanliness to Smile standards",
      "Work with buying and marketing teams on campaigns and promotions",
      "Ensure compliance with health, safety and municipality regulations",
    ],
    requirements: [
      "Proven experience managing a hypermarket or large supermarket",
      "Strong commercial understanding of P&L and inventory",
      "Excellent people leadership and communication skills",
      "English essential; Malayalam, Hindi or Arabic an advantage",
      "Valid UAE driving licence preferred",
    ],
  },
  {
    id: "job-002",
    slug: "fresh-food-supervisor-varam",
    position: "Fresh Food Supervisor",
    department: "Fresh",
    branch: "Varam",
    country: "India",
    employmentType: "Full-time",
    postedDate: "2026-09-22",
    status: "closed",
    experience: "3+ years in fresh produce, fish or meat sections",
    description:
      "Look after the heart of the store. You will run our fresh departments at Varam, making sure every fruit, vegetable and cut on display is something you would take home yourself.",
    responsibilities: [
      "Supervise the fruits & vegetables, fish and meat counters",
      "Manage ordering, rotation and wastage control",
      "Train counter staff in handling, hygiene and customer service",
      "Maintain temperature logs and food safety records",
    ],
    requirements: [
      "Hands-on experience in fresh food retail",
      "Good knowledge of food hygiene practices",
      "Able to work early shifts and weekends",
      "Malayalam and basic English",
    ],
  },
  {
    id: "job-003",
    slug: "cashier-kakkad",
    position: "Cashier",
    department: "Front End",
    branch: "Kakkad",
    country: "India",
    employmentType: "Full-time",
    postedDate: "2026-09-24",
    status: "closed",
    experience: "0–2 years; freshers welcome",
    description:
      "Be the friendly last impression of every Smile visit. Our cashiers keep checkouts moving quickly while making every customer feel looked after.",
    responsibilities: [
      "Operate billing counters accurately and efficiently",
      "Handle cash, cards and UPI payments",
      "Help customers with offers, returns and queries",
      "Keep the checkout area clean and organised",
    ],
    requirements: [
      "Plus Two or above",
      "Basic computer knowledge",
      "Friendly, patient and honest",
      "Malayalam essential; English an advantage",
    ],
  },
  {
    id: "job-004",
    slug: "category-buyer-grocery",
    position: "Category Buyer – Grocery",
    department: "Buying & Merchandising",
    branch: "Head Office, Kannur",
    country: "India",
    employmentType: "Full-time",
    postedDate: "2026-09-10",
    status: "closed",
    experience: "5+ years in FMCG or retail buying",
    description:
      "Shape what families find on Smile shelves. You will manage the grocery category range, suppliers and pricing across our Kerala outlets.",
    responsibilities: [
      "Plan the grocery range and assortment for each outlet",
      "Negotiate terms and promotions with suppliers and distributors",
      "Track sales, margins and stock cover by category",
      "Plan category campaigns with the marketing team",
    ],
    requirements: [
      "Degree in business, commerce or a related field",
      "Strong negotiation and analytical skills",
      "Confident with spreadsheets and retail ERP systems",
    ],
  },
  {
    id: "job-005",
    slug: "sales-associate-al-nuaimiya",
    position: "Sales Associate",
    department: "Store Operations",
    branch: "Al Nuaimiya",
    country: "UAE",
    employmentType: "Full-time",
    postedDate: "2026-09-25",
    status: "closed",
    experience: "1+ year in retail preferred",
    description:
      "Keep our aisles full, tidy and welcoming, and help customers find exactly what they came for.",
    responsibilities: [
      "Replenish shelves and maintain planograms",
      "Check expiry dates and price labels",
      "Assist customers on the shop floor",
      "Support stock counts and deliveries",
    ],
    requirements: [
      "Good communication in English; Malayalam or Hindi a plus",
      "Physically fit and able to work shifts",
      "Positive, customer-first attitude",
    ],
  },
  {
    id: "job-006",
    slug: "digital-marketing-executive",
    position: "Digital Marketing Executive",
    department: "Marketing",
    branch: "Head Office, Kannur",
    country: "India",
    employmentType: "Full-time",
    postedDate: "2026-09-05",
    status: "closed",
    experience: "2+ years in social media or digital marketing",
    description:
      "Tell the Smile story online. You will plan and publish campaigns across Instagram, Facebook and WhatsApp for our India and UAE audiences.",
    responsibilities: [
      "Plan and publish the monthly social media calendar",
      "Coordinate offer creatives with designers and outlets",
      "Report on reach, engagement and campaign results",
      "Manage WhatsApp channel updates and customer messages",
    ],
    requirements: [
      "Strong writing skills in English and Malayalam",
      "Experience with Meta Business Suite",
      "Basic design skills (Canva or similar) an advantage",
    ],
  },
];

export const openJobs = jobs.filter((j) => j.status === "open");
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
