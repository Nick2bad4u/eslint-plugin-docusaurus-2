/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-theme-classic-custom-css`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-theme-classic-custom-css",
    getPluginRule("no-duplicate-theme-classic-custom-css"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    '            theme: { customCss: ["./src/css/custom.css", "./src/css/custom.css"] },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateThemeClassicCustomCss" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    '            theme: { customCss: ["./src/css/custom.css"] },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    themes: [[",
                    '        "@docusaurus/theme-classic",',
                    "        {",
                    '            customCss: [require.resolve("./src/css/custom.css"), "./src/css/custom.css"],',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateThemeClassicCustomCss" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themes: [[",
                    '        "@docusaurus/theme-classic",',
                    "        {",
                    '            customCss: [require.resolve("./src/css/custom.css")],',
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
                    '            theme: { customCss: ["./src/css/custom.css", "./src/css/extra.css"] },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
