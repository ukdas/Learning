import { expect, test } from "@playwright/test";
import { TimeOut } from "../../utils/common";
import { EnvironmentVariable } from "../../utils/environment";
import { navigateToUrl } from "../../utils/route";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";

test.describe("Expect", () => {
  test.beforeEach(async ({ page }) => {
    console.log(`Navigate to the base url - ${EnvironmentVariable.baseURL}`);
    await navigateToUrl(page, EnvironmentVariable.baseURL);
  });

  test("Default assertion", async ({ page }) => {
    // Validate page url.
    expect(page.url()).toBe("https://playwright.dev/");
  });

  test("Async operation assertion", async ({ page }) => {
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

  test("Negation assertion", async ({ page }) => {
    expect(page.url()).not.toBe("https://playwright");
    await expect(
      page.locator(PlaywrightDevDocsSelectors.SearchButton)
    ).not.toBeDisabled();
  });

  test("Soft assertion", async ({ page }) => {
    // Click on Get Started
    await page.locator(PlaywrightDevDocsSelectors.HomePage.GetStarted).click();

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");

    // Validate page URL by providing wrong value.
    expect.soft(page.url()).toBe("https://playwright.dev/docs");

    // Validat Installation header ia shown in the intro page.
    await expect(
      page.locator(PlaywrightDevDocsSelectors.IntroPage.InstallationHeader)
    ).toBeEnabled();
  });

  test("Custom failure message", async ({ page }) => {
    // Click on Get Started
    await page.locator(PlaywrightDevDocsSelectors.HomePage.GetStarted).click();

    // Wait to load intro page.
    await page.waitForURL("https://playwright.dev/docs/intro");

    // Validate page URL by providing wrong value.
    expect
      .soft(page.url(), "Required intro page URL validation is failed.")
      .toBe("https://playwright.dev/docs");

    // Validat Installation header ia shown in the intro page.
    await expect(
      page.locator(PlaywrightDevDocsSelectors.IntroPage.InstallationHeader),
      "Installation h1 header is not shown."
    ).toBeEnabled();
  });

  test("Polling assertion", async ({ page }) => {
    // Click on Get Started
    await page.locator(PlaywrightDevDocsSelectors.HomePage.GetStarted).click();

    await expect
      .poll(
        async () => {
          const response = await page.request.get(
            "https://playwright.dev/docs/intro"
          );
          return response.status();
        },
        {
          message: "Request is not succeeded.",
          timeout: TimeOut.DefaultWaitTime,
          intervals: [5000, 10000, 15000],
        }
      )
      .toBe(200);
  });

  test("Retrying assertion", async ({ page }) => {
    // Click on Get Started
    await page.locator(PlaywrightDevDocsSelectors.HomePage.GetStarted).click();

    await expect(async () => {
      const response = await page.request.get(
        "https://playwright.dev/docs/intro"
      );
      expect(response.status(), "Request is not succeeded").toBe(200);

      await page.reload();
      const pageTitle = await page.title();
      expect(pageTitle, "Failed to validate page title").toBe(
        "Installation | Playwright"
      );
    }, "Retry validation is not succeeded.").toPass({
      timeout: TimeOut.DefaultWaitTime,
    });
  });
});
