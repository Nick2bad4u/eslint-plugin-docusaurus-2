/**
 * @packageDocumentation
 * RuleTester coverage for `no-conflicting-footer-html-item-props`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-conflicting-footer-html-item-props",
    getPluginRule("no-conflicting-footer-html-item-props"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    html: "<strong>Docs</strong>",',
                    '                    href: "https://example.com",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noConflictingFooterHtmlItemProps" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    html: "<strong>Docs</strong>",',
                    '                    label: "Docs",',
                    '                    to: "/docs/intro",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noConflictingFooterHtmlItemProps" }],
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
                    '                    html: "<strong>Docs</strong>",',
                    "                },",
                    "                {",
                    '                    label: "Docs",',
                    '                    href: "https://example.com",',
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
                    "                {",
                    '                    html: "<strong>Docs</strong>",',
                    '                    href: "https://example.com",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { html: "<strong>Docs</strong>", href: "https://example.com" };',
                filename: "src/config.ts",
            },
        ],
    }
);
