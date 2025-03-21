import { PlaywrightTestConfig } from "@playwright/test";
import config from "../../../playwright.config";
import { TestOptions } from "./parameterizedTest";

const projectConfig: PlaywrightTestConfig<TestOptions> = {
  ...config,
  projects: [
    {
      name: "alice",
      use: { person: "Alice" },
    },
    {
      name: "bob",
      use: { person: "Bob" },
    },
  ],
};

export default projectConfig;
