import { describe, expect, it } from "vitest"

describe("useAccessibleModal", () => {
  it("exports a hook function", async () => {
    const mod = await import("./useAccessibleModal")
    expect(typeof mod.useAccessibleModal).toBe("function")
  })
})
