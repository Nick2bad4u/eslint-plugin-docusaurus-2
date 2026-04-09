/**
 * @packageDocumentation
 * RuleTester coverage for `validate-theme-config-navbar-style`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "validate-theme-config-navbar-style",
    getPluginRule("validate-theme-config-navbar-style"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themeConfig: { navbar: { style: "Dark" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "validateThemeConfigNavbarStyle" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    themeConfig: { navbar: { style: "dark" } },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const style = "secondary";',
                    "",
                    "export default {",
                    "    themeConfig: { navbar: { style } },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "validateThemeConfigNavbarStyle",
                        suggestions: [
                            {
                                messageId: "setNavbarStyleDark",
                                output: [
                                    'const style = "secondary";',
                                    "",
                                    "export default {",
                                    '    themeConfig: { navbar: { style: "dark" } },',
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setNavbarStylePrimary",
                                output: [
                                    'const style = "secondary";',
                                    "",
                                    "export default {",
                                    '    themeConfig: { navbar: { style: "primary" } },',
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
                    '    themeConfig: { navbar: { style: "dark" } },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themeConfig: { navbar: { style: "primary" } },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const navbar = getNavbar();",
                    "",
                    "export default {",
                    "    themeConfig: { navbar },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themeConfig: { navbar: { style: "Dark" } },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
