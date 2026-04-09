/**
 * @packageDocumentation
 * RuleTester coverage for `validate-theme-config-color-mode-default-mode`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "validate-theme-config-color-mode-default-mode",
    getPluginRule("validate-theme-config-color-mode-default-mode"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: { colorMode: {} },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireColorModeDefaultMode",
                        suggestions: [
                            {
                                messageId: "setColorModeDefaultModeLight",
                                output: [
                                    "export default {",
                                    '    themeConfig: { colorMode: { defaultMode: "light" } },',
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setColorModeDefaultModeDark",
                                output: [
                                    "export default {",
                                    '    themeConfig: { colorMode: { defaultMode: "dark" } },',
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
                    '    themeConfig: { colorMode: { defaultMode: "Dark" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireColorModeDefaultMode" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    themeConfig: { colorMode: { defaultMode: "dark" } },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const defaultMode = "night";',
                    "",
                    "export default {",
                    "    themeConfig: { colorMode: { defaultMode } },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireColorModeDefaultMode",
                        suggestions: [
                            {
                                messageId: "setColorModeDefaultModeLight",
                                output: [
                                    'const defaultMode = "night";',
                                    "",
                                    "export default {",
                                    '    themeConfig: { colorMode: { defaultMode: "light" } },',
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setColorModeDefaultModeDark",
                                output: [
                                    'const defaultMode = "night";',
                                    "",
                                    "export default {",
                                    '    themeConfig: { colorMode: { defaultMode: "dark" } },',
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
                    '    themeConfig: { colorMode: { defaultMode: "dark" } },',
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
                    '    themeConfig: { colorMode: { defaultMode: "Dark" } },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
