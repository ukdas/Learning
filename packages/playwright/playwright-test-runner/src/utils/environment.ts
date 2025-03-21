import path from "path";
import { TimeOut } from "./common";

/**
 * Browser Types
 */
export enum BrowserTypes {
  Chromium = "chromium",
  Firefox = "firefox",
  Webkit = "webkit",
}

/**
 * Useful to dump temporary files for local runs.
 */
const gitIgnoredFolder = path.join(".", "generated/tests");

/**
 * Type declaration for Process Environment Config variables.
 */
type IEnvironmentVariable = {
  /**
   * Base URL, where needs to be navigated.
   */
  baseURL: string;

  /**
   * Browser Name.
   */
  browserType: BrowserTypes;

  /**
   * Device model - Currently Available - `Moto G4` / `Pixel 5` / `Galaxy Tab S4` / `iPhone 13 Pro` / `iPad Pro 11` / `iPad Mini`. Default - `Browser`.
   */
  deviceName: string;

  /**
   * Run in headless mode. Default to `false`.
   */
  headless: boolean;

  /**
   * Password will be used for user's authentication.
   */
  password: string;

  /**
   * Name of the Playwright Test Run. Default - `UCI Tests`.
   */
  playwrightTestRunName: string;

  /**
   * Output directory for files created during the test run. For local execution, default - `./generated/integration-tests`.
   */
  outputDirectory: string;

  /**
   * The number of times to repeat each test, useful for debugging flaky tests.
   */
  repeatEach: number;

  /**
   * The maximum number of retry attempts given to failed tests. If not specified, failing tests are not retried. Default - `0`.
   */
  retries: number;

  /**
   * User name, will be used for log-in.
   */
  userName: string;

  /**
   * Directory that will be recursively scanned for test files. Default - `.`.
   */
  testDirectory: string;

  /**
   * Only the files matching one of these patterns are executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns. Default - ["**\tests\**\*.test.ts"]
   */
  testMatch: string | string[];

  /**
   * Timeout for each test in milliseconds.
   */
  testTimeout: number;

  /**
   * The maximum number of concurrent worker processes to use for parallelizing tests. Default - `1`.
   */
  workers: number;
};

/**
 * All Environment Config variables.
 */
export const EnvironmentVariable: IEnvironmentVariable = {
  baseURL: process.env.BASEURL || "https://playwright.dev/",
  browserType: (process.env.BROWSER?.toString() || "chromium") as BrowserTypes,
  deviceName: process.env.DEVICENAME || "",
  headless: process.env.HEADLESS?.toString() === "true" || false,
  outputDirectory: process.env.OUTPUTDIR || gitIgnoredFolder,
  password: process.env.TESTS_PASSWORD || "",
  playwrightTestRunName: process.env.TEST_RUN_NAME || "Playwright Tests",
  repeatEach: Number(process.env.REPEATEACH) || 1,
  retries: Number(process.env.RETRIES) || 0,
  testDirectory: process.env.TESTDIR || ".",
  testMatch: process.env.TESTMATCH || ["**/tests/**/*.test.ts"],
  testTimeout: Number(process.env.TESTTIMEOUT) || TimeOut.TestTimeout,
  userName: process.env.TESTS_USERNAME || "",
  workers: Number(process.env.WORKERS) || 1,
};

/**
 * Integration-Tests results directory path.
 */
export const integrationTestsResultstDirectoryPath = path.join(
  EnvironmentVariable.outputDirectory,
  "testResults"
);

/**
 * Integration-Tests report directory path.
 */
export const integrationTestsReportDirectoryPath = path.join(
  EnvironmentVariable.outputDirectory,
  "testReport"
);

/**
 * Integration Tests Results JUnit report file.
 */
export const integrationTestsResultsJUnitReportXmlFile = `${integrationTestsResultstDirectoryPath}/tests-results.xml`;

/**
 * Integration Tests Results JSON report file.
 */
export const integrationTestsResultsJSONReportFile = `${integrationTestsResultstDirectoryPath}/tests-results.json`;

/**
 * Storage state path.
 */
export const storageStatePath = path.join(
  EnvironmentVariable.outputDirectory,
  "state.json"
);
