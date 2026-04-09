/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-footer-link-item-destinations`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-footer-link-item-destinations",
    getPluginRule("no-duplicate-footer-link-item-destinations"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    title: "Docs",',
                    "                    items: [",
                    '                        { label: "Overview", to: "/docs" },',
                    '                        { label: "Read the docs", to: "/docs" },',
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDuplicateFooterLinkItemDestinations",
                        suggestions: [
                            {
                                messageId: "removeDuplicateFooterLinkItem",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        footer: {",
                                    "            links: [",
                                    "                {",
                                    '                    title: "Docs",',
                                    "                    items: [",
                                    '                        { label: "Overview", to: "/docs" },',
                                    "                    ],",
                                    "                },",
                                    "            ],",
                                    "        },",
                                    "    },",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const items = [{ label: "Overview", href: "https://example.com" }, { label: "More", href: "https://example.com" }];',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDuplicateFooterLinkItemDestinations",
                        suggestions: [
                            {
                                messageId: "removeDuplicateFooterLinkItem",
                                output: [
                                    'const items = [{ label: "Overview", href: "https://example.com" }];',
                                    "",
                                    "export default {",
                                    "    themeConfig: {",
                                    "        footer: {",
                                    "            links: [",
                                    '                { title: "Docs", items },',
                                    "            ],",
                                    "        },",
                                    "    },",
                                    "};",
                                ].join("\n"),
                            },
                        ],
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
                    "                {",
                    '                    title: "Docs",',
                    "                    items: [",
                    '                        { label: "Overview", to: "/docs" },',
                    '                        { label: "Rules", to: "/rules" },',
                    "                    ],",
                    "                },",
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
                    "                {",
                    '                    title: "Docs",',
                    "                    items: [",
                    '                        { label: "Overview", href: dynamicHref },',
                    '                        { label: "More", href: dynamicHref },',
                    "                    ],",
                    "                },",
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
                    "            items: [",
                    '                { label: "Overview", to: "/docs" },',
                    '                { label: "Read the docs", to: "/docs" },',
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
                    "                {",
                    '                    title: "Docs",',
                    "                    items: [",
                    '                        { label: "Overview", to: "/docs" },',
                    '                        { label: "Read the docs", to: "/docs" },',
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
