/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-color-mode-switch-flags`.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getExpressionFromExpressionOrIdentifier,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueExpression,
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

type ColorModeFlagContext = TSESLint.RuleContext<
    MessageIds,
    typeof defaultOptions
>;

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
    (expression.type === AST_NODE_TYPES.Literal &&
        typeof expression.value === "string") ||
    (expression.type === AST_NODE_TYPES.TemplateLiteral &&
        expression.expressions.length === 0);

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === AST_NODE_TYPES.Literal ||
    (expression.type === AST_NODE_TYPES.TemplateLiteral &&
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

const isStaticBooleanValue = (
    value: boolean | null | undefined
): value is boolean => value === true || value === false;

const shouldIgnoreNonBooleanFlagExpression = (
    expression: null | Readonly<TSESTree.Expression>
): boolean => expression === null || !isStaticLiteralLikeExpression(expression);

const reportColorModeFlagIfNeeded = (
    options: Readonly<{
        context: Readonly<ColorModeFlagContext>;
        flagName: (typeof booleanColorModeFieldNames)[number];
        flagProperty: Readonly<TSESTree.Property>;
        programNode: Readonly<TSESTree.Program>;
    }>
): void => {
    const flagExpression = getObjectPropertyValueExpression(
        options.flagProperty
    );
    const staticBooleanValue = getStaticBooleanValueFromExpressionOrIdentifier(
        flagExpression,
        options.programNode
    );

    if (isStaticBooleanValue(staticBooleanValue)) {
        return;
    }

    const staticStringValue = getStaticStringValueFromExpressionOrIdentifier(
        flagExpression,
        options.programNode
    );
    const booleanValueFromStaticString =
        staticStringValue === null
            ? null
            : getBooleanValueFromStaticString(staticStringValue);
    const resolvedFlagExpression = getExpressionFromExpressionOrIdentifier(
        flagExpression,
        options.programNode
    );

    if (
        booleanValueFromStaticString !== null &&
        canAutofixStringExpression(flagExpression)
    ) {
        reportWithOptionalFix({
            context: options.context,
            data: { flagName: options.flagName },
            fix: (fixer) =>
                fixer.replaceText(
                    flagExpression,
                    String(booleanValueFromStaticString)
                ),
            messageId: "validateColorModeFlag",
            node: flagExpression,
        });

        return;
    }

    if (
        booleanValueFromStaticString === null &&
        shouldIgnoreNonBooleanFlagExpression(resolvedFlagExpression)
    ) {
        return;
    }

    options.context.report({
        data: { flagName: options.flagName },
        messageId: "validateColorModeFlag",
        node: flagExpression,
        suggest: [
            createSetColorModeFlagSuggestion({
                expression: flagExpression,
                flagName: options.flagName,
                messageId: "setColorModeFlagFalse",
                property: options.flagProperty,
                value: false,
            }),
            createSetColorModeFlagSuggestion({
                expression: flagExpression,
                flagName: options.flagName,
                messageId: "setColorModeFlagTrue",
                property: options.flagProperty,
                value: true,
            }),
        ],
    });
};

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

                        reportColorModeFlagIfNeeded({
                            context,
                            flagName,
                            flagProperty,
                            programNode,
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
