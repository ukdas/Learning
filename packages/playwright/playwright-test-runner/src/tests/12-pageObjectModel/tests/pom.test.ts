import { test } from "../utils/pomTest";

test("POM Test", async ({ homePage }) => {
  // Click on get started button to open docs page.
  const docsPage = await homePage.getStarted();

  // Click on `Writing Tests` from the left side panel.
  const leftPane = await docsPage.getLeftPane();
  await leftPane.clickOnMenuItem("Writing Tests");

  // Click on `Running Tests`.
  await leftPane.clickOnMenuItem("Running Tests");

  // Click on `Test Generator`.
  await leftPane.clickOnMenuItem("Test Generator");

  // Click on API button in the header.
  const header = await docsPage.getHeader();
  await (await header.getAPIsButton()).click();

  // Click on docs button.
  await (await header.getDocsButton()).click();
  await docsPage.waitToLoad();

  // Perform search.
  const searchDialog = await header.openSearchDialog();
  await searchDialog.performSearch("Timeouts");
});
