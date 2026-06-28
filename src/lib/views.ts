import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Persistent view counter with two backends:
 *
 * 1. Upstash Redis (https://upstash.com), via its REST API — no SDK
 *    needed, just fetch. This is the right choice for serverless hosting
 *    (Vercel, Lambda) where there's no shared, writable disk between
 *    invocations. The free tier is enough for a personal blog.
 *
 * 2. A local JSON file fallback for local dev or any host with a real
 *    persistent disk (a VPS, Railway, Render, Docker with a volume).
 *    Writes are serialized through an in-process queue so concurrent
 *    requests on one server don't clobber each other, but this still
 *    won't be consistent across multiple server instances — for that,
 *    use the Redis backend.
 *
 * Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to use Redis;
 * leave them unset to use the file fallback automatically.
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const usingRedis = Boolean(REDIS_URL && REDIS_TOKEN);

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "views.json");

async function redisCommand(...segments: string[]): Promise<unknown> {
  const url = `${REDIS_URL}/${segments.map(encodeURIComponent).join("/")}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Upstash request failed: ${res.status}`);
  }
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

async function readFileStore(): Promise<Record<string, number>> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

async function writeFileStore(data: Record<string, number>) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// Serializes file-store writes within this process so two near-simultaneous
// increments don't both read the same stale count before either writes back.
let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(fn);
  writeQueue = result.catch(() => undefined);
  return result;
}

export async function incrementView(slug: string): Promise<number> {
  if (usingRedis) {
    const result = await redisCommand("incr", `views:${slug}`);
    return typeof result === "number" ? result : Number(result) || 0;
  }

  return enqueue(async () => {
    const data = await readFileStore();
    data[slug] = (data[slug] ?? 0) + 1;
    await writeFileStore(data);
    return data[slug];
  });
}

export async function getViewCount(slug: string): Promise<number> {
  if (usingRedis) {
    const result = await redisCommand("get", `views:${slug}`);
    if (result === null || result === undefined) return 0;
    return typeof result === "number" ? result : Number(result) || 0;
  }

  const data = await readFileStore();
  return data[slug] ?? 0;
}
