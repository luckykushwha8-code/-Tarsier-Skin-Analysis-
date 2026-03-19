import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wait, generateMockScore } from "@/lib/utils";

// Mock data and queries to replace API when missing
export function useScanHistory() {
  return useQuery({
    queryKey: ["scans"],
    queryFn: async () => {
      await wait(500);
      return [
        { id: "scan_1", overallScore: 82, createdAt: new Date().toISOString(), status: "completed" },
        { id: "scan_2", overallScore: 78, createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), status: "completed" }
      ];
    }
  });
}

export function useReport(scanId: string) {
  return useQuery({
    queryKey: ["report", scanId],
    queryFn: async () => {
      await wait(600);
      return {
        scanId,
        overallScore: generateMockScore(),
        skinType: "Combination",
        concerns: ["Mild redness", "Uneven texture"],
        metrics: [
          { name: "Hydration", score: 65, status: "fair", description: "Slightly dehydrated in U-zone" },
          { name: "Oiliness", score: 85, status: "good", description: "Balanced sebum production" },
          { name: "Acne", score: 92, status: "good", description: "Clear pores" },
          { name: "Dark Spots", score: 78, status: "fair", description: "Minor pigmentation detected" },
          { name: "Wrinkles", score: 88, status: "good", description: "Excellent elasticity" },
          { name: "Sensitivity", score: 70, status: "fair", description: "Mild barrier compromise" }
        ],
        recommendations: [
          "Incorporate a hyaluronic acid serum",
          "Use gentle chemical exfoliation 2x a week",
          "Ensure daily SPF 50+ application"
        ]
      };
    },
    enabled: !!scanId
  });
}

export function useRoutines() {
  return useQuery({
    queryKey: ["routines"],
    queryFn: async () => {
      await wait(400);
      return [
        {
          id: "r1", name: "Morning Glow", type: "morning", duration: 5,
          steps: [
            { order: 1, name: "Cleanse", product: "Gentle Oat Cleanser", isCompleted: true },
            { order: 2, name: "Tone", product: "Rose Water Toner", isCompleted: true },
            { order: 3, name: "Treat", product: "Vitamin C Serum", isCompleted: false },
            { order: 4, name: "Moisturize", product: "Barrier Cream", isCompleted: false },
            { order: 5, name: "Protect", product: "Mineral SPF 50", isCompleted: false }
          ]
        },
        {
          id: "r2", name: "Night Repair", type: "evening", duration: 10,
          steps: [
            { order: 1, name: "Double Cleanse", product: "Cleansing Balm", isCompleted: false },
            { order: 2, name: "Cleanse", product: "Gentle Oat Cleanser", isCompleted: false },
            { order: 3, name: "Treat", product: "Retinol 0.5%", isCompleted: false },
            { order: 4, name: "Moisturize", product: "Rich Night Cream", isCompleted: false }
          ]
        }
      ];
    }
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      await wait(400);
      return [
        { id: "p1", name: "Gentle Oat Cleanser", brand: "Lumière", category: "Cleanser", price: 28, rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80", isFavorite: true },
        { id: "p2", name: "Vitamin C Serum", brand: "Aura", category: "Serum", price: 65, rating: 4.9, imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", isFavorite: false },
        { id: "p3", name: "Barrier Repair Cream", brand: "Lumière", category: "Moisturizer", price: 42, rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&q=80", isFavorite: true },
        { id: "p4", name: "Mineral SPF 50", brand: "Soleil", category: "SPF", price: 34, rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80", isFavorite: false },
        { id: "p5", name: "Rose Water Toner", brand: "Botanica", category: "Toner", price: 24, rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&q=80", isFavorite: false },
      ];
    }
  });
}

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      await wait(400);
      return {
        totalScans: 14,
        streakDays: 5,
        scans: [
          { date: "Mon", score: 72 },
          { date: "Tue", score: 74 },
          { date: "Wed", score: 76 },
          { date: "Thu", score: 75 },
          { date: "Fri", score: 79 },
          { date: "Sat", score: 82 },
        ],
        improvements: [
          { metric: "Hydration", change: 12, trend: "improving" },
          { metric: "Acne", change: 5, trend: "improving" },
          { metric: "Dark Spots", change: -2, trend: "declining" },
        ]
      };
    }
  });
}
