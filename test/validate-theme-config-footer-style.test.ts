/**
 * @packageDocumentation
 * RuleTester coverage for `validate-theme-config-footer-style`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "validate-theme-config-footer-style",
    getPluginRule("validate-theme-config-footer-style"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themeConfig: { footer: { style: "Light" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "validateThemeConfigFooterStyle" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    themeConfig: { footer: { style: "light" } },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const style = "primary";',
                    "",
                    "export default {",
                    "    themeConfig: { footer: { style } },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "validateThemeConfigFooterStyle",
                        suggestions: [
                            {
                                messageId: "setFooterStyleDark",
                                output: [
                                    'const style = "primary";',
                                    "",
                                    "export default {",
                                    '    themeConfig: { footer: { style: "dark" } },',
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setFooterStyleLight",
                                output: [
                                    'const style = "primary";',
                                    "",
                                    "export default {",
                                    '    themeConfig: { footer: { style: "light" } },',
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
                    '    themeConfig: { footer: { style: "dark" } },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themeConfig: { footer: { style: "light" } },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const footer = getFooter();",
                    "",
                    "export default {",
                    "    themeConfig: { footer },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themeConfig: { footer: { style: "Light" } },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
