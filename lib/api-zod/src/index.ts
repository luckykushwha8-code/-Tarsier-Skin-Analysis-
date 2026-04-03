import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  skinType: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export const ScanSchema = z.object({
  id: z.number(),
  userId: z.number(),
  imageUrl: z.string().nullable(),
  overallScore: z.number().nullable(),
  skinAge: z.number().nullable(),
  analysis: z.any().nullable(),
  recommendations: z.any().nullable(),
  createdAt: z.string(),
});

export const CreateScanSchema = z.object({
  imageUrl: z.string().optional(),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  price: z.number().nullable(),
  rating: z.number().nullable(),
  ingredients: z.array(z.string()).nullable(),
  suitableFor: z.array(z.string()).nullable(),
  createdAt: z.string(),
});

export const RoutineStepSchema = z.object({
  order: z.number(),
  productId: z.number().nullable(),
  duration: z.number().nullable(),
  notes: z.string().nullable(),
});

export const RoutineSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  type: z.enum(["morning", "evening"]),
  steps: z.array(RoutineStepSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SubscriptionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  plan: z.enum(["free", "premium"]),
  status: z.enum(["active", "cancelled", "expired"]),
  startDate: z.string(),
  endDate: z.string().nullable(),
  createdAt: z.string(),
});

export const ProgressDataSchema = z.object({
  date: z.string(),
  score: z.number(),
  metrics: z.object({
    hydration: z.number(),
    elasticity: z.number(),
    texture: z.number(),
    spots: z.number(),
  }),
});

export type User = z.infer<typeof UserSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type Scan = z.infer<typeof ScanSchema>;
export type CreateScan = z.infer<typeof CreateScanSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type RoutineStep = z.infer<typeof RoutineStepSchema>;
export type Routine = z.infer<typeof RoutineSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type ProgressData = z.infer<typeof ProgressDataSchema>;
