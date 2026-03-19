import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMockScore() {
  return Math.floor(Math.random() * 30) + 65; // 65-95 range
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
