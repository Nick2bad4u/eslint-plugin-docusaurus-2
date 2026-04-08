# eslint-plugin-docusaurus-2

[![License.](https://flat.badgen.net/github/license/Nick2bad4u/eslint-plugin-docusaurus-2)](./LICENSE)
[![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-docusaurus-2)](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/stargazers)
[![GitHub issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-docusaurus-2)](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/issues)

`eslint-plugin-docusaurus-2` is an ESLint plugin for Docusaurus sites, docs repositories, and TypeDoc-integrated documentation workflows.

The goal is simple: ship a **rock-solid preset surface**, then add **high-quality Docusaurus-specific rules** instead of reusing unrelated rules from a template plugin.

## What this package is for

This repository is being built around Docusaurus-specific concerns such as:

- site configuration and sidebar consistency
- docs-content and generated-content boundaries
- TypeDoc integration hygiene
- patterns around `@docusaurus/*` packages
- maintainable Flat Config presets for documentation-heavy repositories

## Current status

The package has already been re-scaffolded away from the previous template plugin.

Today it ships:

- the public plugin namespace: `"docusaurus-2"`
- documented Flat Config presets
- TypeScript parser setup inside each preset
- typed preset support via `projectService: true`
- `no-conflicting-config-link-props`
- `no-deprecated-on-broken-markdown-links`
- `no-duplicate-sidebar-doc-ids`
- `no-ignored-site-validations`
- `no-page-css-module-imports-in-components`
- `no-svg-social-card-image`
- `no-use-base-url-for-internal-link-components`
- `no-useless-collapsed-sidebar-categories`
- `prefer-config-satisfies`
- `prefer-css-modules-in-site-src`
- `prefer-href-for-external-links`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-link-components`
- `prefer-to-for-internal-links`
- `prefer-use-base-url-for-static-assets`
- `require-default-export-pages`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`
- `require-pages-plugin-excludes`

The rule catalog is intentionally focused while the higher-value Docusaurus rule space is explored.

## Installation

```bash
npm install --save-dev eslint-plugin-docusaurus-2 typescript
```

## Compatibility

- **ESLint:** `9.x` and `10.x`
- **Config system:** Flat Config only
- **Node.js:** repository baseline `>=22`

## Quick start

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## Presets

| Preset                                            | Type-aware | Purpose                                       |
| ------------------------------------------------- | ---------- | --------------------------------------------- |
| `docusaurus2.configs.minimal`                     | No         | Smallest future-ready baseline.               |
| `docusaurus2.configs.recommended`                 | No         | Default starting point for most repositories. |
| `docusaurus2.configs["recommended-type-checked"]` | Yes        | Recommended plus typed parser setup.          |
| `docusaurus2.configs.strict`                      | Yes        | Stricter future tier for mature sites.        |
| `docusaurus2.configs.all`                         | Yes        | Every stable rule once the catalog grows.     |
| `docusaurus2.configs.experimental`                | Yes        | Future experimental rule candidates.          |

## What the presets configure today

Every preset already includes:

- `files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"]`
- `@typescript-eslint/parser`
- `ecmaVersion: "latest"`
- `sourceType: "module"`
- plugin registration under `"docusaurus-2"`

The typed presets also enable `projectService: true` automatically.

For stronger TypeDoc-specific linting around API doc authoring and TypeDoc conventions, pair this plugin with [`eslint-plugin-typedoc`](https://www.npmjs.com/package/eslint-plugin-typedoc).

## Rules

The current rule catalog focuses on Docusaurus config, validation, sidebar, and site-source CSS correctness.

The public preset surface is stable, and the rule catalog is intentionally focused while higher-value Docusaurus rule gaps are explored.

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only
- `Preset key` legend:
  - [🟢](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/minimal) — [`docusaurus2.configs.minimal`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/minimal)
  - [🟡](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended) — [`docusaurus2.configs.recommended`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended)
  - [🟠](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended-type-checked) — [`docusaurus2.configs["recommended-type-checked"]`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended-type-checked)
  - [🔴](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/strict) — [`docusaurus2.configs.strict`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/strict)
  - [🟣](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/all) — [`docusaurus2.configs.all`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/all)
  - [🧪](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/experimental) — [`docusaurus2.configs.experimental`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/experimental)

| Rule                                                                                                                                                              | Fix | Preset key     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | -------------- |
| [`no-conflicting-config-link-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-props)                         |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`no-deprecated-on-broken-markdown-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-on-broken-markdown-links)             |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`no-duplicate-sidebar-doc-ids`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-sidebar-doc-ids)                                 |  💡 | 🔴 🟣 🧪       |
| [`no-ignored-site-validations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-ignored-site-validations)                                   |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`no-page-css-module-imports-in-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-page-css-module-imports-in-components)         |  —  | 🔴 🟣 🧪       |
| [`no-svg-social-card-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-svg-social-card-image)                                         |  —  | 🟡 🟠 🔴 🟣 🧪 |
| [`no-use-base-url-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-use-base-url-for-internal-link-components) |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`no-useless-collapsed-sidebar-categories`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-useless-collapsed-sidebar-categories)           |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-config-satisfies)                                           |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-css-modules-in-site-src`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-css-modules-in-site-src)                             |  —  | 🔴 🟣 🧪       |
| [`prefer-href-for-external-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-links)                             |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-sidebars-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-sidebars-config-satisfies)                         |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-to-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-link-components)             |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-to-for-internal-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-links)                                 |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-use-base-url-for-static-assets`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-use-base-url-for-static-assets)               |  💡 | 🔴 🟣 🧪       |
| [`require-default-export-pages`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-default-export-pages)                                 |  —  | 🔴 🟣 🧪       |
| [`require-doc-sidebar-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-doc-sidebar-link-type)                               |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`require-generated-index-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-generated-index-link-type)                       |  🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`require-pages-plugin-excludes`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-pages-plugin-excludes)                               |  🔧 | 🔴 🟣 🧪       |

## Documentation

- Rules overview: [`docs/rules/overview.md`](./docs/rules/overview.md)
- Getting started: [`docs/rules/getting-started.md`](./docs/rules/getting-started.md)
- Preset reference: [`docs/rules/presets/index.md`](./docs/rules/presets/index.md)
- Docusaurus site app: [`docs/docusaurus/`](./docs/docusaurus/)

## Roadmap direction

The next phase of the plugin is focused on expanding the Docusaurus rule catalog with more high-signal checks. Likely areas include:

- Docusaurus config and route metadata rules
- sidebar and docs-structure validation rules
- TypeDoc-generated API boundary rules
- site-contract and docs-build integration rules

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
