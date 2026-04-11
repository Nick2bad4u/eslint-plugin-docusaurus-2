/**
 * @packageDocumentation
 * ESLint rule implementation for `no-deprecated-html-comments-in-mdx`.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import {
    collectFencedCodeBlockRanges,
    createTextSourceLocator,
    doesRangeOverlapIgnoredRanges,
    isMdxFilePath,
} from "../_internal/text-content-lint.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDeprecatedHtmlCommentsInMdx";

const htmlCommentPattern = /<!--[\s\S]*?-->/gu;

const toJsxCommentReplacement = (commentText: string): string => {
    const innerText = commentText.slice(4, -3);

    if (innerText.includes("\n")) {
        return `{/*${innerText}*/}`;
    }

    const trimmedInnerText = innerText.trim();

    return trimmedInnerText.length === 0
        ? "{/* */}"
        : `{/* ${trimmedInnerText} */}`;
};

/** Rule module for `no-deprecated-html-comments-in-mdx`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isMdxFilePath(context.filename)) {
                return {};
            }

            return {
                Program(): void {
                    const text = context.sourceCode.getText();
                    const ignoredRanges = collectFencedCodeBlockRanges(text);
                    const locator = createTextSourceLocator(text);

                    for (const match of text.matchAll(htmlCommentPattern)) {
                        const matchedComment = match[0];
                        const matchStart = match.index;

                        if (
                            matchedComment === undefined ||
                            matchStart === undefined
                        ) {
                            continue;
                        }

                        const matchEnd = matchStart + matchedComment.length;

                        if (
                            doesRangeOverlapIgnoredRanges(
                                matchStart,
                                matchEnd,
                                ignoredRanges
                            )
                        ) {
                            continue;
                        }

                        context.report({
                            fix: (fixer) =>
                                fixer.replaceTextRange(
                                    [matchStart, matchEnd],
                                    toJsxCommentReplacement(matchedComment)
                                ),
                            loc: locator.createLoc(matchStart, matchEnd),
                            messageId: "noDeprecatedHtmlCommentsInMdx",
                        });
                    }
                },
            } satisfies TSESLint.RuleListener;
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                configs: ["content", "strict-mdx-upgrade"],
                description:
                    "disallow deprecated HTML comments in MDX files and prefer JSX comments for Docusaurus 3.10 strict MDX migration.",
                frozen: false,
                presets: [],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-html-comments-in-mdx",
            },
            fixable: "code",
            messages: {
                noDeprecatedHtmlCommentsInMdx:
                    "Docusaurus 3.10 strict MDX prefers JSX comments (`{/* ... */}`) instead of deprecated HTML comments (`<!-- ... -->`) in `.mdx` files.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "no-deprecated-html-comments-in-mdx",
    });

export default rule;
