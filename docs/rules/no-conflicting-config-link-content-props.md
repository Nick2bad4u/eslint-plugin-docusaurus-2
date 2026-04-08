# no-conflicting-config-link-content-props

Disallow Docusaurus theme-config link items from declaring both `label` and `html`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on default link items authored inside:

- `themeConfig.navbar.items`
- `themeConfig.footer.links`
- nested dropdown/footer link arrays that contain the same default link shape

It reports link items that declare both:

- `label`
- `html`

## What this rule reports

This rule reports Docusaurus theme-config link items that mix text-label content with raw HTML content in the same object.

## Why this rule exists

Docusaurus link items have two competing visible-content shapes:

- `label` for normal text content
- `html` for raw HTML content

Mixing both in the same item makes the config harder to reason about and drifts away from the documented Docusaurus navigation shape.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    label: "Docs",
                    html: "<strong>Docs</strong>",
                    to: "/docs/intro",
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
                    label: "Docs",
                    to: "/docs/intro",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing whether an item should use plain text or HTML is a deliberate authoring decision.

## When not to use it

Do not use this rule if your project intentionally permits mixed `label` and `html` link content and you do not want linting to enforce the documented Docusaurus content shape.

> **Rule catalog ID:** R032

## Further reading

- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
