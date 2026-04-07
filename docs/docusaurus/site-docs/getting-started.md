---
id: getting-started
title: Getting Started
slug: /getting-started
---

# Getting Started

Install the package:

```bash
npm install --save-dev eslint-plugin-docusaurus-2 typescript
```

Enable a preset:

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## Typed presets

If you want the future type-aware tier from day one, use:

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs["recommended-type-checked"]];
```

That preset enables `projectService: true` automatically.

## Current preset split

- `recommended` enables the stable Docusaurus config and sidebar rules.
- `recommended-type-checked` enables the same rules plus typed parser setup for future type-aware rules.
- `strict`, `all`, and `experimental` also add the stricter page-module and site-source CSS architecture rules.
- `minimal` keeps the runtime/preset contract without enabling bundled rules.

## Current file coverage

The plugin presets now target both JavaScript and TypeScript site source files:

- `**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}`

If you want the current high-signal default, start with `recommended`.
