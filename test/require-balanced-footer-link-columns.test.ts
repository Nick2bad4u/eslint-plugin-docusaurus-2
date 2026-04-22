/**
 * @packageDocumentation
 * RuleTester coverage for `require-balanced-footer-link-columns`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-balanced-footer-link-columns",
    getPluginRule("require-balanced-footer-link-columns"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }, { label: "Five", to: "/five" }] },',
                    '                { title: "Community", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }] },',
                    '                { title: "More", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            counts: "5/4/4",
                        },
                        messageId: "requireBalancedFooterLinkColumns",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: [{ label: "One", to: "/one" }] },',
                    '                { title: "Community", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }] },',
                    '                { title: "More", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            counts: "1/2/3",
                        },
                        messageId: "requireBalancedFooterLinkColumns",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const links = [",
                    '    { title: "Docs", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }] },',
                    '    { title: "Community", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }] },',
                    '    { title: "More", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }] },',
                    "];",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            counts: "3/4/4",
                        },
                        messageId: "requireBalancedFooterLinkColumns",
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
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }] },',
                    '                { title: "Community", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }] },',
                    '                { title: "More", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }, { label: "Three", to: "/three" }, { label: "Four", to: "/four" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const links = [",
                    '    { title: "Docs", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }] },',
                    '    { title: "Community", items: [{ label: "One", to: "/one" }, { label: "Two", to: "/two" }] },',
                    "];",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const dynamicItems = getFooterItems();",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: dynamicItems },',
                    '                { title: "Community", items: [{ label: "One", to: "/one" }] },',
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
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: [{ label: "One", to: "/one" }] },',
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
                    "        navbar: {",
                    '            items: [{ label: "Docs", to: "/docs" }],',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { themeConfig: { footer: { links: [] } } };",
                filename: "src/config.ts",
            },
        ],
    }
);
