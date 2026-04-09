/**
 * @packageDocumentation
 * RuleTester coverage for `require-plugin-pwa-head-manifest`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-plugin-pwa-head-manifest",
    getPluginRule("require-plugin-pwa-head-manifest"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                pwaHead: [",
                    "                    {",
                    '                        tagName: "meta",',
                    '                        name: "theme-color",',
                    '                        content: "#25c2a0",',
                    "                    },",
                    "                ],",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requirePluginPwaHeadManifest" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    plugins: [",
                    "        [",
                    '            "@docusaurus/plugin-pwa",',
                    "            {",
                    "                pwaHead: [],",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requirePluginPwaHeadManifest" }],
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
                    "                pwaHead: [",
                    "                    {",
                    '                        tagName: "link",',
                    '                        rel: "manifest",',
                    '                        href: "/manifest.json",',
                    "                    },",
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
                    "const pwaHead = getPwaHead();",
                    "",
                    "export default {",
                    "    plugins: [",
                    '        ["@docusaurus/plugin-pwa", { pwaHead }],',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { plugins: [] };",
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
