/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-navbar-item-destinations`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-navbar-item-destinations",
    getPluginRule("no-duplicate-navbar-item-destinations"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "Docs", to: "/docs" },',
                    '                { label: "Read the docs", to: "/docs" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDuplicateNavbarItemDestinations",
                        suggestions: [
                            {
                                messageId: "removeDuplicateNavbarItem",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        navbar: {",
                                    "            items: [",
                                    '                { label: "Docs", to: "/docs" },',
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
                    'const items = [{ label: "Docs", href: "https://example.com" }, { label: "More", href: "https://example.com" }];',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: { items },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDuplicateNavbarItemDestinations",
                        suggestions: [
                            {
                                messageId: "removeDuplicateNavbarItem",
                                output: [
                                    'const items = [{ label: "Docs", href: "https://example.com" }];',
                                    "",
                                    "export default {",
                                    "    themeConfig: {",
                                    "        navbar: { items },",
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
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "dropdown",',
                    '                    label: "Docs",',
                    "                    items: [",
                    '                        { label: "Guide", to: "/guide" },',
                    '                        { label: "API", to: "/guide" },',
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDuplicateNavbarItemDestinations",
                        suggestions: [
                            {
                                messageId: "removeDuplicateNavbarItem",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        navbar: {",
                                    "            items: [",
                                    "                {",
                                    '                    type: "dropdown",',
                                    '                    label: "Docs",',
                                    "                    items: [",
                                    '                        { label: "Guide", to: "/guide" },',
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
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "Docs", to: "/docs" },',
                    '                { label: "Rules", to: "/rules" },',
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
                    "            items: getItems(),",
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
                    '                { label: "Docs", to: dynamicTo },',
                    '                { label: "Rules", to: dynamicTo },',
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
                    '                { title: "Docs", items: [{ label: "Docs", to: "/docs" }, { label: "Rules", to: "/docs" }] },',
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
