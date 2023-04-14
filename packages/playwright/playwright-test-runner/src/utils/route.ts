import { Page } from "@playwright/test";
import { TimeOut } from "./common";

/**
 * Navigate to the URL.
 * @param page Page reference.
 * @param url URL, needs to be navigated.
 */
export async function navigateToUrl(page: Page, url: string): Promise<void> {
  await Promise.all([
    page.goto(url, {
      timeout: TimeOut.NavigationTimeout,
      waitUntil: "domcontentloaded",
    }),
    page.waitForNavigation({ timeout: TimeOut.NavigationTimeout }),
  ]);
}
