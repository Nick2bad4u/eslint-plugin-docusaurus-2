/**
 * @packageDocumentation
 * RuleTester coverage for `require-navbar-doc-sidebar-item-sidebar-id`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-navbar-doc-sidebar-item-sidebar-id",
    getPluginRule("require-navbar-doc-sidebar-item-sidebar-id"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "docSidebar",',
                    '                    label: "API",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDocSidebarItemSidebarId" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const linkedSidebarId = "";',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "dropdown",',
                    '                    label: "Community",',
                    "                    items: [",
                    "                        {",
                    '                            type: "docSidebar",',
                    '                            label: "API",',
                    "                            sidebarId: linkedSidebarId,",
                    "                        },",
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDocSidebarItemSidebarId" }],
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
                    '                    type: "docSidebar",',
                    '                    label: "API",',
                    '                    sidebarId: "api",',
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
                    '                    label: "Community",',
                    "                    items: [",
                    "                        {",
                    '                            type: "docSidebar",',
                    '                            label: "API",',
                    "                            sidebarId: getSidebarId(),",
                    "                        },",
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
                code: 'export default { type: "docSidebar", label: "API" };',
                filename: "docs/docusaurus/sidebars.ts",
            },
        ],
    }
);
