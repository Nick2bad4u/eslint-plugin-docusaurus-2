# require-navbar-dropdown-label

Require a non-empty `label` for Docusaurus navbar dropdown items.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on navbar item objects that declare:

- `type: "dropdown"`

It expects those dropdown objects to also declare:

- `label`

## What this rule reports

This rule reports navbar dropdown items that omit `label` or resolve it to an empty static string.

## Why this rule exists

Docusaurus navbar dropdowns are named navigation groups.

Without a label, a dropdown has no meaningful visible trigger text and the config drifts away from the documented dropdown schema.

Keeping dropdown labels explicit makes navbar intent easier to review and keeps configuration aligned with the documented Docusaurus contract.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "dropdown",
                    items: [{ label: "Docs", to: "/docs/intro" }],
                },
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
                {
                    type: "dropdown",
                    label: "Community",
                    items: [{ label: "Docs", to: "/docs/intro" }],
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing the right dropdown label is a navigation and content decision, not a safe automatic rewrite.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally permits unlabeled navbar dropdowns and you do not want linting to enforce the documented Docusaurus dropdown schema.

> **Rule catalog ID:** R028

## Further reading

- [Docusaurus theme configuration: navbar items](https://docusaurus.io/docs/api/themes/configuration)
