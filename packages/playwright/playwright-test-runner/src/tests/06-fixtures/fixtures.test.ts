import { test } from "@playwright/test";
import { EnvironmentVariable } from "../../utils/environment";
import { navigateToUrl } from "../../utils/route";

test.describe("Built-in Fixture", () => {
  test("Browser Fixture", async ({ browser }) => {
    const page = await browser.newPage();
    await navigateToUrl(page, EnvironmentVariable.baseURL);
    await page.waitForURL(EnvironmentVariable.baseURL);
  });

  test("Context Fixture", async ({ context }) => {
    const page = await context.newPage();
    await navigateToUrl(page, EnvironmentVariable.baseURL);
    await page.waitForURL(EnvironmentVariable.baseURL);
  });

  test("Browser Name Fixture", async ({ browserName }) => {
    console.log(`Browser Name - ${browserName}`);
  });

  test("Page Fixture", async ({ page }) => {
    await navigateToUrl(page, EnvironmentVariable.baseURL);
    await page.waitForURL(EnvironmentVariable.baseURL);
  });

  test("Request Fixture", async ({ request }) => {
    // Get request.
    const response = await request.get(EnvironmentVariable.baseURL);
    console.log(`Response - ${response.statusText()}`);
  });

  test("Headless Fixture", async ({ headless }) => {
    // Get request.
    console.log(`Headless - ${headless}`);
  });
});
