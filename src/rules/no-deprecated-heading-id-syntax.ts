/**
 * @packageDocumentation
 * ESLint rule implementation for `no-deprecated-heading-id-syntax`.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import {
    collectFencedCodeBlockRanges,
    createTextSourceLocator,
    doesRangeOverlapIgnoredRanges,
    getTextContentLines,
    isMdxFilePath,
} from "../_internal/text-content-lint.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDeprecatedHeadingIdSyntax";

const parseDeprecatedHeadingIdLine = (
    line: string
): null | Readonly<{
    headingId: string;
    headingText: string;
    prefix: string;
}> => {
    let hashCount = 0;

    while (line[hashCount] === "#") {
        hashCount += 1;
    }

    if (hashCount < 1 || hashCount > 6) {
        return null;
    }

    const separatorCharacter = line[hashCount];

    if (separatorCharacter !== " " && separatorCharacter !== "\t") {
        return null;
    }

    let contentStart = hashCount;

    while (line[contentStart] === " " || line[contentStart] === "\t") {
        contentStart += 1;
    }

    const trimmedLine = line.trimEnd();

    if (!trimmedLine.endsWith("}")) {
        return null;
    }

    const headingIdStart = trimmedLine.lastIndexOf("{#");

    if (headingIdStart <= 0) {
        return null;
    }

    const headingText = trimmedLine
        .slice(contentStart, headingIdStart)
        .trimEnd();
    const headingId = trimmedLine.slice(headingIdStart + 2, -1);

    if (headingText.length === 0 || headingId.length === 0) {
        return null;
    }

    if (
        headingId.includes(" ") ||
        headingId.includes("\t") ||
        headingId.includes("}")
    ) {
        return null;
    }

    return {
        headingId,
        headingText,
        prefix: line.slice(0, contentStart),
    };
};

/** Rule module for `no-deprecated-heading-id-syntax`. */
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

                    for (const line of getTextContentLines(text)) {
                        const parsedHeadingLine = parseDeprecatedHeadingIdLine(
                            line.text
                        );

                        if (parsedHeadingLine === null) {
                            continue;
                        }

                        if (
                            doesRangeOverlapIgnoredRanges(
                                line.start,
                                line.end,
                                ignoredRanges
                            )
                        ) {
                            continue;
                        }

                        context.report({
                            fix: (fixer) =>
                                // eslint-disable-next-line eslint-plugin/prefer-replace-text -- Raw text rules replace an exact source slice; there is no narrower AST node to target.
                                fixer.replaceTextRange(
                                    [line.start, line.end],
                                    `${parsedHeadingLine.prefix}${parsedHeadingLine.headingText} {/* #${parsedHeadingLine.headingId} */}`
                                ),
                            loc: locator.createLoc(line.start, line.end),
                            messageId: "noDeprecatedHeadingIdSyntax",
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
                    "disallow deprecated `{#id}` heading syntax in MDX files and prefer the Docusaurus 3.10 MDX comment form.",
                frozen: false,
                presets: [],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-heading-id-syntax",
            },
            fixable: "code",
            messages: {
                noDeprecatedHeadingIdSyntax:
                    "Docusaurus 3.10 strict MDX prefers heading IDs written as MDX comments (`{/* #my-id */}`) instead of deprecated `{#my-id}` syntax.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "no-deprecated-heading-id-syntax",
    });

export default rule;
