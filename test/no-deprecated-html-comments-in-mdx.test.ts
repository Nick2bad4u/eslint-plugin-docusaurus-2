/**
 * @packageDocumentation
 * RuleTester coverage for `no-deprecated-html-comments-in-mdx`.
 */

import { createTextRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createTextRuleTester();

ruleTester.run(
    "no-deprecated-html-comments-in-mdx",
    getPluginRule("no-deprecated-html-comments-in-mdx"),
    {
        invalid: [
            {
                code: [
                    "# Post",
                    "",
                    "<!-- truncate -->",
                    "",
                    "Content.",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedHtmlCommentsInMdx" }],
                filename: "docs/blog/my-post.mdx",
                output: [
                    "# Post",
                    "",
                    "{/* truncate */}",
                    "",
                    "Content.",
                ].join("\n"),
            },
            {
                code: [
                    "# Post",
                    "",
                    "<!--",
                    "legacy comment",
                    "-->",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedHtmlCommentsInMdx" }],
                filename: "docs/blog/my-post.mdx",
                output: [
                    "# Post",
                    "",
                    "{/*",
                    "legacy comment",
                    "*/}",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "# Post",
                    "",
                    "{/* truncate */}",
                    "",
                ].join("\n"),
                filename: "docs/blog/my-post.mdx",
            },
            {
                code: [
                    "# Post",
                    "",
                    "<!-- still allowed in markdown -->",
                ].join("\n"),
                filename: "docs/blog/my-post.md",
            },
            {
                code: [
                    "# Post",
                    "",
                    "```mdx",
                    "<!-- example only -->",
                    "```",
                ].join("\n"),
                filename: "docs/blog/my-post.mdx",
            },
        ],
    }
);
