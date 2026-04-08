/**
 * @packageDocumentation
 * RuleTester coverage for `require-navbar-doc-item-doc-id`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-navbar-doc-item-doc-id",
    getPluginRule("require-navbar-doc-item-doc-id"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "doc",',
                    '                    label: "Docs",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDocItemDocId" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const docLinkId = "";',
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
                    '                            type: "doc",',
                    '                            label: "Docs",',
                    "                            docId: docLinkId,",
                    "                        },",
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDocItemDocId" }],
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
                    '                    type: "doc",',
                    '                    label: "Docs",',
                    '                    docId: "introduction",',
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
                    '                            type: "doc",',
                    '                            label: "Docs",',
                    "                            docId: getDocId(),",
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
                code: 'export default { type: "doc", label: "Docs" };',
                filename: "docs/docusaurus/sidebars.ts",
            },
        ],
    }
);
