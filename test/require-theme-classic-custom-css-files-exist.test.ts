/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-classic-custom-css-files-exist`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-classic-custom-css-files-exist",
    getPluginRule("require-theme-classic-custom-css-files-exist"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    presets: [[",
                    '        "@docusaurus/preset-classic",',
                    "        {",
                    '            theme: { customCss: "./src/css/missing.css" },',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: { configuredPath: "`./src/css/missing.css`" },
                        messageId: "requireThemeClassicCustomCssFilesExist",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themes: [[",
                    '        "@docusaurus/theme-classic",',
                    "        {",
                    '            customCss: [require.resolve("./src/css/custom.css"), "./src/css/missing.css"],',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: { configuredPath: "`./src/css/missing.css`" },
                        messageId: "requireThemeClassicCustomCssFilesExist",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
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
            {
                code: [
                    "export default {",
                    "    themes: [[",
                    '        "@docusaurus/theme-classic",',
                    "        {",
                    '            customCss: [require.resolve("./src/css/custom.css")],',
                    "        },",
                    "    ]],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
