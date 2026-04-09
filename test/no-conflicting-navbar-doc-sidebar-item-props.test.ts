/**
 * @packageDocumentation
 * RuleTester coverage for `no-conflicting-navbar-doc-sidebar-item-props`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-conflicting-navbar-doc-sidebar-item-props",
    getPluginRule("no-conflicting-navbar-doc-sidebar-item-props"),
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
                    '                    sidebarId: "api",',
                    '                    to: "/docs/api",',
                    '                    href: "https://example.com",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noConflictingNavbarDocSidebarItemProps" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
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
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "docSidebar",',
                    '                    label: "API",',
                    '                    html: "<strong>API</strong>",',
                    '                    to: "/docs/api",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noConflictingNavbarDocSidebarItemProps" },
                ],
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
                    '                    type: "docSidebar",',
                    '                    label: "API",',
                    '                    to: "/docs/api",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
        ],
    }
);
