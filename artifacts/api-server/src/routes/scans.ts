import { Router, type IRouter } from "express";

const router: IRouter = Router();

// In-memory store keyed by scanId — holds full AI analysis
const scanStore = new Map<string, any>();

// Seed some historical scans
const historicalScans = [
  { id: "scan-hist-1", createdAt: new Date("2026-03-18").toISOString(), overallScore: 74, skinType: "Combination", status: "completed" },
  { id: "scan-hist-2", createdAt: new Date("2026-03-11").toISOString(), overallScore: 70, skinType: "Combination", status: "completed" },
  { id: "scan-hist-3", createdAt: new Date("2026-03-04").toISOString(), overallScore: 67, skinType: "Combination", status: "completed" },
];

type Severity = "low" | "medium" | "high";
type SkinType = "oily" | "dry" | "combination" | "normal" | "sensitive";

interface IssueProfile {
  severity: Severity;
  description: string;
  score: number;
}

function severity(score: number): Severity {
  if (score >= 75) return "low";
  if (score >= 55) return "medium";
  return "high";
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

const issueDescriptions: Record<string, Record<Severity, string>> = {
  acne: {
    high: "Significant breakout activity detected on cheeks and forehead. Pores appear enlarged with active inflammation.",
    medium: "Occasional breakouts visible, mainly in the T-zone. Some clogged pores present.",
    low: "Minimal breakout activity. Skin appears mostly clear with isolated blemishes.",
  },
  dark_circles: {
    high: "Pronounced dark discoloration and puffiness under both eyes. Blood vessel visibility is elevated.",
    medium: "Moderate under-eye discoloration detected. Mild hollowness contributes to shadow appearance.",
    low: "Mild under-eye discoloration. Likely linked to fatigue or dehydration.",
  },
  pigmentation: {
    high: "Visible uneven skin tone across the cheeks and forehead. Post-inflammatory marks detected.",
    medium: "Some hyperpigmentation detected in the T-zone and cheek areas. Mild sun-induced spots visible.",
    low: "Minimal pigmentation irregularity. Skin tone is mostly even with slight variation.",
  },
  hydration: {
    high: "Skin shows significant dehydration. Fine lines from dryness visible. Barrier function may be compromised.",
    medium: "Moderate dehydration detected. Skin lacks plumpness and may feel tight.",
    low: "Skin is generally well-hydrated. Minor tightness may occur after cleansing.",
  },
  oiliness: {
    high: "Excess sebum production across the entire face, especially the T-zone. Pores visibly enlarged.",
    medium: "Moderate oiliness detected in T-zone. Shiny appearance by midday is likely.",
    low: "Skin oil levels are balanced. Slight shine may appear in warm conditions.",
  },
  wrinkles: {
    high: "Visible fine lines and deeper wrinkles around eyes, forehead, and mouth. Skin elasticity reduced.",
    medium: "Moderate fine lines detected around the eye area and forehead. Early signs of elasticity loss.",
    low: "Minimal fine lines. Skin texture is smooth. Daily SPF will help prevent progression.",
  },
  sensitivity: {
    high: "High skin reactivity detected. Redness and irritation patterns visible. Fragrance-free products recommended.",
    medium: "Moderate sensitivity. Some redness in cheek areas. Skin may react to harsh actives.",
    low: "Mild sensitivity. Skin is generally tolerant but may react to certain actives.",
  },
};

function buildIssueProfiles(skinType: SkinType, userConcerns: string[]): Record<string, IssueProfile> {
  const baseScores: Record<string, number> = {
    acne: 78,
    dark_circles: 75,
    pigmentation: 72,
    hydration: 74,
    oiliness: 75,
    wrinkles: 82,
    sensitivity: 76,
  };

  // Skin type modifiers
  if (skinType === "oily") {
    baseScores.acne -= 20;
    baseScores.oiliness -= 22;
    baseScores.pigmentation -= 8;
    baseScores.hydration += 5;
  } else if (skinType === "dry") {
    baseScores.hydration -= 25;
    baseScores.sensitivity -= 15;
    baseScores.oiliness += 15;
    baseScores.wrinkles -= 8;
  } else if (skinType === "combination") {
    baseScores.oiliness -= 15;
    baseScores.acne -= 10;
    baseScores.hydration -= 5;
  } else if (skinType === "sensitive") {
    baseScores.sensitivity -= 22;
    baseScores.hydration -= 10;
    baseScores.acne -= 8;
  }

  // User-selected concern modifiers
  const concernMap: Record<string, string> = {
    acne: "acne",
    breakouts: "acne",
    dark_circles: "dark_circles",
    "dark circles": "dark_circles",
    pigmentation: "pigmentation",
    hyperpigmentation: "pigmentation",
    dryness: "hydration",
    dehydration: "hydration",
    oiliness: "oiliness",
    wrinkles: "wrinkles",
    "fine lines": "wrinkles",
    anti_aging: "wrinkles",
    sensitivity: "sensitivity",
    redness: "sensitivity",
  };

  for (const concern of userConcerns) {
    const key = concernMap[concern.toLowerCase()] || concern.toLowerCase();
    if (baseScores[key] !== undefined) {
      baseScores[key] -= rand(15, 20);
    }
  }

  // Add random noise
  for (const key of Object.keys(baseScores)) {
    baseScores[key] = clamp(baseScores[key] + rand(-8, 8));
  }

  const result: Record<string, IssueProfile> = {};
  for (const [key, score] of Object.entries(baseScores)) {
    const sev = severity(score);
    result[key] = {
      severity: sev,
      description: issueDescriptions[key][sev],
      score,
    };
  }
  return result;
}

function buildRoutine(issues: Record<string, IssueProfile>, skinType: SkinType) {
  const hasAcne = issues.acne.severity !== "low";
  const hasDryness = issues.hydration.severity !== "low";
  const hasPigmentation = issues.pigmentation.severity !== "low";
  const hasWrinkles = issues.wrinkles.severity !== "low";
  const hasSensitivity = issues.sensitivity.severity !== "low";
  const hasOiliness = issues.oiliness.severity !== "low";

  const morning = [
    {
      step: "Cleanser",
      icon: "💧",
      description: hasAcne
        ? "Salicylic acid or tea tree gel cleanser to clear pores and control oil"
        : hasSensitivity
        ? "Gentle micellar or pH-balanced creamy cleanser"
        : "Gentle foaming cleanser suited to your skin type",
    },
    ...(hasPigmentation || hasAcne
      ? [{ step: "Toner", icon: "🌿", description: "Niacinamide toner to balance skin tone and minimize pores" }]
      : hasOiliness
      ? [{ step: "Toner", icon: "🌿", description: "Oil-controlling toner to mattify and refine pores" }]
      : []),
    {
      step: "Serum",
      icon: "✨",
      description: hasPigmentation
        ? "Vitamin C serum to brighten and even out skin tone"
        : hasAcne
        ? "Niacinamide serum to reduce inflammation and control sebum"
        : hasDryness
        ? "Hyaluronic acid serum for deep hydration boost"
        : "Antioxidant serum to protect against environmental damage",
    },
    {
      step: "Eye Cream",
      icon: "👁️",
      description:
        issues.dark_circles.severity !== "low"
          ? "Caffeine or peptide eye cream to reduce dark circles and puffiness"
          : "Lightweight eye cream to keep the delicate under-eye area hydrated",
    },
    {
      step: "Moisturiser",
      icon: "🧴",
      description: hasOiliness
        ? "Oil-free gel moisturiser to hydrate without clogging pores"
        : hasDryness
        ? "Rich ceramide moisturiser to repair barrier and lock in moisture"
        : "Lightweight daily moisturiser with nourishing actives",
    },
    { step: "SPF", icon: "☀️", description: "SPF 50+ broad-spectrum sunscreen — the single most important anti-aging step" },
  ];

  const night = [
    {
      step: "Double Cleanse",
      icon: "🌙",
      description: "Oil cleanser first to remove SPF/makeup, then gentle foaming cleanser for a thorough cleanse",
    },
    ...(hasPigmentation || hasWrinkles
      ? [{ step: "Treatment", icon: "🔬", description: "Retinol or AHA/BHA treatment 2–3× per week to accelerate cell turnover" }]
      : hasAcne
      ? [{ step: "Spot Treatment", icon: "🎯", description: "Benzoyl peroxide or salicylic acid spot treatment on active blemishes" }]
      : []),
    {
      step: "Serum",
      icon: "💎",
      description: hasDryness
        ? "Hyaluronic acid + peptide serum to deeply hydrate and repair overnight"
        : hasPigmentation
        ? "Alpha-arbutin or tranexamic acid serum for overnight brightening"
        : "Niacinamide serum to regulate oil and soothe skin overnight",
    },
    {
      step: "Eye Cream",
      icon: "👁️",
      description: "Richer peptide or retinol eye cream to repair the eye area while you sleep",
    },
    {
      step: "Moisturiser",
      icon: "🌛",
      description: hasDryness
        ? "Occlusive night balm or sleeping mask to deeply nourish and repair the barrier"
        : "Nourishing night cream to restore skin overnight without heaviness",
    },
  ];

  return { morning, night };
}

function buildProgressSimulation(overallScore: number) {
  return {
    week_1: `Initial improvements in texture and hydration. ${overallScore < 65 ? "Redness and irritation begin to calm." : "Skin appears cleaner and more balanced."}`,
    week_2: `Visible reduction in pore size and excess oiliness. ${overallScore < 70 ? "Dark spots begin to fade subtly." : "Skin tone starts to even out."}`,
    week_4: `${overallScore < 70 ? "Significant" : "Noticeable"} improvement in overall complexion. Skin feels plumper, clearer, and more radiant.`,
    week_8: "Sustained glow and clarity. Continued use solidifies your results and helps prevent future concerns.",
  };
}

function buildPersonalisedTips(skinType: SkinType, issues: Record<string, IssueProfile>) {
  const tips = [
    "Drink at least 8 glasses of water daily — internal hydration reflects on your skin.",
    "Change your pillowcase every 2–3 days to reduce bacteria transfer.",
    "Never skip SPF, even on cloudy days or when indoors near windows.",
  ];
  if (issues.acne.severity !== "low") tips.push("Avoid touching your face throughout the day to prevent bacteria transfer.");
  if (issues.hydration.severity !== "low") tips.push("Apply your serum and moisturiser while skin is still slightly damp to lock in hydration.");
  if (issues.oiliness.severity !== "low") tips.push("Use blotting papers or a setting powder instead of re-applying moisturiser when oily.");
  if (issues.dark_circles.severity !== "low") tips.push("Elevate your head slightly while sleeping to reduce under-eye fluid retention.");
  if (issues.pigmentation.severity !== "low") tips.push("Reapply SPF every 2 hours when outdoors — UV is the #1 driver of pigmentation.");
  return tips.slice(0, 5);
}

router.get("/", (_req, res) => {
  res.json(historicalScans);
});

router.post("/", (req, res) => {
  const { skinType = "combination", age = 25, concerns = [] } = req.body || {};
  const st = (skinType as string).toLowerCase() as SkinType;

  const issues = buildIssueProfiles(st, concerns as string[]);
  const scores = Object.values(issues).map((i) => i.score);
  const overallScore = clamp(Math.round(scores.reduce((a, b) => a + b, 0) / scores.length));
  const routine = buildRoutine(issues, st);
  const progressSimulation = buildProgressSimulation(overallScore);
  const tips = buildPersonalisedTips(st, issues);

  const scanId = "scan-" + Date.now();
  const scan = {
    id: scanId,
    createdAt: new Date().toISOString(),
    overallScore,
    skinType: skinType.charAt(0).toUpperCase() + skinType.slice(1).toLowerCase(),
    aiConfidence: rand(88, 97),
    issues,
    routine,
    progressSimulation,
    tips,
    concerns,
    status: "completed",
  };

  scanStore.set(scanId, scan);
  historicalScans.unshift({ id: scanId, createdAt: scan.createdAt, overallScore, skinType: scan.skinType, status: "completed" });

  res.status(201).json(scan);
});

router.get("/:scanId", (req, res) => {
  const stored = scanStore.get(req.params.scanId);
  if (stored) return res.json(stored);
  // Fallback for historical IDs
  res.json(historicalScans.find(s => s.id === req.params.scanId) || historicalScans[0]);
});

export { scanStore };
export default router;
