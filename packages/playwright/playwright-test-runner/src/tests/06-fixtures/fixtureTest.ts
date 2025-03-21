import { test as base } from "@playwright/test";
import { navigateToUrl } from "../../utils/route";

export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    await navigateToUrl(page, baseURL || "");
    await use(page);
  },
});
