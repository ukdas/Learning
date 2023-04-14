import {
  Browser,
  BrowserType,
  chromium,
  firefox,
  Page,
} from "@playwright/test";
import {
  performSignIn,
  waitToLoadLeetCodeLandingPage,
} from "../tests/11-storageState/leetCode";
import {
  BrowserTypes,
  EnvironmentVariable,
  storageStatePath,
} from "../utils/environment";
import { navigateToUrl } from "../utils/route";

/**
 * Playwright execution's global set-up before starting the test execution.
 */
async function globalSetup() {
  console.log(
    "\n##[section] Playwright execution's global set-up before starting the test execution."
  );

  // Perform sign-in operation.
  if (EnvironmentVariable.userName && EnvironmentVariable.password) {
    console.log("perform sign-in & save storage state.");

    let browserType: BrowserType<{}>;

    switch (EnvironmentVariable.browserType) {
      case BrowserTypes.Chromium:
        browserType = chromium;
        break;

      case BrowserTypes.Firefox:
        browserType = firefox;
        break;

      case BrowserTypes.Webkit:
        browserType = firefox;
        break;
    }

    // Launch the browser.
    const browser: Browser = await browserType.launch({ headless: false });
    const page: Page = await browser.newPage();

    // Navigate to the base url.
    await navigateToUrl(page, EnvironmentVariable.baseURL);

    // Wait to load leet code landing page.
    await waitToLoadLeetCodeLandingPage(page);

    // Perform sign-in.
    await performSignIn(
      page,
      EnvironmentVariable.userName,
      EnvironmentVariable.password
    );

    // Save storage state.
    await page.context().storageState({ path: storageStatePath });

    // Close the browser.
    await browser.close();
  }
}

/**
 * Exports
 */
export default globalSetup;
