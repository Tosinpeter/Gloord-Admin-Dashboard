import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("core utilities", () => {
  it("merges class names", () => {
    expect(cn("p-4", "text-sm")).toBe("p-4 text-sm")
  })

  it("resolves tailwind conflicts by last token", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
  })
})
