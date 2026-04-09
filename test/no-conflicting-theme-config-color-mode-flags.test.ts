/**
 * @packageDocumentation
 * RuleTester coverage for `no-conflicting-theme-config-color-mode-flags`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-conflicting-theme-config-color-mode-flags",
    getPluginRule("no-conflicting-theme-config-color-mode-flags"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: { colorMode: { disableSwitch: true, respectPrefersColorScheme: true } },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noConflictingThemeConfigColorModeFlags" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: { colorMode: { disableSwitch: true, respectPrefersColorScheme: false } },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const respectPrefersColorScheme = true;",
                    "",
                    "export default {",
                    "    themeConfig: { colorMode: { disableSwitch: true, respectPrefersColorScheme } },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noConflictingThemeConfigColorModeFlags" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const respectPrefersColorScheme = true;",
                    "",
                    "export default {",
                    "    themeConfig: { colorMode: { disableSwitch: true, respectPrefersColorScheme: false } },",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: { colorMode: { disableSwitch: true, respectPrefersColorScheme: false } },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
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
                    "    themeConfig: { colorMode: { disableSwitch: true, respectPrefersColorScheme: true } },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
