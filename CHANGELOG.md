<!-- markdownlint-disable -->
<!-- eslint-disable markdown/no-missing-label-refs -->
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]


[2fb9a36...755c771](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/compare/2fb9a36694fc74342f4b92ca27b69844868c3a39...755c77153b38f2085dec2e30b6a1d50647acf962)


### ✨ Features

- [`755c771`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/755c77153b38f2085dec2e30b6a1d50647acf962) — ✨ [feat] Add ESLint rules for DocSearch theme configuration

- Introduced `require-docsearch-theme-when-configured` rule to enforce the presence of `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` when DocSearch or Algolia search is configured.

- Implemented `no-search-page-link-when-search-page-disabled` rule to prevent linking to the search page when it is explicitly disabled.

- Enhanced search configuration handling with new utility functions to determine effective search properties.

- Updated existing rules to utilize new search configuration utilities for improved accuracy.
🧪 [test] Add tests for new ESLint rules

- Created tests for `require-docsearch-theme-when-configured` to validate correct behavior when search configurations are present without required packages.

- Added tests for `no-search-page-link-when-search-page-disabled` to ensure links to the search page are not allowed when search support is disabled.
📝 [docs] Update documentation for new ESLint rules

- Documented the purpose and usage of the new ESLint rules in the relevant markdown files.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`d13acb0`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/d13acb06c3d2fdb4ff0ef528b623519f194ca28f) — ✨ [feat] (rules) Introduce additional config options and new rule for Mermaid ELK package


- 🆕 Add support for additional opt-in config keys: `content` and `strict-mdx-upgrade`.

- 📜 Update rule metadata to include `configs` for relevant rules, allowing them to be used with new config options.

- 📝 Implement `require-mermaid-elk-package-installed` rule to enforce the installation of the `@mermaid-js/layout-elk` package when using specific Mermaid layouts.

- 🔧 Refactor README generation to include a new section for opt-in rules, detailing their usage and configuration.

- 🧪 Add tests for the new rule and its behavior in various scenarios, ensuring proper functionality and coverage.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`92ef780`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/92ef780d2c464838ace12a7d222d098eed9d8423) — ✨ [feat] (rules) Introduce strict MDX upgrade rules for Docusaurus 3.10 migration

- Add `no-deprecated-admonition-title-syntax` rule to enforce new admonition title format.

- Implement `no-deprecated-heading-id-syntax` rule to replace deprecated heading ID syntax with comments.

- Create `no-deprecated-html-comments-in-mdx` rule to disallow HTML comments in favor of JSX comments.
✨ [feat] (parser) Add text content parser for Markdown/MDX

- Implement `textContentParser` to parse raw text content for linting.

- Create utility functions for text content analysis and range collection.
🧪 [test] Add tests for new MDX upgrade rules

- Implement rule tests for `no-deprecated-admonition-title-syntax`, `no-deprecated-heading-id-syntax`, and `no-deprecated-html-comments-in-mdx`.

- Create a dedicated RuleTester for raw Markdown/MDX text rules.
📝 [docs] Update plugin configuration to include strict MDX upgrade

- Add `strict-mdx-upgrade` config to enforce new rules on `.mdx` files.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`ee6192b`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/ee6192b18058fe81cb07b755ed5c952b0e46d333) — ✨ [feat] Add new ESLint rules for Docusaurus configuration validation

- Introduced `no-unknown-i18n-locale-configs` to disallow unknown locale configs in `i18n.localeConfigs`.

- Implemented `require-docsearch-ask-ai-assistant-id` to ensure a non-empty Ask AI assistant ID is provided in the configuration.
📝 [docs] Update documentation for new ESLint rules

- Added documentation for `no-unknown-i18n-locale-configs` and `require-docsearch-ask-ai-assistant-id`.

- Updated getting started and overview documents to include new rules.
🧪 [test] Add tests for new ESLint rules

- Created test cases for `no-unknown-i18n-locale-configs` to validate locale configurations.

- Developed test cases for `require-docsearch-ask-ai-assistant-id` to ensure proper validation of Ask AI configurations.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`10cba5d`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/10cba5ddb7ccdec8a00869ce5cd670ba72f47180) — ✨ [feat] Add new ESLint rules for Docusaurus configuration validation

- Introduced `no-deprecated-future-experimental-storage` to enforce migration from deprecated `future.experimental_storage` to `storage`.

- Added `require-docusaurus-faster-package-installed` to ensure `@docusaurus/faster` is declared when using faster flags.

