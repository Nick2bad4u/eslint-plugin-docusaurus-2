# no-empty-sidebar-categories

Disallow sidebar category objects whose `items` arrays resolve statically to empty arrays.

## Targeted pattern scope

This rule targets Docusaurus sidebar files such as `sidebars.ts` and inspects sidebar category objects.

## What this rule reports

This rule reports sidebar category objects whose `items` arrays resolve statically to `[]`.

## Why this rule exists

Empty sidebar categories create navigation noise and usually indicate unfinished or copied configuration.

## ❌ Incorrect

```ts
export default {
    docsSidebar: [{ type: "category", label: "Docs", items: [] }],
};
```

## ✅ Correct

```ts
export default {
    docsSidebar: [{ type: "category", label: "Docs", items: ["intro"] }],
};
```

## Behavior and migration notes

This rule autofixes by removing empty sidebar category objects from static sidebar arrays.

## When not to use it

Do not use this rule if your sidebars intentionally include placeholder categories for later runtime population.

> **Rule catalog ID:** R073

## Further reading

- [Docusaurus sidebar item categories](https://docusaurus.io/docs/sidebar/items#category-link)
