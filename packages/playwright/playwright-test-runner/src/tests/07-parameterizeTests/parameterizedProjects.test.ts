import { test } from "./parameterizedTest";

// --config=./src/tests/07-parameterizedTests/playwright.config.ts

test.beforeEach(async () => {
  console.log("before each 0th....");
});

test.beforeEach(async () => {
  console.log("before each....");
});

test(`Parameterized Project`, async ({ page, baseURL, person }) => {
  console.log(`Executing for Person - ${person}`);

  // Validate page url.
  await page.waitForURL(baseURL || "");
});

test.beforeEach(async () => {
  console.log("before each second time....");
});