- Implemented `require-rspack-bundler-for-faster-persistent-cache` to mandate `rspackBundler` when `rspackPersistentCache` is enabled.

- Created `require-sidebar-item-key-for-duplicate-labels` to enforce unique keys for sidebar items with duplicate labels.

- Added `require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads` to require a specific flag when using SSG worker threads.
🧪 [test] Add tests for new ESLint rules

- Created tests for `no-deprecated-future-experimental-storage` to validate rule functionality.

- Added tests for `require-docusaurus-faster-package-installed` to ensure correct package installation checks.

- Implemented tests for `require-rspack-bundler-for-faster-persistent-cache` to validate bundler requirements.

- Added tests for `require-sidebar-item-key-for-duplicate-labels` to ensure key enforcement for duplicate labels.

- Created tests for `require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads` to validate flag requirements.
🧹 [chore] Update documentation and test file paths

- Adjusted test file paths for consistency and clarity.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`3a370be`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/3a370be5faad7005bbb13b74efbbc0a73e430635) — ✨ [feat] Add search-related rules for Docusaurus configuration

- Introduced `local-search-will-not-work-in-dev` rule to warn users about unreliable local search during development.

- Added `no-search-link-without-search-provider` rule to prevent linking to the search page when no search provider is configured.

- Implemented `no-search-page-path-conflict` rule to disallow conflicts between configured search page paths and existing route base paths.
📝 [docs] Update documentation for new search rules

- Updated overview and presets documentation to include new search-related rules.

- Enhanced rule matrix to reflect the addition of new rules.
🧪 [test] Add tests for new search rules

- Created test cases for `local-search-will-not-work-in-dev`, `no-search-link-without-search-provider`, and `no-search-page-path-conflict` rules to ensure proper functionality.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`80856eb`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/80856eb41da4dc485eabe7bfff322af63577ad2e) — ✨ [feat] Update preset documentation links and icons

- Refactor `createPresetDocsUrl` to generate local markdown links instead of external URLs.

- Introduce `createPresetIconLink` function to create links for preset icons.

- Update rule rows to use the new icon link format for better readability.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`232f1d9`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/232f1d94789d9113e93677f2d6d7e9af3d9740ce) — ✨ [feat] Implement ESLint rules for Docusaurus configuration

- Introduced `require-head-tag-attributes-when-no-inner-html` rule to enforce meaningful attributes for head tags without innerHTML.

- Added `require-head-tag-content-or-attributes` rule to ensure head tags provide either attributes or non-empty innerHTML.
🧪 [test] Add tests for new ESLint rules

- Created tests for `require-head-tag-attributes-when-no-inner-html` to validate correct behavior.

- Developed tests for `require-head-tag-content-or-attributes` to ensure compliance with the new rule.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`18e1dcc`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/18e1dcc58896dae81d88f2a69548ab3d6bfb05cd) — ✨ [feat] Add navbar validation rules

- Introduce `no-duplicate-navbar-item-labels` rule to prevent duplicate labels in navbar items.

- Implement `validate-navbar-item-position` rule to enforce canonical position values ("left" or "right") for navbar items.

- Add autofix capabilities for both rules to normalize values and suggest corrections.
📝 [docs] Update documentation for new rules

- Document `no-duplicate-navbar-item-labels` and `validate-navbar-item-position` in relevant markdown files.

- Update rule overview and presets to include new rules.
🧪 [test] Add tests for new navbar validation rules

- Create comprehensive test cases for `no-duplicate-navbar-item-labels` to cover various scenarios.

- Implement tests for `validate-navbar-item-position` to ensure correct behavior for valid and invalid position values.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`81d19a4`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/81d19a4d0ab30ace2eda27f779099a8ad35ffdcc) — ✨ [feat] (rules) Add ESLint rule to require `theme-color` meta tag in PWA head

- Introduced `require-plugin-pwa-head-theme-color` rule to enforce the inclusion of a `theme-color` meta tag when using `@docusaurus/plugin-pwa`.

- Validates the `pwaHead` configuration in Docusaurus config files.

- Reports an error if the required meta tag is missing.

📝 [docs] (rules) Update documentation for new and existing rules

- Added documentation for the new `require-plugin-pwa-head-theme-color` rule.

- Updated presets for existing rules to include "config" preset.

🧪 [test] (rules) Add tests for new and existing rules

- Created tests for `require-plugin-pwa-head-theme-color` to ensure correct functionality.

