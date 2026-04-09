/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-announcement-bar-is-closeable`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getExpressionFromExpressionOrIdentifier,
    getObjectExpressionPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type AnnouncementBarFlagSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

type MessageIds =
    | "setAnnouncementBarCloseableFalse"
    | "setAnnouncementBarCloseableTrue"
    | "validateAnnouncementBarIsCloseable";

const canAutofixStringExpression = (
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

const getBooleanValueFromStaticString = (value: string): boolean | null => {
    const normalizedValue = value.trim().toLowerCase();

    if (normalizedValue === "true") {
        return true;
    }

    if (normalizedValue === "false") {
        return false;
    }

    return null;
};

const createSetIsCloseableSuggestion = (
    options: Readonly<{
        expression: Readonly<TSESTree.Expression>;
        messageId:
            | "setAnnouncementBarCloseableFalse"
            | "setAnnouncementBarCloseableTrue";
        property: Readonly<TSESTree.Property>;
        value: boolean;
    }>
): AnnouncementBarFlagSuggestion => ({
    fix: (fixer) =>
        options.property.shorthand
            ? fixer.replaceText(
                  options.property,
                  `isCloseable: ${String(options.value)}`
              )
            : fixer.replaceText(options.expression, String(options.value)),
    messageId: options.messageId,
});

/** Rule module for `validate-theme-config-announcement-bar-is-closeable`. */
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

                    const themeConfigObject =
                        getObjectExpressionPropertyValueByName(
                            configObjectExpression,
                            "themeConfig"
                        );

                    if (themeConfigObject === null) {
                        return;
                    }

                    const announcementBarObject =
                        getObjectExpressionPropertyValueByName(
                            themeConfigObject,
                            "announcementBar"
                        );

                    if (announcementBarObject === null) {
                        return;
                    }

                    const isCloseableProperty = findObjectPropertyByName(
                        announcementBarObject,
                        "isCloseable"
                    );

                    if (isCloseableProperty === null) {
                        return;
                    }

                    const isCloseableExpression =
                        isCloseableProperty.value as TSESTree.Expression;
                    const staticBooleanValue =
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            isCloseableExpression,
                            programNode
                        );

                    if (
                        staticBooleanValue === true ||
                        staticBooleanValue === false
                    ) {
                        return;
                    }

                    const staticStringValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            isCloseableExpression,
                            programNode
                        );
                    const booleanValueFromStaticString =
                        staticStringValue === null
                            ? null
                            : getBooleanValueFromStaticString(
                                  staticStringValue
                              );
                    const resolvedExpression =
                        getExpressionFromExpressionOrIdentifier(
                            isCloseableExpression,
                            programNode
                        );

                    if (booleanValueFromStaticString !== null) {
                        if (canAutofixStringExpression(isCloseableExpression)) {
                            reportWithOptionalFix({
                                context,
                                fix: (fixer) =>
                                    fixer.replaceText(
                                        isCloseableExpression,
                                        String(booleanValueFromStaticString)
                                    ),
                                messageId: "validateAnnouncementBarIsCloseable",
                                node: isCloseableExpression,
                            });

                            return;
                        }
                    } else if (
                        resolvedExpression === null ||
                        !isStaticLiteralLikeExpression(resolvedExpression)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "validateAnnouncementBarIsCloseable",
                        node: isCloseableExpression,
                        suggest: [
                            createSetIsCloseableSuggestion({
                                expression: isCloseableExpression,
                                messageId: "setAnnouncementBarCloseableFalse",
                                property: isCloseableProperty,
                                value: false,
                            }),
                            createSetIsCloseableSuggestion({
                                expression: isCloseableExpression,
                                messageId: "setAnnouncementBarCloseableTrue",
                                property: isCloseableProperty,
                                value: true,
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
                    "require static `themeConfig.announcementBar.isCloseable` values to use booleans.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-announcement-bar-is-closeable",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                setAnnouncementBarCloseableFalse:
                    "Set `themeConfig.announcementBar.isCloseable` to `false`.",
                setAnnouncementBarCloseableTrue:
                    "Set `themeConfig.announcementBar.isCloseable` to `true`.",
                validateAnnouncementBarIsCloseable:
                    "Configure `themeConfig.announcementBar.isCloseable` with a boolean value (`true` or `false`) when authored statically.",
            },
            schema: [],
            type: "problem",
        },
        name: "validate-theme-config-announcement-bar-is-closeable",
    });

export default rule;
