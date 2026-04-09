/**
 * @packageDocumentation
 * ESLint rule implementation for `require-base-url-issue-banner-enabled`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getStaticBooleanValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireBaseUrlIssueBannerEnabled";

const isBooleanLiteralExpression = (
    expression: Readonly<TSESTree.Expression>
): expression is TSESTree.Literal =>
    expression.type === "Literal" && typeof expression.value === "boolean";

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === "Literal" ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

/** Rule module for `require-base-url-issue-banner-enabled`. */
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

                    const issueBannerProperty = findObjectPropertyByName(
                        configObjectExpression,
                        "baseUrlIssueBanner"
                    );

                    if (issueBannerProperty === null) {
                        context.report({
                            messageId: "requireBaseUrlIssueBannerEnabled",
                            node: configObjectExpression,
                        });

                        return;
                    }

                    const issueBannerExpression =
                        issueBannerProperty.value as TSESTree.Expression;
                    const staticIssueBannerValue =
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            issueBannerExpression,
                            programNode
                        );

                    if (staticIssueBannerValue === true) {
                        return;
                    }

                    const shouldReportIssueBannerValue =
                        staticIssueBannerValue === false ||
                        staticIssueBannerValue === null ||
                        isStaticLiteralLikeExpression(issueBannerExpression);

                    if (!shouldReportIssueBannerValue) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix:
                            isBooleanLiteralExpression(issueBannerExpression) &&
                            issueBannerExpression.value === false
                                ? (fixer) =>
                                      fixer.replaceText(
                                          issueBannerExpression,
                                          "true"
                                      )
                                : null,
                        messageId: "requireBaseUrlIssueBannerEnabled",
                        node: issueBannerExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `baseUrlIssueBanner` to be explicitly enabled so deployments surface base URL mismatch warnings.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-base-url-issue-banner-enabled",
            },
            fixable: "code",
            messages: {
                requireBaseUrlIssueBannerEnabled:
                    "Configure `baseUrlIssueBanner` as `true` so Docusaurus surfaces base URL mismatch warnings in non-production environments.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-base-url-issue-banner-enabled",
    });

export default rule;
