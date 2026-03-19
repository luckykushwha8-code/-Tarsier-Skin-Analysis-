import { Router, type IRouter } from "express";

const router: IRouter = Router();

const routines = [
  {
    id: "routine-1",
    name: "Morning Routine",
    type: "morning",
    duration: 10,
    isCompleted: false,
    steps: [
      { order: 1, name: "Cleanse", description: "Wash face with gentle cleanser", product: "Gentle Foaming Cleanser", duration: 2, isCompleted: false },
      { order: 2, name: "Tone", description: "Apply toner with cotton pad", product: "Clarifying Toner", duration: 1, isCompleted: false },
      { order: 3, name: "Serum", description: "Apply 2-3 drops of serum", product: "Hyaluronic Acid Serum", duration: 2, isCompleted: false },
      { order: 4, name: "Moisturize", description: "Apply moisturizer in upward strokes", product: "Ultra Facial Cream", duration: 2, isCompleted: false },
      { order: 5, name: "SPF", description: "Apply sunscreen as last step", product: "Invisible Shield SPF 35", duration: 1, isCompleted: false },
    ],
  },
  {
    id: "routine-2",
    name: "Evening Routine",
    type: "evening",
    duration: 12,
    isCompleted: false,
    steps: [
      { order: 1, name: "Double Cleanse", description: "Oil cleanser first, then foaming", product: "Gentle Foaming Cleanser", duration: 3, isCompleted: false },
      { order: 2, name: "Tone", description: "Apply toner to balance pH", product: "Clarifying Toner", duration: 1, isCompleted: false },
      { order: 3, name: "Treatment", description: "Apply niacinamide serum", product: "10% Niacinamide + 1% Zinc", duration: 2, isCompleted: false },
      { order: 4, name: "Eye Cream", description: "Gently tap eye cream", product: "Eye Cream", duration: 2, isCompleted: false },
      { order: 5, name: "Night Moisturizer", description: "Apply rich night cream", product: "Ultra Facial Cream", duration: 2, isCompleted: false },
    ],
  },
];

router.get("/", (_req, res) => {
  res.json(routines);
});

export default router;
