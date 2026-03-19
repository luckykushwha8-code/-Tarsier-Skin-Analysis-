import { useQuery } from "@tanstack/react-query";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch(path: string) {
  const res = await fetch(`${BASE}/api${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export function useScanHistory() {
  return useQuery({
    queryKey: ["scans"],
    queryFn: () => apiFetch("/scans"),
  });
}

export function useReport(scanId: string) {
  return useQuery({
    queryKey: ["report", scanId],
    queryFn: () => apiFetch(`/reports/${scanId}`),
    enabled: !!scanId,
  });
}

export function useRoutines() {
  return useQuery({
    queryKey: ["routines"],
    queryFn: () => apiFetch("/routines"),
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
    queryFn: () => apiFetch(`/products${queryStr ? `?${queryStr}` : ""}`),
  });
}

export function useProductsByCategory(category: string, limit = 30) {
  return useProducts({ category, limit });
}

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: () => apiFetch("/progress"),
  });
}
