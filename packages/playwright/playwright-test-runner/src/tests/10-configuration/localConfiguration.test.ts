import { expect, test } from "@playwright/test";
import { navigateToUrl } from "../../utils/route";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";

test.use({ video: "on", trace: "on" });

test.describe("Local Configuration", () => {
  test.use({ viewport: { width: 600, height: 600 } });

  test.beforeEach(async ({ page, baseURL }) => {
    await navigateToUrl(page, baseURL || "");
  });

  test("Validate home page title & Get Started hyper link", async ({
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

  test("Navigate to Intro Page", async ({ page }) => {
    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");

    // Navigate to the intro page.
    await navigateToUrl(page, "docs/intro");

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro", {
      timeout: 5000,
    });
  });
});
