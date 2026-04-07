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
