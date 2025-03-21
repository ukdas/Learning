import { Locator, Page } from "@playwright/test";
import { BasePageSelectors } from "../../selectors/basePageSelectors";
import { LeftPaneSelectors } from "../../selectors/leftPaneSelector";

export class LeftPane {
  private _page: Page;
  private _container: Locator;

  /**
   * Construct LeftPane class.
   * @param page Page reference.
   */
  public constructor(page: Page) {
    this._page = page;
    this._container = this._page.locator(LeftPaneSelectors.Container);
  }

  /**
   * Wait to load the header container.
   */
  public async waitToLoad(): Promise<void> {
    await this._container.waitFor();
  }

  /**
   * Get menu item.
   * @param menuItemName Menu item name from the left panel.
   * @returns Menu item's locator.
   */
  public async getMenuItem(menuItemName: string): Promise<Locator> {
    // Wai to load container.
    await this.waitToLoad();

    // Get required menu item.
    const menuItem = this._container.getByText(menuItemName).first();
    return menuItem;
  }

  /**
   * Click on menu item in the left panel.
   * @param menuItemName Menu item name from the left panel.
   * @returns Main container locator.
   */
  public async clickOnMenuItem(menuItemName: string): Promise<Locator> {
    // Click on menu item.
    await (await this.getMenuItem(menuItemName)).click();

    // Wait to load the main container.
    const mainContainer = this._page.locator(BasePageSelectors.MainContainer);
    await mainContainer.waitFor();

    // Validate main container is loaded with required menu item details.
    await mainContainer.getByText(menuItemName).first().waitFor();

    return mainContainer;
  }
}
