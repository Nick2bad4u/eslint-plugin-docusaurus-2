/**
 * @packageDocumentation
 * RuleTester coverage for `no-search-link-without-search-provider`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-search-link-without-search-provider",
    getPluginRule("no-search-link-without-search-provider"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "Search", to: "/search" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noSearchLinkWithoutSearchProvider" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    items: [{ label: "Search", href: "/search" }],',
                    '                    title: "Resources",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noSearchLinkWithoutSearchProvider" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@easyops-cn/docusaurus-search-local"],',
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "Search", to: "/search" },',
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
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "        navbar: {",
                    "            items: [",
                    '                { label: "Search", to: "/search" },',
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
