/**
 * @packageDocumentation
 * RuleTester coverage for `no-mixed-sidebar-link-kinds`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-mixed-sidebar-link-kinds",
    getPluginRule("no-mixed-sidebar-link-kinds"),
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
                    '            link: { type: "generated-index", id: "introduction", title: "Guides" },',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noMixedSidebarLinkKinds",
                        suggestions: [
                            {
                                messageId: "removeDocIdFromGeneratedIndexLink",
                                output: [
                                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                                    "",
                                    "const sidebars: SidebarsConfig = {",
                                    "    docs: [",
                                    "        {",
                                    '            type: "category",',
                                    '            label: "Guides",',
                                    '            link: { type: "generated-index", title: "Guides" },',
                                    '            items: ["introduction"],',
                                    "        },",
                                    "    ],",
                                    "};",
                                    "",
                                    "export default sidebars;",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/sidebars.rules.ts",
            },
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            link: { type: "doc", id: "introduction", title: "Guides", slug: "/guides" },',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noMixedSidebarLinkKinds",
                        suggestions: [
                            {
                                messageId:
                                    "removeGeneratedIndexMetadataFromDocLink",
                                output: [
                                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                                    "",
                                    "const sidebars: SidebarsConfig = {",
                                    "    docs: [",
                                    "        {",
                                    '            type: "category",',
                                    '            label: "Guides",',
                                    '            link: { type: "doc", id: "introduction" },',
                                    '            items: ["introduction"],',
                                    "        },",
                                    "    ],",
                                    "};",
                                    "",
                                    "export default sidebars;",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
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
                    '            link: { type: "doc", id: "introduction" },',
                    '            items: ["introduction"],',
                    "        },",
                    "        {",
                    '            type: "category",',
                    '            label: "API",',
                    '            link: { type: "generated-index", title: "API" },',
                    '            items: ["api/index"],',
                    "        },",
                    "    ],",
                    "};",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.rules.ts",
            },
        ],
    }
);
