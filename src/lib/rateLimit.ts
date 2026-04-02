type Bucket = {
  startedAt: number;
  count: number;
};

type RateLimitInput = {
  key: string;
  windowMs: number;
  max: number;
};

export class RateLimitError extends Error {
  constructor(message = "Too many requests") {
    super(message);
    this.name = "RateLimitError";
  }
}

const globalBuckets = globalThis as typeof globalThis & {
  __communityHubRateLimit?: Map<string, Bucket>;
};

const buckets = globalBuckets.__communityHubRateLimit ?? new Map<string, Bucket>();

if (!globalBuckets.__communityHubRateLimit) {
  globalBuckets.__communityHubRateLimit = buckets;
}

export function assertWithinRateLimit({ key, windowMs, max }: RateLimitInput) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.startedAt >= windowMs) {
    buckets.set(key, { startedAt: now, count: 1 });
    return;
  }

  if (bucket.count >= max) {
    throw new RateLimitError();
  }

  bucket.count += 1;
  buckets.set(key, bucket);
}
