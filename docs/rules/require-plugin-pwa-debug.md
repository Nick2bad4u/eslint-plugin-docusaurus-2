# require-plugin-pwa-debug

Require `@docusaurus/plugin-pwa` object options to define `debug` as `true` or as an env-gated expression.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files when `@docusaurus/plugin-pwa` is configured in the top-level `plugins` array with object options.

It checks the plugin options object and validates the `debug` property.

## What this rule reports

This rule reports plugin-pwa option objects that:

- omit `debug`, or
- set `debug` to a value other than:
  - `true`, or
  - an allowed env comparison such as `process.env["DOCUSAURUS_PWA_DEBUG"] === "true"`.

## Why this rule exists

PWA debug behavior is often needed during rollout and troubleshooting. Making debug behavior explicit avoids accidental silent defaults and makes intent visible during review.

Using an env-gated expression keeps the toggle controllable per environment without editing source.

## ❌ Incorrect

```ts
export default {
    plugins: [
        [
            "@docusaurus/plugin-pwa",
            {
                pwaHead: [],
            },
        ],
    ],
};
```

```ts
export default {
    plugins: [
        [
            "@docusaurus/plugin-pwa",
            {
                debug: false,
            },
        ],
    ],
};
```

## ✅ Correct

```ts
export default {
    plugins: [
        [
            "@docusaurus/plugin-pwa",
            {
                debug: true,
            },
        ],
    ],
};
```

```ts
export default {
    plugins: [
        [
            "@docusaurus/plugin-pwa",
            {
                debug: process.env["DOCUSAURUS_PWA_DEBUG"] === "true",
            },
        ],
    ],
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

If plugin options are dynamic and cannot be statically resolved to an object literal, the rule does not report to avoid unsafe assumptions.

### Rule options

```ts
type Options = [
        {
                allowBooleanLiteralTrue?: boolean;
                allowedEnvVarNames?: string[];
        }?,
];
```

- `allowBooleanLiteralTrue`
  - Type: `boolean`
  - Default: `true`
  - When `true`, `debug: true` is accepted.
- `allowedEnvVarNames`
  - Type: `string[]`
  - Default: `["DOCUSAURUS_PWA_DEBUG"]`
  - Controls which env vars are accepted in comparisons to `"true"`.

## When not to use it

Do not use this rule if your project intentionally leaves plugin-pwa debug behavior implicit.

> **Rule catalog ID:** R046

## Further reading

- [Docusaurus plugin-pwa configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa)
