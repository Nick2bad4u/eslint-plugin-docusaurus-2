/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-sidebar-categories`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-empty-sidebar-categories",
    getPluginRule("no-empty-sidebar-categories"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    docsSidebar: [",
                    '        { type: "category", label: "Docs", items: [] },',
                    '        { type: "doc", id: "intro" },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptySidebarCategories" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    "export default {",
                    "    docsSidebar: [",
                    '        { type: "doc", id: "intro" },',
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const items = [];",
                    "",
                    "export default {",
                    "    docsSidebar: [",
                    '        { type: "category", label: "Docs", items },',
                    '        { type: "doc", id: "intro" },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptySidebarCategories" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    "const items = [];",
                    "",
                    "export default {",
                    "    docsSidebar: [",
                    '        { type: "doc", id: "intro" },',
                    "    ],",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    docsSidebar: [",
                    '        { type: "category", label: "Docs", items: ["intro"] },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    "const items = getItems();",
                    "",
                    "export default {",
                    "    docsSidebar: [",
                    '        { type: "category", label: "Docs", items },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    "export default {",
                    "    docsSidebar: [",
                    '        { type: "category", label: "Docs", items: [] },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "src/sidebar-config.ts",
            },
        ],
    }
);
