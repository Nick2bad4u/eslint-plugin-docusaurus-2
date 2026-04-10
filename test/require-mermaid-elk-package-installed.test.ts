/**
 * @packageDocumentation
 * RuleTester coverage for `require-mermaid-elk-package-installed`.
 */

import {
    createTextRuleTester,
    getPluginRule,
    repoPath,
} from "./_internal/ruleTester";

const ruleTester = createTextRuleTester();

ruleTester.run(
    "require-mermaid-elk-package-installed",
    getPluginRule("require-mermaid-elk-package-installed"),
    {
        invalid: [
            {
                code: [
                    "# Diagram",
                    "",
                    "```mermaid",
                    "---",
                    "config:",
                    "  layout: elk",
                    "---",
                    "flowchart LR",
                    "  A --> B",
                    "```",
                ].join("\n"),
                errors: [{ messageId: "requireMermaidElkPackageInstalled" }],
                filename: repoPath("docs", "guide", "elk-example.mdx"),
            },
        ],
        valid: [
            {
                code: [
                    "# Diagram",
                    "",
                    "```mermaid",
                    "flowchart LR",
                    "  A --> B",
                    "```",
                ].join("\n"),
                filename: repoPath("docs", "guide", "standard-mermaid.mdx"),
            },
            {
                code: [
                    "# Diagram",
                    "",
                    "```mermaid",
                    "---",
                    "config:",
                    "  layout: elk",
                    "---",
                    "flowchart LR",
                    "  A --> B",
                    "```",
                ].join("\n"),
                filename: repoPath(
                    "test",
                    "fixtures",
                    "mermaid-elk-site",
                    "docs",
                    "elk-example.mdx"
                ),
            },
            {
                code: [
                    "# Example",
                    "",
                    "```ts",
                    "const example = `layout: elk`;",
                    "```",
                ].join("\n"),
                filename: repoPath("docs", "guide", "elk-code-example.mdx"),
            },
        ],
    }
);
