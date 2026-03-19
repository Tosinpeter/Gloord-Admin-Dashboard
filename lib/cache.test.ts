import { afterEach, describe, expect, it, vi } from "vitest"
import { __clearMemoryCacheForTests, __setRawMemoryCacheForTests, readCachedJson, writeCachedJson } from "./cache"

describe("cache helpers", () => {
  afterEach(() => {
    __clearMemoryCacheForTests()
    vi.restoreAllMocks()
  })

  it("reads and writes json", () => {
    writeCachedJson("demo", { id: 1, name: "A" })
    expect(readCachedJson<{ id: number; name: string }>("demo")).toEqual({ id: 1, name: "A" })
  })

  it("returns null for missing key or invalid json", () => {
    expect(readCachedJson("missing")).toBeNull()

    // Force invalid json by injecting raw content.
    __setRawMemoryCacheForTests("bad", "{not-json")
    expect(readCachedJson("bad")).toBeNull()
  })

  it("no-ops safely when cache is unavailable", () => {
    expect(readCachedJson("any")).toBeNull()
    expect(() => writeCachedJson("any", { ok: true })).not.toThrow()
  })
})
