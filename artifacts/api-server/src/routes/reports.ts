import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db";
import { sql, or, ilike } from "drizzle-orm";
import { scanStore } from "./scans";

const router: IRouter = Router();

// Maps a skin concern to keyword searches and DB categories
const concernToSearch: Record<string, { keywords: string[]; categories: string[] }> = {
  acne: {
    keywords: ["salicylic", "benzoyl", "tea tree", "blemish", "acne", "niacinamide", "clarify"],
    categories: ["Facial Cleansers & Scrubs", "Facial Serums & Treatments", "Facial Masks & Peels"],
  },
  dark_circles: {
    keywords: ["eye", "caffeine", "dark circle", "puffiness", "depuff", "brightening eye", "under eye"],
    categories: ["Eye Skincare Treatments"],
  },
  pigmentation: {
    keywords: ["vitamin c", "brighten", "niacinamide", "kojic", "alpha arbutin", "tranexamic", "even tone", "pigment"],
    categories: ["Facial Serums & Treatments", "Facial Toners"],
  },
  hydration: {
    keywords: ["hyaluronic", "hydrat", "moisture", "ceramide", "plump", "water", "dehydrat"],
    categories: ["Facial Moisturisers & Oils", "Facial Serums & Treatments"],
  },
  oiliness: {
    keywords: ["oil free", "mattif", "oil control", "sebum", "balancing", "pore"],
    categories: ["Facial Cleansers & Scrubs", "Facial Toners"],
  },
  wrinkles: {
    keywords: ["retinol", "peptide", "anti-age", "anti age", "collagen", "firming", "lifting", "fine line"],
    categories: ["Facial Serums & Treatments", "Facial Moisturisers & Oils", "Eye Skincare Treatments"],
  },
  sensitivity: {
    keywords: ["gentle", "sensitive", "fragrance free", "soothe", "calm", "redness", "aloe", "oat"],
    categories: ["Facial Moisturisers & Oils", "Facial Serums & Treatments"],
  },
  general: {
    keywords: ["daily", "essential", "all skin"],
    categories: ["Facial Moisturisers & Oils", "Sun Protection", "Facial Cleansers & Scrubs"],
  },
};

async function fetchProductsForConcern(concern: string, limit = 3): Promise<any[]> {
  const config = concernToSearch[concern] || concernToSearch.general;

  try {
    const keywordConditions = config.keywords.map((kw) =>
      or(ilike(productsTable.name, `%${kw}%`), ilike(productsTable.description || productsTable.name, `%${kw}%`))
    );
    const categoryConditions = config.categories.map((cat) => ilike(productsTable.category, `%${cat}%`));

    const products = await db
      .select()
      .from(productsTable)
      .where(
        sql`(${or(...keywordConditions)} OR ${or(...categoryConditions)}) AND ${productsTable.price} IS NOT NULL`
      )
      .orderBy(sql`${productsTable.rating} DESC NULLS LAST, ${productsTable.reviewCount} DESC NULLS LAST`)
      .limit(limit);

    return products;
  } catch (e: any) {
    console.error(`Failed to fetch products for ${concern}:`, e.message);
    return [];
  }
}

function buildMetrics(issues: Record<string, { severity: string; description: string; score: number }>) {
  const nameMap: Record<string, string> = {
    acne: "Acne",
    dark_circles: "Dark Circles",
    pigmentation: "Pigmentation",
    hydration: "Hydration",
    oiliness: "Oiliness",
    wrinkles: "Wrinkles",
    sensitivity: "Sensitivity",
  };
  return Object.entries(issues).map(([key, val]) => ({
    name: nameMap[key] || key,
    key,
    score: val.score,
    severity: val.severity,
    status: val.severity === "low" ? "good" : val.severity === "medium" ? "fair" : "poor",
    description: val.description,
  }));
}

