# no-duplicate-navbar-item-labels

Disallow duplicate static navbar item labels in the same menu array.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects:

- top-level `themeConfig.navbar.items` arrays, and
- dropdown `items` arrays for navbar dropdown item objects.

## What this rule reports

This rule reports repeated static labels in the same navbar menu array (case-insensitive, whitespace-trimmed comparison).

## Why this rule exists

Duplicate navbar labels make navigation ambiguous and reduce discoverability. Keeping labels unique per menu array improves UX clarity and reviewability.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                { label: "Docs", to: "/docs" },
                { label: "Docs", to: "/rules" },
            ],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                { label: "Docs", to: "/docs" },
                { label: "Rules", to: "/rules" },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix, because renaming labels safely requires content intent.

## When not to use it

Do not use this rule if your navbar intentionally repeats labels in the same menu array for branding or localization reasons.

> **Rule catalog ID:** R056

## Further reading

- [Docusaurus navbar items](https://docusaurus.io/docs/api/themes/configuration#navbar-items)
