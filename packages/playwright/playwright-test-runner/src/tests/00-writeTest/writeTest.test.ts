import { chromium, firefox, test, webkit } from "@playwright/test";

test("Write A Test For Chromium", async () => {
  // Create a browser object.
  const browser = await chromium.launch();

  // Create a new context.
  const context = await browser.newContext();

  // Create a new page.
  const page = await context.newPage();

  // Navigate to Playwright dev page.
  await page.goto("https://playwright.dev/", { timeout: 60000 });

  // Close the page.
  await page.close();

  // Close the browser.
  await browser.close();
});

test("Write A Test For Firefox", async () => {
  // Create a browser object.
  const browser = await firefox.launch();

  // Create a new context.
  const context = await browser.newContext();

  // Create a new page.
  const page = await context.newPage();

  // Navigate to Playwright dev page.
  await page.goto("https://playwright.dev/", { timeout: 60000 });

  // Close the page.
  await page.close();

  // Close the browser.
  await browser.close();
});

test("Write A Test For Webkit", async () => {
  // Create a browser object.
  const browser = await webkit.launch();

  // Create a new context.
  const context = await browser.newContext();

  // Create a new page.
  const page = await context.newPage();

  // Navigate to Playwright dev page.
  await page.goto("https://playwright.dev/", { timeout: 60000 });

  // Close the page.
  await page.close();

  // Close the browser.
  await browser.close();
});

test("Write A Test for chrome", async () => {
  // Create a browser object.
  const browser = await chromium.launch({ channel: "chrome" });

  // Create a new context.
  const context = await browser.newContext();

  // Create a new page.
  const page = await context.newPage();

  // Navigate to Playwright dev page.
  await page.goto("https://playwright.dev/", { timeout: 60000 });

  // Close the page.
  await page.close();

  // Close the browser.
  await browser.close();
});

test("Write A Test for MS Edge", async () => {
  // Create a browser object.
  const browser = await chromium.launch({ channel: "msedge" });

  // Create a new context.
  const context = await browser.newContext();

  // Create a new page.
  const page = await context.newPage();

  // Navigate to Playwright dev page.
  await page.goto("https://playwright.dev/", { timeout: 60000 });

  // Close the page.
  await page.close();

  // Close the browser.
  await browser.close();
});
