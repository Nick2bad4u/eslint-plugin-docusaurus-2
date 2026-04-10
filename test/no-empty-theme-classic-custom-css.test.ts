/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-theme-classic-custom-css`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-empty-theme-classic-custom-css",
    getPluginRule("no-empty-theme-classic-custom-css"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    '            theme: { customCss: "" },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyThemeClassicCustomCss" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    "            theme: { },",
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    '            theme: { customCss: ["./src/css/custom.css", "", "./src/css/extra.css"] },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noEmptyThemeClassicCustomCss" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    '            theme: { customCss: ["./src/css/custom.css", "./src/css/extra.css"] },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    '            theme: { customCss: "./src/css/custom.css" },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
