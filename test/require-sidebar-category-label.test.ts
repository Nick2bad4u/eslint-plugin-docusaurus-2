/**
 * @packageDocumentation
 * RuleTester coverage for `require-sidebar-category-label`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-sidebar-category-label",
    getPluginRule("require-sidebar-category-label"),
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
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSidebarCategoryLabel" }],
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    'const categoryLabel = "";',
                    "",
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    "            label: categoryLabel,",
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSidebarCategoryLabel" }],
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
                    "const categoryLabel = getCategoryLabel();",
                    "",
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    "            label: categoryLabel,",
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
        ],
    }
);
