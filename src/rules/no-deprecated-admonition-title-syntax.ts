/**
 * @packageDocumentation
 * ESLint rule implementation for `no-deprecated-admonition-title-syntax`.
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

type MessageIds = "noDeprecatedAdmonitionTitleSyntax";

const isAsciiLetter = (value: string): boolean => {
    if (value.length !== 1) {
        return false;
    }

    const codePoint = value.codePointAt(0);

    return (
        codePoint !== undefined &&
        ((codePoint >= 65 && codePoint <= 90) ||
            (codePoint >= 97 && codePoint <= 122))
    );
};

const isDirectiveNameCharacter = (value: string): boolean =>
    isAsciiLetter(value) ||
    (value >= "0" && value <= "9") ||
    value === "_" ||
    value === "-";

const parseDeprecatedAdmonitionTitleLine = (
    line: string
): null | Readonly<{ directive: string; title: string }> => {
    if (!line.startsWith(":::")) {
        return null;
    }

    let cursor = 3;
    const firstDirectiveCharacter = line[cursor] ?? "";

    if (!isAsciiLetter(firstDirectiveCharacter)) {
        return null;
    }

    while (isDirectiveNameCharacter(line[cursor] ?? "")) {
        cursor += 1;
    }

    const directive = line.slice(0, cursor);
    const separatorCharacter = line[cursor];

    if (separatorCharacter === undefined) {
        return null;
    }

    if (separatorCharacter === "[" || separatorCharacter === "{") {
        return null;
    }

    if (separatorCharacter !== " " && separatorCharacter !== "\t") {
        return null;
    }

    while (line[cursor] === " " || line[cursor] === "\t") {
        cursor += 1;
    }

    const title = line.slice(cursor).trim();

    if (title.length === 0 || title.startsWith("[") || title.startsWith("{")) {
        return null;
    }

    return {
        directive,
        title,
    };
};

/** Rule module for `no-deprecated-admonition-title-syntax`. */
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
                        const parsedAdmonitionLine =
                            parseDeprecatedAdmonitionTitleLine(line.text);

                        if (parsedAdmonitionLine === null) {
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
                                    `${parsedAdmonitionLine.directive}[${parsedAdmonitionLine.title}]`
                                ),
                            loc: locator.createLoc(line.start, line.end),
                            messageId: "noDeprecatedAdmonitionTitleSyntax",
                        });
                    }
                },
            } satisfies TSESLint.RuleListener;
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow deprecated `:::type Title` admonition titles in MDX files and prefer bracket syntax for Docusaurus 3.10 strict MDX migration.",
                frozen: false,
                presets: [],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-admonition-title-syntax",
            },
            fixable: "code",
            messages: {
                noDeprecatedAdmonitionTitleSyntax:
                    "Docusaurus 3.10 strict MDX prefers admonition titles written as `:::type[Title]` instead of deprecated `:::type Title` syntax.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "no-deprecated-admonition-title-syntax",
    });

export default rule;
