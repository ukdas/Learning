import { Page } from "@playwright/test";
import { Header } from "../component/header/header";
import { LeftPane } from "../component/leftPane/leftPane";
import { BasePageSelectors } from "../selectors/basePageSelectors";

export class BasePage {
  public page: Page;
  private _header!: Header;
  private _leftPane!: LeftPane;

  /**
   * Constructor for BasePage class.
   * @param page Page reference.
   */
  public constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get header.
   * @returns Header control.
   */
  public async getHeader(): Promise<Header> {
    if (!this._header) {
      this._header = new Header(this.page);
    }
    await this._header.waitToLoad();
    return this._header;
  }

  /**
   * Get Left pane.
   * @returns Left Pane control.
   */
  public async getLeftPane(): Promise<LeftPane> {
    if (!this._leftPane) {
      this._leftPane = new LeftPane(this.page);
    }
    await this._leftPane.waitToLoad();
    return this._leftPane;
  }

  /**
   * Wait to load the page.
   */
  public async waitToLoad(): Promise<void> {
    await this.page.locator(BasePageSelectors.Container).waitFor();
    await this.getHeader();
  }
}
