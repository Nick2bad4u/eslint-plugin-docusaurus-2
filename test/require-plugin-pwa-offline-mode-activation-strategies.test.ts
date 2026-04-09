/**
 * @packageDocumentation
 * RuleTester coverage for `require-plugin-pwa-offline-mode-activation-strategies`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-plugin-pwa-offline-mode-activation-strategies",
    getPluginRule("require-plugin-pwa-offline-mode-activation-strategies"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                debug: true,",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requirePluginPwaOfflineModeActivationStrategies",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const offlineModeActivationStrategies = [",
                    '    "queryString",',
                    "];",
                    "",
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies,",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requirePluginPwaOfflineModeActivationStrategies",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies: [],",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requirePluginPwaOfflineModeActivationStrategies",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies: [",
                    '                    "queryString",',
                    "                ],",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requirePluginPwaOfflineModeActivationStrategies",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                options: [
                    {
                        requiredStrategies: ["appInstalled", "queryString"],
                    },
                ],
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies: [",
                    '                    "appInstalled",',
                    '                    "standalone",',
                    '                    "queryString",',
                    "                ],",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const offlineModeActivationStrategies = [",
                    '    "appInstalled",',
                    '    "standalone",',
                    '    "queryString",',
                    "];",
                    "",
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies,",
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
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies: [",
                    '                    "appInstalled",',
                    '                    "standalone",',
                    '                    "queryString",',
                    '                    "saveData",',
                    "                ],",
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
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies: [",
                    '                    "queryString",',
                    "                ],",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
                options: [
                    {
                        requiredStrategies: ["queryString"],
                    },
                ],
            },
            {
                code: [
                    "const offlineModeActivationStrategies = getOfflineModeActivationStrategies();",
                    "",
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies,",
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
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                offlineModeActivationStrategies: [],",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
