import type { NextFunction, Request, Response } from "express";

type RateLimitOptions = {
  keyPrefix: string;
  maxRequests: number;
  windowMs: number;
  message?: string;
  skip?: (req: Request) => boolean;
};

type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitState = {
  count: number;
  resetAt: number;
};

type RateLimitStore = {
  increment: (key: string, windowMs: number) => Promise<RateLimitState>;
};

const buckets = new Map<string, Bucket>();
let lastCleanupAt = 0;

function getClientKey(req: Request, prefix: string) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const rawIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0];
  const realIp = req.headers["x-real-ip"];
  const trustedIp = Array.isArray(realIp) ? realIp[0] : realIp;
  const ip = rawIp?.trim() || trustedIp?.trim() || req.ip || "unknown";
  return `${prefix}:${ip}`;
}

function cleanupExpiredBuckets(now: number) {
  if (now - lastCleanupAt < 60_000) {
    return;
  }

  lastCleanupAt = now;

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function createMemoryStore(): RateLimitStore {
  return {
    async increment(key, windowMs) {
      const now = Date.now();
      cleanupExpiredBuckets(now);
      const current = buckets.get(key);

      if (!current || current.resetAt <= now) {
        const next = { count: 1, resetAt: now + windowMs };
        buckets.set(key, next);
        return next;
      }

      current.count += 1;
      buckets.set(key, current);
      return current;
    },
  };
}

function createUpstashStore(): RateLimitStore | null {
  const baseUrl = process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["UPSTASH_REDIS_REST_TOKEN"];

  if (!baseUrl || !token) {
    return null;
  }

  const url = baseUrl.replace(/\/$/, "");

  return {
    async increment(key, windowMs) {
      const now = Date.now();
      const ttlSeconds = Math.max(1, Math.ceil(windowMs / 1000));
      const resetAt = now + windowMs;

      const response = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["TTL", key],
          ["EXPIRE", key, ttlSeconds, "NX"],
        ]),
      });

      if (!response.ok) {
        throw new Error(`Upstash rate limit request failed with ${response.status}`);
      }

      const result = (await response.json()) as Array<{ result?: number | string | null; error?: string }>;

      const incrResult = result[0];
      const ttlResult = result[1];

      if (incrResult?.error || ttlResult?.error) {
        throw new Error(incrResult?.error || ttlResult?.error || "Upstash rate limit pipeline failed");
      }

      const count = Number(incrResult?.result ?? 1);
      const ttl = Number(ttlResult?.result ?? ttlSeconds);
      const effectiveTtl = ttl > 0 ? ttl : ttlSeconds;

      return {
        count,
        resetAt: now + effectiveTtl * 1000,
      };
    },
  };
}

const fallbackStore = createMemoryStore();
const preferredStore = createUpstashStore();

async function incrementRateLimit(key: string, windowMs: number) {
  if (!preferredStore) {
    return fallbackStore.increment(key, windowMs);
  }

  try {
    return await preferredStore.increment(key, windowMs);
  } catch (error) {
    console.error("Redis-backed rate limiter failed, falling back to memory:", error);
    return fallbackStore.increment(key, windowMs);
  }
}

export function getRateLimitMode() {
  return preferredStore ? "redis" : "memory";
}

export function rateLimit(options: RateLimitOptions) {
  const message = options.message || "Too many requests. Please try again later.";

  return async (req: Request, res: Response, next: NextFunction) => {
    if (options.skip?.(req)) {
      return next();
    }

    const key = getClientKey(req, options.keyPrefix);

    try {
      const state = await incrementRateLimit(key, options.windowMs);
      const remaining = Math.max(0, options.maxRequests - state.count);

      res.setHeader("X-RateLimit-Limit", String(options.maxRequests));
      res.setHeader("X-RateLimit-Remaining", String(remaining));
      res.setHeader("X-RateLimit-Reset", String(Math.ceil(state.resetAt / 1000)));

      if (state.count > options.maxRequests) {
        const retryAfterSeconds = Math.max(1, Math.ceil((state.resetAt - Date.now()) / 1000));
        res.setHeader("Retry-After", String(retryAfterSeconds));
        return res.status(429).json({ message });
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
