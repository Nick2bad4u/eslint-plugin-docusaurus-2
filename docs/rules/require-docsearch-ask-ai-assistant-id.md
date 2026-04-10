# require-docsearch-ask-ai-assistant-id

Require a non-empty Ask AI assistant id when `themeConfig.algolia.askAi` or `themeConfig.docsearch.askAi` is configured.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It validates the Ask AI configuration nested under:

- `themeConfig.algolia.askAi`
- `themeConfig.docsearch.askAi`

## What this rule reports

This rule reports Ask AI config that is present but does not actually provide a usable assistant id.

## Why this rule exists

Docusaurus 3.9 added support for DocSearch v4 Ask AI. The documented config requires an assistant id either:

- as a string value, or
- as `askAi.assistantId` in an object config

If Ask AI is configured without that id, the config is incomplete and misleading.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        algolia: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
            askAi: "",
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        algolia: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
            askAi: "assistant-id",
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix, because it cannot guess the correct Ask AI assistant id for your Algolia account.

## Additional examples

### ✅ Correct — object form with explicit assistant id

```ts
export default {
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
            askAi: {
                assistantId: "assistant-id",
                suggestedQuestions: true,
            },
        },
    },
};
```

## When not to use it

Do not use this rule if your Ask AI config is generated dynamically and you do not want linting to validate its static shape.

> **Rule catalog ID:** R114

## Further reading

- [Docusaurus 3.9 release notes](https://docusaurus.io/blog/releases/3.9)
- [Docusaurus search docs](https://docusaurus.io/docs/search#ask-ai)
