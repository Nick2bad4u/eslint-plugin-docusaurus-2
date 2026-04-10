/**
 * @packageDocumentation
 * RuleTester coverage for `no-deprecated-admonition-title-syntax`.
 */

import { createTextRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createTextRuleTester();

ruleTester.run(
    "no-deprecated-admonition-title-syntax",
    getPluginRule("no-deprecated-admonition-title-syntax"),
    {
        invalid: [
            {
                code: [
                    ":::warning Pay Attention",
                    "Read this first.",
                    ":::",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedAdmonitionTitleSyntax" }],
                filename: "docs/guide/notes.mdx",
                output: [
                    ":::warning[Pay Attention]",
                    "Read this first.",
                    ":::",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    ":::warning[Pay Attention]",
                    "Read this first.",
                    ":::",
                ].join("\n"),
                filename: "docs/guide/notes.mdx",
            },
            {
                code: [
                    ":::note{.custom-class #custom-id}",
                    "Portable directive shortcuts stay valid.",
                    ":::",
                ].join("\n"),
                filename: "docs/guide/notes.mdx",
            },
            {
                code: [
                    "```mdx",
                    ":::warning Old Title",
                    "```",
                ].join("\n"),
                filename: "docs/guide/notes.mdx",
            },
        ],
    }
);
