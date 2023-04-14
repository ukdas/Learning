import { Locator, Page } from "@playwright/test";
import { HeaderSelectors } from "../../selectors/headerSelector";
import { SearchDialog } from "../dialog/searchDialog";

export class Header {
  private _page: Page;
  private _searchDialog!: SearchDialog;

  /**
   * Construct Header class.
   * @param page Page reference.
   */
  public constructor(page: Page) {
    this._page = page;
  }

  /**
   * Wait to load the header container.
   */
  public async waitToLoad(): Promise<void> {
    await this._page.locator(HeaderSelectors.Container).waitFor();
    await this._page.locator(HeaderSelectors.LeftItemsContainer).waitFor();
    await this._page.locator(HeaderSelectors.RightItemsContainer).waitFor();
  }

  /**
   * Get API button.
   * @returns API button.
   */
  public async getAPIsButton(): Promise<Locator> {
    // Wait to load header.
    await this.waitToLoad();

    // Get docs button.
    const docs = this._page.locator(HeaderSelectors.APIButton);
    return docs;
  }

  /**
   * Get docs button.
   * @returns Docs button.
   */
  public async getDocsButton(): Promise<Locator> {
    // Wait to load header.
    await this.waitToLoad();

    // Get docs button.
    const docs = this._page.locator(HeaderSelectors.DocsButton);
    return docs;
  }

  /**
   * Get playwright home page button.
   * @returns Playwright home page button.
   */
  public async getPlaywrightHomePageButton(): Promise<Locator> {
    // Wait to load header.
    await this.waitToLoad();

    // Get playwright home page button.
    const homePage = this._page.locator(HeaderSelectors.PlaywrightButton);
    return homePage;
  }

  /**
   * Get search button.
   * @returns Search button
   */
  public async getSearchButton(): Promise<Locator> {
    // Wait to load header.
    await this.waitToLoad();

    // Get search button.
    const searchButton = this._page.locator(HeaderSelectors.SearchButton);
    return searchButton;
  }

  /**
   * Open search dialog.
   * @returns Serach dialog.
   */
  public async openSearchDialog(): Promise<SearchDialog> {
    // Click on search button.
    const searchButton = await this.getSearchButton();
    await searchButton.click();

    // Get search dialog.
    if (!this._searchDialog) {
      this._searchDialog = new SearchDialog(this._page);
    }
    await this._searchDialog.waitToLoad();
    return this._searchDialog;
  }
}
