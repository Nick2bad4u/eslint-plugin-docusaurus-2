/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-theme-config-metadata`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-empty-theme-config-metadata",
    getPluginRule("no-empty-theme-config-metadata"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: { metadata: [] },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyThemeConfigMetadata" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: { },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const metadata = [];",
                    "",
                    "export default {",
                    '    themeConfig: { metadata, image: "img/card.png" },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyThemeConfigMetadata" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const metadata = [];",
                    "",
                    "export default {",
                    '    themeConfig: { image: "img/card.png" },',
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    themeConfig: { metadata: [{ name: "keywords", content: "docs" }] },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const metadata = getMetadata();",
                    "",
                    "export default {",
                    "    themeConfig: { metadata },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: { metadata: [] },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
