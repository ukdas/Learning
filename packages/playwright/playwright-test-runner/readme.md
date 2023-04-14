[[_TOC_]]

# Summary

Playwright Test Runner Functionalities Validations

## Getting Started

### Used tools for Playwright Integration Tests

- [@playwright/test](https://playwright.dev/docs/api/class-test) - Playwright Test provides a test function to declare tests and expect function to write assertions.

### NPM Commands for building the library

Change the directory on command prompt to `packages/playwright-test-runner`.

1. Install the required npm package dependencies:

```
rush update
```

2. Build the packages:

```
rush build
```

4. Publish the package:

```
rush publish
```

### Execute Playwright Tests

Once you update your tests, you can start running tests from the VS code terminal (Where environment config variables values are configured)-

```text
// Using Playwright Test Runner command
npx playwright test
```

#### Execute For Single Test File

Use the file name to run only the tests available on that mentioned file.

```text
// Execute test tests.
npx playwright test grid.test.ts
```

#### Execute For Single Test Case

Use the [grep (-g)](https://playwright.dev/docs/api/class-testconfig#test-config-grep) command to run only single test. Filter to only run tests with a title matching one of the patterns.
