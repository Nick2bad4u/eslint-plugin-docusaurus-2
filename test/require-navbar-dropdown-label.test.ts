/**
 * @packageDocumentation
 * RuleTester coverage for `require-navbar-dropdown-label`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-navbar-dropdown-label",
    getPluginRule("require-navbar-dropdown-label"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "dropdown",',
                    '                    items: [{ label: "Docs", to: "/docs/intro" }],',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDropdownLabel" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const dropdownLabel = "";',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "dropdown",',
                    "                    label: dropdownLabel,",
                    '                    items: [{ label: "Docs", to: "/docs/intro" }],',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDropdownLabel" }],
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
                    "                {",
                    '                    type: "dropdown",',
                    '                    label: "Community",',
                    '                    items: [{ label: "Docs", to: "/docs/intro" }],',
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
                    '                    type: "dropdown",',
                    "                    label: getDropdownLabel(),",
                    '                    items: [{ label: "Docs", to: "/docs/intro" }],',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { type: "dropdown", items: [] };',
                filename: "src/config.ts",
            },
        ],
    }
);
