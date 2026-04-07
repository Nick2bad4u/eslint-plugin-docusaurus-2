/**
 * @packageDocumentation
 * RuleTester coverage for `no-useless-collapsed-sidebar-categories`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-useless-collapsed-sidebar-categories",
    getPluginRule("no-useless-collapsed-sidebar-categories"),
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
                    "            collapsible: false,",
                    "            collapsed: true,",
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noUselessCollapsedSidebarCategory" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    "            collapsible: false,",
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "            collapsible: false,",
                    "            collapsed: false,",
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noUselessCollapsedSidebarCategory" }],
                filename: "docs/docusaurus/sidebars.rules.ts",
                output: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "            collapsible: false,",
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    "            collapsible: true,",
                    "            collapsed: false,",
                    "        },",
                    "        {",
                    '            label: "API",',
                    '            items: ["api/index"],',
                    "            collapsible: false,",
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: "const category = { collapsible: false, collapsed: true };",
                filename: "src/sidebar-data.ts",
            },
        ],
    }
);
