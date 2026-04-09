/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-navbar-dropdown-items`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-empty-navbar-dropdown-items",
    getPluginRule("no-empty-navbar-dropdown-items"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { type: "dropdown", label: "Docs", items: [] },',
                    '                { label: "GitHub", href: "https://github.com" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyNavbarDropdownItems" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "GitHub", href: "https://github.com" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const items = [];",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { type: "dropdown", label: "Docs", items },',
                    '                { label: "GitHub", href: "https://github.com" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyNavbarDropdownItems" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const items = [];",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "GitHub", href: "https://github.com" },',
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
                    "        navbar: {",
                    "            items: [",
                    '                { type: "dropdown", label: "Docs", items: [] },',
                    '                { type: "dropdown", label: "More", items: [] },',
                    '                { label: "GitHub", href: "https://github.com" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noEmptyNavbarDropdownItems" },
                    { messageId: "noEmptyNavbarDropdownItems" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "GitHub", href: "https://github.com" },',
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
                    "        navbar: {",
                    "            items: [",
                    '                { type: "dropdown", label: "Docs", items: [{ label: "Guide", to: "/docs" }] },',
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
                    '        navbar: { items: [{ type: "dropdown", label: "Docs", items }] },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        navbar: { items: [{ type: "dropdown", label: "Docs", items: [] }] },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
