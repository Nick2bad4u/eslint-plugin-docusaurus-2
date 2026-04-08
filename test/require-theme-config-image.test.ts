/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-config-image`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-config-image",
    getPluginRule("require-theme-config-image"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigImage" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {},",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigImage" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const socialCardImagePath = "";',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        image: socialCardImagePath,",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigImage" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    'const socialCardImagePath = "img/social-card.png";',
                    "",
                    "export default {",
                    "    themeConfig: {",
                    "        image: socialCardImagePath,",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        image: process.env["DOCUSAURUS_SOCIAL_IMAGE"],',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { themeConfig: {} };",
                filename: "src/config.ts",
            },
        ],
    }
);
