/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-sidebar-doc-ids`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-sidebar-doc-ids",
    getPluginRule("no-duplicate-sidebar-doc-ids"),
    {
        invalid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    '        "introduction",',
                    '        "introduction",',
                    "    ],",
                    "};",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                errors: [
                    {
                        messageId: "duplicateSidebarDocId",
                        suggestions: [
                            {
                                messageId: "preferRefForDuplicateSidebarDocId",
                                output: [
                                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                                    "",
                                    "const sidebars: SidebarsConfig = {",
                                    "    docs: [",
                                    '        "introduction",',
                                    '        { type: "ref", id: "introduction" },',
                                    "    ],",
                                    "};",
                                    "",
                                    "export default sidebars;",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "doc",',
                    '            id: "introduction",',
                    "        },",
                    "        {",
                    '            type: "doc",',
                    '            id: "introduction",',
                    "        },",
                    "    ],",
                    "};",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                errors: [
                    {
                        messageId: "duplicateSidebarDocId",
                        suggestions: [
                            {
                                messageId: "preferRefForDuplicateSidebarDocId",
                                output: [
                                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                                    "",
                                    "const sidebars: SidebarsConfig = {",
                                    "    docs: [",
                                    "        {",
                                    '            type: "doc",',
                                    '            id: "introduction",',
                                    "        },",
                                    "        {",
                                    '            type: "ref",',
                                    '            id: "introduction",',
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
                    '        "introduction",',
                    "        {",
                    '            type: "ref",',
                    '            id: "introduction",',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: ['const keywords = ["guides", "guides"];'].join("\n"),
                filename: "src/sidebar-data.ts",
            },
        ],
    }
);
