/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-theme-config-docsearch`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();
const filename = "docs/docusaurus/docusaurus.config.ts";
const adapterPlugin = '    plugins: ["@docsearch/docusaurus-adapter"],';
const classicPreset =
    '    presets: [["classic", { docs: { sidebarPath: "./sidebars.ts" } }]],';
const builtInTheme = '    themes: ["@docusaurus/theme-search-algolia"],';
const algoliaConfig =
    '    themeConfig: { algolia: { appId: "APP", apiKey: "KEY", indexName: "docs" } },';
const docsearchConfig =
    '    themeConfig: { docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" } },';

ruleTester.run(
    "prefer-theme-config-docsearch",
    getPluginRule("prefer-theme-config-docsearch"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    classicPreset,
                    adapterPlugin,
                    algoliaConfig,
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferThemeConfigDocsearch" }],
                filename,
                name: "renames the alias when classic loads the adapter",
                output: [
                    "export default {",
                    classicPreset,
                    adapterPlugin,
                    docsearchConfig,
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const plugins = [["@docsearch/docusaurus-adapter", {}]];',
                    "export default {",
                    "    plugins,",
                    '    themeConfig: { "algolia": { indexName: "docs" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferThemeConfigDocsearch" }],
                filename,
                name: "finds an adapter tuple in a local plugin array",
                output: [
                    'const plugins = [["@docsearch/docusaurus-adapter", {}]];',
                    "export default {",
                    "    plugins,",
                    '    themeConfig: { "docsearch": { indexName: "docs" } },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const algolia = { indexName: "docs" };',
                    "export default {",
                    adapterPlugin,
                    "    themeConfig: { algolia },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferThemeConfigDocsearch" }],
                filename,
                name: "preserves the value of a shorthand config property",
                output: [
                    'const algolia = { indexName: "docs" };',
                    "export default {",
                    adapterPlugin,
                    "    themeConfig: { docsearch: algolia },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    adapterPlugin,
                    '    themeConfig: { docsearch: {}, algolia: { indexName: "docs" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noConflictingThemeConfigSearchKeys" }],
                filename,
                name: "reports both keys for the adapter without choosing a value",
                output: null,
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    title: "My Site",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/",',
                    classicPreset,
                    algoliaConfig,
                    "};",
                ].join("\n"),
                filename,
                name: "preserves the classic preset's built-in Algolia config",
            },
            {
                code: [
                    "export default {",
                    builtInTheme,
                    algoliaConfig,
                    "};",
                ].join("\n"),
                filename,
                name: "preserves a directly configured built-in Algolia theme",
            },
            {
                code: [
                    "export default {",
                    builtInTheme,
                    adapterPlugin,
                    algoliaConfig,
                    "};",
                ].join("\n"),
                filename,
                name: "preserves Algolia when both integrations are explicitly configured",
            },
            {
                code: [
                    "export default {",
                    algoliaConfig,
                    "};",
                ].join("\n"),
                filename,
                name: "leaves search keys alone without a recognized adapter",
            },
            {
                code: [
                    "export default {",
                    classicPreset,
                    "    themeConfig: { docsearch: {}, algolia: {} },",
                    "};",
                ].join("\n"),
                filename,
                name: "does not recommend removing the built-in search key when both keys appear",
            },
            {
                code: [
                    "export default {",
                    adapterPlugin,
                    docsearchConfig,
                    "};",
                ].join("\n"),
                filename,
                name: "accepts the configured adapter's canonical search key",
            },
            {
                code: [
                    "export default {",
                    adapterPlugin,
                    algoliaConfig,
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
                name: "ignores equivalent objects outside a Docusaurus config",
            },
        ],
    }
);
