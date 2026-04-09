/**
 * @packageDocumentation
 * RuleTester coverage for `require-navbar-docs-version-item-to`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-navbar-docs-version-item-to",
    getPluginRule("require-navbar-docs-version-item-to"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    type: "docsVersion",',
                    '                    label: "Version",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDocsVersionItemTo" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const versionPath = "";',
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
                    '                            type: "docsVersion",',
                    '                            label: "Version",',
                    "                            to: versionPath,",
                    "                        },",
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireNavbarDocsVersionItemTo" }],
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
                    '                    type: "docsVersion",',
                    '                    label: "Version",',
                    '                    to: "/docs/versions",',
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
                    "const versionPath = getVersionPath();",
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
                    '                            type: "docsVersion",',
                    '                            label: "Version",',
                    "                            to: versionPath,",
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
                code: 'export default { type: "docsVersion" };',
                filename: "docs/docusaurus/sidebars.ts",
            },
        ],
    }
);
