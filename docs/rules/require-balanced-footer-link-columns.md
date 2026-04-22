# require-balanced-footer-link-columns

Require Docusaurus footer link columns to contain the same number of statically known links.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and inspects `themeConfig.footer.links` column objects.

It reports footer link groups when at least two statically known columns exist and their `items` array lengths do not match.

## What this rule reports

This rule reports unbalanced footer link columns such as:

- `5/4/4`
- `3/4/4`
- `1/2/3`

## Why this rule exists

Balanced footer columns are an opinionated layout preference, not a Docusaurus correctness requirement.

Some sites want a symmetrical footer so each column presents the same visual weight and avoids one column looking crowded or sparse relative to the others.

Because that is style-policy rather than universal correctness, this rule only ships in the experimental preset.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Docs",
                    items: [
                        { label: "Intro", to: "/docs/intro" },
                        { label: "Guides", to: "/docs/guides" },
                        { label: "API", to: "/docs/api" },
                        { label: "FAQ", to: "/docs/faq" },
                        { label: "Changelog", to: "/docs/changelog" },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        { label: "GitHub", href: "https://github.com" },
                        { label: "Discord", href: "https://discord.com" },
                        { label: "X", href: "https://x.com" },
                        { label: "Bluesky", href: "https://bsky.app" },
                    ],
                },
                {
                    title: "More",
                    items: [
                        { label: "Blog", to: "/blog" },
                        { label: "Releases", to: "/releases" },
                        { label: "Roadmap", to: "/roadmap" },
                        { label: "Sponsors", to: "/sponsors" },
                    ],
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
        footer: {
            links: [
                {
                    title: "Docs",
                    items: [
                        { label: "Intro", to: "/docs/intro" },
                        { label: "Guides", to: "/docs/guides" },
                        { label: "API", to: "/docs/api" },
                        { label: "FAQ", to: "/docs/faq" },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        { label: "GitHub", href: "https://github.com" },
                        { label: "Discord", href: "https://discord.com" },
                        { label: "X", href: "https://x.com" },
                        { label: "Bluesky", href: "https://bsky.app" },
                    ],
                },
                {
                    title: "More",
                    items: [
                        { label: "Blog", to: "/blog" },
                        { label: "Releases", to: "/releases" },
                        { label: "Roadmap", to: "/roadmap" },
                        { label: "Sponsors", to: "/sponsors" },
                    ],
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule does not autofix.

If any footer column uses dynamic or unresolved `items` arrays, the rule skips reporting instead of guessing at the final link counts.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.experimental];
```

## When not to use it

Do not use this rule if you intentionally allow uneven footer column lengths or populate footer items dynamically.

> **Rule catalog ID:** R119

## Further reading

- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
