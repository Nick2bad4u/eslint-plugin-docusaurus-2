/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-navbar-item-position`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getExpressionFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDocusaurusThemeConfigArrayItemContext } from "../_internal/docusaurus-theme-config-link-items.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "setNavbarItemPositionLeft"
    | "setNavbarItemPositionRight"
    | "validateNavbarItemPosition";

type NavbarPositionSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === "Literal" ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const canAutofixPositionExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    (expression.type === "Literal" && typeof expression.value === "string") ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const normalizePosition = (position: string): string =>
    position.trim().toLowerCase();

const isValidNavbarPosition = (position: string): boolean =>
    position === "left" || position === "right";

const createReplacePositionFix =
    (
        options: Readonly<{
            expression: Readonly<TSESTree.Expression>;
            positionProperty: Readonly<TSESTree.Property>;
            replacement: "left" | "right";
        }>
    ): NavbarPositionSuggestion["fix"] =>
    (fixer) =>
        options.positionProperty.shorthand
            ? fixer.replaceText(
                  options.positionProperty,
                  `position: ${JSON.stringify(options.replacement)}`
              )
            : fixer.replaceText(
                  options.expression,
                  JSON.stringify(options.replacement)
              );

const createSetPositionSuggestion = (
    options: Readonly<{
        expression: Readonly<TSESTree.Expression>;
        messageId: "setNavbarItemPositionLeft" | "setNavbarItemPositionRight";
        positionProperty: Readonly<TSESTree.Property>;
        replacement: "left" | "right";
    }>
): NavbarPositionSuggestion => ({
    fix: createReplacePositionFix(options),
    messageId: options.messageId,
});

/** Rule module for `validate-navbar-item-position`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (
                        getDocusaurusThemeConfigArrayItemContext(node) !==
                        "navbar"
                    ) {
                        return;
                    }

                    const positionProperty = findObjectPropertyByName(
                        node,
                        "position"
                    );

                    if (positionProperty === null) {
                        return;
                    }

                    const positionExpression =
                        positionProperty.value as TSESTree.Expression;
                    const staticPositionValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            positionExpression,
                            context.sourceCode.ast
                        );

                    if (staticPositionValue !== null) {
                        const normalizedPosition =
                            normalizePosition(staticPositionValue);

                        if (isValidNavbarPosition(normalizedPosition)) {
                            if (staticPositionValue === normalizedPosition) {
                                return;
                            }

                            if (
                                canAutofixPositionExpression(positionExpression)
                            ) {
                                reportWithOptionalFix({
                                    context,
                                    fix: (fixer) =>
                                        fixer.replaceText(
                                            positionExpression,
                                            JSON.stringify(normalizedPosition)
                                        ),
                                    messageId: "validateNavbarItemPosition",
                                    node: positionExpression,
                                });

                                return;
                            }
                        }

                        context.report({
                            messageId: "validateNavbarItemPosition",
                            node: positionExpression,
                            suggest: [
                                createSetPositionSuggestion({
                                    expression: positionExpression,
                                    messageId: "setNavbarItemPositionLeft",
                                    positionProperty,
                                    replacement: "left",
                                }),
                                createSetPositionSuggestion({
                                    expression: positionExpression,
                                    messageId: "setNavbarItemPositionRight",
                                    positionProperty,
                                    replacement: "right",
                                }),
                            ],
                        });

                        return;
                    }

                    const resolvedPositionExpression =
                        getExpressionFromExpressionOrIdentifier(
                            positionExpression,
                            context.sourceCode.ast
                        );

                    if (
                        resolvedPositionExpression === null ||
                        !isStaticLiteralLikeExpression(
                            resolvedPositionExpression
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "validateNavbarItemPosition",
                        node: positionExpression,
                        suggest: [
                            createSetPositionSuggestion({
                                expression: positionExpression,
                                messageId: "setNavbarItemPositionLeft",
                                positionProperty,
                                replacement: "left",
                            }),
                            createSetPositionSuggestion({
                                expression: positionExpression,
                                messageId: "setNavbarItemPositionRight",
                                positionProperty,
                                replacement: "right",
                            }),
                        ],
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require static navbar item `position` values to use canonical `left` or `right` strings.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-navbar-item-position",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                setNavbarItemPositionLeft:
                    "Set navbar item `position` to `left`.",
                setNavbarItemPositionRight:
                    "Set navbar item `position` to `right`.",
                validateNavbarItemPosition:
                    "Navbar item `position` should be `left` or `right` when configured statically.",
            },
            schema: [],
            type: "problem",
        },
        name: "validate-navbar-item-position",
    });

export default rule;
