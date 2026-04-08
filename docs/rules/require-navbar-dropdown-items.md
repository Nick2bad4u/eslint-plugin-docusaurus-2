# require-navbar-dropdown-items

Require an `items` array for Docusaurus navbar dropdown items.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on navbar item objects that declare:

- `type: "dropdown"`

It expects those dropdown objects to also declare:

- `items`

When `items` is authored statically, this rule also expects it to be an array.

## What this rule reports

This rule reports two invalid dropdown shapes:

- dropdown objects that omit `items`
- dropdown objects whose static `items` value is not an array

## Why this rule exists

Docusaurus dropdowns are containers for nested navbar items.

When a dropdown omits `items` or uses the wrong static shape, the config becomes misleading and no longer matches the documented dropdown contract.

This rule keeps authored navbar dropdown objects structurally aligned with what Docusaurus expects.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "dropdown",
                    label: "Community",
                },
                {
                    type: "dropdown",
                    label: "Resources",
                    items: "docs",
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

Maintainers still need to decide which nested navbar items belong in the dropdown.

## Additional examples

### ✅ Correct — identifier-backed dropdown items

```ts
const dropdownItems = [{ label: "Docs", to: "/docs/intro" }];

export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "dropdown",
                    label: "Community",
                    items: dropdownItems,
                },
            ],
        },
    },
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally permits incomplete navbar dropdown placeholders and you do not want linting to enforce the documented Docusaurus dropdown schema.

> **Rule catalog ID:** R029

## Further reading

- [Docusaurus theme configuration: navbar dropdown](https://docusaurus.io/docs/api/themes/configuration)
