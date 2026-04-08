/**
 * @packageDocumentation
 * RuleTester coverage for `require-plugin-pwa-setup`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-plugin-pwa-setup",
    getPluginRule("require-plugin-pwa-setup"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    '        "docusaurus-plugin-image-zoom",',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requirePluginPwaSetup" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    '        "@docusaurus/plugin-pwa",',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requirePluginPwaSetup" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    '        ["@docusaurus/plugin-pwa", {}],',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requirePluginPwaSetup" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
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
                    "                debug: true,",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const pwaOptions = getPwaOptions();",
                    "",
                    "export default {",
                    "    plugins: [",
                    '        ["@docusaurus/plugin-pwa", pwaOptions],',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { plugins: ["@docusaurus/plugin-pwa"] };',
                filename: "src/config.ts",
            },
        ],
    }
);
