import { expect, Locator, Page } from "@playwright/test";
import { SearchDialogSelectors } from "../../selectors/searchDialogSelector";

export class SearchDialog {
  private _page: Page;

  /**
   * Constrcutor for SearchDialog class.
   * @param page Page reference.
   */
  public constructor(page: Page) {
    this._page = page;
  }

  /**
   * Wait to load search dialog.
   */
  public async waitToLoad(): Promise<void> {
    await this._page.locator(SearchDialogSelectors.Container).waitFor();
  }

  /**
   * Fill search text box.
   * @param searchText Search text, needs to be filled.
   */
  public async fillSearchBox(searchText: string): Promise<Locator> {
    // Wait to load search dialog.
    await this.waitToLoad();

    // Fill search text box
    const searchTextLocator = this._page.locator(
      SearchDialogSelectors.SearchBox
    );
    expect(async () => {
      const placeholder = await searchTextLocator.getAttribute("placeholder");
      expect(placeholder).toBe("Search docs");
    }).toPass();
    await searchTextLocator.fill(searchText);

    // Wait to load the sarch results.
    await this._page
      .locator(SearchDialogSelectors.SearchResults)
      .first()
      .waitFor();

    return searchTextLocator;
  }

  /**
   * Perform search.
   * @param searchText Search text, needs to perform search
   */
  public async performSearch(searchText: string): Promise<void> {
    // Fill search box.
    const searchTextbox = await this.fillSearchBox(searchText);

    // Perform search.
    await searchTextbox.press("Enter");

    // Validate search dialog is not shown.
    await this._page
      .locator(SearchDialogSelectors.Container)
      .waitFor({ state: "hidden" });
  }
}
