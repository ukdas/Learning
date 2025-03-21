import { expect, test } from "@playwright/test";
import { EnvironmentVariable } from "../../utils/environment";
import { navigateToUrl } from "../../utils/route";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";

test.describe("Visual Comparisons", () => {
  test.beforeEach(async ({ page }) => {
    console.log(`Navigate to the base url - ${EnvironmentVariable.baseURL}`);
    await navigateToUrl(page, EnvironmentVariable.baseURL);
  });

  // --update-snapshots

  test("Page - without screenshot path", async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });

  test("Page - with screenshot path", async ({ page }) => {
    await expect(page).toHaveScreenshot("Visual-Comparisons-Home-Page-1.png");
  });

  test("Locator - without screenshot path", async ({ page }) => {
    const getStarted = page.locator(
      PlaywrightDevDocsSelectors.HomePage.GetStarted
    );
    await expect(getStarted).toHaveScreenshot();
  });

  test("Locator - with screenshot path", async ({ page }) => {
    const getStarted = page.locator(
      PlaywrightDevDocsSelectors.HomePage.GetStarted
    );
    await expect(getStarted).toHaveScreenshot(
      "Visual-Comparisons-Get-Started-1.png"
    );
  });

  test("Snapshot - with screenshot path", async ({ page }) => {
    const getStarted = page.locator(
      PlaywrightDevDocsSelectors.HomePage.GetStarted
    );
    expect(await getStarted.textContent()).resolves.toMatchSnapshot(
      "Visual-Comparisons-Snapshot-1.txt"
    );
  });
});
