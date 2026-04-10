/**
 * @packageDocumentation
 * RuleTester coverage for `require-markdown-mermaid-when-theme-mermaid-enabled`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-markdown-mermaid-when-theme-mermaid-enabled",
    getPluginRule("require-markdown-mermaid-when-theme-mermaid-enabled"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireMarkdownMermaidWhenThemeMermaidEnabled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "    markdown: { mermaid: true }",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "    markdown: {},",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireMarkdownMermaidWhenThemeMermaidEnabled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "    markdown: { mermaid: true },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "    markdown: {",
                    "        mermaid: false,",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireMarkdownMermaidWhenThemeMermaidEnabled",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-mermaid"],',
                    "    markdown: {",
                    "        mermaid: true,",
                    "    },",
                    "};",
                ].join("\n"),
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
                    "        mermaid: true,",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
