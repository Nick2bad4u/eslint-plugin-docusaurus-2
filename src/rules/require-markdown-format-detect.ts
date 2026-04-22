/**
 * @packageDocumentation
 * ESLint rule implementation for `require-markdown-format-detect`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayAt } from "ts-extras";

import {
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValue,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createInsertObjectPropertyFix } from "../_internal/object-literal-fixes.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const detectMarkdownFormat = "detect" as const;

type MessageIds = "requireMarkdownFormatDetect";

const createInsertMarkdownFormatFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    markdownObjectExpression: Readonly<TSESTree.ObjectExpression>,
    sourceCode: Readonly<TSESLint.SourceCode>
): TSESLint.RuleFix => {
    const lastProperty = arrayAt(markdownObjectExpression.properties, -1);

    if (lastProperty === undefined) {
        return fixer.replaceText(
            markdownObjectExpression,
            `{ format: "${detectMarkdownFormat}" }`
        );
    }

    return createInsertObjectPropertyFix({
        fixer,
        indentation: "        ",
        objectExpression: markdownObjectExpression,
        propertyText: `format: "${detectMarkdownFormat}"`,
        sourceCode,
    });
};

const getMarkdownFormatFix = (
    context: Readonly<TSESLint.RuleContext<MessageIds, typeof defaultOptions>>,
    markdownObjectExpression: Readonly<TSESTree.ObjectExpression>,
    formatExpression: null | Readonly<TSESTree.Expression>
): null | TSESLint.ReportFixFunction => {
    if (formatExpression === null) {
        return (fixer) =>
            createInsertMarkdownFormatFix(
                fixer,
                markdownObjectExpression,
                context.sourceCode
            );
    }

    return getStaticStringValue(formatExpression) === null
        ? null
        : (fixer) => fixer.replaceText(formatExpression, '"detect"');
};

/** Rule module for `require-markdown-format-detect`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                Program(programNode: TSESTree.Program) {
                    const configObjectExpression =
                        getDefaultExportedObjectExpression(programNode);

                    if (configObjectExpression === null) {
                        return;
                    }

                    const markdownObjectExpression =
                        getObjectExpressionPropertyValueByName(
                            configObjectExpression,
                            "markdown",
                            programNode
                        );

                    if (markdownObjectExpression === null) {
                        return;
                    }

                    const formatExpression = getObjectPropertyValueByName(
                        markdownObjectExpression,
                        "format"
                    );

                    if (formatExpression === null) {
                        reportWithOptionalFix({
                            context,
                            fix: getMarkdownFormatFix(
                                context,
                                markdownObjectExpression,
                                formatExpression
                            ),
                            messageId: "requireMarkdownFormatDetect",
                            node: markdownObjectExpression,
                        });

                        return;
                    }

                    const formatValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            formatExpression,
                            programNode
                        );

                    if (formatValue === detectMarkdownFormat) {
                        return;
                    }

                    if (formatValue === null) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: getMarkdownFormatFix(
                            context,
                            markdownObjectExpression,
                            formatExpression
                        ),
                        messageId: "requireMarkdownFormatDetect",
                        node: formatExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    'require `markdown.format` to be `"detect"` when a Docusaurus markdown config object is used.',
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-markdown-format-detect",
            },
            fixable: "code",
            messages: {
                requireMarkdownFormatDetect:
                    'Set `markdown.format` to `"detect"` when configuring `markdown`. Docusaurus recommends `detect` so `.md` files use CommonMark while `.mdx` files keep MDX parsing.',
            },
            schema: [],
            type: "problem",
        },
        name: "require-markdown-format-detect",
    });

export default rule;
