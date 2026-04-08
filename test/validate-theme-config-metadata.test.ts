/**
 * @packageDocumentation
 * RuleTester coverage for `validate-theme-config-metadata`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "validate-theme-config-metadata",
    getPluginRule("validate-theme-config-metadata"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    "            {",
                    '                property: "og:site_name",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigMetadataContent" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    "            {",
                    '                content: "eslint-plugin-docusaurus-2",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigMetadataKey" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            "og:site_name",',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigMetadataObject" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    "            {",
                    '                name: "",',
                    '                content: "",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "requireThemeConfigMetadataKey" },
                    { messageId: "requireThemeConfigMetadataContent" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    "            {",
                    '                property: "og:site_name",',
                    '                content: "eslint-plugin-docusaurus-2",',
                    "            },",
                    "            {",
                    '                name: "twitter:card",',
                    '                content: "summary_large_image",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const metadataName = "og:site_name";',
                    'const metadataContent = "eslint-plugin-docusaurus-2";',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    "            {",
                    "                property: metadataName,",
                    "                content: metadataContent,",
                    "            },",
                    "            ...extraMetadata,",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { themeConfig: {} };",
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
