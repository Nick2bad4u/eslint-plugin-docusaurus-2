/**
 * @packageDocumentation
 * ESLint rule implementation for `require-base-url-slashes`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireBaseUrlSlashes";

const normalizeBaseUrlValue = (value: string): string => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0 || trimmedValue === "/") {
        return "/";
    }

    let startOffset = 0;
    while (trimmedValue[startOffset] === "/") {
        startOffset += 1;
    }

    let endOffset = trimmedValue.length;
    while (endOffset > startOffset && trimmedValue[endOffset - 1] === "/") {
        endOffset -= 1;
    }

    const withoutTrailingSlashes = trimmedValue.slice(startOffset, endOffset);

    return withoutTrailingSlashes.length === 0
        ? "/"
        : `/${withoutTrailingSlashes}/`;
};

const canAutofixBaseUrlExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    (expression.type === "Literal" && typeof expression.value === "string") ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === "Literal" ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

/** Rule module for `require-base-url-slashes`. */
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

                    const baseUrlProperty = findObjectPropertyByName(
                        configObjectExpression,
                        "baseUrl"
                    );

                    if (baseUrlProperty === null) {
                        return;
                    }

                    const baseUrlExpression =
                        baseUrlProperty.value as TSESTree.Expression;
                    const staticBaseUrlValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            baseUrlExpression,
                            programNode
                        );

                    if (staticBaseUrlValue === null) {
                        if (!isStaticLiteralLikeExpression(baseUrlExpression)) {
                            return;
                        }

                        context.report({
                            messageId: "requireBaseUrlSlashes",
                            node: baseUrlExpression,
                        });

                        return;
                    }

                    const normalizedBaseUrlValue =
                        normalizeBaseUrlValue(staticBaseUrlValue);

                    if (staticBaseUrlValue === normalizedBaseUrlValue) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: canAutofixBaseUrlExpression(baseUrlExpression)
                            ? (fixer) =>
                                  fixer.replaceText(
                                      baseUrlExpression,
                                      JSON.stringify(normalizedBaseUrlValue)
                                  )
                            : null,
                        messageId: "requireBaseUrlSlashes",
                        node: baseUrlExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `baseUrl` values to use rooted slash-wrapped paths (for example `/docs/`).",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-base-url-slashes",
            },
            fixable: "code",
            messages: {
                requireBaseUrlSlashes:
                    "Configure `baseUrl` as a rooted path that starts and ends with `/` (for example `/docs/`).",
            },
            schema: [],
            type: "problem",
        },
        name: "require-base-url-slashes",
    });

export default rule;
