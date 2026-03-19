const memoryCache = new Map<string, string>()

export function readCachedJson<T>(key: string): T | null {
  const raw = memoryCache.get(key)
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch (error) {
    console.error(`Failed to parse cached data for "${key}"`, error)
    return null
  }
}

export function writeCachedJson<T>(key: string, value: T): void {
  try {
    memoryCache.set(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to write cached data for "${key}"`, error)
  }
}

// Test helper: keep cache deterministic between runs.
export function __clearMemoryCacheForTests(): void {
  memoryCache.clear()
}

// Test helper: inject raw JSON to exercise parse failures.
export function __setRawMemoryCacheForTests(key: string, raw: string): void {
  memoryCache.set(key, raw)
}
