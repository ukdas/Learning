import {
  devices,
  PlaywrightTestConfig,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  ReporterDescription,
} from "@playwright/test";
import fs from "fs";
import { TimeOut, ViewPort } from "./src/utils/common";
import {
  EnvironmentVariable,
  integrationTestsReportDirectoryPath,
  integrationTestsResultsJSONReportFile,
  integrationTestsResultsJUnitReportXmlFile,
  integrationTestsResultstDirectoryPath,
  storageStatePath,
} from "./src/utils/environment";

/**
 * Browser launch args
 */
const LaunchBrowserArgs = [
  "--start-maximized",
  "--no-sandbox",
  "--disable-web-security",
  "--disable-features=IsolateOrigins",
  "--disable-site-isolation-trials",
  "--start-fullscreen",
  "--window-size=1920,1080",
];

/**
 * `use` property for Playwright Configs.
 */
let defaultConfigUse: {
  [K in keyof PlaywrightWorkerOptions]?: PlaywrightWorkerOptions[K];
} & {
  [K in keyof PlaywrightTestOptions]?: PlaywrightTestOptions[K];
} = {
  acceptDownloads: true,
  actionTimeout: TimeOut.DefaultWaitTime,
  baseURL: EnvironmentVariable.baseURL,
  browserName: EnvironmentVariable.browserType,
  // channel: "chrome",
  extraHTTPHeaders: {
    origin: "",
  },
  headless: EnvironmentVariable.headless,
  httpCredentials: {
    password: "",
    username: "",
  },
  ignoreHTTPSErrors: true,
  launchOptions: {
    args: LaunchBrowserArgs,
    headless: EnvironmentVariable.headless,
  },
  navigationTimeout: TimeOut.DefaultWaitTime,
  screenshot: "only-on-failure",
  storageState:
    EnvironmentVariable.userName &&
    EnvironmentVariable.password &&
    fs.existsSync(storageStatePath)
      ? JSON.parse(fs.readFileSync(storageStatePath, "utf8"))
      : undefined,
  trace: "retain-on-failure",
  video: "retain-on-failure",
  viewport: { height: ViewPort.Default.Height, width: ViewPort.Default.Width },
};

// Add Device Descriptor Details.
defaultConfigUse = EnvironmentVariable.deviceName
  ? { ...defaultConfigUse, ...devices[EnvironmentVariable.deviceName] }
  : { ...defaultConfigUse };

/**
 * Reporter Details.
 */
let reporters: ReporterDescription[] = [
  [
    "html",
    {
      open: "never",
      outputFolder: integrationTestsReportDirectoryPath,
    },
  ],
  ["list"],
  [
    "junit",
    {
      outputFile: integrationTestsResultsJUnitReportXmlFile,
    },
  ],
  [
    "json",
    {
      outputFile: integrationTestsResultsJSONReportFile,
    },
  ],
  [
    "./src/tests/09-reporters/customReporter.ts",
    {
      open: "never",
      outputFolder: integrationTestsReportDirectoryPath,
    },
  ],
];

/**
 * Projects
 */
// const projects: Project[] = [
//   {
//     name: "Desktop Chromium",
//     use: {
//       browserName: "chromium",
//       viewport: { width: 1280, height: 720 },
//     },
//   },
//   {
//     name: "Desktop Safari",
//     use: {
//       browserName: "webkit",
//       viewport: { width: 1280, height: 720 },
//     },
//   },
//   {
//     name: "Desktop Firefox",
//     use: {
//       browserName: "firefox",
//       viewport: { width: 1280, height: 720 },
//     },
//   },
//   {
//     name: "Mobile Chrome",
//     use: devices["Pixel 5"],
//   },
//   {
//     name: "Mobile Safari",
//     use: devices["iPhone 12"],
//   },
// ];

const isRunningOnPipeline = false;

/**
 * Playwright Test Config.
 */
const config: PlaywrightTestConfig = {
  expect: { timeout: TimeOut.DefaultWaitTime },
  forbidOnly: isRunningOnPipeline ? true : false,
  fullyParallel: false,
  globalSetup: require.resolve("./src/globals/global-setup"),
  globalTeardown: require.resolve("./src/globals/global-teardown"),
  globalTimeout: 60 * 60 * 1000,
  ignoreSnapshots: false,
  // maxFailures: 10,
  name: process.env.TEST_RUN_NAME || "Playwright Tests",
  outputDir: integrationTestsResultstDirectoryPath,
  preserveOutput: "always",
  // projects: [...projects],
  quiet: true,
  repeatEach: EnvironmentVariable.repeatEach,
  // reportSlowTests: { max: 5, threshold: 1000 },
  reporter: [...reporters],
  retries: EnvironmentVariable.retries,
  shard: { current: 1, total: 1 },
  // snapshotDir: undefined,
  // snapshotPathTemplate: undefined,
  testDir: EnvironmentVariable.testDirectory,
  testMatch: EnvironmentVariable.testMatch,
  // testIgnore: ["**/tests/**/*.test.ts"],
  timeout: EnvironmentVariable.testTimeout,
  updateSnapshots: "none",
  use: { ...defaultConfigUse },
  workers: EnvironmentVariable.workers,
};

/**
 * Export playwright test config.
 */
export default config;
