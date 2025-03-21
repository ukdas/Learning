import { Page } from "@playwright/test";
import { TimeOut } from "../../utils/common";
import { LeetCodeSelectors } from "./leetCodeSelectors";

/**
 * Open problems page.
 */
export async function openProblemsPage(page: Page): Promise<void> {
  // Click on Problems button from the page header.
  await page.locator(LeetCodeSelectors.ProblemsButton).click();

  // Wait to load the problem page.
  await page.locator(LeetCodeSelectors.GridPage).waitFor();
}

/**
 * Perform sign-in.
 * @param page Page references.
 * @param userName User name.
 * @param password Password.
 */
export async function performSignIn(
  page: Page,
  userName: string,
  password: string
): Promise<void> {
  // Wait to load the leet code landing page.
  await waitToLoadLeetCodeLandingPage(page);

  // Click on sign-in link.
  await page.locator(LeetCodeSelectors.SignInLink).click();

  // Wait to load login page.
  await page
    .locator(LeetCodeSelectors.SignInPage)
    .waitFor({ timeout: TimeOut.NavigationTimeout });
  await page
    .locator(LeetCodeSelectors.SignInBoxContainer)
    .waitFor({ timeout: TimeOut.NavigationTimeout });

  // Fill user name.
  await page.locator(LeetCodeSelectors.UserNameTextBox).click();
  await page.locator(LeetCodeSelectors.UserNameTextBox).fill(userName);

  // Fill password.
  await page.locator(LeetCodeSelectors.PasswordTextBox).click();
  await page.locator(LeetCodeSelectors.PasswordTextBox).fill(password);

  // Click on sign in.
  await page.locator(LeetCodeSelectors.SignInButton).click();

  // Wait to load home page.
  await waitToLoadLeetCodHomegPage(page);
}

/**
 * Wait to load leet code landing page.
 * @param page Page reference.
 */
export async function waitToLoadLeetCodHomegPage(page: Page): Promise<void> {
  await page.locator(LeetCodeSelectors.HomePage.NavBar).waitFor();
  await page.locator(LeetCodeSelectors.HomePage.BaseContent).waitFor();
}

/**
 * Wait to load leet code landing page.
 * @param page Page reference.
 */
export async function waitToLoadLeetCodeLandingPage(page: Page): Promise<void> {
  await page.locator(LeetCodeSelectors.LandingPage).waitFor();
}
