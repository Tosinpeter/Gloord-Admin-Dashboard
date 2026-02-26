import { test, expect } from "@playwright/test"

test.describe("main crud flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.getByRole("tab", { name: "Admin/Owner" }).click()
    await page.locator("#admin-email").fill("admin@example.com")
    await page.locator("#admin-password").fill("password")
    await page.getByRole("button", { name: "Sign in" }).click()
    await expect(page).toHaveURL(/\/admin\/overview/)
  })

  test("admin can create and delete a doctor record", async ({ page }) => {
    const doctorName = "E2E Test Doctor"

    await page.goto("/admin/doctors")
    await expect(page.getByText("Doctor Management")).toBeVisible()

    await page.getByRole("button", { name: "Add Doctor" }).click()
    await page.getByLabel("Full Name").fill(doctorName)
    await page.getByLabel("Email Address").fill("e2e-doctor@example.com")
    await page.getByLabel("Phone Number").fill("+1 555 000 0000")
    await page.getByLabel("Specialty").fill("Dermatology")
    await page.getByLabel("License Number").fill("MD-E2E-1")
    await page.getByLabel("Years of Experience").fill("10")
    await page.locator("form").getByRole("button", { name: "Add Doctor" }).click()

    await page.getByPlaceholder("Search by name, ID, or specialty...").fill(doctorName)
    await expect(page.getByText(`Dr. ${doctorName}`)).toBeVisible()

    await page
      .locator("tr", { hasText: `Dr. ${doctorName}` })
      .getByRole("button")
      .first()
      .click()
    page.once("dialog", (dialog) => dialog.accept())
    await page.getByRole("button", { name: "Remove Doctor" }).click()

    await expect(page.getByText(`Dr. ${doctorName}`)).not.toBeVisible()
  })

  test("admin can view patient details", async ({ page }) => {
    await page.goto("/admin/patients")
    await expect(page.getByText("Patient Management")).toBeVisible()

    await page.locator("tr").nth(1).getByRole("link").first().click()
    await expect(page).toHaveURL(/\/admin\/patients\/.+/)
  })
})
