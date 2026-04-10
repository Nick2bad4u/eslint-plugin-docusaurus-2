/**
 * @packageDocumentation
 * RuleTester coverage for `require-search-provider-package-installed`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-search-provider-package-installed",
    getPluginRule("require-search-provider-package-installed"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    plugins: ["@docsearch/docusaurus-adapter"],',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            moduleName: "`@docsearch/docusaurus-adapter`",
                        },
                        messageId: "requireSearchProviderPackageInstalled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themes: ["docusaurus-plugin-search-local"],',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: {
                            moduleName: "`docusaurus-plugin-search-local`",
                        },
                        messageId: "requireSearchProviderPackageInstalled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@easyops-cn/docusaurus-search-local"],',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    plugins: ["@docsearch/docusaurus-adapter"],',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
