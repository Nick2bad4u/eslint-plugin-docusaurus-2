/**
 * @packageDocumentation
 * RuleTester coverage for `no-conflicting-search-providers`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-conflicting-search-providers",
    getPluginRule("no-conflicting-search-providers"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@easyops-cn/docusaurus-search-local"],',
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noConflictingSearchProviders" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@cmfcmf/docusaurus-search-local",',
                    "            { indexDocs: true },",
                    "        ],",
                    "    ],",
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noConflictingSearchProviders" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    plugins: ["@easyops-cn/docusaurus-search-local"],',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    plugins: ["@easyops-cn/docusaurus-search-local"],',
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
