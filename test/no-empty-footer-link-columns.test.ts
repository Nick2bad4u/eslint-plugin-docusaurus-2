/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-footer-link-columns`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-empty-footer-link-columns",
    getPluginRule("no-empty-footer-link-columns"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: [] },',
                    '                { title: "Project", items: [{ label: "GitHub", href: "https://github.com" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyFooterLinkColumns" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Project", items: [{ label: "GitHub", href: "https://github.com" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const emptyItems = [];",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: emptyItems },',
                    '                { title: "Project", items: [{ label: "GitHub", href: "https://github.com" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyFooterLinkColumns" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const emptyItems = [];",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Project", items: [{ label: "GitHub", href: "https://github.com" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: [] },',
                    '                { title: "Project", items: [] },',
                    '                { title: "Support", items: [{ label: "GitHub", href: "https://github.com" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noEmptyFooterLinkColumns" },
                    { messageId: "noEmptyFooterLinkColumns" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Support", items: [{ label: "GitHub", href: "https://github.com" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    '                { title: "Docs", items: [{ label: "Overview", to: "/docs" }] },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const items = getItems();",
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
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    '            links: [{ title: "Docs", items: [] }],',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
