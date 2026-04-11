# config-surfaces

Understand the three public rollout layers exposed by `eslint-plugin-docusaurus-2`.

## Preset ladder

The six presets are the default rollout ladder for JavaScript and TypeScript source files:

- `docusaurus2.configs.minimal`
- `docusaurus2.configs.config`
- `docusaurus2.configs.recommended`
- `docusaurus2.configs.strict`
- `docusaurus2.configs.all`
- `docusaurus2.configs.experimental`

Use these when you want Docusaurus config, theme, sidebar, routing, and package-ownership rules on the normal source-code surface.

## Opt-in content configs

The plugin also exports content-aware configs outside the preset ladder.

### 📝 `docusaurus2.configs.content`

Use this when you want rules that inspect Markdown or MDX content directly.

Current examples include:

- MDX migration rules
- Mermaid content and package checks

### 🧭 `docusaurus2.configs["strict-mdx-upgrade"]`

Use this narrower config when you only want the Docusaurus 3.10 strict-MDX migration rules for `.mdx` files.

The earlier 3.8 and 3.9 release-upgrade rules are config-level rules, so they stay in the normal preset ladder instead of this MDX-only config.

## Direct rule opt-ins

Some rules are intentionally outside both the preset ladder and the content-config layer.

These are rules you enable one-by-one in your own config because they are advisory, noisy, or too situational for bundled rollout.

## How to read the generated rule tables

- The main preset matrix shows rules that belong to one or more of the six preset tiers.
- The generated **Opt-in rules** table shows rules outside that preset ladder.
- In that opt-in table:
  - a config surface such as `docusaurus2.configs.content` means the rule is available through an opt-in config
  - `direct rule opt-in only` means you enable the rule explicitly in `rules`

## Example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [
    docusaurus2.configs.recommended,
    docusaurus2.configs.content,
    {
        rules: {
            "docusaurus-2/local-search-will-not-work-in-dev": "warn",
        },
    },
];
```

## Where to look next

- Read [Getting Started](../getting-started.md) for rollout guidance.
- Read [Presets](../presets/index.md) for the generated preset matrix and opt-in rules table.
