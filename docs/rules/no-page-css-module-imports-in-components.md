# no-page-css-module-imports-in-components

Disallow importing page-scoped CSS modules from reusable Docusaurus components.

## Targeted pattern scope

This rule focuses on Docusaurus site component files under `src/components/**`.

It reports CSS module imports that point into `src/pages/**`, including both relative imports and `@site/...` imports.

## What this rule reports

This rule reports reusable component modules that import page-level CSS modules such as:

- `../pages/index.module.css`
- `@site/src/pages/landing.module.scss`

## Why this rule exists

Docusaurus page files and reusable component files serve different roles.

When a component imports a page CSS module:

- the component becomes tightly coupled to one page implementation detail
- styles that look reusable are actually anchored to page-specific layout code
- moving or reusing the component becomes harder
- the site structure becomes less intuitive for contributors

Reusable components should usually own their own CSS module or depend on an intentionally shared styles module instead of reaching into `src/pages/**`.

## ❌ Incorrect

```ts
import styles from "../pages/index.module.css";

export default function GitHubStats() {
    return <div className={styles.heroLiveBadges}>Stats</div>;
}
```

## ✅ Correct

```ts
import styles from "./GitHubStats.module.css";

export default function GitHubStats() {
    return <div className={styles.liveBadgeList}>Stats</div>;
}
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Moving styles out of a page stylesheet usually requires a human decision:

- create a new component-local `*.module.css` file
- move shared styles into a dedicated shared module
- or move the component closer to the page if it is not actually reusable

## Additional examples

### ✅ Correct — shared styles live outside `pages/`

```ts
import styles from "../styles/sharedBadges.module.css";

export default function GitHubStats() {
    return <div className={styles.badgeList}>Stats</div>;
}
```

### ✅ Correct — page files may use their own page module

```ts
import styles from "./index.module.css";

export default function HomePage() {
    return <main className={styles.heroBanner}>Home</main>;
}
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally treats a component under `src/components/**` as page-local implementation and you are comfortable with that coupling.

In that case, it can be cleaner to move that component into the page folder instead of disabling the rule broadly.

> **Rule catalog ID:** R004

## Further reading

- [Docusaurus styling and layout guide](https://docusaurus.io/docs/styling-layout)
- [Docusaurus design principles: layered architecture](https://docusaurus.io/docs)
