import { test } from "../../utils/test";
import { navigateToUrl } from "../../utils/route";

test.describe("Parameterized Tests", () => {
  const navigationScenariosURL: string[] = [
    "https://playwright.dev/",
    "docs/api/class-fixtures",
    "https://playwright.dev/docs/writing-tests",
    "docs/test-fixtures#overriding-fixtures",
  ];

  for (let index = 0; index < navigationScenariosURL.length; index++) {
    test(`Validate navigation of URL - ${navigationScenariosURL[index]}`, async ({
      page,
      baseURL,
    }) => {
      // Navigate to the URL.
      if (navigationScenariosURL[index] !== baseURL) {
        await navigateToUrl(page, navigationScenariosURL[index]);
      }

      // Validate page url.
      await page.waitForURL(navigationScenariosURL[index]);
    });
  }
});
