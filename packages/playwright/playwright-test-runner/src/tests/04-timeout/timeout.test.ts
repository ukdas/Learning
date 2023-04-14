import { expect, test } from "@playwright/test";
import { TimeOut } from "../../utils/common";
import { EnvironmentVariable } from "../../utils/environment";
import { navigateToUrl } from "../../utils/route";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";

test.describe("Timeout", () => {
  // Unconditionally marks a test as "slow". Slow test will be given triple the default timeout.
  // test.slow();

  test.beforeAll(() => {
    console.log("beforeAll - Create a new page.");

    // default - same as test timeout: 30 secs
    test.setTimeout(TimeOut.DefaultWaitTime);
  });

  test.beforeEach(async ({ page }) => {
    console.log("beforeEach - Navigate to the base URL.");
    console.log(`Navigate to the base url - ${EnvironmentVariable.baseURL}`);
    await navigateToUrl(page, EnvironmentVariable.baseURL);
  });

  test.afterAll(() => {
    console.log("afterAll - Close the page & browser.");
    test.setTimeout(TimeOut.DefaultWaitTime);
  });

  test("Test Timeout", async ({ page }, testInfo) => {
    // default - 30 secs

    // Set test timeout.
    test.setTimeout(TimeOut.DefaultLoopWaitTime);

    // Set test timeout on top of existing test timeout.
    test.setTimeout(testInfo.timeout + TimeOut.DefaultLoopWaitTime);

    // Validate home page url.
    expect(page.url(), "Failed to validate home page URL").toBe(
      "https://playwright.dev/"
    );
  });

  test("Expect Timeout", async ({ page }, testInfo) => {
    // default - 5 secs

    // config = { expect: { timeout: TimeOut.DefaultWaitTime } }

    // Validate `Get Started` hyperlink is available in the
    const getStartedControl = page.locator(
      PlaywrightDevDocsSelectors.HomePage.GetStarted
    );
    await expect(getStartedControl).toBeEnabled({
      timeout: TimeOut.DefaultWaitTime,
    });
  });

  test("Action Timeout", async ({ page }) => {
    // default - no timeout

    // config = { use: { actionTimeout: TimeOut.DefaultWaitTime } }
    // test.use({ actionTimeout: TimeOut.DefaultWaitTime });

    // Validate `Get Started` hyperlink is available in the
    const getStartedControl = page.locator(
      PlaywrightDevDocsSelectors.HomePage.GetStarted
    );
    await getStartedControl.waitFor({ timeout: TimeOut.DefaultWaitTime });
    await getStartedControl.click({ timeout: TimeOut.DefaultWaitTime });
    await getStartedControl.waitFor({
      timeout: TimeOut.DefaultWaitTime,
      state: "detached",
    });
  });

  test("Navigation Timeout", async ({ page }) => {
    // default - no timeout

    // config = { use: { navigationTimeout: TimeOut.OneMinuteTimeOut } }
    // test.use({ navigationTimeout: TimeOut.OneMinuteTimeOut})

    await page.goto("https://playwright.dev/docs/api/class-test/", {
      timeout: TimeOut.OneMinuteTimeOut,
    });
  });

  // Global timeout - for whole test run. config = { globalTimeout: 60*60*1000 }.
  // default - no timeout

  // Fixture Timeout. default - no timeout. Shares timeout with test timeout.
});
