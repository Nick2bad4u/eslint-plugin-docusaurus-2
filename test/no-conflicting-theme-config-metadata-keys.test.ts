/**
 * @packageDocumentation
 * RuleTester coverage for `no-conflicting-theme-config-metadata-keys`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-conflicting-theme-config-metadata-keys",
    getPluginRule("no-conflicting-theme-config-metadata-keys"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { name: "keywords", property: "og:keywords", content: "docs" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noConflictingThemeConfigMetadataKeys",
                        suggestions: [
                            {
                                messageId: "removeMetadataName",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        metadata: [",
                                    '            { property: "og:keywords", content: "docs" },',
                                    "        ],",
                                    "    },",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "removeMetadataProperty",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        metadata: [",
                                    '            { name: "keywords", content: "docs" },',
                                    "        ],",
                                    "    },",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const metadata = [",
                    '    { name: "keywords", property: "og:keywords", content: "docs" },',
                    "];",
                    "",
                    "export default {",
                    "    themeConfig: { metadata },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noConflictingThemeConfigMetadataKeys",
                        suggestions: [
                            {
                                messageId: "removeMetadataName",
                                output: [
                                    "const metadata = [",
                                    '    { property: "og:keywords", content: "docs" },',
                                    "];",
                                    "",
                                    "export default {",
                                    "    themeConfig: { metadata },",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "removeMetadataProperty",
                                output: [
                                    "const metadata = [",
                                    '    { name: "keywords", content: "docs" },',
                                    "];",
                                    "",
                                    "export default {",
                                    "    themeConfig: { metadata },",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
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
                    '            { name: "keywords", content: "docs" },',
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
                    "        metadata: [getMetadata()],",
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
                    '            { name: "keywords", property: dynamicProperty, content: "docs" },',
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
                    '            { name: "keywords", property: "og:keywords", content: "docs" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
