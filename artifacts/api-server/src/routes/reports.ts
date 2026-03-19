import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

function getSkinConcernsFromMetrics(metrics: { name: string; score: number }[]) {
  const concerns: string[] = [];
  for (const m of metrics) {
    if (m.name === "Hydration" && m.score < 70) concerns.push("hydration");
    if (m.name === "Oiliness" && m.score < 70) concerns.push("oiliness");
    if (m.name === "Acne" && m.score < 75) concerns.push("acne");
    if (m.name === "Dark Spots" && m.score < 70) concerns.push("dark_spots");
    if (m.name === "Wrinkles" && m.score < 75) concerns.push("wrinkles");
    if (m.name === "Sensitivity" && m.score < 70) concerns.push("sensitivity");
  }
  if (concerns.length === 0) concerns.push("general");
  return concerns;
}

router.get("/:scanId", async (req, res) => {
  const scanId = req.params.scanId;

  // Simulated scan metrics (in production these would come from DB scan records)
  const metrics = [
    { name: "Hydration", score: 72, status: "fair", description: "Your skin needs more moisture. Consider adding a hydrating serum to your routine." },
    { name: "Oiliness", score: 65, status: "fair", description: "T-zone shows excess oil production. A balancing toner may help." },
    { name: "Acne", score: 80, status: "good", description: "Minimal breakout activity detected. Keep up your current cleansing routine." },
    { name: "Dark Spots", score: 70, status: "fair", description: "Some hyperpigmentation detected. Vitamin C or niacinamide can help brighten." },
    { name: "Wrinkles", score: 88, status: "good", description: "Minimal fine lines. Daily SPF is key to preventing further development." },
    { name: "Sensitivity", score: 75, status: "good", description: "Moderate skin sensitivity. Use fragrance-free products when possible." },
  ];

  const concerns = getSkinConcernsFromMetrics(metrics);

  // Fetch real recommended products from DB based on skin concerns
  let recommendedProducts: any[] = [];
  try {
    recommendedProducts = await db
      .select()
      .from(productsTable)
      .where(
        sql`${productsTable.skinConcerns} && ARRAY[${sql.join(
          concerns.map((c) => sql`${c}`),
          sql`, `
        )}]::text[] AND ${productsTable.price} IS NOT NULL`
      )
      .orderBy(sql`rating DESC NULLS LAST`)
      .limit(6);
  } catch (e: any) {
    console.error("Failed to fetch recommended products:", e.message);
  }

  res.json({
    scanId,
    overallScore: Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length),
    skinType: "Combination",
    concerns: [
      ...(concerns.includes("hydration") ? ["Mild dehydration"] : []),
      ...(concerns.includes("oiliness") ? ["Oiliness in T-zone"] : []),
      ...(concerns.includes("acne") ? ["Occasional breakouts"] : []),
      ...(concerns.includes("dark_spots") ? ["Light hyperpigmentation"] : []),
      ...(concerns.includes("sensitivity") ? ["Moderate sensitivity"] : []),
      "Use SPF daily for prevention",
    ],
    metrics,
    recommendations: [
      "Apply a hyaluronic acid serum morning and night for deep hydration",
      "Use a gentle niacinamide product to control oiliness and minimize pores",
      "Apply SPF 30+ every morning — it's the #1 anti-aging step",
      "Incorporate a Vitamin C serum to help fade dark spots over time",
      "Drink 8+ glasses of water daily to support skin hydration from within",
    ],
    products: recommendedProducts,
    createdAt: new Date().toISOString(),
  });
});

export default router;