- Added tests for various configurations in the Docusaurus config files to validate rule enforcement.

- Updated existing test files to include checks for the new "config" preset.

🧹 [chore] (tests) Refactor and organize test files

- Created new test files for `require-footer-link-column-items`, `require-footer-link-column-title`, `require-navbar-docs-version-item-to`, and others to ensure comprehensive coverage.

- Improved structure and clarity of test cases for better maintainability.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`a6c9093`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/a6c9093f30e9d8cf139ed7abccc588fa69b43f29) — ✨ [feat] Add new rules for PWA setup and site config fields

- Introduced `require-plugin-pwa-setup` rule to enforce explicit configuration of `@docusaurus/plugin-pwa` in the Docusaurus config.

- Added `require-site-config-fields` rule to mandate explicit top-level site config fields for deployment and validation.

- Updated documentation to include new rules in relevant sections.

- Enhanced sidebars and presets to reflect the addition of new rules.

- Implemented tests for both new rules to ensure proper functionality and coverage.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`f57b36c`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/f57b36cd393ca9e9a91ccb47af74edce28690afc) — ✨ [feat] Add new ESLint rules for Docusaurus configuration

- Introduced `no-mixed-sidebar-link-kinds` to prevent mixing `doc` and `generated-index` link types in sidebar configurations.

- Added `no-redundant-social-card-metadata` to disallow manual `og:image` and `twitter:image` entries when `themeConfig.image` is set.

- Updated rule catalog and presets to include the new rules in `recommended`, `recommended-type-checked`, and `strict` configurations.

- Enhanced tests for both new rules to ensure proper functionality and coverage.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`7dc8463`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/7dc846310ba1a641265078ea2cf8e6830bdca720) — ✨ [feat] Add new linting rules and corresponding tests

- Introduced `no-conflicting-config-link-props` rule to prevent conflicting link properties in Docusaurus config.

- Added `no-duplicate-sidebar-doc-ids` rule to ensure unique sidebar document IDs.

- Implemented `no-svg-social-card-image` rule to disallow SVG images in social card configurations.

- Created `no-use-base-url-for-internal-link-components` rule to enforce the use of absolute paths for internal links.

- Added `prefer-href-for-external-links` rule to encourage the use of `href` for external links instead of `to`.

- Implemented `prefer-to-for-internal-link-components` rule to enforce the use of `to` for internal links.

- Introduced `prefer-use-base-url-for-static-assets` rule to ensure static assets use the base URL.

- Added `require-pages-plugin-excludes` rule to enforce exclusion patterns in pages plugin configuration.

- Updated tests for all new rules to ensure proper functionality and coverage.

- Updated README rules table to reflect new rules and maintain synchronization.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`e6cfea5`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/e6cfea587dbc203a9d2b4de0d69c63ee99ae964b) — ✨ [feat] Add new ESLint rules for Docusaurus plugin

- Introduced `prefer-sidebars-config-satisfies` to enforce the use of `satisfies SidebarsConfig` in sidebar files for better TypeScript validation.

- Added `require-default-export-pages` to ensure Docusaurus page modules default-export a React component.

- Implemented `require-doc-sidebar-link-type` to mandate `type: "doc"` for sidebar category links that use `id`.

- Created tests for the new rules to ensure correct functionality and coverage.

- Updated rule catalog and documentation references to include new rules.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`48d2199`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/48d21996a90b0477bc6e12bcbf255453f5149227) — ✨ [feat] (rules) Introduce new ESLint rules for Docusaurus 2 plugin

- 🎨 Add `no-ignored-site-validations` rule to enforce validation settings

- 🎨 Add `no-page-css-module-imports-in-components` rule to restrict CSS imports

- 🎨 Add `prefer-config-satisfies` rule to encourage using `satisfies` for type checks

- 🎨 Add `prefer-css-modules-in-site-src` rule to enforce CSS module usage

- 🎨 Add `prefer-to-for-internal-links` rule to standardize internal link syntax

- 🎨 Add `require-generated-index-link-type` rule to ensure correct link types in sidebars
🧪 [test] Enhance test coverage for new rules

- 🧪 Add tests for `no-ignored-site-validations` rule

- 🧪 Add tests for `no-page-css-module-imports-in-components` rule

- 🧪 Add tests for `prefer-config-satisfies` rule

- 🧪 Add tests for `prefer-css-modules-in-site-src` rule

- 🧪 Add tests for `prefer-to-for-internal-links` rule

