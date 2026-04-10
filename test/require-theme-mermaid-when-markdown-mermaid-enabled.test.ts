/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-mermaid-when-markdown-mermaid-enabled`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-mermaid-when-markdown-mermaid-enabled",
    getPluginRule("require-theme-mermaid-when-markdown-mermaid-enabled"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    markdown: {",
                    "        mermaid: true,",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireThemeMermaidWhenMarkdownMermaidEnabled",
                        suggestions: [
                            {
                                messageId: "addThemeMermaidToThemes",
                                output: [
                                    "export default {",
                                    "    markdown: {",
                                    "        mermaid: true,",
                                    "    },",
                                    '    themes: ["@docusaurus/theme-mermaid"]',
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themes: ["@easyops-cn/docusaurus-search-local"],',
                    "    markdown: {",
                    "        mermaid: true,",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireThemeMermaidWhenMarkdownMermaidEnabled",
                        suggestions: [
                            {
                                messageId: "addThemeMermaidToThemes",
                                output: [
                                    "export default {",
                                    '    themes: ["@easyops-cn/docusaurus-search-local", "@docusaurus/theme-mermaid"],',
                                    "    markdown: {",
                                    "        mermaid: true,",
                                    "    },",
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
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "    markdown: {",
                    "        mermaid: true,",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    markdown: {",
                    "        mermaid: false,",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
