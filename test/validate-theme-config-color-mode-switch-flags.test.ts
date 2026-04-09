/**
 * @packageDocumentation
 * RuleTester coverage for `validate-theme-config-color-mode-switch-flags`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "validate-theme-config-color-mode-switch-flags",
    getPluginRule("validate-theme-config-color-mode-switch-flags"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themeConfig: { colorMode: { disableSwitch: "true" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "validateColorModeFlag" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: { colorMode: { disableSwitch: true } },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const respectPrefersColorScheme = "never";',
                    "",
                    "export default {",
                    "    themeConfig: { colorMode: { respectPrefersColorScheme } },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "validateColorModeFlag",
                        suggestions: [
                            {
                                messageId: "setColorModeFlagFalse",
                                output: [
                                    'const respectPrefersColorScheme = "never";',
                                    "",
                                    "export default {",
                                    "    themeConfig: { colorMode: { respectPrefersColorScheme: false } },",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setColorModeFlagTrue",
                                output: [
                                    'const respectPrefersColorScheme = "never";',
                                    "",
                                    "export default {",
                                    "    themeConfig: { colorMode: { respectPrefersColorScheme: true } },",
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
                    'const disableSwitch = "false";',
                    "",
                    "export default {",
                    "    themeConfig: { colorMode: { disableSwitch } },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "validateColorModeFlag",
                        suggestions: [
                            {
                                messageId: "setColorModeFlagFalse",
                                output: [
                                    'const disableSwitch = "false";',
                                    "",
                                    "export default {",
                                    "    themeConfig: { colorMode: { disableSwitch: false } },",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setColorModeFlagTrue",
                                output: [
                                    'const disableSwitch = "false";',
                                    "",
                                    "export default {",
                                    "    themeConfig: { colorMode: { disableSwitch: true } },",
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
                    "    themeConfig: { colorMode: { disableSwitch: false, respectPrefersColorScheme: true } },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const colorMode = getColorMode();",
                    "",
                    "export default {",
                    "    themeConfig: { colorMode },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themeConfig: { colorMode: { disableSwitch: "true" } },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
