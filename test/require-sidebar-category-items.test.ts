/**
 * @packageDocumentation
 * RuleTester coverage for `require-sidebar-category-items`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-sidebar-category-items",
    getPluginRule("require-sidebar-category-items"),
    {
        invalid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSidebarCategoryItems" }],
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            link: { type: "doc", id: "introduction" },',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSidebarCategoryItems" }],
                filename: "docs/docusaurus/sidebars.rules.ts",
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
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            Guides: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    "            items: [],",
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
        ],
    }
);
