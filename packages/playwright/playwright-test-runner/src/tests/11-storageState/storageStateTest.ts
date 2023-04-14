import { test as base } from "@playwright/test";
// import fs from "fs";
// import { storageStatePath } from "../../utils/environment";
import { navigateToUrl } from "../../utils/route";

/**
 * Override test with storage state fixture.
 */
export const test = base.extend({
  // storageState: async({}, use) => {
  //     const storageStateContents = JSON.parse(fs.readFileSync(storageStatePath, "utf8"));
  //     await use(storageStateContents);
  // },
  page: async ({ page, baseURL }, use) => {
    // Navigate to the target environment URL.
    await navigateToUrl(page, baseURL || "");
    await use(page);
  },
});