- 🧪 Add tests for `require-generated-index-link-type` rule
📝 [docs] Update README and documentation for new rules

- 📝 Sync rules table in README to include new rules

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 🛡️ Security

- [`36f4ae6`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/36f4ae6dff3303bfd9976e76946afeca681e7e41) — 🔧 [chore] Update dependencies in package.json


- ⬆️ Upgrade @typescript-eslint packages to version 8.58.1 for improved TypeScript support.

- ⬆️ Upgrade @docusaurus/eslint-plugin to version 3.10.0 for better linting capabilities.

- ⬆️ Upgrade @html-eslint packages to version 0.59.0 for enhanced HTML linting.

- ⬆️ Upgrade @secretlint rules to version 11.6.0 for the latest security checks.

- ⬆️ Upgrade @typescript-eslint/eslint-plugin and rule-tester to version 8.58.1 for consistency.

- ⬆️ Upgrade @typpi/eslint-plugin-vite to version 1.0.12 for Vite compatibility.

- ⬆️ Upgrade @vitest packages to version 4.1.3 for improved testing features.

- ⬆️ Upgrade eslint-plugin-copilot to version 1.0.7 for better integration.

- ⬆️ Upgrade eslint-plugin-etc-misc to version 1.0.6 for additional linting rules.

- ⬆️ Upgrade eslint-plugin-immutable-2 to version 1.0.9 for better immutability checks.

- ⬆️ Upgrade postcss to version 8.5.9 for performance improvements.

- ⬆️ Upgrade secretlint to version 11.6.0 for the latest security rules.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 🛠️ Other Changes

- [`2fb9a36`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/2fb9a36694fc74342f4b92ca27b69844868c3a39) — Initial commit



### 🚜 Refactor

- [`fc50ddd`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/fc50ddd0388080b409df0d5ab4ce6165e4c5b76c) — 🚜 [refactor] Clean up preset configuration and type checking logic


- 🧹 Removed `requiresTypeChecking` from preset metadata as it is no longer necessary.

- 🔧 Simplified the logic in `withDocusaurusPlugin` by eliminating the projectService check.

- 🧪 Updated tests to reflect the removal of type checking assertions for presets.

- 📝 Adjusted documentation to remove references to automatic projectService enabling in strict preset.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 📝 Documentation

- [`e948d39`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/e948d3972cce929df86187dd202f555dcbddaeb2) — 📝 [docs] Update README and SonarCloud configuration


- Update README badges to include npm metrics and latest GitHub release.

- Modify SonarCloud exclusions to include .github directory for cleaner analysis.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`f41b2ec`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/f41b2ec89eed71114f1897d3f26d47a2fbc591b0) — 📝 [docs] Update README with installation instructions and usage examples

- Added detailed installation steps for new users

- Included usage examples for key features

- Clarified contribution guidelines for better onboarding

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 🎨 Styling

- [`b11e26e`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/b11e26e243054fa318b8a6e41600e9edcee84252) — 🎨 [style] Improve CSS formatting for heroPanelMark animation

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 🧪 Testing

- [`87df20f`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/87df20f222218240283fb407f80ab6c1befa4dd0) — 🧪 [test] Add rule tests for Docusaurus theme configurations


- ✨ [feat] Implement `no-duplicate-theme-classic-custom-css` rule tests to prevent duplicate custom CSS entries in theme configurations.

- ✨ [feat] Implement `no-empty-theme-classic-custom-css` rule tests to ensure custom CSS is not empty.

- ✨ [feat] Implement `prefer-theme-config-docsearch` rule tests to enforce the use of `docsearch` over `algolia` in theme configurations.

- ✨ [feat] Implement `require-markdown-mermaid-when-theme-mermaid-enabled` rule tests to ensure Mermaid is enabled when the theme is set.

- ✨ [feat] Implement `require-search-provider-package-installed` rule tests to check for required search provider packages.

- ✨ [feat] Implement `require-theme-classic-custom-css-files-exist` rule tests to validate the existence of custom CSS files.

- ✨ [feat] Implement `require-theme-classic-package-installed` rule tests to ensure the classic theme package is installed.

- ✨ [feat] Implement `require-theme-config-docsearch-config` rule tests to validate required keys in the docsearch configuration.

- ✨ [feat] Implement `require-theme-live-codeblock-package-installed` rule tests to check for the live codeblock theme package.

