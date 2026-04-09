# require-plugin-pwa-offline-mode-activation-strategies

Require `@docusaurus/plugin-pwa` to configure explicit `offlineModeActivationStrategies` coverage.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files when `@docusaurus/plugin-pwa` is configured in the top-level `plugins` array with object options.

It validates `offlineModeActivationStrategies` in the plugin options object.

## What this rule reports

This rule reports plugin-pwa option objects that:

- omit `offlineModeActivationStrategies`, or
- provide an array that is missing one or more required strategies.

By default, required strategies are:

- `"appInstalled"`
- `"standalone"`
- `"queryString"`

## Why this rule exists

PWA behavior changes across installation and runtime contexts. Explicit strategy coverage helps keep behavior consistent across:

- installed app mode,
- standalone mode, and
- explicit query-string activation/testing.

## ❌ Incorrect

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
                offlineModeActivationStrategies: ["queryString"],
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
                offlineModeActivationStrategies: [
                    "appInstalled",
                    "standalone",
                    "queryString",
                ],
            },
        ],
    ],
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

If `offlineModeActivationStrategies` is dynamic and cannot be statically resolved to a string array, the rule does not report to avoid unsafe assumptions.

### Rule options

```ts
type Options = [
    {
        requiredStrategies?: string[];
    }?,
];
```

- `requiredStrategies`
  - Type: `string[]`
  - Default: `["appInstalled", "standalone", "queryString"]`

## When not to use it

Do not use this rule if your project intentionally uses a different offline-mode activation model and does not want lint enforcement for strategy coverage.

> **Rule catalog ID:** R047

## Further reading

- [Docusaurus plugin-pwa configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa)
