import { afterEach, describe, expect, it, vi } from "vitest"
import { readCachedJson, writeCachedJson } from "./cache"

type StorageLike = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

function setWindowWithStorage(storage: StorageLike) {
  Object.defineProperty(globalThis, "window", {
    value: { localStorage: storage },
    configurable: true,
  })
}

function clearWindow() {
  Object.defineProperty(globalThis, "window", {
    value: undefined,
    configurable: true,
    writable: true,
  })
}

describe("cache helpers", () => {
  afterEach(() => {
    clearWindow()
    vi.restoreAllMocks()
  })

  it("reads and writes json using localStorage", () => {
    const store = new Map<string, string>()
    const storage: StorageLike = {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => {
        store.set(key, value)
      },
    }
    setWindowWithStorage(storage)

    writeCachedJson("demo", { id: 1, name: "A" })
    expect(readCachedJson<{ id: number; name: string }>("demo")).toEqual({ id: 1, name: "A" })
  })

  it("returns null for missing key or invalid json", () => {
    const badStorage: StorageLike = {
      getItem: (key) => (key === "bad" ? "{not-json" : null),
      setItem: () => undefined,
    }
    setWindowWithStorage(badStorage)

    expect(readCachedJson("missing")).toBeNull()
    expect(readCachedJson("bad")).toBeNull()
  })

  it("no-ops safely when window is unavailable", () => {
    clearWindow()
    expect(readCachedJson("any")).toBeNull()
    expect(() => writeCachedJson("any", { ok: true })).not.toThrow()
  })
})
