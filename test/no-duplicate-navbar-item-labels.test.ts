/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-navbar-item-labels`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-navbar-item-labels",
    getPluginRule("no-duplicate-navbar-item-labels"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "Docs", to: "/docs" },',
                    '                { label: "Docs", to: "/rules" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateNavbarItemLabels" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "docs", to: "/docs" },',
                    '                { label: "  Docs ", to: "/rules" },',
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateNavbarItemLabels" }],
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
                    '                    label: "Resources",',
                    "                    items: [",
                    '                        { label: "API", to: "/api" },',
                    '                        { label: "API", to: "/reference" },',
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateNavbarItemLabels" }],
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
                    "const label = getLabel();",
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    '                { label: "Docs", to: "/docs" },',
                    '                { label, to: "/rules" },',
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
                    '                        { label: "Docs", to: "/docs" },',
                    '                        { label: "Docs", to: "/rules" },',
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
                    '                { label: "Docs", to: "/docs" },',
                    '                { label: "Docs", to: "/rules" },',
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
