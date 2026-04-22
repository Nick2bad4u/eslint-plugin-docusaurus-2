/**
 * @packageDocumentation
 * RuleTester coverage for `require-markdown-format-detect`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-markdown-format-detect",
    getPluginRule("require-markdown-format-detect"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    markdown: {},",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireMarkdownFormatDetect" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    markdown: { format: "detect" },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    markdown: {",
                    '        format: "mdx",',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireMarkdownFormatDetect" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    markdown: {",
                    '        format: "detect",',
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const markdownFormat = "mdx";',
                    "const markdown = {",
                    "    format: markdownFormat,",
                    "};",
                    "",
                    "export default {",
                    "    markdown,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireMarkdownFormatDetect" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    title: "Docs",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    markdown: {",
                    '        format: "detect",',
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const markdownFormat = "detect";',
                    "const markdown = {",
                    "    format: markdownFormat,",
                    "    hooks: {",
                    '        onBrokenMarkdownLinks: "warn",',
                    "    },",
                    "};",
                    "",
                    "export default {",
                    "    markdown,",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const markdown = getMarkdownConfig();",
                    "",
                    "export default {",
                    "    markdown,",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { markdown: {} };",
                filename: "src/config.ts",
            },
        ],
    }
);