- ✨ [feat] Implement `require-theme-live-codeblock-when-live-codeblock-configured` rule tests to ensure the live codeblock plugin is included when configured.

- ✨ [feat] Implement `require-theme-mermaid-package-installed` rule tests to ensure the mermaid theme package is installed.

- ✨ [feat] Implement `require-theme-mermaid-when-markdown-mermaid-enabled` rule tests to validate Mermaid configuration when enabled.

- ✨ [feat] Implement `require-theme-search-algolia-package-installed` rule tests to check for the search-algolia theme package.

- ✨ [feat] Implement `validate-live-codeblock-playground-position` rule tests to validate playground position settings in live code blocks.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`c005413`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/c0054134c25676b42256944cd3c7161d97a4a4d4) — 🧪 [test] Add comprehensive rule tests for Docusaurus configuration validation

- ✨ [feat] Introduce `no-empty-config-link-destinations` rule tests to ensure link destinations are not empty in navbar items.
- ✨ [feat] Add `no-empty-config-link-labels` rule tests to validate that link labels are not empty in footer links.
- ✨ [feat] Implement `require-config-link-content` rule tests to enforce content presence in config links.
- ✨ [feat] Create `require-config-link-destination` rule tests to ensure link destinations are specified.
- ✨ [feat] Add `require-theme-config-announcement-bar-id` rule tests to validate the presence of an ID in announcement bars.
- ✨ [feat] Introduce `require-theme-config-color-mode-object` rule tests to ensure color mode configuration is properly structured.
- ✨ [feat] Add `validate-theme-config-announcement-bar-is-closeable` rule tests to check the boolean type for closeable property.
- ✨ [feat] Implement `validate-theme-config-color-mode-default-mode` rule tests to ensure default mode is correctly set.
- ✨ [feat] Create `validate-theme-config-color-mode-switch-flags` rule tests to validate flags for color mode switching.
- ✨ [feat] Add `validate-theme-config-footer-style` rule tests to ensure footer style is correctly set.
- ✨ [feat] Implement `validate-theme-config-navbar-style` rule tests to validate navbar style configuration.
- 🧪 [test] Add type assertions for plugin public types to ensure correct type usage in tests.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`7a5f7f0`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/7a5f7f07fe3fb29156969164a0e6b0866844d387) — 🧪 [test] Add rule tests for Docusaurus configuration validation

- ✨ [feat] Implement `no-duplicate-head-tags` rule to prevent duplicate head tags in Docusaurus config.
- 🧪 [test] Add tests for `no-duplicate-head-tags` rule covering various invalid and valid cases.

- ✨ [feat] Implement `no-duplicate-navbar-item-destinations` rule to prevent duplicate navbar item destinations.
- 🧪 [test] Add tests for `no-duplicate-navbar-item-destinations` rule with multiple scenarios.

- ✨ [feat] Implement `no-duplicate-theme-config-metadata-keys` rule to prevent duplicate metadata keys in theme config.
- 🧪 [test] Add tests for `no-duplicate-theme-config-metadata-keys` rule with various cases.

- ✨ [feat] Implement `no-empty-footer-link-columns` rule to prevent empty footer link columns in Docusaurus config.
- 🧪 [test] Add tests for `no-empty-footer-link-columns` rule covering different invalid configurations.

- ✨ [feat] Implement `no-empty-head-tags` rule to prevent empty head tags in Docusaurus config.
- 🧪 [test] Add tests for `no-empty-head-tags` rule with various invalid and valid cases.

- ✨ [feat] Implement `no-empty-theme-config-metadata` rule to prevent empty metadata in theme config.
- 🧪 [test] Add tests for `no-empty-theme-config-metadata` rule with different scenarios.

- ✨ [feat] Implement `prefer-head-tag-attributes-object` rule to enforce using attributes object for head tags.
- 🧪 [test] Add tests for `prefer-head-tag-attributes-object` rule with various invalid and valid cases.

- ✨ [feat] Implement `require-head-tag-tag-name` rule to enforce presence of tagName in head tags.
- 🧪 [test] Add tests for `require-head-tag-tag-name` rule covering multiple invalid configurations.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`f308d95`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/f308d959e3671fa0eec0027d1b88db9bc7bcdec0) — 🧪 [test] Add rule tests for Docusaurus configuration validation

