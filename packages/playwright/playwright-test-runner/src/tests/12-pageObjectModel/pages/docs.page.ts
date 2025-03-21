import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { DocsPageSelectors } from "../selectors/docsPageSelector";

export class DocsPage extends BasePage {
  private _container: Locator;

  public constructor(page: Page) {
    super(page);
    this._container = this.page.locator(DocsPageSelectors.Container);
  }

  /**
   * Wait to load the docs page.
   */
  public async waitToLoad(): Promise<void> {
    // Wait to load base page.
    await super.waitToLoad();

    // Validate docs button is selected in the header.
    expect(async () => {
      const classAttribute = await (
        await (await this.getHeader()).getDocsButton()
      ).getAttribute("class");
      expect(classAttribute).toContain("--active");
    }).toPass();

    // Wait to load doc page.
    await this._container.waitFor();
  }
}
