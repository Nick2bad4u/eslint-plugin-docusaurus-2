/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-search-algolia-package-installed`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-search-algolia-package-installed",
    getPluginRule("require-theme-search-algolia-package-installed"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-search-algolia"],',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireThemeSearchAlgoliaPackageInstalled",
                    },
                ],
                filename: "temp/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-search-algolia"],',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
