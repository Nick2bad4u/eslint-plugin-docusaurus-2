# no-use-base-url-for-internal-link-components

Disallow wrapping internal `@docusaurus/Link` destinations with `useBaseUrl(...)`.

## Targeted pattern scope

This rule focuses on JSX/TSX files that import:

- the default export from `@docusaurus/Link`
- the default export from `@docusaurus/useBaseUrl`

It targets internal `Link` destinations such as:

- `to={useBaseUrl("/docs/intro")}`
- `href={useBaseUrl("/docs/rules/overview")}`

## What this rule reports

This rule reports internal `@docusaurus/Link` destinations that are unnecessarily wrapped with `useBaseUrl(...)`.

## Why this rule exists

The Docusaurus client API docs explicitly warn against using `useBaseUrl` for regular links.

For internal `@docusaurus/Link` destinations, Docusaurus already handles baseUrl logic for you. Keeping the wrapper around those routes:

- adds unnecessary indirection
- makes internal routing code noisier
- can hide the fact that `Link` already knows how to resolve site-relative routes

## ❌ Incorrect

```tsx
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function HomePage() {
    return <Link to={useBaseUrl("/docs/intro")}>Docs</Link>;
}
```

## ✅ Correct

```tsx
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function HomePage() {
    return <Link to="/docs/intro">Docs</Link>;
}
```

## Behavior and migration notes

This rule provides an autofix for the simple internal-route cases it can prove.

It can also normalize this common mistake:

- `href={useBaseUrl("/docs/...")}` → `to="/docs/..."`

## Additional examples

### ❌ Incorrect — internal route on `href`

```tsx
import DocsLink from "@docusaurus/Link";
import baseUrlFor from "@docusaurus/useBaseUrl";

export default function Hero() {
    return <DocsLink href={baseUrlFor("/docs/rules/overview")}>Rules</DocsLink>;
}
```

### ✅ Correct — external URLs are ignored

```tsx
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Hero() {
    return <Link href={useBaseUrl("https://example.com/logo.png")}>External</Link>;
}
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally keeps `useBaseUrl(...)` wrappers on internal `@docusaurus/Link` destinations and you do not want linting to normalize them away.

> **Rule catalog ID:** R019

## Further reading

- [Docusaurus client API: `<Link />`](https://docusaurus.io/docs/docusaurus-core#link)
- [Docusaurus client API: `useBaseUrl`](https://docusaurus.io/docs/docusaurus-core#usebaseurl)
