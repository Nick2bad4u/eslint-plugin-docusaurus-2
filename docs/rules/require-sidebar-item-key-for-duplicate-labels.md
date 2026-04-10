# require-sidebar-item-key-for-duplicate-labels

Require explicit sidebar item `key` values when duplicate static labels appear in the same sidebar items array.

## Targeted pattern scope

This rule focuses on Docusaurus sidebar files such as `sidebars.ts` and `sidebars.js`.

It inspects sidebar items arrays and reports duplicate static `label` values when one or more of the duplicate entries omit an explicit `key`.

## What this rule reports

This rule reports duplicate sidebar labels without explicit `key` values because they can create translation key conflicts in newer Docusaurus versions.

## Why this rule exists

Docusaurus 3.9 added support for an explicit sidebar item `key` field so projects can disambiguate duplicate labels for translation purposes.

If two sidebar items in the same items array reuse the same label, explicit keys keep the translation surface stable and unambiguous.

## ❌ Incorrect

```ts
export default {
    sidebar: [
        {
            type: "category",
            label: "API",
            items: ["intro"],
        },
        {
            type: "category",
            label: "API",
            items: ["reference"],
        },
    ],
};
```

## ✅ Correct

```ts
export default {
    sidebar: [
        {
            type: "category",
            label: "API",
            key: "api-feature-1",
            items: ["intro"],
        },
        {
            type: "category",
            label: "API",
            key: "api-feature-2",
            items: ["reference"],
        },
    ],
};
```

## Behavior and migration notes

This rule reports only. It does not autofix, because inventing stable translation keys automatically would be speculative.

## When not to use it

Do not use this rule if your sidebar labels are unique within each items array or if your project does not want linting guidance around translation-key disambiguation.

> **Rule catalog ID:** R112

## Further reading

- [Docusaurus 3.9 release notes](https://docusaurus.io/blog/releases/3.9)
- [Docusaurus sidebars docs](https://docusaurus.io/docs/sidebar)
