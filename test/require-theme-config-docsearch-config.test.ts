/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-config-docsearch-config`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-config-docsearch-config",
    getPluginRule("require-theme-config-docsearch-config"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        docsearch: {",
                    '            appId: "APP",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            missingKeys: "`apiKey`, `indexName`",
                            searchConfigKey: "themeConfig.docsearch",
                        },
                        messageId: "requireThemeConfigDocsearchConfig",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        algolia: {",
                    '            appId: "",',
                    "            apiKey: true,",
                    '            indexName: "docs",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            missingKeys: "`appId`, `apiKey`",
                            searchConfigKey: "themeConfig.algolia",
                        },
                        messageId: "requireThemeConfigDocsearchConfig",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    'const appId = process.env["ALGOLIA_APP_ID"];',
                    'const apiKey = process.env["ALGOLIA_API_KEY"];',
                    'const indexName = process.env["ALGOLIA_INDEX_NAME"];',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        docsearch: {",
                    "            appId,",
                    "            apiKey,",
                    "            indexName,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        docsearch: {",
                    '            appId: "APP",',
                    '            apiKey: "KEY",',
                    '            indexName: "docs",',
                    "        },",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
