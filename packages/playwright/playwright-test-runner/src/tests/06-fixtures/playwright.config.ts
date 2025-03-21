import { PlaywrightTestConfig } from "@playwright/test";
import config from "../../../playwright.config";
import { MyOptions } from "./advanceFixtureTest";

const projectConfig: PlaywrightTestConfig<MyOptions> = {
  ...config,
  projects: [
    {
      name: "alice",
      use: { defaultItem: "Alice", userItem: "alice" },
    },
    {
      name: "bob",
      use: { defaultItem: "Bob", userItem: "bob" },
    },
  ],
};

export default projectConfig;
