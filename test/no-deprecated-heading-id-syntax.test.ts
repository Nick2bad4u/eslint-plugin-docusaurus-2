/**
 * @packageDocumentation
 * RuleTester coverage for `no-deprecated-heading-id-syntax`.
 */

import { createTextRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createTextRuleTester();

ruleTester.run(
    "no-deprecated-heading-id-syntax",
    getPluginRule("no-deprecated-heading-id-syntax"),
    {
        invalid: [
            {
                code: [
                    "# Intro {#intro}",
                    "",
                    "Content.",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedHeadingIdSyntax" }],
                filename: "docs/guide/intro.mdx",
                output: [
                    "# Intro {/* #intro */}",
                    "",
                    "Content.",
                ].join("\n"),
            },
            {
                code: ["## API Surface {#api-surface}"].join("\n"),
                errors: [{ messageId: "noDeprecatedHeadingIdSyntax" }],
                filename: "docs/guide/api.mdx",
                output: ["## API Surface {/* #api-surface */}"].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "# Intro {/* #intro */}",
                    "",
                    "Content.",
                ].join("\n"),
                filename: "docs/guide/intro.mdx",
            },
            {
                code: ["# Intro {#intro}"].join("\n"),
                filename: "docs/guide/intro.md",
            },
            {
                code: [
                    "```mdx",
                    "## Example {#example}",
                    "```",
                ].join("\n"),
                filename: "docs/guide/examples.mdx",
            },
        ],
    }
);
