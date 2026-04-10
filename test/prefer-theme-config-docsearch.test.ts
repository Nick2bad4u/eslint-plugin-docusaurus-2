/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-theme-config-docsearch`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-theme-config-docsearch",
    getPluginRule("prefer-theme-config-docsearch"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        algolia: {",
                    '            appId: "APP",',
                    '            apiKey: "KEY",',
                    '            indexName: "docs",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferThemeConfigDocsearch" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        docsearch: {",
                    '            appId: "APP",',
                    '            apiKey: "KEY",',
                    '            indexName: "docs",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        "algolia": {',
                    '            appId: "APP",',
                    '            apiKey: "KEY",',
                    '            indexName: "docs",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferThemeConfigDocsearch" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    '        "docsearch": {',
                    '            appId: "APP",',
                    '            apiKey: "KEY",',
                    '            indexName: "docs",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noConflictingThemeConfigSearchKeys" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
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
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
