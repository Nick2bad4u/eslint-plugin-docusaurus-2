/**
 * @packageDocumentation
 * RuleTester coverage for `local-search-will-not-work-in-dev`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "local-search-will-not-work-in-dev",
    getPluginRule("local-search-will-not-work-in-dev"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@easyops-cn/docusaurus-search-local"],',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "localSearchWillNotWorkInDev" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    plugins: [["@cmfcmf/docusaurus-search-local", { indexDocs: true }]],',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "localSearchWillNotWorkInDev" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs" },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { themes: ["@easyops-cn/docusaurus-search-local"] };',
                filename: "src/config.ts",
            },
        ],
    }
);
