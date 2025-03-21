import { test as base } from "@playwright/test";
import { EnvironmentVariable } from "./environment";
import { navigateToUrl } from "./route";

/**
 * Extend test with fixtures.
 */
export const test = base.extend({
  baseURL: async ({}, use) => {
    await use(EnvironmentVariable.baseURL);
  },
  page: async ({ page, baseURL }, use) => {
    console.log(`Navigate to the base url - ${baseURL}`);
    await navigateToUrl(page, baseURL || "");
    await use(page);
  },
});
