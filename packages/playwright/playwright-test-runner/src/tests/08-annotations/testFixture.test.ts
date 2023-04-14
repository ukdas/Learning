import { expect } from "@playwright/test";
import { test } from "../../utils/test";
import { navigateToUrl } from "../../utils/route";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";
import { BrowserTypes } from "../../utils/environment";
import { TimeOut } from "../../utils/common";

test.describe("Test Ficture", () => {
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

  // Multiple annotations

  test("Validate home page title & Get Started hyper link", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === BrowserTypes.Chromium,
      "This is not working for chromium."
    );

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

  test("Navigate to Intro Page", async ({ page, browserName }) => {
    test.fixme(browserName === BrowserTypes.Webkit, "Fix for webkit");

    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");

    // Navigate to the intro page.
    await navigateToUrl(page, "docs/intro");

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");
  });

  test("Navigate to Intro Page - Duplicate 1", async ({ page }, testInfo) => {
    console.log(testInfo.timeout);

    test.slow(
      testInfo.timeout === TimeOut.TestTimeout,
      "Increase test timeout"
    );

    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");

    // Navigate to the intro page.
    await navigateToUrl(page, "docs/intro");

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");

    console.log(testInfo.timeout);
  });
});
