/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-config-color-mode-object`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-config-color-mode-object",
    getPluginRule("require-theme-config-color-mode-object"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {},",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireThemeConfigColorModeObject",
                        suggestions: [
                            {
                                messageId: "insertColorModeLight",
                                output: [
                                    "export default {",
                                    '    themeConfig: { colorMode: { defaultMode: "light" } },',
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "insertColorModeDark",
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
                    "const themeConfig = getThemeConfig();",
                    "",
                    "export default {",
                    "    themeConfig,",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {},",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
