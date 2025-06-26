// -----------------------------------------------------------------------------
// src/lib/cache.ts
//
// This utility provides a unified cache wrapper for server-side data fetching
// in Next.js applications. It combines Next.js's unstable_cache and React's
// cache to optimize data retrieval and revalidation.
//
// - The `cache` function takes an async callback, a cache key, and options.
// - It wraps the callback with React's cache (for deduplication) and then
//   Next.js's unstable_cache (for persistent, taggable caching and revalidation).
// - Options allow you to set revalidation intervals and cache tags.
//
// Usage:
//   import { cache } from '@/lib/cache';
//   const getData = cache(async () => { ... }, ['unique-key'], { revalidate: 60 });
//
// Best practices:
// - Use this utility for expensive or frequently accessed server data.
// - Use descriptive cache keys and appropriate revalidation times.
// - Tag your cache for fine-grained invalidation if needed.
// -----------------------------------------------------------------------------
import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] }
) {
  return nextCache(reactCache(cb), keyParts, options);
}