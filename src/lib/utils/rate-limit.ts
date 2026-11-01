/**
 * Small in-memory fixed-window rate limiter.
 *
 * LIMITATION: state lives in one server instance. On serverless or multi-instance hosting each
 * instance counts separately, so this is a first line of defense only. If abuse is observed in
 * production, move to a shared store or the hosting provider's WAF / rate-limiting feature.
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function createRateLimiter(options: { max: number; windowMs: number; maxKeys?: number }) {
  const { max, windowMs, maxKeys = 5000 } = options;
  const hits = new Map<string, { count: number; resetAt: number }>();

  function sweep(now: number) {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }

  return {
    check(key: string, now: number = Date.now()): RateLimitResult {
      if (hits.size >= maxKeys) sweep(now);
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= now) {
        hits.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: max - 1, retryAfterSeconds: 0 };
      }
      if (entry.count >= max) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
        };
      }
      entry.count += 1;
      return { allowed: true, remaining: max - entry.count, retryAfterSeconds: 0 };
    },
    reset() {
      hits.clear();
    },
  };
}

/** Short-lived in-memory duplicate detector (same fingerprint within the window). */
export function createDuplicateGuard(windowMs: number, maxKeys = 5000) {
  const seen = new Map<string, number>();
  return {
    /** Returns true if this fingerprint was already seen inside the window. */
    isDuplicate(fingerprint: string, now: number = Date.now()): boolean {
      if (seen.size >= maxKeys) {
        for (const [k, t] of seen) if (now - t > windowMs) seen.delete(k);
      }
      const last = seen.get(fingerprint);
      if (last !== undefined && now - last < windowMs) return true;
      seen.set(fingerprint, now);
      return false;
    },
  };
}
