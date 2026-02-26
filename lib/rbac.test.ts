import { describe, expect, it } from "vitest"
import { canAccessPath, getRouteArea, isAppRole } from "./rbac"

describe("rbac helpers", () => {
  it("detects valid roles", () => {
    expect(isAppRole("admin")).toBe(true)
    expect(isAppRole("doctor")).toBe(true)
    expect(isAppRole("patient")).toBe(false)
    expect(isAppRole(null)).toBe(false)
  })

  it("maps paths to route areas", () => {
    expect(getRouteArea("/admin/overview")).toBe("admin")
    expect(getRouteArea("/doctor/pending")).toBe("doctor")
    expect(getRouteArea("/")).toBe("public")
  })

  it("enforces access by role", () => {
    expect(canAccessPath("/admin/overview", "admin")).toBe(true)
    expect(canAccessPath("/admin/overview", "doctor")).toBe(false)
    expect(canAccessPath("/doctor/pending", "doctor")).toBe(true)
    expect(canAccessPath("/doctor/pending", "admin")).toBe(false)
    expect(canAccessPath("/", null)).toBe(true)
  })
})