router.get("/:scanId", async (req, res) => {
  const scanId = req.params.scanId;

  // Retrieve stored scan from POST /scans
  const stored = scanStore.get(scanId);

  if (stored) {
    // Build per-concern product groups
    const issues = stored.issues as Record<string, { severity: string; description: string; score: number }>;
    const concernsToFetch = Object.entries(issues)
      .filter(([, v]) => v.severity !== "low")
      .sort((a, b) => a[1].score - b[1].score) // worst first
      .slice(0, 4)
      .map(([k]) => k);

    if (concernsToFetch.length === 0) concernsToFetch.push("general");

    const productGroups: Record<string, any[]> = {};
    await Promise.all(
      concernsToFetch.map(async (concern) => {
        productGroups[concern] = await fetchProductsForConcern(concern, 3);
      })
    );

    const allProducts = Object.values(productGroups).flat();

    const metrics = buildMetrics(issues);
    const overallScore = stored.overallScore;

    const focusAreas: string[] = [];
    for (const [key, val] of Object.entries(issues)) {
      if (val.severity === "high") focusAreas.push(`High ${key.replace("_", " ")} concern`);
      else if (val.severity === "medium") focusAreas.push(`Moderate ${key.replace("_", " ")}`);
    }

    return res.json({
      scanId,
      overallScore,
      skinType: stored.skinType,
      aiConfidence: stored.aiConfidence,
      issues,
      metrics,
      focusAreas: focusAreas.slice(0, 5),
      routine: stored.routine,
      productGroups,
      products: allProducts,
      tips: stored.tips,
      progressSimulation: stored.progressSimulation,
      createdAt: stored.createdAt,
    });
  }

  // Fallback for old/unknown scanIds
  const defaultMetrics = [
    { name: "Hydration", key: "hydration", score: 72, severity: "medium", status: "fair", description: "Your skin needs more moisture." },
    { name: "Oiliness", key: "oiliness", score: 65, severity: "medium", status: "fair", description: "T-zone shows excess oil production." },
    { name: "Acne", key: "acne", score: 80, severity: "low", status: "good", description: "Minimal breakout activity detected." },
    { name: "Dark Circles", key: "dark_circles", score: 70, severity: "medium", status: "fair", description: "Mild under-eye discoloration." },
    { name: "Wrinkles", key: "wrinkles", score: 88, severity: "low", status: "good", description: "Minimal fine lines." },
    { name: "Sensitivity", key: "sensitivity", score: 75, severity: "low", status: "good", description: "Moderate skin sensitivity." },
  ];
  const fallbackConcerns = ["hydration", "oiliness", "dark_circles"];
  const products: any[] = [];
  await Promise.all(fallbackConcerns.map(async (c) => { products.push(...await fetchProductsForConcern(c, 2)); }));

  res.json({
    scanId,
    overallScore: 75,
    skinType: "Combination",
    aiConfidence: 92,
    metrics: defaultMetrics,
    focusAreas: ["Moderate hydration concern", "Moderate oiliness", "Mild dark circles"],
    routine: {
      morning: [
        { step: "Cleanser", icon: "💧", description: "Gentle foaming cleanser" },
        { step: "Serum", icon: "✨", description: "Niacinamide serum to balance skin" },
        { step: "Moisturiser", icon: "🧴", description: "Oil-free gel moisturiser" },
        { step: "SPF", icon: "☀️", description: "SPF 50+ broad-spectrum sunscreen" },
      ],
      night: [
        { step: "Double Cleanse", icon: "🌙", description: "Oil cleanser then foam cleanser" },
        { step: "Serum", icon: "💎", description: "Hyaluronic acid serum for overnight hydration" },
        { step: "Moisturiser", icon: "🌛", description: "Nourishing night cream" },
      ],
    },
    products,
    productGroups: {},
    tips: [
      "Drink at least 8 glasses of water daily.",
      "Apply SPF every morning without fail.",
      "Change your pillowcase every 2–3 days.",
    ],
    progressSimulation: {
      week_1: "Skin texture starts to improve.",
      week_2: "Visible reduction in pore size and oiliness.",
      week_4: "Noticeably clearer and more radiant complexion.",
      week_8: "Sustained glow — continue your routine to maintain results.",
    },
    createdAt: new Date().toISOString(),
  });
});

export default router;
