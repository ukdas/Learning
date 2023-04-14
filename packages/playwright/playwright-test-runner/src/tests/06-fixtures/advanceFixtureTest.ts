import { test as base } from "@playwright/test";
import { navigateToUrl } from "../../utils/route";

export type MyOptions = {
  defaultItem: string;
  userItem: string;
};

type Account = {
  username: string;
  password: string;
};

export const test = base.extend<
  MyOptions & { slowFixture: string },
  { account: Account }
>({
  slowFixture: [
    async ({}, use) => {
      console.log("Slow Fixture....");
      await use("Slow Fixture");
    },
    { timeout: 30000 },
  ],

  defaultItem: ["Default", { option: true }],
  userItem: ["Not assigned", { option: true }],

  page: async ({ page, baseURL, account }, use) => {
    console.log(`page for account - ${account.username}`);
    await navigateToUrl(page, baseURL || "");
    await use(page);
  },

  account: [
    async ({}, use, workerInfo) => {
      console.log(`Account for worker number - ${workerInfo.workerIndex}`);
      const username = `user-${workerInfo.workerIndex}`;
      const password = `Password-${workerInfo.workerIndex}`;
      await use({ username, password });
    },
    { scope: "worker" },
  ],

  // define for POM.
});
