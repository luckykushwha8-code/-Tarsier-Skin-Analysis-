export type SkinType = "oily" | "dry" | "combination" | "sensitive" | "normal";
export type BudgetTier = "low" | "medium" | "high";
export type Country = "India" | "USA" | "UK";

export type AffiliateCatalogProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: "INR";
  affiliateLink?: string;
  skinTypes: SkinType[];
  concerns: string[];
  budgets: BudgetTier[];
  popularity: number;
  category: string;
  routineSlots: Array<"morning" | "night">;
};

export type RecommendationInput = {
  skinType: SkinType;
  issues: string[];
  budget: BudgetTier;
  country: Country;
  limit?: number;
};

export type RecommendationProduct = {
  name: string;
  price: string;
  image: string;
  affiliate_link: string;
  reason: string;
};

export type RecommendationResponse = {
  analysis: {
    skin_type: SkinType;
    main_issues: string[];
    recommendation_summary: string;
  };
  routine: {
    morning: string[];
    night: string[];
  };
  products: RecommendationProduct[];
};

const ALL_SKIN_TYPES: SkinType[] = ["oily", "dry", "combination", "sensitive", "normal"];
const OILY_FRIENDLY: SkinType[] = ["oily", "combination", "normal"];
const DRY_FRIENDLY: SkinType[] = ["dry", "sensitive", "normal", "combination"];
const SENSITIVE_SAFE: SkinType[] = ["sensitive", "dry", "normal", "combination"];

