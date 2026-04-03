import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  LoginSchema,
  RegisterSchema,
  CreateScanSchema,
} from "@workspace/api-zod";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mock data store
const users = new Map<number, any>();
const scans = new Map<number, any>();
let userIdCounter = 1;
let scanIdCounter = 1;

// Initialize mock user
const mockUser = {
  id: 1,
  email: "demo@tarsier.app",
  name: "Demo User",
  skinType: "combination",
  passwordHash: "hashed_password",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
users.set(1, mockUser);

// Mock products
const mockProducts = [
  {
    id: 1,
    name: "Gentle Cleanser",
    brand: "CeraVe",
    category: "cleanser",
    description: "Gentle foaming cleanser",
    imageUrl: null,
    price: 1500,
    rating: 4,
    ingredients: ["ceramides", "niacinamide"],
    suitableFor: ["all"],
  },
  {
    id: 2,
    name: "Hydrating Serum",
    brand: "The Ordinary",
    category: "serum",
    description: "Hyaluronic acid serum",
    imageUrl: null,
    price: 1200,
    rating: 5,
    ingredients: ["hyaluronic acid"],
    suitableFor: ["dry", "normal"],
  },
  {
    id: 3,
    name: "Daily Moisturizer",
    brand: "Neutrogena",
    category: "moisturizer",
    description: "Oil-free moisturizer",
    imageUrl: null,
    price: 1800,
    rating: 4,
    ingredients: ["salicylic acid"],
    suitableFor: ["oily"],
  },
  {
    id: 4,
    name: "Sunscreen SPF 50",
    brand: "La Roche-Posay",
    category: "sunscreen",
    description: "UV protection",
    imageUrl: null,
    price: 2500,
    rating: 5,
    ingredients: ["mexoryl"],
    suitableFor: ["all"],
  },
];

// Mock routines
const mockRoutines = [
  {
    id: 1,
    userId: 1,
    name: "Morning Routine",
    type: "morning",
    steps: [
      { order: 1, productId: 1, duration: 60, notes: "Massage gently" },
      { order: 2, productId: 4, duration: 30, notes: "Apply generously" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    name: "Evening Routine",
    type: "evening",
    steps: [
      { order: 1, productId: 1, duration: 60, notes: "Double cleanse" },
      { order: 2, productId: 2, duration: 30, notes: "Apply to damp skin" },
      { order: 3, productId: 3, duration: 30, notes: "Lock in hydration" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock scans
const mockScans: Array<{
  id: number;
  userId: number;
  imageUrl: string | null;
  overallScore: number;
  skinAge: number;
  analysis: {
    hydration: number;
    elasticity: number;
    texture: number;
    spots: number;
  };
  recommendations: string[];
  createdAt: string;
}> = [
  {
    id: 1,
    userId: 1,
    imageUrl: null,
    overallScore: 78,
    skinAge: 26,
    analysis: { hydration: 75, elasticity: 80, texture: 72, spots: 85 },
    recommendations: ["Use hydrating serum", "Apply sunscreen daily"],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 2,
    userId: 1,
    imageUrl: null,
    overallScore: 82,
    skinAge: 24,
    analysis: { hydration: 80, elasticity: 85, texture: 78, spots: 88 },
    recommendations: ["Maintain current routine"],
    createdAt: new Date().toISOString(),
  },
];

// Mock progress data
const mockProgress = [
  {
    date: "2024-01-01",
    score: 65,
    metrics: { hydration: 60, elasticity: 65, texture: 60, spots: 75 },
  },
  {
    date: "2024-02-01",
    score: 70,
    metrics: { hydration: 68, elasticity: 70, texture: 68, spots: 78 },
  },
  {
    date: "2024-03-01",
    score: 75,
    metrics: { hydration: 72, elasticity: 75, texture: 72, spots: 82 },
  },
  {
    date: "2024-04-01",
    score: 78,
    metrics: { hydration: 75, elasticity: 80, texture: 72, spots: 85 },
  },
  {
    date: "2024-05-01",
    score: 82,
    metrics: { hydration: 80, elasticity: 85, texture: 78, spots: 88 },
  },
];

// Auth routes
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = Array.from(users.values()).find((u) => u.email === email);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/api/auth/register", (req, res) => {
  const data = RegisterSchema.parse(req.body);
  const newUser = {
    id: userIdCounter++,
    ...data,
    passwordHash: "hashed_" + data.password,
    skinType: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.set(newUser.id, newUser);
  res.json(newUser);
});

app.get("/api/auth/profile", (req, res) => {
  res.json(mockUser);
});

// Scans routes
app.get("/api/scans", (req, res) => {
  res.json(mockScans);
});

app.get("/api/scans/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const scan = mockScans.find((s) => s.id === id);
  if (scan) {
    res.json(scan);
  } else {
    res.status(404).json({ error: "Scan not found" });
  }
});

app.post("/api/scans", (req, res) => {
  const data = CreateScanSchema.parse(req.body);
  const newScan = {
    id: scanIdCounter++,
    userId: 1,
    imageUrl: data.imageUrl ?? null,
    overallScore: Math.floor(Math.random() * 30) + 70,
    skinAge: Math.floor(Math.random() * 10) + 20,
    analysis: {
      hydration: Math.floor(Math.random() * 30) + 60,
      elasticity: Math.floor(Math.random() * 30) + 60,
      texture: Math.floor(Math.random() * 30) + 60,
      spots: Math.floor(Math.random() * 30) + 60,
    },
    recommendations: ["Continue using sunscreen", "Stay hydrated"],
    createdAt: new Date().toISOString(),
  };
  mockScans.push(newScan);
  res.json(newScan);
});

// Reports route
app.get("/api/reports/:scanId", (req, res) => {
  const scanId = parseInt(req.params.scanId);
  const scan = mockScans.find((s) => s.id === scanId);
  if (scan) {
    res.json({
      scan,
      detailedAnalysis: {
        hydration: {
          score: scan.analysis.hydration,
          status: scan.analysis.hydration > 70 ? "good" : "needs improvement",
        },
        elasticity: {
          score: scan.analysis.elasticity,
          status: scan.analysis.elasticity > 70 ? "good" : "needs improvement",
        },
        texture: {
          score: scan.analysis.texture,
          status: scan.analysis.texture > 70 ? "good" : "needs improvement",
        },
        spots: {
          score: scan.analysis.spots,
          status: scan.analysis.spots > 70 ? "good" : "needs improvement",
        },
      },
      recommendations: scan.recommendations,
    });
  } else {
    res.status(404).json({ error: "Report not found" });
  }
});

// Products route
app.get("/api/products", (req, res) => {
  res.json(mockProducts);
});

// Routines route
app.get("/api/routines", (req, res) => {
  res.json(mockRoutines);
});

// Progress route
app.get("/api/progress", (req, res) => {
  res.json(mockProgress);
});

// Subscription route
app.get("/api/subscription", (req, res) => {
  res.json({
    id: 1,
    userId: 1,
    plan: "free",
    status: "active",
    startDate: new Date().toISOString(),
    endDate: null,
    createdAt: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
