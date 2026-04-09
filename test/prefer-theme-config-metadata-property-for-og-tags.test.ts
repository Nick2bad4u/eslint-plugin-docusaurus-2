/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-theme-config-metadata-property-for-og-tags`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-theme-config-metadata-property-for-og-tags",
    getPluginRule("prefer-theme-config-metadata-property-for-og-tags"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { name: "og:image", content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "preferThemeConfigMetadataPropertyForOgTags" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { property: "og:image", content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const metadata = [",
                    '    { name: "og:site_name", content: "example" },',
                    "];",
                    "",
                    "export default {",
                    "    themeConfig: { metadata },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "preferThemeConfigMetadataPropertyForOgTags" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const metadata = [",
                    '    { property: "og:site_name", content: "example" },',
                    "];",
                    "",
                    "export default {",
                    "    themeConfig: { metadata },",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { property: "og:image", content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { name: "twitter:image", content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { name: dynamicName, content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
