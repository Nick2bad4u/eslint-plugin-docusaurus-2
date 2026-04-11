/**
 * @packageDocumentation
 * RuleTester coverage for `no-search-page-link-when-search-page-disabled`.
 */

import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-search-page-link-when-search-page-disabled",
    getPluginRule("no-search-page-link-when-search-page-disabled"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", searchPagePath: false },',
                    "        navbar: {",
                    "            items: [",
                    '                { to: "/search", label: "Search" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noSearchPageLinkWhenSearchPageDisabled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs", searchPagePath: false },',
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    items: [{ href: "/search", label: "Search" }],',
                    '                    title: "Docs",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noSearchPageLinkWhenSearchPageDisabled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", searchPagePath: false },',
                    "        navbar: {",
                    "            items: [",
                    '                { to: "/docs", label: "Docs" },',
                    "            ],",
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
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", searchPagePath: "search" },',
                    "        navbar: {",
                    "            items: [",
                    '                { to: "/search", label: "Search" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
