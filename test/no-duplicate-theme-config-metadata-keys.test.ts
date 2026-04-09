/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-theme-config-metadata-keys`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-theme-config-metadata-keys",
    getPluginRule("no-duplicate-theme-config-metadata-keys"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { name: "keywords", content: "docs" },',
                    '            { name: "keywords", content: "rules" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateThemeConfigMetadataKeys" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
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
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { property: "og:image", content: "https://example.com/one.png" },',
                    '            { property: "og:image", content: "https://example.com/two.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateThemeConfigMetadataKeys" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        metadata: [",
                    '            { property: "og:image", content: "https://example.com/one.png" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const metadata = [",
                    '    { name: "twitter:image", content: "one" },',
                    '    { name: "twitter:image", content: "two" },',
                    "];",
                    "",
                    "export default {",
                    "    themeConfig: { metadata },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateThemeConfigMetadataKeys" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const metadata = [",
                    '    { name: "twitter:image", content: "one" },',
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
                    '            { name: "keywords", content: "docs" },',
                    '            { property: "og:image", content: "https://example.com/one.png" },',
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
                    "        metadata: getMetadata(),",
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
                    '            { name: dynamicName, content: "docs" },',
                    '            { name: dynamicName, content: "rules" },',
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
                    '            { name: "keywords", content: "docs" },',
                    '            { name: "keywords", content: "rules" },',
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
