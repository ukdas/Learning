import { test } from "@playwright/test";

test.beforeEach(async () => {
  console.log("before each 0th....");
});

test.beforeEach(async () => {
  console.log("before each....");
});

test(`Parameterized Project`, async ({ page, baseURL }) => {
  console.log(`Executing for Person -`);

  // Validate page url.
  await page.waitForURL(baseURL || "");
});

test.beforeEach(async () => {
  console.log("before each second time....");
});

test.beforeAll(() => {
  console.log("Before All.....");
});

test.beforeAll(() => {
  console.log("Before All second time.....");
});
