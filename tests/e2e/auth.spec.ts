import { test, expect } from "@playwright/test"

test.describe("authentication", () => {
  test("doctor login redirects to doctor overview", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("tab", { name: "Doctor" }).click()
    await page.getByLabel("Email").fill("doctor@example.com")
    await page.getByLabel("Password").fill("password")
    await page.getByRole("button", { name: "Sign in" }).click()
    await expect(page).toHaveURL(/\/doctor\/overview/)
  })

  test("admin login redirects to admin overview", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("tab", { name: "Admin/Owner" }).click()
    await page.locator("#admin-email").fill("admin@example.com")
    await page.locator("#admin-password").fill("password")
    await page.getByRole("button", { name: "Sign in" }).click()
    await expect(page).toHaveURL(/\/admin\/overview/)
  })
})
