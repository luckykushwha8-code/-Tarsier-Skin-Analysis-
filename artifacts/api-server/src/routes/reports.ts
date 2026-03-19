import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/:scanId", (req, res) => {
  const scanId = req.params.scanId;
  res.json({
    scanId,
    overallScore: 78,
    skinType: "Combination",
    concerns: ["Mild dehydration", "Minor oiliness in T-zone", "Light hyperpigmentation"],
    metrics: [
      { name: "Hydration", score: 72, status: "fair", description: "Your skin needs more moisture" },
      { name: "Oiliness", score: 65, status: "fair", description: "T-zone shows excess oil production" },
      { name: "Acne", score: 80, status: "good", description: "Minimal breakout activity" },
      { name: "Dark Spots", score: 70, status: "fair", description: "Some hyperpigmentation detected" },
      { name: "Wrinkles", score: 88, status: "good", description: "Minimal fine lines" },
      { name: "Sensitivity", score: 75, status: "good", description: "Moderate skin sensitivity" },
    ],
    recommendations: [
      "Use a gentle hyaluronic acid serum twice daily",
      "Apply SPF 30+ sunscreen every morning",
      "Incorporate a niacinamide product to control oiliness",
      "Stay hydrated — drink at least 8 glasses of water daily",
    ],
    products: [
      {
        id: "prod-1",
        name: "Hyaluronic Acid Serum",
        brand: "The Ordinary",
        category: "Serum",
        price: 12.9,
        rating: 4.7,
        imageUrl: "",
        description: "Lightweight serum with 2% hyaluronic acid for intense hydration",
        ingredients: ["Hyaluronic Acid", "Vitamin B5"],
        isFavorite: false,
      },
    ],
    createdAt: new Date().toISOString(),
  });
});

export default router;
