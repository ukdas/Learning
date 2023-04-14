import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { DocsPage } from "./docs.page";
import { HomePageSelectors } from "../selectors/homePageSelectors";

export class HomePage extends BasePage {
  private _container: Locator;

  public constructor(page: Page) {
    super(page);
    this._container = this.page.locator(HomePageSelectors.Container);
  }

  /**
   * Wait to load the home page.
   */
  public async waitToLoad(): Promise<void> {
    // Wait to load base page.
    await super.waitToLoad();

    // Wait to load home page.
    await this._container.waitFor();
  }

  /**
   * Click on get started button to load the docs intro page.
   */
  public async getStarted(): Promise<DocsPage> {
    // Wait to load the home page.
    await this.waitToLoad();

    // Click on Get started button.
    await this._container.locator(HomePageSelectors.GetStarted).click();

    // Get docs page.
    const docsPage = new DocsPage(this.page);
    await docsPage.waitToLoad();
    return docsPage;
  }
}
