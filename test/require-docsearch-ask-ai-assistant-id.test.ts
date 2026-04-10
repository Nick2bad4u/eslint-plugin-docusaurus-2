/**
 * @packageDocumentation
 * RuleTester coverage for `require-docsearch-ask-ai-assistant-id`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-docsearch-ask-ai-assistant-id",
    getPluginRule("require-docsearch-ask-ai-assistant-id"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs", askAi: "" },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireDocsearchAskAiAssistantId" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", askAi: {} },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireDocsearchAskAiAssistantId" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs", askAi: { assistantId: "" } },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireDocsearchAskAiAssistantId" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        algolia: { appId: "APP", apiKey: "KEY", indexName: "docs", askAi: "assistant-id" },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    '        docsearch: { appId: "APP", apiKey: "KEY", indexName: "docs", askAi: { assistantId: "assistant-id", suggestedQuestions: true } },',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
