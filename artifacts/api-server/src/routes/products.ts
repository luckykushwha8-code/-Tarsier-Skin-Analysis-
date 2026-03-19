import { Router, type IRouter } from "express";

const router: IRouter = Router();

const products = [
  {
    id: "prod-1",
    name: "Hyaluronic Acid Serum",
    brand: "The Ordinary",
    category: "Serum",
    price: 12.9,
    rating: 4.7,
    imageUrl: "",
    description: "2% hyaluronic acid for intense hydration",
    ingredients: ["Hyaluronic Acid", "Vitamin B5"],
    isFavorite: false,
  },
  {
    id: "prod-2",
    name: "Ultra Facial Cream",
    brand: "Kiehl's",
    category: "Moisturizer",
    price: 52.0,
    rating: 4.8,
    imageUrl: "",
    description: "24-hour hydration moisturizer for all skin types",
    ingredients: ["Glacial Glycoprotein", "Imperata Cylindrica"],
    isFavorite: true,
  },
  {
    id: "prod-3",
    name: "Gentle Foaming Cleanser",
    brand: "CeraVe",
    category: "Cleanser",
    price: 14.0,
    rating: 4.6,
    imageUrl: "",
    description: "Non-comedogenic cleanser with 3 essential ceramides",
    ingredients: ["Ceramides", "Niacinamide", "Hyaluronic Acid"],
    isFavorite: false,
  },
  {
    id: "prod-4",
    name: "Invisible Shield SPF 35",
    brand: "Supergoop",
    category: "SPF",
    price: 38.0,
    rating: 4.5,
    imageUrl: "",
    description: "Lightweight daily sunscreen that wears like a serum",
    ingredients: ["Avobenzone", "Octisalate", "Vitamin E"],
    isFavorite: false,
  },
  {
    id: "prod-5",
    name: "10% Niacinamide + 1% Zinc",
    brand: "The Ordinary",
    category: "Serum",
    price: 6.9,
    rating: 4.6,
    imageUrl: "",
    description: "Reduces blemishes and balances sebum activity",
    ingredients: ["Niacinamide", "Zinc PCA"],
    isFavorite: true,
  },
  {
    id: "prod-6",
    name: "Clarifying Toner",
    brand: "Paula's Choice",
    category: "Toner",
    price: 32.0,
    rating: 4.4,
    imageUrl: "",
    description: "Alcohol-free toner with antioxidants",
    ingredients: ["Green Tea Extract", "Hyaluronic Acid"],
    isFavorite: false,
  },
];

router.get("/", (_req, res) => {
  res.json(products);
});

export default router;
