// src/utils/apiCache.ts
import { NextApiRequest, NextApiResponse } from "next";

type CacheEntry = {
  data: unknown;
  timestamp: number;
};

// Simple in-memory cache
const cache: Record<string, CacheEntry> = {};

// Default cache expiration (15 minutes)
const DEFAULT_CACHE_TIME = 15 * 60 * 1000;

/**
 * Cache middleware for API routes
 * @param handler API route handler
 * @param cacheTime Cache expiration time in milliseconds
 */
export function withCache(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  cacheTime: number = DEFAULT_CACHE_TIME,
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Only cache GET requests
    if (req.method !== "GET") {
      return handler(req, res);
    }

    // Create a cache key from the URL and query parameters
    const cacheKey = req.url || "";

    // Check if we have a valid cached response
    const cachedResponse = cache[cacheKey];
    const now = Date.now();

    if (cachedResponse && now - cachedResponse.timestamp < cacheTime) {
      // Return the cached response
      return res.status(200).json(cachedResponse.data);
    }

    // Create a custom response object to capture the response
    const originalJson = res.json;
    res.json = function (body: unknown) {
      // Store in cache
      cache[cacheKey] = {
        data: body,
        timestamp: Date.now(),
      };

      // Call the original json method
      return originalJson.call(this, body);
    };

    // Call the handler
    return handler(req, res);
  };
}

/**
 * Clear the entire cache
 */
export function clearCache() {
  Object.keys(cache).forEach((key) => {
    delete cache[key];
  });
}

/**
 * Invalidate a specific cache entry
 * @param url The URL of the cache entry to invalidate
 */
export function invalidateCache(url: string) {
  if (cache[url]) {
    delete cache[url];
  }
}
