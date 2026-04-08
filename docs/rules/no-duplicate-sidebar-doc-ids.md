# no-duplicate-sidebar-doc-ids

Disallow assigning the same Docusaurus doc id to multiple sidebar doc items in one sidebars file.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and sidebar doc items that use either:

- doc shorthand strings such as `"introduction"`
- explicit doc items such as `{ type: "doc", id: "introduction" }`

## What this rule reports

This rule reports repeated doc ids after their first appearance in the same sidebars file.

It does not report non-sidebar arrays such as metadata arrays or arbitrary string lists.

## Why this rule exists

Docusaurus recommends using `ref` when the same doc needs to appear in multiple sidebars, rather than assigning that doc to multiple sidebars as a `doc` item.

Repeated `doc` assignments are risky because:

- implicit sidebar association becomes ambiguous
- navigation behavior is harder to reason about
- the config drifts away from Docusaurus guidance

## ❌ Incorrect

```ts
const sidebars = {
    docs: ["introduction", "introduction"],
};
```

## ✅ Correct

```ts
const sidebars = {
    docs: [
        "introduction",
        { type: "ref", id: "introduction" },
    ],
};
```

## Behavior and migration notes

This rule reports duplicates and provides **suggestions**, not an autofix.

The suggestion converts the repeated occurrence to `ref`, which matches Docusaurus guidance but still changes navigation semantics enough that it should remain reviewer-visible.

## Additional examples

### ❌ Incorrect — repeated explicit doc item

```ts
const sidebars = {
    docs: [
        { type: "doc", id: "introduction" },
        { type: "doc", id: "introduction" },
    ],
};
```

### ✅ Correct — repeated doc becomes ref

```ts
const sidebars = {
    docs: [
        { type: "doc", id: "introduction" },
        { type: "ref", id: "introduction" },
    ],
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally tolerates repeated `doc` assignments and you do not want linting to push those repeated occurrences toward `ref`.

> **Rule catalog ID:** R013

## Further reading

- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
- [Docusaurus multiple sidebars docs](https://docusaurus.io/docs/sidebar/multiple-sidebars)
