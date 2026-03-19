import { Router, type IRouter } from "express";

const router: IRouter = Router();

const mockScans = [
  {
    id: "scan-1",
    overallScore: 78,
    createdAt: new Date("2026-03-18").toISOString(),
    hydration: 72,
    oiliness: 65,
    acne: 80,
    darkSpots: 70,
    wrinkles: 88,
    sensitivity: 75,
    status: "completed",
  },
  {
    id: "scan-2",
    overallScore: 74,
    createdAt: new Date("2026-03-11").toISOString(),
    hydration: 68,
    oiliness: 60,
    acne: 75,
    darkSpots: 65,
    wrinkles: 85,
    sensitivity: 72,
    status: "completed",
  },
  {
    id: "scan-3",
    overallScore: 70,
    createdAt: new Date("2026-03-04").toISOString(),
    hydration: 62,
    oiliness: 58,
    acne: 72,
    darkSpots: 60,
    wrinkles: 82,
    sensitivity: 70,
    status: "completed",
  },
];

router.get("/", (_req, res) => {
  res.json(mockScans);
});

router.post("/", (req, res) => {
  const newScan = {
    id: "scan-" + Date.now(),
    overallScore: Math.floor(Math.random() * 20 + 70),
    createdAt: new Date().toISOString(),
    hydration: Math.floor(Math.random() * 30 + 60),
    oiliness: Math.floor(Math.random() * 30 + 55),
    acne: Math.floor(Math.random() * 25 + 65),
    darkSpots: Math.floor(Math.random() * 30 + 60),
    wrinkles: Math.floor(Math.random() * 20 + 75),
    sensitivity: Math.floor(Math.random() * 25 + 65),
    status: "completed",
  };
  mockScans.unshift(newScan);
  res.status(201).json(newScan);
});

router.get("/:scanId", (req, res) => {
  const scan = mockScans.find((s) => s.id === req.params.scanId) || mockScans[0];
  res.json(scan);
});

export default router;
