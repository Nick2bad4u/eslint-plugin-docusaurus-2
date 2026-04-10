/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-mermaid-package-installed`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-mermaid-package-installed",
    getPluginRule("require-theme-mermaid-package-installed"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeMermaidPackageInstalled" }],
                filename: "temp/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
