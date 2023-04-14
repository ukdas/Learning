import { test as base } from "@playwright/test";
import { navigateToUrl } from "../../../utils/route";
import { HomePage } from "../pages/home.page";

/**
 * Extend the test by adding POM fixture.
 */
export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page, baseURL }, use) => {
    // Navigate to the base url.
    await navigateToUrl(page, baseURL || "");

    // Wait to load the home page.
    const homePage = new HomePage(page);
    await homePage.waitToLoad();

    // Use Base page for the test.
    await use(homePage);
  },
});
