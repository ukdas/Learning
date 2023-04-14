import { test } from "./advanceFixtureTest";

test.describe("Custom Fixture", () => {
  test("Create a custom fixture", async ({
    page,
    defaultItem,
    userItem,
  }, workerInfo) => {
    console.log(`Test Worker Info - ${workerInfo.workerIndex}`);
    console.log(`Test Default Item - ${defaultItem}`);
    console.log(`Test User Item - ${userItem}`);
  });
});
