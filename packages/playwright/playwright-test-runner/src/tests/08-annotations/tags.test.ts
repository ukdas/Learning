import { expect } from "@playwright/test";
import { test } from "../../utils/test";
import { navigateToUrl } from "../../utils/route";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";

test.describe("Tags", () => {
  test.beforeAll(() => {
    console.log("beforeAll......");
  });

  test.beforeEach(() => {
    console.log("beforeEach...");
  });

  test.afterEach(() => {
    console.log("afterEach....");
  });

  test.afterAll(() => {
    console.log("afterAll....");
  });

  test("Validate home page title & Get Started hyper link @fast @medium", async ({
    page,
  }) => {
    // Validate page title.
    await expect(page.title()).resolves.toBe(
      "Fast and reliable end-to-end testing for modern web apps | Playwright"
    );

    // Validate `Get Started` hyperlink is available in the
    const getStartedControl = page.locator(
      PlaywrightDevDocsSelectors.HomePage.GetStarted
    );
    await expect(getStartedControl).toBeEnabled();
    await expect(getStartedControl).toHaveText("Get started");
  });

  test("Navigate to Intro Page @slow", async ({ page }) => {
    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");

    // Navigate to the intro page.
    await navigateToUrl(page, "docs/intro");

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");
  });

  test("Navigate to Intro Page - Duplicate 1 @fast", async ({ page }) => {
    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");

    // Navigate to the intro page.
    await navigateToUrl(page, "docs/intro");

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");
  });
});
