/**
 * @packageDocumentation
 * RuleTester coverage for `no-deprecated-google-analytics`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-deprecated-google-analytics",
    getPluginRule("no-deprecated-google-analytics"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    plugins: ["@docusaurus/plugin-google-analytics"],',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDeprecatedGoogleAnalytics",
                        suggestions: [
                            {
                                messageId: "renamePluginToGoogleGtag",
                                output: [
                                    "export default {",
                                    '    plugins: ["@docusaurus/plugin-google-gtag"],',
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
                    "export default {",
                    '    plugins: [["@docusaurus/plugin-google-analytics", { trackingID: "UA-141789564-1" }]],',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDeprecatedGoogleAnalytics",
                        suggestions: [
                            {
                                messageId: "renamePluginToGoogleGtag",
                                output: [
                                    "export default {",
                                    '    plugins: [["@docusaurus/plugin-google-gtag", { trackingID: "UA-141789564-1" }]],',
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
                    "export default {",
                    "    presets: [",
                    "        [",
                    '            "@docusaurus/preset-classic",',
                    "            {",
                    '                googleAnalytics: { trackingID: "UA-141789564-1", anonymizeIP: true },',
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDeprecatedGoogleAnalytics",
                        suggestions: [
                            {
                                messageId: "renamePresetOptionToGtag",
                                output: [
                                    "export default {",
                                    "    presets: [",
                                    "        [",
                                    '            "@docusaurus/preset-classic",',
                                    "            {",
                                    '                gtag: { trackingID: "UA-141789564-1", anonymizeIP: true },',
                                    "            },",
                                    "        ],",
                                    "    ],",
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
                    '    plugins: ["@docusaurus/plugin-google-gtag"],',
                    "    presets: [",
                    "        [",
                    '            "@docusaurus/preset-classic",',
                    "            {",
                    '                gtag: { trackingID: "G-999X9XX9XX" },',
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    plugins: ["@docusaurus/plugin-google-analytics"],',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
