/**
 * @packageDocumentation
 * RuleTester coverage for `require-sidebar-category-type`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-sidebar-category-type",
    getPluginRule("require-sidebar-category-type"),
    {
        invalid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSidebarCategoryType" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "link",',
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferSidebarCategoryType" }],
                filename: "docs/docusaurus/sidebars.rules.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "        },",
                    "        {",
                    '            type: "doc",',
                    '            id: "introduction",',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    'const sidebarCategoryType = "category";',
                    "",
                    "export default {",
                    "    docs: [",
                    "        {",
                    "            type: sidebarCategoryType,",
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: ['const category = { items: ["intro"] };'].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
