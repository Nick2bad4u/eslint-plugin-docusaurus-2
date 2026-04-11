/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-color-mode-switch-flags`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getExpressionFromExpressionOrIdentifier,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectExpressionPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const booleanColorModeFieldNames = [
    "disableSwitch",
    "respectPrefersColorScheme",
] as const;

type ColorModeFlagSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

type MessageIds =
    | "setColorModeFlagFalse"
    | "setColorModeFlagTrue"
    | "validateColorModeFlag";

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

const createSetColorModeFlagSuggestion = (
    options: Readonly<{
        expression: Readonly<TSESTree.Expression>;
        flagName: string;
        messageId: "setColorModeFlagFalse" | "setColorModeFlagTrue";
        property: Readonly<TSESTree.Property>;
        value: boolean;
    }>
): ColorModeFlagSuggestion => ({
    fix: (fixer) =>
        options.property.shorthand
            ? fixer.replaceText(
                  options.property,
                  `${options.flagName}: ${String(options.value)}`
              )
            : fixer.replaceText(options.expression, String(options.value)),
    messageId: options.messageId,
});

/** Rule module for `validate-theme-config-color-mode-switch-flags`. */
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

                    const colorModeExpression =
                        getObjectExpressionPropertyValueByName(
                            themeConfigObject,
                            "colorMode"
                        );
                    const colorModeObject =
                        colorModeExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  colorModeExpression,
                                  programNode
                              );

                    if (colorModeObject === null) {
                        return;
                    }

                    for (const flagName of booleanColorModeFieldNames) {
                        const flagProperty = findObjectPropertyByName(
                            colorModeObject,
                            flagName
                        );

                        if (flagProperty === null) {
                            continue;
                        }

                        const flagExpression =
                            flagProperty.value as TSESTree.Expression;
                        const staticBooleanValue =
                            getStaticBooleanValueFromExpressionOrIdentifier(
                                flagExpression,
                                programNode
                            );

                        if (
                            staticBooleanValue === true ||
                            staticBooleanValue === false
                        ) {
                            continue;
                        }

                        const staticStringValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                flagExpression,
                                programNode
                            );
                        const booleanValueFromStaticString =
                            staticStringValue === null
                                ? null
                                : getBooleanValueFromStaticString(
                                      staticStringValue
                                  );
                        const resolvedFlagExpression =
                            getExpressionFromExpressionOrIdentifier(
                                flagExpression,
                                programNode
                            );

                        if (booleanValueFromStaticString !== null) {
                            if (canAutofixStringExpression(flagExpression)) {
                                reportWithOptionalFix({
                                    context,
                                    data: { flagName },
                                    fix: (fixer) =>
                                        fixer.replaceText(
                                            flagExpression,
                                            String(booleanValueFromStaticString)
                                        ),
                                    messageId: "validateColorModeFlag",
                                    node: flagExpression,
                                });

                                continue;
                            }
                        } else if (
                            resolvedFlagExpression === null ||
                            !isStaticLiteralLikeExpression(
                                resolvedFlagExpression
                            )
                        ) {
                            continue;
                        }

                        context.report({
                            data: { flagName },
                            messageId: "validateColorModeFlag",
                            node: flagExpression,
                            suggest: [
                                createSetColorModeFlagSuggestion({
                                    expression: flagExpression,
                                    flagName,
                                    messageId: "setColorModeFlagFalse",
                                    property: flagProperty,
                                    value: false,
                                }),
                                createSetColorModeFlagSuggestion({
                                    expression: flagExpression,
                                    flagName,
                                    messageId: "setColorModeFlagTrue",
                                    property: flagProperty,
                                    value: true,
                                }),
                            ],
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require static `themeConfig.colorMode` switch flags to use boolean values.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-color-mode-switch-flags",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                setColorModeFlagFalse: "Set this color-mode flag to `false`.",
                setColorModeFlagTrue: "Set this color-mode flag to `true`.",
                validateColorModeFlag:
                    "Configure `themeConfig.colorMode.{{ flagName }}` with a boolean value (`true` or `false`) when authored statically.",
            },
            schema: [],
            type: "problem",
        },
        name: "validate-theme-config-color-mode-switch-flags",
    });

export default rule;