export const affiliateCatalog: AffiliateCatalogProduct[] = [
  {
    id: "derma-hyaluronic-sunscreen-50g",
    brand: "The Derma Co",
    name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel SPF 50 PA++++ 50 g",
    price: 408,
    currency: "INR",
    affiliateLink: "https://amzn.to/4sO950b",
    skinTypes: ALL_SKIN_TYPES,
    concerns: ["sunscreen", "hydration", "dark spots", "general"],
    budgets: ["low", "medium"],
    popularity: 95,
    category: "Sun Protection",
    routineSlots: ["morning"],
  },
  {
    id: "bioderma-photoderm-creme-claire",
    brand: "Bioderma",
    name: "Bioderma Photoderm Creme Claire SPF 50+ PA++++ Tinted Sunscreen",
    price: 1169,
    currency: "INR",
    affiliateLink: "https://amzn.to/4sir2D6",
    skinTypes: DRY_FRIENDLY,
    concerns: ["sunscreen", "hydration", "dark spots", "sensitive", "dullness"],
    budgets: ["medium", "high"],
    popularity: 83,
    category: "Sun Protection",
    routineSlots: ["morning"],
  },
  {
    id: "derma-niacinamide-serum",
    brand: "The Derma Co",
    name: "The Derma Co 10% Niacinamide Serum with 2% Zinc 30 ml",
    price: 500,
    currency: "INR",
    affiliateLink: "https://amzn.to/3OfT0Bc",
    skinTypes: ["oily", "combination", "sensitive", "normal"],
    concerns: ["acne", "dark spots", "oiliness", "pores", "acne marks"],
    budgets: ["low", "medium"],
    popularity: 91,
    category: "Facial Serums & Treatments",
    routineSlots: ["morning", "night"],
  },
  {
    id: "minimalist-alpha-arbutin",
    brand: "Minimalist",
    name: "Minimalist Dark Spots Removal Serum with 2% Alpha Arbutin 30 ml",
    price: 521,
    currency: "INR",
    affiliateLink: "https://amzn.to/41LNdGB",
    skinTypes: ALL_SKIN_TYPES,
    concerns: ["dark spots", "pigmentation", "acne marks", "dullness", "tanning"],
    budgets: ["medium"],
    popularity: 93,
    category: "Facial Serums & Treatments",
    routineSlots: ["night"],
  },
  {
    id: "minimalist-spf50-niacinamide",
    brand: "Minimalist",
    name: "Minimalist Sunscreen SPF 50 PA+++ with Niacinamide 50 g",
    price: 359,
    currency: "INR",
    affiliateLink: "https://amzn.to/3QcAsCs",
    skinTypes: ALL_SKIN_TYPES,
    concerns: ["sunscreen", "oiliness", "dark spots", "general"],
    budgets: ["low", "medium"],
    popularity: 89,
    category: "Sun Protection",
    routineSlots: ["morning"],
  },
  {
    id: "minimalist-salicylic-facewash",
    brand: "Minimalist",
    name: "Minimalist Anti-Acne Salicylic Acid 2% Face Wash 100 ml",
    price: 284,
    currency: "INR",
    affiliateLink: "https://amzn.to/4s6FfCI",
    skinTypes: OILY_FRIENDLY,
    concerns: ["acne", "oiliness", "pores", "blackheads"],
    budgets: ["low"],
    popularity: 90,
    category: "Facial Cleansers & Scrubs",
    routineSlots: ["morning", "night"],
  },
  {
    id: "cetaphil-gentle-hydrating-facewash",
    brand: "Cetaphil",
    name: "Cetaphil Gentle Skin Hydrating Face Wash 118 ml",
    price: 390,
    currency: "INR",
    affiliateLink: "https://amzn.to/47COOCa",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["hydration", "sensitivity", "barrier repair", "general"],
    budgets: ["low", "medium"],
    popularity: 88,
    category: "Facial Cleansers & Scrubs",
    routineSlots: ["morning", "night"],
  },
  {
    id: "derma-sali-cinamide-facewash",
    brand: "The Derma Co",
    name: "The Derma Co Sali-Cinamide Anti-Acne Face Wash 80 ml",
    price: 190,
    currency: "INR",
    affiliateLink: "https://amzn.to/4bLXAjQ",
    skinTypes: OILY_FRIENDLY,
    concerns: ["acne", "acne marks", "oiliness", "pores"],
    budgets: ["low"],
    popularity: 86,
    category: "Facial Cleansers & Scrubs",
    routineSlots: ["morning", "night"],
  },
  {
    id: "derma-hyaluronic-sunscreen-30g",
    brand: "The Derma Co",
    name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel SPF 50 PA++++ 30 g",
    price: 263,
    currency: "INR",
    skinTypes: ALL_SKIN_TYPES,
    concerns: ["sunscreen", "hydration", "dark spots", "general"],
    budgets: ["low"],
    popularity: 81,
    category: "Sun Protection",
    routineSlots: ["morning"],
  },
  {
    id: "plum-green-tea-facewash",
    brand: "Plum",
    name: "Plum Green Tea Pore Cleansing Face Wash 50 ml",
    price: 121,
    currency: "INR",
    affiliateLink: "https://amzn.to/4cjr2h5",
    skinTypes: ["oily", "dry", "combination", "normal"],
    concerns: ["acne", "oiliness", "pores", "dullness"],
    budgets: ["low"],
    popularity: 80,
    category: "Facial Cleansers & Scrubs",
    routineSlots: ["morning", "night"],
  },
  {
    id: "biotique-morning-nectar",
    brand: "Biotique",
    name: "Biotique Morning Nectar Flawless Skin Moisturizer Lotion 190 ml",
    price: 212,
    currency: "INR",
    affiliateLink: "https://amzn.to/41F6cmb",
    skinTypes: ALL_SKIN_TYPES,
    concerns: ["hydration", "dullness", "dark spots", "general"],
    budgets: ["low"],
    popularity: 79,
    category: "Facial Moisturisers & Oils",
    routineSlots: ["morning", "night"],
  },
  {
    id: "biotique-cucumber-toner",
    brand: "Biotique",
    name: "Biotique Cucumber Pore Tightening Toner 120 ml",
    price: 130,
    currency: "INR",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["oiliness", "pores", "acne", "general"],
    budgets: ["low"],
    popularity: 75,
    category: "Facial Toners",
    routineSlots: ["morning", "night"],
  },
  {
    id: "indus-valley-sandalwood-pack",
    brand: "Indus Valley",
    name: "Indus Valley Bio Organic Sandalwood Face Pack Powder 200 g",
    price: 209,
    currency: "INR",
    affiliateLink: "https://amzn.to/4tmQecu",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["dark spots", "pigmentation", "acne", "glow", "tan removal"],
    budgets: ["low"],
    popularity: 82,
    category: "Facial Masks & Peels",
    routineSlots: ["night"],
  },
  {
    id: "minimalist-salicylic-serum",
    brand: "Minimalist",
    name: "Minimalist Anti-Acne 2% Salicylic Acid Face Serum 30 ml",
    price: 521,
    currency: "INR",
    affiliateLink: "https://amzn.to/417d5wE",
    skinTypes: OILY_FRIENDLY,
    concerns: ["acne", "blackheads", "oiliness", "bumpy texture"],
    budgets: ["medium"],
    popularity: 90,
    category: "Facial Serums & Treatments",
    routineSlots: ["night"],
  },
  {
    id: "minimalist-vitamin-c-serum",
    brand: "Minimalist",
    name: "Minimalist 16% Vitamin C Face Serum 20 ml",
    price: 569,
    currency: "INR",
    affiliateLink: "https://amzn.to/4scc3KO",
    skinTypes: ["oily", "dry", "combination", "normal"],
    concerns: ["dullness", "glow", "dark spots", "pigmentation"],
    budgets: ["medium"],
    popularity: 88,
    category: "Facial Serums & Treatments",
    routineSlots: ["morning"],
  },
  {
    id: "minimalist-peeling-serum",
    brand: "Minimalist",
    name: "Minimalist 25% AHA + 2% BHA + 5% PHA Peeling Serum 30 ml",
    price: 664,
    currency: "INR",
    affiliateLink: "https://amzn.to/4c16ngq",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["dullness", "texture", "pores", "glow", "blackheads"],
    budgets: ["medium"],
    popularity: 84,
    category: "Facial Masks & Peels",
    routineSlots: ["night"],
  },
  {
    id: "ordinary-peeling-solution",
    brand: "The Ordinary",
    name: "The Ordinary AHA 30% + BHA 2% Peeling Solution 30 ml",
    price: 950,
    currency: "INR",
    affiliateLink: "https://amzn.to/41GyYmw",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["dullness", "texture", "pores", "glow", "dark spots"],
    budgets: ["medium", "high"],
    popularity: 87,
    category: "Facial Masks & Peels",
    routineSlots: ["night"],
  },
  {
    id: "ordinary-niacinamide-zinc",
    brand: "The Ordinary",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    price: 600,
    currency: "INR",
    affiliateLink: "https://amzn.to/4bNa1vO",
    skinTypes: OILY_FRIENDLY,
    concerns: ["acne", "oiliness", "pores", "dark spots"],
    budgets: ["medium"],
    popularity: 89,
    category: "Facial Serums & Treatments",
    routineSlots: ["morning", "night"],
  },
  {
    id: "celimax-retinal-booster",
    brand: "Celimax",
    name: "Celimax Vita-A Retinal Shot Tightening Booster 15 ml",
    price: 2199,
    currency: "INR",
    affiliateLink: "https://amzn.to/4s3XI2P",
    skinTypes: ["dry", "combination", "normal"],
    concerns: ["wrinkles", "fine lines", "anti-aging", "pores"],
    budgets: ["high"],
    popularity: 78,
    category: "Facial Serums & Treatments",
    routineSlots: ["night"],
  },
  {
    id: "neutrogena-retinol-cream",
    brand: "Neutrogena",
    name: "Neutrogena Visible Repair Retinol Day & Night Cream 50 g",
    price: 1290,
    currency: "INR",
    affiliateLink: "https://amzn.to/4v6mxhh",
    skinTypes: ["dry", "combination", "normal"],
    concerns: ["wrinkles", "fine lines", "anti-aging", "dullness"],
    budgets: ["high"],
    popularity: 85,
    category: "Facial Moisturisers & Oils",
    routineSlots: ["night"],
  },
  {
    id: "neutrogena-ultrasheer-sunscreen",
    brand: "Neutrogena",
    name: "Neutrogena Ultrasheer Sunscreen SPF 50+ PA++++ 80 g",
    price: 583,
    currency: "INR",
    affiliateLink: "https://amzn.to/41L0y1S",
    skinTypes: ALL_SKIN_TYPES,
    concerns: ["sunscreen", "general", "dark spots", "sensitive"],
    budgets: ["medium"],
    popularity: 87,
    category: "Sun Protection",
    routineSlots: ["morning"],
  },
  {
    id: "cerave-blemish-control-cleanser",
    brand: "CeraVe",
    name: "CeraVe Blemish Control Cleanser 236 ml",
    price: 1125,
    currency: "INR",
    affiliateLink: "https://amzn.to/4bKU6xZ",
    skinTypes: OILY_FRIENDLY,
    concerns: ["acne", "blemishes", "pores", "oiliness"],
    budgets: ["medium", "high"],
    popularity: 86,
    category: "Facial Cleansers & Scrubs",
    routineSlots: ["morning", "night"],
  },
  {
    id: "cerave-foaming-cleanser",
    brand: "CeraVe",
    name: "CeraVe Foaming Cleanser For Normal To Oily Skin 473 ml",
    price: 1485,
    currency: "INR",
    affiliateLink: "https://amzn.to/4trSn6J",
    skinTypes: OILY_FRIENDLY,
    concerns: ["acne", "oiliness", "general", "barrier repair"],
    budgets: ["high"],
    popularity: 92,
    category: "Facial Cleansers & Scrubs",
    routineSlots: ["morning", "night"],
  },
  {
    id: "cerave-moisturizing-cream",
    brand: "CeraVe",
    name: "CeraVe Moisturizing Cream For Dry To Very Dry Skin 454 g",
    price: 1615,
    currency: "INR",
    affiliateLink: "https://amzn.to/3PFfD2x",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["hydration", "barrier repair", "sensitivity", "general"],
    budgets: ["high"],
    popularity: 94,
    category: "Facial Moisturisers & Oils",
    routineSlots: ["morning", "night"],
  },
];

