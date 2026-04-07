# prefer-css-modules-in-site-src

Prefer CSS modules over global stylesheet imports in Docusaurus component and page source files.

## Targeted pattern scope

This rule focuses on Docusaurus site source files under:

- `src/components/**`
- `src/pages/**`

It reports stylesheet imports such as `.css`, `.scss`, or `.sass` when they are not CSS-module imports.

## What this rule reports

This rule reports global stylesheet imports inside Docusaurus component and page modules.

Examples include:

- `import "./Hero.css";`
- `import "@site/src/css/custom.css";`

## Why this rule exists

Docusaurus distinguishes between site-wide global styles and component-scoped styles.

The Docusaurus styling docs recommend:

- loading truly global site styles through `theme.customCss` or client modules
- using CSS modules for component/page-local styling

Importing global styles directly into page and component source files makes style scope harder to reason about and can create hidden cross-page coupling.

## ❌ Incorrect

```ts
import "./Hero.css";

export default function Hero() {
    return null;
}
```

## ✅ Correct

```ts
import styles from "./Hero.module.css";

export default function Hero() {
    return <section className={styles.hero}>Hero</section>;
}
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Converting a global stylesheet import into a CSS-module workflow usually requires coordinated changes:

- rename the stylesheet file to `*.module.css` (or `*.module.scss` / `*.module.sass`)
- switch call sites from string class names to `styles.className`
- or move the stylesheet to global loading through `theme.customCss` or a client module if it really is site-wide

## Additional examples

### ❌ Incorrect — importing global custom CSS from a page module

```ts
import "@site/src/css/custom.css";

export default function HomePage() {
    return null;
}
```

### ✅ Correct — keep global CSS in Docusaurus config

```ts
const config = {
    presets: [
        [
            "classic",
            {
                theme: {
                    customCss: "./src/css/custom.css",
                },
            },
        ],
    ],
};

export default config;
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally relies on global stylesheet imports inside page or component modules and that styling model is working for your team.

> **Rule catalog ID:** R006

## Further reading

- [Docusaurus styling and layout guide](https://docusaurus.io/docs/styling-layout)
- [Docusaurus config API: `theme.customCss`](https://docusaurus.io/docs/api/docusaurus-config)
