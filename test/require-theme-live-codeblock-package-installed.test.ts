/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-live-codeblock-package-installed`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-live-codeblock-package-installed",
    getPluginRule("require-theme-live-codeblock-package-installed"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    plugins: ["@docusaurus/theme-live-codeblock"],',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireThemeLiveCodeblockPackageInstalled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    plugins: ["@docusaurus/theme-live-codeblock"],',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
