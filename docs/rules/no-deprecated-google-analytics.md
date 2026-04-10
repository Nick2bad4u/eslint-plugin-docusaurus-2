# no-deprecated-google-analytics

Disallow the deprecated Universal Analytics Docusaurus plugin and classic-preset option.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports deprecated Google Analytics configuration through either of these surfaces:

- `@docusaurus/plugin-google-analytics` in the top-level `plugins` array
- `googleAnalytics` in `@docusaurus/preset-classic` options

The modern replacement is the Google Tag integration surface:

- `@docusaurus/plugin-google-gtag`
- `gtag` in classic-preset options

## What this rule reports

This rule reports deprecated Universal Analytics configuration so Docusaurus sites do not keep shipping a plugin path that the upstream docs mark as useless after the Universal Analytics shutdown.

## Why this rule exists

Docusaurus marks `@docusaurus/plugin-google-analytics` as deprecated and advises sites to migrate to `@docusaurus/plugin-google-gtag` for GA4.

Keeping the old plugin shape around is bad public config hygiene because it:

- teaches new maintainers an obsolete config surface
- makes telemetry migrations harder to review later
- leaves dead or misleading analytics setup in a site config that otherwise looks current

## ❌ Incorrect

```ts
export default {
    plugins: ["@docusaurus/plugin-google-analytics"],
};
```

## ✅ Correct

```ts
export default {
    plugins: ["@docusaurus/plugin-google-gtag"],
};
```

## Behavior and migration notes

This rule provides migration suggestions for the simplest structural rewrites it can prove safely:

- rename `@docusaurus/plugin-google-analytics` to `@docusaurus/plugin-google-gtag`
- rename classic-preset `googleAnalytics` to `gtag`

Those suggestions do **not** attempt to rewrite your tracking IDs.

You still need to review whether the configured IDs and analytics setup are correct for GA4.

## Additional examples

### ❌ Incorrect — deprecated classic-preset option

```ts
export default {
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                googleAnalytics: {
                    trackingID: "UA-141789564-1",
                    anonymizeIP: true,
                },
            },
        ],
    ],
};
```

### ✅ Correct — classic-preset `gtag`

```ts
export default {
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                gtag: {
                    trackingID: "G-999X9XX9XX",
                    anonymizeIP: true,
                },
            },
        ],
    ],
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule only if you are intentionally preserving deprecated analytics config during a short-lived migration and you do not want linting to flag it yet.

> **Rule catalog ID:** R088

## Further reading

- [Docusaurus plugin docs: `@docusaurus/plugin-google-analytics`](https://docusaurus.io/docs/3.8.1/api/plugins/@docusaurus/plugin-google-analytics)
- [Docusaurus plugin docs: `@docusaurus/plugin-google-gtag`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)
