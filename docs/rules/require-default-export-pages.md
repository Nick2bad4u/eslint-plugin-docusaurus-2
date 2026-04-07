# require-default-export-pages

Require routable Docusaurus page modules to default-export a React page component.

## Targeted pattern scope

This rule focuses on routable JavaScript and TypeScript page files under `src/pages/**`.

It follows Docusaurus' default routing conventions and ignores the file shapes that Docusaurus already excludes by default, such as:

- files prefixed with `_`
- test files like `*.test.tsx` and `*.spec.jsx`
- files under `__tests__/`

## What this rule reports

This rule reports page modules when:

- they have no default export at all
- they default-export a value that does not look like a React page component

## Why this rule exists

Docusaurus treats JavaScript and TypeScript files under `src/pages/` as routable pages.

The Docusaurus pages guide expects each page module to export a React component.
When a file in `src/pages/` does not do that:

- the route is easy to misread during review
- helper files can accidentally live in the routing tree
- page behavior becomes dependent on implicit build/runtime assumptions instead of an obvious page export

This rule makes that contract explicit.

## ❌ Incorrect

```ts
export const metadata = {
    title: "Support",
};
```

## ✅ Correct

```ts
export default function SupportPage() {
    return null;
}
```

## Behavior and migration notes

This rule reports only. It does not autofix.

The correct fix depends on intent:

- if the file is supposed to be a page, default-export a React component
- if the file is actually a helper, move it out of `src/pages/`
- or rename/prefix it so Docusaurus does not treat it as a routable page

## Additional examples

### ❌ Incorrect — non-component default export

```ts
export default {
    route: "/support",
};
```

### ✅ Correct — ignored helper file under `_` prefix

```ts
export const helper = () => null;
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project relies heavily on custom `plugin-content-pages` exclusion patterns and you do not want linting to enforce the default Docusaurus routing expectations for files under `src/pages/`.

> **Rule catalog ID:** R009

## Further reading

- [Docusaurus creating pages guide](https://docusaurus.io/docs/creating-pages)
- [Docusaurus pages routing conventions](https://docusaurus.io/docs/creating-pages)
