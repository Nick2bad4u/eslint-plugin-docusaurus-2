/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-footer-link-items`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-empty-footer-link-items",
    getPluginRule("no-empty-footer-link-items"),
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
                    '                    items: [{}, { label: "Overview", to: "/docs" }],',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyFooterLinkItems" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    title: "Docs",',
                    '                    items: [{ label: "Overview", to: "/docs" }],',
                    "                },",
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
                    "                {",
                    '                    title: "Docs",',
                    "                    items: [{}, {}],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noEmptyFooterLinkItems" },
                    { messageId: "noEmptyFooterLinkItems" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    title: "Docs",',
                    "                    items: [],",
                    "                },",
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
                    "                {",
                    '                    title: "Docs",',
                    '                    items: [{ label: "Overview", to: "/docs" }],',
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
                    "const emptyItem = {};",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    title: "Docs",',
                    '                    items: [emptyItem, { label: "Overview", to: "/docs" }],',
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
                    "const items = getItems();",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    '        footer: { links: [{ title: "Docs", items }] },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        footer: { links: [{ title: "Docs", items: [{}] }] },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
