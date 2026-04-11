/**
 * @packageDocumentation
 * RuleTester coverage for `require-docsearch-theme-when-configured`.
 */

import {
    createRuleTester,
    getPluginRule,
    repoPath,
} from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-docsearch-theme-when-configured",
    getPluginRule("require-docsearch-theme-when-configured"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireDocsearchThemeWhenConfigured" }],
                filename: repoPath(
                    "test",
                    "fixtures",
                    "docsearch-theme-site",
                    "docusaurus.config.ts"
                ),
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireDocsearchThemeWhenConfigured" }],
                filename: repoPath(
                    "test",
                    "fixtures",
                    "docsearch-theme-site",
                    "legacy-algolia-site",
                    "docusaurus.config.ts"
                ),
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
                filename: repoPath(
                    "docs",
                    "docusaurus",
                    "docusaurus.config.ts"
                ),
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    '    themes: ["@docusaurus/theme-search-algolia"],',
                    "};",
                ].join("\n"),
                filename: repoPath(
                    "docs",
                    "docusaurus",
                    "with-theme.config.ts"
                ),
            },
        ],
    }
);
