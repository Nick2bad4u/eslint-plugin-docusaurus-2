/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-theme-config-metadata-name-for-twitter-tags`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-theme-config-metadata-name-for-twitter-tags",
    getPluginRule("prefer-theme-config-metadata-name-for-twitter-tags"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { property: "twitter:image", content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "preferThemeConfigMetadataNameForTwitterTags",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { name: "twitter:image", content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const metadata = [",
                    '    { property: "twitter:card", content: "summary_large_image" },',
                    "];",
                    "",
                    "export default {",
                    "    themeConfig: { metadata },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "preferThemeConfigMetadataNameForTwitterTags",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const metadata = [",
                    '    { name: "twitter:card", content: "summary_large_image" },',
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
                    '            { property: dynamicProperty, content: "https://example.com/card.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
