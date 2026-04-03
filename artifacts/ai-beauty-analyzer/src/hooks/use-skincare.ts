import { useQuery } from "@tanstack/react-query";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch(path: string) {
  const res = await fetch(`${BASE}/api${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ── Mock fallback data ──────────────────────────────────────────────────────
const MOCK_REPORT = {
  id: "latest",
  overallScore: 78,
  skinType: "Combination",
  aiConfidence: 94,
  createdAt: new Date().toISOString(),
  issues: {
    acne: { severity: "medium", description: "Occasional breakouts detected in the T-zone. Hormonal fluctuations and excess sebum are likely contributing factors.", score: 62 },
    hydration: { severity: "low", description: "Overall hydration levels look healthy. Minor dryness detected around the cheek area.", score: 82 },
    pigmentation: { severity: "medium", description: "Mild post-inflammatory hyperpigmentation spotted near the chin. UV exposure may be worsening this.", score: 55 },
    oiliness: { severity: "high", description: "Elevated sebum production detected across the forehead and nose. Recommend oil-control actives.", score: 38 },
    dark_circles: { severity: "low", description: "Slight under-eye shadowing detected. Adequate sleep and hydration should help improve this.", score: 74 },
  },
  routine: {
    morning: [
      { step: "Cleanser", icon: "💧", description: "Use a gentle, pH-balanced gel cleanser to remove overnight buildup without stripping moisture." },
      { step: "Toner", icon: "🌿", description: "Apply a niacinamide-infused toner to minimise pores and regulate sebum production." },
      { step: "Serum", icon: "✨", description: "Vitamin C serum (10–15%) to target pigmentation and brighten overall complexion." },
      { step: "Moisturiser", icon: "🧴", description: "Lightweight gel moisturiser — look for hyaluronic acid and ceramides for barrier support." },
      { step: "SPF", icon: "☀️", description: "Broad-spectrum SPF 50+ is non-negotiable. Reapply every 2–3 hours outdoors." },
    ],
    night: [
      { step: "Double Cleanse", icon: "🌙", description: "Start with a micellar water or cleansing balm to remove SPF and makeup, then follow with your gel cleanser." },
      { step: "Treatment", icon: "🔬", description: "Apply a salicylic acid (2%) or azelaic acid treatment to active breakouts and oily zones." },
      { step: "Serum", icon: "✨", description: "Retinol 0.025%–0.05% — start 2 nights per week and build up gradually to improve texture and turnover." },
      { step: "Eye Cream", icon: "👁️", description: "Peptide-rich eye cream applied gently with the ring finger to reduce dark circles and puffiness." },
      { step: "Moisturiser", icon: "🧴", description: "Richer barrier-repair cream with ceramides and squalane to lock in moisture overnight." },
    ],
  },
  progressSimulation: {
    Week_1: "Skin surface feels smoother. Reduced congestion in T-zone. Initial hydration boost noticeable.",
    Week_2: "Breakout frequency decreasing. Pores appearing tighter after consistent toner use.",
    Week_4: "Visible reduction in pigmentation. Oil control significantly improved. Skin tone more even.",
    Week_8: "Texture markedly improved. Dark spots fading. Overall glow and radiance increased by ~30%.",
  },
  tips: [
    "Always apply SPF even on cloudy days — UV accounts for 80% of visible skin ageing.",
    "Introduce new actives one at a time to identify irritants quickly.",
    "Silk pillowcases reduce friction and moisture loss overnight.",
    "Drinking 2–2.5L of water daily significantly affects skin plumpness and tone.",
    "Avoid touching your face — hands transfer bacteria that trigger breakouts.",
    "Diet high in antioxidants (berries, leafy greens) visibly improves skin clarity over weeks.",
  ],
  products: [
    { id: 1, brand: "CeraVe", name: "Foaming Facial Cleanser", size: "236ml", price: "14.99", productUrl: "https://www.cerave.com", imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=80" },
    { id: 2, brand: "Paula's Choice", name: "2% BHA Liquid Exfoliant", size: "118ml", price: "34.00", productUrl: "https://www.paulaschoice.com", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80" },
    { id: 3, brand: "The Ordinary", name: "Niacinamide 10% + Zinc 1%", size: "30ml", price: "6.50", productUrl: "https://theordinary.com", imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&q=80" },
    { id: 4, brand: "La Roche-Posay", name: "Anthelios SPF 50+ Fluid", size: "50ml", price: "29.99", productUrl: "https://www.laroche-posay.com", imageUrl: "https://images.unsplash.com/photo-1602940659805-770d1b3b9911?w=200&q=80" },
    { id: 5, brand: "Neutrogena", name: "Hydro Boost Water Gel", size: "50ml", price: "19.99", productUrl: "https://www.neutrogena.com", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=200&q=80" },
  ],
};

const MOCK_SCANS = [
  { id: "latest", overallScore: 78, skinType: "Combination", createdAt: new Date().toISOString() },
  { id: "scan-2", overallScore: 71, skinType: "Combination", createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString() },
  { id: "scan-3", overallScore: 65, skinType: "Combination", createdAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString() },
];

const MOCK_PRODUCTS = [
  // Facial Cleansers
  { id: 1,  brand: "CeraVe",          name: "Foaming Facial Cleanser",              category: "Facial Cleansers",     size: "236ml", price: "14.99", imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",  productUrl: "https://www.cerave.com" },
  { id: 2,  brand: "La Roche-Posay",  name: "Toleriane Hydrating Gentle Cleanser", category: "Facial Cleansers",     size: "400ml", price: "20.99", imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&q=80",  productUrl: "https://www.laroche-posay.com" },
  { id: 3,  brand: "The Ordinary",    name: "Squalane Cleanser",                   category: "Facial Cleansers",     size: "50ml",  price: "8.90",  imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&q=80",  productUrl: "https://theordinary.com" },
  { id: 4,  brand: "Clinique",         name: "Liquid Facial Soap Mild",             category: "Facial Cleansers",     size: "200ml", price: "25.00", imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&q=80",  productUrl: "https://www.clinique.com" },
  // Facial Serums
  { id: 5,  brand: "The Ordinary",    name: "Niacinamide 10% + Zinc 1%",           category: "Facial Serums",        size: "30ml",  price: "6.50",  imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",  productUrl: "https://theordinary.com" },
  { id: 6,  brand: "Skinceuticals",   name: "C E Ferulic Vitamin C Serum",         category: "Facial Serums",        size: "30ml",  price: "182.00",imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=80",  productUrl: "https://www.skinceuticals.com" },
  { id: 7,  brand: "Paula's Choice",  name: "C15 Super Booster",                   category: "Facial Serums",        size: "20ml",  price: "49.00", imageUrl: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=300&q=80",  productUrl: "https://www.paulaschoice.com" },
  { id: 8,  brand: "Drunk Elephant",  name: "T.L.C. Framboos Glycolic Serum",      category: "Facial Serums",        size: "30ml",  price: "90.00", imageUrl: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=300&q=80",  productUrl: "https://www.drunkelephant.com" },
  // Facial Moisturisers
  { id: 9,  brand: "Neutrogena",      name: "Hydro Boost Water Gel",               category: "Facial Moisturisers",  size: "50ml",  price: "19.99", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=300&q=80",  productUrl: "https://www.neutrogena.com" },
  { id: 10, brand: "CeraVe",          name: "Moisturising Cream",                  category: "Facial Moisturisers",  size: "340g",  price: "18.99", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80",  productUrl: "https://www.cerave.com" },
  { id: 11, brand: "First Aid Beauty",name: "Ultra Repair Cream",                  category: "Facial Moisturisers",  size: "170g",  price: "34.00", imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&q=80",  productUrl: "https://www.firstaidbeauty.com" },
  { id: 12, brand: "Tatcha",          name: "The Dewy Skin Cream",                 category: "Facial Moisturisers",  size: "50ml",  price: "72.00", imageUrl: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&q=80",  productUrl: "https://www.tatcha.com" },
  // Sun Protection
  { id: 13, brand: "La Roche-Posay",  name: "Anthelios SPF 50+ Fluid",            category: "Sun Protection",       size: "50ml",  price: "29.99", imageUrl: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=300&q=80",  productUrl: "https://www.laroche-posay.com" },
  { id: 14, brand: "EltaMD",          name: "UV Clear Broad-Spectrum SPF 46",      category: "Sun Protection",       size: "48g",   price: "41.00", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",  productUrl: "https://www.eltamd.com" },
  { id: 15, brand: "Supergoop!",      name: "Unseen Sunscreen SPF 40",             category: "Sun Protection",       size: "45ml",  price: "38.00", imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&q=80",  productUrl: "https://supergoop.com" },
  // Facial Toners
  { id: 16, brand: "Paula's Choice",  name: "2% BHA Liquid Exfoliant",             category: "Facial Toners",        size: "118ml", price: "34.00", imageUrl: "https://images.unsplash.com/photo-1556228841-a3c527ebefa0?w=300&q=80",  productUrl: "https://www.paulaschoice.com" },
  { id: 17, brand: "Thayers",         name: "Witch Hazel Aloe Vera Toner",         category: "Facial Toners",        size: "355ml", price: "11.99", imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=80",  productUrl: "https://thayers.com" },
  { id: 18, brand: "Pixi",            name: "Glow Tonic 20% Glycolic Acid",        category: "Facial Toners",        size: "250ml", price: "29.00", imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&q=80",  productUrl: "https://www.pixibeauty.com" },
  // Eye Skincare
  { id: 19, brand: "Kiehl's",         name: "Creamy Eye Treatment with Avocado",   category: "Eye Skincare",         size: "28ml",  price: "52.00", imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&q=80",  productUrl: "https://www.kiehls.com" },
  { id: 20, brand: "Cetaphil",        name: "Refreshing Eye Serum",                category: "Eye Skincare",         size: "15ml",  price: "24.99", imageUrl: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=300&q=80",  productUrl: "https://www.cetaphil.com" },
  // Facial Masks
  { id: 21, brand: "GlamGlow",        name: "Supermud Charcoal Clearing Treatment",category: "Facial Masks",         size: "34g",   price: "69.00", imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&q=80",  productUrl: "https://www.glamglow.com" },
  { id: 22, brand: "Aztec Secret",    name: "Indian Healing Clay Mask",            category: "Facial Masks",         size: "454g",  price: "12.99", imageUrl: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=300&q=80",  productUrl: "https://www.aztec-secret.com" },
  { id: 23, brand: "SK-II",           name: "Facial Treatment Mask Sheet",         category: "Facial Masks",         size: "6pc",   price: "85.00", imageUrl: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=300&q=80",  productUrl: "https://www.sk-ii.com" },
  // Face (general)
  { id: 24, brand: "Differin",        name: "Adapalene Gel 0.1% Acne Treatment",   category: "Face",                 size: "45g",   price: "13.88", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=300&q=80",  productUrl: "https://www.differin.com" },
  { id: 25, brand: "Vaseline",        name: "Original Pure Skin Jelly",            category: "Face",                 size: "100ml", price: "5.99",  imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",  productUrl: "https://www.vaseline.com" },
  { id: 26, brand: "RoC",             name: "Retinol Correxion Eye Cream",          category: "Face",                 size: "15ml",  price: "21.99", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",  productUrl: "https://www.rocskincare.com" },
  { id: 27, brand: "Bioré",           name: "Deep Pore Charcoal Cleanser",         category: "Face",                 size: "200ml", price: "9.99",  imageUrl: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&q=80",  productUrl: "https://www.biore.com" },
  { id: 28, brand: "Cetaphil",        name: "Daily Facial Moisturizer SPF 15",     category: "Face",                 size: "118ml", price: "16.49", imageUrl: "https://images.unsplash.com/photo-1602940659805-770d1b3b9911?w=300&q=80",  productUrl: "https://www.cetaphil.com" },
  { id: 29, brand: "Olay",            name: "Regenerist Micro-Sculpting Cream",    category: "Face",                 size: "50g",   price: "28.99", imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=80",  productUrl: "https://www.olay.com" },
  { id: 30, brand: "L'Oréal Paris",   name: "Revitalift 1.5% Pure Hyaluronic Acid",category: "Face",                size: "30ml",  price: "31.99", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",  productUrl: "https://www.loreal-paris.com" },
];

const MOCK_ROUTINES = {
  morning: [
    { step: "Cleanser", icon: "💧", description: "Gentle pH-balanced gel cleanser to start the day fresh." },
    { step: "Toner", icon: "🌿", description: "Niacinamide toner to regulate sebum and minimise pores." },
    { step: "Serum", icon: "✨", description: "Vitamin C serum to brighten and protect from oxidative stress." },
    { step: "Moisturiser", icon: "🧴", description: "Lightweight gel with hyaluronic acid for all-day hydration." },
    { step: "SPF", icon: "☀️", description: "SPF 50+ — your most important anti-ageing step." },
  ],
  night: [
    { step: "Double Cleanse", icon: "🌙", description: "Oil cleanser first to dissolve SPF and makeup, then gel cleanser." },
    { step: "Treatment", icon: "🔬", description: "BHA or AHA exfoliant on targeted areas 3x per week." },
    { step: "Serum", icon: "✨", description: "Retinol 0.025% to accelerate cell turnover overnight." },
    { step: "Eye Cream", icon: "👁️", description: "Peptide eye cream to reduce puffiness and dark circles." },
    { step: "Moisturiser", icon: "🧴", description: "Rich ceramide cream to repair the barrier while you sleep." },
  ],
};

const MOCK_PROGRESS = [
  { id: 1, overallScore: 65, createdAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString() },
  { id: 2, overallScore: 71, createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString() },
  { id: 3, overallScore: 78, createdAt: new Date().toISOString() },
];
// ────────────────────────────────────────────────────────────────────────────

export function useScanHistory() {
  return useQuery({
    queryKey: ["scans"],
    queryFn: async () => {
      try { return await apiFetch("/scans"); } catch { return MOCK_SCANS; }
    },
  });
}

export function useReport(scanId: string) {
  return useQuery({
    queryKey: ["report", scanId],
    queryFn: async () => {
      try { return await apiFetch(`/reports/${scanId}`); } catch { return { ...MOCK_REPORT, id: scanId }; }
    },
    enabled: !!scanId,
  });
}

export function useRoutines() {
  return useQuery({
    queryKey: ["routines"],
    queryFn: async () => {
      try { return await apiFetch("/routines"); } catch { return MOCK_ROUTINES; }
    },
  });
}

export function useProducts(params?: { search?: string; category?: string; limit?: number }) {
  const qs = new URLSearchParams();
  if (params?.search) qs.set("search", params.search);
  if (params?.category && params.category !== "All") qs.set("category", params.category);
  if (params?.limit) qs.set("limit", String(params.limit));
  else qs.set("limit", "30");

  const queryStr = qs.toString();

  return useQuery({
    queryKey: ["products", queryStr],
    queryFn: async () => {
      try {
        return await apiFetch(`/products${queryStr ? `?${queryStr}` : ""}`);
      } catch {
        // Filter mock data locally
        let results = [...MOCK_PRODUCTS];
        if (params?.category && params.category !== "All") {
          results = results.filter(p => p.category === params.category);
        }
        if (params?.search && params.search.length > 1) {
          const q = params.search.toLowerCase();
          results = results.filter(p =>
            p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
          );
        }
        const limit = params?.limit ?? 30;
        return results.slice(0, limit);
      }
    },
  });
}

export function useProductsByCategory(category: string, limit = 30) {
  return useProducts({ category, limit });
}

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      try { return await apiFetch("/progress"); } catch { return MOCK_PROGRESS; }
    },
  });
}
