/*eslint eslint-comments/disable-enable-pair: off */

/* eslint-disable sort-keys */

module.exports = {
  extends: [
    "plugin:playwright/playwright-test",
    "plugin:eslint-comments/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   project: "./packages/playwright-test-runner/tsconfig.json",
  // },

  rules: {
    "@typescript-eslint/explicit-member-accessibility": "off",
    "no-console": "off",
    "playwright/missing-playwright-await": ["error"],
    "require-await": "error",
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: true, minKeys: 2, natural: false },
    ],
  },
  overrides: [
    {
      excludedFiles: "**/*{.d.ts,.js}",
      files: ["**/tests/**/*.ts"],
      rules: {
        // "@typescript-eslint/no-floating-promises": ["error"],
        "playwright/no-element-handle": "error",
        // "no-restricted-syntax": [
        //   "error",
        //   {
        //     message:
        //       "The use of `page.$()` is not allowed. Use `page.locator()` to write a playwright integration test.",
        //     selector:
        //       "CallExpression[callee.name='waitToLoadLeetCodHomegPage']",
        //   },
        // ],
      },
    },
  ],
};
