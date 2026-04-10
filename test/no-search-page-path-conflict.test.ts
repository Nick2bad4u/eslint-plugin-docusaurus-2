/**
 * @packageDocumentation
 * RuleTester coverage for `no-search-page-path-conflict`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-search-page-path-conflict",
    getPluginRule("no-search-page-path-conflict"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    presets: [[",
                    '        "classic",',
                    "        {",
                    '            docs: { routeBasePath: "docs" },',
                    "        },",
                    "    ]],",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", searchPagePath: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            owner: "classic preset docs",
                            searchPagePath: "`docs`",
                        },
                        messageId: "noSearchPagePathConflict",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    plugins: [["@docusaurus/plugin-content-docs", { routeBasePath: "search" }]],',
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            owner: "plugin-content-docs #1",
                            searchPagePath: "`search`",
                        },
                        messageId: "noSearchPagePathConflict",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    presets: [[",
                    '        "classic",',
                    "        {",
                    '            docs: { routeBasePath: "docs" },',
                    "        },",
                    "    ]],",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", searchPagePath: "search" },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", searchPagePath: false },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