const concernAliases: Record<string, string[]> = {
  acne: ["acne", "pimples", "breakouts", "blemishes"],
  "dark spots": ["dark spots", "pigmentation", "acne marks", "tanning", "tan removal"],
  dullness: ["dullness", "glow", "radiance"],
  wrinkles: ["wrinkles", "fine lines", "anti-aging"],
  hydration: ["hydration", "dryness", "barrier repair"],
  oily: ["oiliness", "oily", "pores", "blackheads"],
  texture: ["texture", "bumpy texture", "pores"],
  sensitive: ["sensitive", "sensitivity", "redness"],
  sunscreen: ["sunscreen", "sun protection"],
  general: ["general"],
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function normalizeConcern(value: string) {
  const normalized = normalizeText(value);
  for (const [canonical, aliases] of Object.entries(concernAliases)) {
    if (canonical === normalized || aliases.some((alias) => normalizeText(alias) === normalized)) {
      return canonical;
    }
  }

  for (const [canonical, aliases] of Object.entries(concernAliases)) {
    if (aliases.some((alias) => normalized.includes(normalizeText(alias)) || normalizeText(alias).includes(normalized))) {
      return canonical;
    }
  }

  return normalized || "general";
}

export function findAffiliateCatalogMatch(name: string, brand?: string) {
  const normalizedName = normalizeText(name);
  const normalizedBrand = normalizeText(brand || "");

  return affiliateCatalog.find((product) => {
    const productName = normalizeText(product.name);
    const productBrand = normalizeText(product.brand);
    const brandMatches = !normalizedBrand || productBrand.includes(normalizedBrand) || normalizedBrand.includes(productBrand);
    return brandMatches && (productName.includes(normalizedName) || normalizedName.includes(productName));
  });
}

export function budgetMatches(price: number, budget: BudgetTier) {
  if (budget === "low") return price <= 500;
  if (budget === "medium") return price > 300 && price <= 1200;
  return price > 1000;
}

export function formatPrice(price: number, currency: "INR" = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function buildRecommendationReason(product: AffiliateCatalogProduct, issues: string[], skinType: SkinType) {
  const issueMatches = product.concerns.filter((concern) => issues.includes(normalizeConcern(concern)));

  if (issueMatches.length > 0) {
    return `Matches ${skinType} skin needs and targets ${issueMatches.slice(0, 2).join(" and ")}.`;
  }

  if (product.concerns.includes("hydration")) {
    return `Supports ${skinType} skin by keeping the barrier comfortable and hydrated.`;
  }

  if (product.concerns.includes("sunscreen")) {
    return `Helps protect skin daily and prevent concerns like marks and dullness from getting worse.`;
  }

  return `Fits ${skinType} skin and stays within the selected budget range.`;
}

function scoreProduct(product: AffiliateCatalogProduct, input: RecommendationInput) {
  const normalizedIssues = input.issues.map(normalizeConcern);
  const concernScore = normalizedIssues.reduce((total, issue) => {
    return total + (product.concerns.some((concern) => normalizeConcern(concern) === issue) ? 30 : 0);
  }, 0);

  const skinTypeScore = product.skinTypes.includes(input.skinType) ? 25 : 0;
  const budgetScore = budgetMatches(product.price, input.budget) ? 20 : product.budgets.includes(input.budget) ? 14 : 0;
  const popularityScore = product.popularity / 5;
  const affiliateScore = product.affiliateLink ? 6 : 0;

  return concernScore + skinTypeScore + budgetScore + popularityScore + affiliateScore;
}

export function recommendProducts(input: RecommendationInput, imageLookup?: Map<string, string>) {
  const normalizedIssues = input.issues.length > 0 ? input.issues.map(normalizeConcern) : ["general"];
  const limit = Math.min(Math.max(input.limit ?? 5, 3), 5);

  const ranked = affiliateCatalog
    .filter((product) => product.skinTypes.includes(input.skinType))
    .filter((product) => product.affiliateLink)
    .filter((product) => normalizedIssues.some((issue) => product.concerns.some((concern) => normalizeConcern(concern) === issue)) || product.concerns.includes("general"))
    .sort((a, b) => scoreProduct(b, input) - scoreProduct(a, input))
    .slice(0, limit);

  const sunscreen = ranked.find((product) => product.concerns.includes("sunscreen"));
  const cleanser = ranked.find((product) => product.category === "Facial Cleansers & Scrubs");
  const treatment = ranked.find((product) => product.category === "Facial Serums & Treatments");
  const moisturizer = ranked.find((product) => product.category === "Facial Moisturisers & Oils");

  return {
    analysis: {
      skin_type: input.skinType,
      main_issues: normalizedIssues,
      recommendation_summary: `For ${input.skinType} skin, focus on a gentle cleanse, one targeted treatment for ${normalizedIssues.join(", ")}, and consistent daily sun protection.`,
    },
    routine: {
      morning: [cleanser?.name, treatment?.routineSlots.includes("morning") ? treatment.name : sunscreen?.name, sunscreen?.name]
        .filter(Boolean) as string[],
      night: [cleanser?.name, treatment?.routineSlots.includes("night") ? treatment.name : moisturizer?.name, moisturizer?.name]
        .filter(Boolean) as string[],
    },
    products: ranked.map((product) => ({
      name: product.name,
      price: formatPrice(product.price, product.currency),
      image: imageLookup?.get(product.id) || "",
      affiliate_link: product.affiliateLink || "",
      reason: buildRecommendationReason(product, normalizedIssues, input.skinType),
    })),
  } satisfies RecommendationResponse;
}
