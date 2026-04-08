/**
 * @packageDocumentation
 * RuleTester coverage for `no-svg-social-card-image`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-svg-social-card-image",
    getPluginRule("no-svg-social-card-image"),
    {
        invalid: [
            {
                code: [
                    'const socialCardImagePath = "img/logo.svg";',
                    "",
                    "export default {",
                    "    image: socialCardImagePath,",
                    '    themeConfig: { image: "img/social-card.svg" },',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    title: "Docs",',
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noSvgSocialCardImage" },
                    { messageId: "noSvgSocialCardImage" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    'const socialCardImagePath = "img/logo.png";',
                    "",
                    "export default {",
                    "    image: socialCardImagePath,",
                    '    themeConfig: { image: "img/social-card.png" },',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    title: "Docs",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { image: "img/logo.svg" };',
                filename: "src/config.ts",
            },
        ],
    }
);
