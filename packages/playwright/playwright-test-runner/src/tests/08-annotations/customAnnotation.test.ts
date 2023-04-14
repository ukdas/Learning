import { expect } from "@playwright/test";
import { test } from "../../utils/test";
import { PlaywrightDevDocsSelectors } from "../../utils/selector";

test.describe("Custom Annotations", () => {
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

  test("Validate home page title & Get Started hyper link", async ({
    page,
  }) => {
    test
      .info()
      .annotations.push({ type: "issue", description: "Custom annotations" });

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
});
