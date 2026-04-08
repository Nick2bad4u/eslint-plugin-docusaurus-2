# prefer-to-for-internal-link-components

Prefer `to` over `href` for internal `@docusaurus/Link` component destinations.

## Targeted pattern scope

This rule focuses on JSX/TSX files that import the default export from `@docusaurus/Link`.

It targets component usages such as:

- `<Link href="/docs/intro">`
- `<DocsLink href="/docs/rules/overview">`

when the destination is a static internal absolute route.

## What this rule reports

This rule reports `@docusaurus/Link` components that use `href` for internal site routes.

## Why this rule exists

The Docusaurus client API explicitly recommends `Link` for internal navigation.

For internal site routes, `to` is the right prop because it keeps Docusaurus client-side routing, preloading, and base URL behavior aligned with the framework’s intended navigation model.

## ❌ Incorrect

```tsx
import Link from "@docusaurus/Link";

export default function HomePage() {
    return <Link href="/docs/intro">Docs</Link>;
}
```

## ✅ Correct

```tsx
import Link from "@docusaurus/Link";

export default function HomePage() {
    return <Link to="/docs/intro">Docs</Link>;
}
```

## Behavior and migration notes

This rule provides an autofix that renames the internal-navigation prop from `href` to the routing prop used by `@docusaurus/Link`.

The rule only acts when:

- the component comes from `@docusaurus/Link`
- the route is a static internal absolute path
- there is not already a `to` prop on the same JSX element

## Additional examples

### ❌ Incorrect — aliased import

```tsx
import DocsLink from "@docusaurus/Link";

export default function Hero() {
    return <DocsLink href="/docs/rules/overview">Rules</DocsLink>;
}
```

### ✅ Correct — external Link usage is left alone

```tsx
import Link from "@docusaurus/Link";

export default function GitHubLink() {
    return <Link href="https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2">GitHub</Link>;
}
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally treats `href` as an acceptable prop for internal `@docusaurus/Link` usage and you do not want linting to normalize that distinction.

> **Rule catalog ID:** R015

## Further reading

- [Docusaurus client API: `<Link />`](https://docusaurus.io/docs/docusaurus-core#link)
- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
