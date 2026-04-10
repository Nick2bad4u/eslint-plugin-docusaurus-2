/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-classic-package-installed`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-classic-package-installed",
    getPluginRule("require-theme-classic-package-installed"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-classic"],',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeClassicPackageInstalled" }],
                filename: "temp/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-classic"],',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
