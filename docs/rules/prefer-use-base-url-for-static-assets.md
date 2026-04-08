# prefer-use-base-url-for-static-assets

Prefer `useBaseUrl` for static asset paths in Docusaurus page and component JSX.

## Targeted pattern scope

This rule focuses on Docusaurus page and component source files under:

- `src/pages/**`
- `src/components/**`

It currently checks static JSX attribute values such as:

- `src="/img/..."`
- `poster="/img/..."`

## What this rule reports

This rule reports static asset paths that start from the site root, such as `/img/logo.png`, when they appear directly in JSX for pages/components.

## Why this rule exists

Docusaurus sites often live under a non-root `baseUrl`, especially on GitHub Pages and project-subpath deployments.

The Docusaurus client API docs recommend `useBaseUrl` for baseUrl-aware asset paths. Direct absolute asset strings can be wrong once the site is deployed under a subpath.

## ❌ Incorrect

```tsx
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function HomePage() {
    return <img src="/img/logo.png" alt="Logo" />;
}
```

## ✅ Correct

```tsx
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function HomePage() {
    return <img src={useBaseUrl("/img/logo.png")} alt="Logo" />;
}
```

## Behavior and migration notes

This rule reports every matching asset path.

When the file already imports the default export from `@docusaurus/useBaseUrl`, it also provides a **suggestion** to wrap the asset path with that helper.

When no such import exists yet, it reports only. Adding the import automatically is possible, but it is safer to keep that step reviewer-visible until we need broader import-rewrite machinery again.

## Additional examples

### ✅ Correct — external asset URLs are ignored

```tsx
export default function Hero() {
    return <img src="https://example.com/logo.png" alt="Logo" />;
}
```

### ✅ Correct — imported static asset patterns are fine

```tsx
import logoUrl from "@site/static/img/logo.png";

export default function Hero() {
    return <img src={logoUrl} alt="Logo" />;
}
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally treats root-absolute asset paths as acceptable in JSX and you do not want linting to push those call sites toward baseUrl-aware helpers.

> **Rule catalog ID:** R017

## Further reading

- [Docusaurus client API: `useBaseUrl`](https://docusaurus.io/docs/docusaurus-core#usebaseurl)
- [Docusaurus creating pages guide](https://docusaurus.io/docs/creating-pages)
