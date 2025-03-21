import { waitToLoadLeetCodHomegPage } from "./leetCode";
import { test } from "./storageStateTest";

test.describe("Storage State", () => {
  test("Launch Leet code with signed in", async ({ page }) => {
    // Reload the page.
    await page.reload();

    // Wait to load.
    await waitToLoadLeetCodHomegPage(page);
  });

  test("Open Leetcode problems page", async ({ page }) => {
    // Reload the page.
    await page.reload();

    // Wait to load.
    await waitToLoadLeetCodHomegPage(page);
  });
});
