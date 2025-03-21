import { expect, Page, test } from "@playwright/test";
import { navigateToUrl } from "../../utils/route";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";

test.describe("Test Hook", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    console.log("beforeAll - Create a new page.");
    page = await browser.newPage({ baseURL: "https://playwright.dev/" });
  });

  test.beforeEach(async () => {
    console.log("beforeEach - Navigate to the base URL.");
    await navigateToUrl(page, "");
  });

  test.afterEach(async () => {
    console.log("afterEach - Navigate to the home page.");
    await navigateToUrl(page, "");
  });

  test.afterAll(async ({ browser }) => {
    console.log("afterAll - Close the page & browser.");
    await page.close();
    await browser.close();
  });

  test("Validate home page title & Get Started hyper link", async () => {
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

  test("Navigate to Intro Page", async () => {
    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");

    // Navigate to the intro page.
    await navigateToUrl(page, "docs/intro");

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");
  });

  test("Navigate to Intro Page - Duplicate", async () => {
    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");

    // Navigate to the intro page.
    await navigateToUrl(page, "docs/intro");

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");
  });
});