- ✨ [feat] Implement `require-base-url-issue-banner-enabled` rule to enforce `baseUrlIssueBanner` to be true in Docusaurus config.
- ✨ [feat] Implement `require-base-url-slashes` rule to ensure `baseUrl` ends with a slash.
- ✨ [feat] Implement `require-i18n-default-locale-in-locales` rule to require default locale in locales array.
- ✨ [feat] Implement `require-plugin-pwa-debug` rule to enforce PWA debug settings in Docusaurus config.
- ✨ [feat] Implement `require-plugin-pwa-offline-mode-activation-strategies` rule to validate offline mode strategies.
- ✨ [feat] Implement `require-site-url-origin` rule to ensure site URL is valid and uses HTTPS.
- ✨ [feat] Implement `require-trailing-slash-explicit` rule to enforce explicit trailing slash settings in Docusaurus config.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`4c02e99`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/4c02e9956a80ff288662ec84ce7ef90f3020f88d) — 🧪 [test] Add rule tests for Docusaurus configuration validation


- ✨ [feat] Implement `no-conflicting-footer-html-item-props` rule tests to ensure no conflicting properties in footer links.

- ✨ [feat] Add `prefer-href-for-external-link-components` rule tests to enforce href usage for external links.

- ✨ [feat] Introduce `require-navbar-doc-item-doc-id` rule tests to ensure doc items have a docId.

- ✨ [feat] Add `require-navbar-doc-sidebar-item-sidebar-id` rule tests to validate sidebar items have a sidebarId.

- ✨ [feat] Implement `require-navbar-dropdown-items` rule tests to ensure dropdowns contain items.

- ✨ [feat] Add `require-navbar-dropdown-label` rule tests to enforce dropdowns have a label.

- ✨ [feat] Introduce `require-sidebar-category-items` rule tests to ensure sidebar categories contain items.

- ✨ [feat] Add `require-sidebar-category-label` rule tests to enforce categories have a label.

- ✨ [feat] Implement `require-sidebar-category-type` rule tests to ensure categories have a type.

- ✨ [feat] Add `require-theme-config-image` rule tests to ensure theme config includes an image.

- ✨ [feat] Introduce `validate-theme-config-metadata` rule tests to validate metadata structure in theme config.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 🧹 Chores

- [`27d4871`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/27d487101dbbe39d624e2e39862b99b71399c6b0) — 🔥 [remove] (docusaurus-site-contract) Remove docusaurus-site-contract package and related files

- Deleted the manifest.template.json, tsconfig.json, and various script files related to the docusaurus-site-contract package.

- This cleanup removes unused code and files, streamlining the repository.
🚜 [refactor] (local-search) Simplify local-search rule presets

- Updated the local-search-will-not-work-in-dev rule to only include the "experimental" preset, reducing complexity.
🧪 [test] (docs-integrity) Enhance rule documentation integrity checks

- Introduced support for multiple documentation file extensions (.md, .mdx) in the docs-integrity tests.

- Added functions to check for supported rule documentation extensions and resolve rule documentation paths dynamically.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`32cbd53`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/32cbd53da373c304885b7d889fd51842af59fe84) — 🧹 [chore] Remove `recommended-type-checked` preset

- Deleted the `recommended-type-checked.md` documentation file as it is no longer needed.

- Updated references in various files to remove mentions of the `recommended-type-checked` preset.

- Adjusted the rules and configurations to ensure that the removal does not affect existing functionality.

- Updated tests to reflect the absence of the `recommended-type-checked` preset.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`4f583d1`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/4f583d1c21258265ee3a9e02b198ae7e1c7f8197) — 🧹 [chore] Clean up empty code change sections in commit history

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`78c4f78`](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/commit/78c4f78e7f4eada5333d5f79e27b0fbc2124e6df) — 🔥 [delete] Remove obsolete test files for rule metadata and reporting policy

- Deleted `rule-metadata-snapshots.test.ts` to clean up unused snapshot tests.

- Removed `rule-reporting-policy-contract.test.ts` to eliminate redundant contract tests.
⚡️ [build] Update TypeScript configuration for plugin resolution

- Added path mapping for `eslint-plugin-docusaurus-2` in `tsconfig.json`.
🚜 [refactor] Update Vite configuration for new plugin naming

- Changed environment variable for hanging process reporter in `vite.config.ts`.

- Updated Vitest configuration comment to reflect the new plugin name.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>






## Contributors
Thanks to all the [contributors](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/graphs/contributors) for their hard work!
## License
This project is licensed under the [MIT License](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/blob/main/LICENSE)
*This changelog was automatically generated with [git-cliff](https://github.com/orhun/git-cliff).*
