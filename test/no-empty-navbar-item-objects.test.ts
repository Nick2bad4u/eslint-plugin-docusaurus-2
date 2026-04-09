/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-navbar-item-objects`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-empty-navbar-item-objects",
    getPluginRule("no-empty-navbar-item-objects"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    '            items: [{}, { label: "Docs", to: "/docs" }],',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyNavbarItemObjects" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    '            items: [{ label: "Docs", to: "/docs" }],',
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
                    "            items: [{}, {}],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noEmptyNavbarItemObjects" },
                    { messageId: "noEmptyNavbarItemObjects" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const items = [{}, { label: "Docs", to: "/docs" }];',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: { items },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyNavbarItemObjects" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    'const items = [{ label: "Docs", to: "/docs" }];',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: { items },",
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
                    '            items: [{ label: "Docs", to: "/docs" }],',
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
                    "        navbar: { items },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: { items: [{}] },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
