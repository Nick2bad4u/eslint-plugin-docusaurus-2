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

It does **not** ship bundled rules yet.

That is intentional. A clean empty scaffold is better than publishing fake starter rules copied from an unrelated plugin.

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

| Preset | Type-aware | Purpose |
| --- | --- | --- |
| `docusaurus2.configs.minimal` | No | Smallest future-ready baseline. |
| `docusaurus2.configs.recommended` | No | Default starting point for most repositories. |
| `docusaurus2.configs["recommended-type-checked"]` | Yes | Recommended plus typed parser setup. |
| `docusaurus2.configs.strict` | Yes | Stricter future tier for mature sites. |
| `docusaurus2.configs.all` | Yes | Every stable rule once the catalog grows. |
| `docusaurus2.configs.experimental` | Yes | Future experimental rule candidates. |

## What the presets configure today

Every preset already includes:

- `files: ["**/*.{ts,tsx,mts,cts}"]`
- `@typescript-eslint/parser`
- `ecmaVersion: "latest"`
- `sourceType: "module"`
- plugin registration under `"docusaurus-2"`

The typed presets also enable `projectService: true` automatically.

## Rules

The first Docusaurus-specific rules are still in development.

The public preset surface is stable, but the bundled rule catalog is intentionally empty for now.

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

| Rule | Fix | Preset key |
| --- | :-: | --- |
| — | — | — |

## Documentation

- Rules overview: [`docs/rules/overview.md`](./docs/rules/overview.md)
- Getting started: [`docs/rules/getting-started.md`](./docs/rules/getting-started.md)
- Preset reference: [`docs/rules/presets/index.md`](./docs/rules/presets/index.md)
- Docusaurus site app: [`docs/docusaurus/`](./docs/docusaurus/)

## Roadmap direction

The next phase of the plugin is focused on real Docusaurus rules rather than generic placeholder content. Likely areas include:

- Docusaurus config and route metadata rules
- sidebar and docs-structure validation rules
- TypeDoc-generated API boundary rules
- site-contract and docs-build integration rules

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
