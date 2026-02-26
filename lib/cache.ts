export function readCachedJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null

  const raw = window.localStorage.getItem(key)
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch (error) {
    console.error(`Failed to parse cached data for "${key}"`, error)
    return null
  }
}

export function writeCachedJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to write cached data for "${key}"`, error)
  }
}
