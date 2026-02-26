import { test, expect } from "@playwright/test"

test.describe("rbac route protection", () => {
  test("doctor cannot access admin routes", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("tab", { name: "Doctor" }).click()
    await page.getByLabel("Email").fill("doctor@example.com")
    await page.getByLabel("Password").fill("password")
    await page.getByRole("button", { name: "Sign in" }).click()
    await expect(page).toHaveURL(/\/doctor\/overview/)

    await page.goto("/admin/overview")
    await expect(page).toHaveURL("/")
  })

  test("admin cannot access doctor routes", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("tab", { name: "Admin/Owner" }).click()
    await page.locator("#admin-email").fill("admin@example.com")
    await page.locator("#admin-password").fill("password")
    await page.getByRole("button", { name: "Sign in" }).click()
    await expect(page).toHaveURL(/\/admin\/overview/)

    await page.goto("/doctor/pending")
    await expect(page).toHaveURL("/")
  })
})
