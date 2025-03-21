import { test as base } from "@playwright/test";
import { EnvironmentVariable } from "../../utils/environment";
import { navigateToUrl } from "../../utils/route";

export type TestOptions = {
  person: string;
};

/**
 * Extend test with fixtures.
 */
export const test = base.extend<TestOptions>({
  person: ["Default", { option: true }],

  baseURL: async ({}, use) => {
    await use(EnvironmentVariable.baseURL);
  },
  page: async ({ page, baseURL }, use) => {
    console.log(`Navigate to the base url - ${baseURL}`);
    await navigateToUrl(page, baseURL || "");
    await use(page);
  },
});
