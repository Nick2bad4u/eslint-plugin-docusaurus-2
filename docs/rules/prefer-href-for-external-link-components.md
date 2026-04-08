# prefer-href-for-external-link-components

Prefer `href` over `to` for external `@docusaurus/Link` component destinations.

## Targeted pattern scope

This rule focuses on JSX and TSX files that import the default export from `@docusaurus/Link`.

It targets component usages such as:

- `<Link to="https://example.com">`
- `<DocsLink to={"mailto:hello@example.com"}>`

when the destination is a static external URL.

## What this rule reports

This rule reports `@docusaurus/Link` components that use `to` for external destinations.

## Why this rule exists

Docusaurus uses `@docusaurus/Link` for both internal and external navigation, but the prop names still communicate intent.

For internal routes, `to` is the right prop because it keeps client-side routing and base URL handling aligned with the framework.

For external destinations, `href` is clearer because the navigation leaves the site routing model.

Using `href` for external targets makes reviews easier and keeps Link usage consistent with the documented Docusaurus navigation semantics.

## ❌ Incorrect

```tsx
import Link from "@docusaurus/Link";

export default function GitHubLink() {
    return <Link to="https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2">GitHub</Link>;
}
```

## ✅ Correct

```tsx
import Link from "@docusaurus/Link";

export default function GitHubLink() {
    return <Link href="https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2">GitHub</Link>;
}
```

## Behavior and migration notes

This rule provides an autofix that replaces the external-link prop name `to` with `href`.

The rule only acts when:

- the component comes from `@docusaurus/Link`
- the destination is a static external URL
- there is not already an `href` prop on the same JSX element

Dynamic expressions are intentionally ignored to keep reporting accurate.

## Additional examples

### ❌ Incorrect — aliased default import

```tsx
import DocsLink from "@docusaurus/Link";

export default function ContactLink() {
    return <DocsLink to={"mailto:hello@example.com"}>Email</DocsLink>;
}
```

### ✅ Correct — internal routes still use `to`

```tsx
import Link from "@docusaurus/Link";

export default function HomePage() {
    return <Link to="/docs/intro">Docs</Link>;
}
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally allows `to` for external `@docusaurus/Link` destinations and you do not want linting to normalize that distinction.

> **Rule catalog ID:** R022

## Further reading

- [Docusaurus client API: `<Link />`](https://docusaurus.io/docs/docusaurus-core#link)
- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
