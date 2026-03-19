import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/", (_req, res) => {
  res.json({
    scans: [
      { id: "scan-6", overallScore: 62, createdAt: new Date("2026-01-19").toISOString(), hydration: 55, oiliness: 70, acne: 58, darkSpots: 50, wrinkles: 80, sensitivity: 60, status: "completed" },
      { id: "scan-5", overallScore: 65, createdAt: new Date("2026-02-02").toISOString(), hydration: 60, oiliness: 66, acne: 62, darkSpots: 55, wrinkles: 82, sensitivity: 63, status: "completed" },
      { id: "scan-4", overallScore: 68, createdAt: new Date("2026-02-16").toISOString(), hydration: 65, oiliness: 63, acne: 68, darkSpots: 60, wrinkles: 84, sensitivity: 68, status: "completed" },
      { id: "scan-3", overallScore: 70, createdAt: new Date("2026-03-04").toISOString(), hydration: 62, oiliness: 58, acne: 72, darkSpots: 60, wrinkles: 82, sensitivity: 70, status: "completed" },
      { id: "scan-2", overallScore: 74, createdAt: new Date("2026-03-11").toISOString(), hydration: 68, oiliness: 60, acne: 75, darkSpots: 65, wrinkles: 85, sensitivity: 72, status: "completed" },
      { id: "scan-1", overallScore: 78, createdAt: new Date("2026-03-18").toISOString(), hydration: 72, oiliness: 65, acne: 80, darkSpots: 70, wrinkles: 88, sensitivity: 75, status: "completed" },
    ],
    improvements: [
      { metric: "Hydration", change: 17, trend: "improving" },
      { metric: "Acne", change: 22, trend: "improving" },
      { metric: "Dark Spots", change: 20, trend: "improving" },
      { metric: "Oiliness", change: -5, trend: "stable" },
      { metric: "Wrinkles", change: 8, trend: "improving" },
      { metric: "Sensitivity", change: 15, trend: "improving" },
    ],
    streakDays: 12,
    totalScans: 6,
  });
});

export default router;
