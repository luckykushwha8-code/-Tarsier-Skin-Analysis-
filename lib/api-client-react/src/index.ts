import type {
  User,
  Login,
  Register,
  Scan,
  CreateScan,
  Product,
  Routine,
  Subscription,
  ProgressData,
} from "@workspace/api-zod";

const API_BASE = "/api";

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Auth
export const auth = {
  login: (data: Login) =>
    fetchApi<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  register: (data: Register) =>
    fetchApi<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  profile: () => fetchApi<User>("/auth/profile"),
};

// Scans
export const scans = {
  list: () => fetchApi<Scan[]>("/scans"),
  get: (id: number) => fetchApi<Scan>(`/scans/${id}`),
  create: (data: CreateScan) =>
    fetchApi<Scan>("/scans", { method: "POST", body: JSON.stringify(data) }),
};

// Reports
export const reports = {
  get: (scanId: number) => fetchApi<any>(`/reports/${scanId}`),
};

// Products
export const products = {
  list: () => fetchApi<Product[]>("/products"),
  get: (id: number) => fetchApi<Product>(`/products/${id}`),
};

// Routines
export const routines = {
  list: () => fetchApi<Routine[]>("/routines"),
  get: (id: number) => fetchApi<Routine>(`/routines/${id}`),
};

// Progress
export const progress = {
  get: () => fetchApi<ProgressData[]>("/progress"),
};

// Subscriptions
export const subscriptions = {
  current: () => fetchApi<Subscription>("/subscription"),
  upgrade: (plan: "premium") =>
    fetchApi<Subscription>("/subscription/upgrade", {
      method: "POST",
      body: JSON.stringify({ plan }),
    }),
};
