/**
 * @packageDocumentation
 * RuleTester coverage for `no-redundant-social-card-metadata`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-redundant-social-card-metadata",
    getPluginRule("no-redundant-social-card-metadata"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        image: "img/social-card.png",',
                    "        metadata: [",
                    "            {",
                    '                property: "og:image",',
                    '                content: "https://example.com/img/social-card.png",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noRedundantSocialCardMetadata" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    '        image: "img/social-card.png",',
                    "        metadata: [",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        image: "img/social-card.png",',
                    "        metadata: [",
                    "            {",
                    '                name: "twitter:image",',
                    '                content: "https://example.com/img/social-card.png",',
                    "            },",
                    "            {",
                    '                property: "og:site_name",',
                    '                content: "eslint-plugin-docusaurus-2",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noRedundantSocialCardMetadata" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    '        image: "img/social-card.png",',
                    "        metadata: [",
                    "            {",
                    '                property: "og:site_name",',
                    '                content: "eslint-plugin-docusaurus-2",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        image: "img/social-card.png",',
                    "        metadata: [",
                    "            {",
                    '                property: "og:site_name",',
                    '                content: "eslint-plugin-docusaurus-2",',
                    "            },",
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
                    "            {",
                    '                property: "og:image",',
                    '                content: "https://example.com/img/social-card.png",',
                    "            },",
                    "        ],",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
