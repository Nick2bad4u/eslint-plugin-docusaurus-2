# no-html-links

Require the Docusaurus `Link` component instead of intrinsic `<a>` elements for navigation.

## Targeted pattern scope

This rule targets intrinsic JSX `<a>` opening elements. Member expressions and user-defined components are ignored.

## What this rule reports

This rule reports intrinsic anchor elements. Docusaurus `Link` applies the framework's internal-routing and base-URL behavior consistently, while raw anchors bypass that integration.

With `ignoreFullyResolved: true`, the rule permits static absolute URLs with a protocol, including `https:`, `mailto:`, and `tel:` URLs.

## Why this rule exists

Docusaurus `Link` applies the framework's internal-routing and base-URL behavior consistently, while raw anchors bypass that integration.

## ❌ Incorrect

```tsx
export function Navigation() {
 return <a href="/docs/intro">Introduction</a>;
}
```

## ✅ Correct

```tsx
import Link from "@docusaurus/Link";

export function Navigation() {
 return <Link to="/docs/intro">Introduction</Link>;
}
```

## Behavior and migration notes

When an unshadowed default or namespace import from `@docusaurus/Link` is already available, the rule can suggest a complete conversion. The suggestion renames the opening and closing tags and changes `href` to `to`.

The rule does not insert imports. It also withholds the suggestion when `to` or spread attributes make the conversion ambiguous.

### Options

```ts
interface Options {
 ignoreFullyResolved?: boolean;
}
```

The default is `{ ignoreFullyResolved: false }`.

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [
 docusaurus2.configs.recommended,
 {
  rules: {
   "docusaurus-2/no-html-links": ["error", { ignoreFullyResolved: true }],
  },
 },
];
```

## When not to use it

Do not use this rule when a codebase deliberately uses raw anchors for all navigation and does not rely on Docusaurus routing behavior.

> **Rule catalog ID:** R123

## Further reading

- [Docusaurus client API: `Link`](https://docusaurus.io/docs/docusaurus-core#link)
- [Docusaurus routing](https://docusaurus.io/docs/advanced/routing)
