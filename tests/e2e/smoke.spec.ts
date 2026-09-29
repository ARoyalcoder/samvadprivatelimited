import { test, expect } from "@playwright/test";

test.describe("SAMVAD Platform Smoke Verification", () => {
  test("homepage renders with executive brand and navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SAMVAD PERCEPTION ADVISORY/);
    await expect(page.locator("h1")).toContainText("Perception is");
  });

  test("healthcheck API responds with operational state", async ({ request }) => {
    const response = await request.get("/api/health");
    expect([200, 503]).toContain(response.status());
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });
});
