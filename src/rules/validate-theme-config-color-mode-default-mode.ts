import type { ArrayElement } from "type-fest";

/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-color-mode-default-mode`.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { arrayFirst, setHas } from "ts-extras";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getObjectPropertyValueExpression,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const validDefaultModes = new Set(["dark", "light"]);

type ColorModeDefaultModeContext = TSESLint.RuleContext<
    MessageIds,
    typeof defaultOptions
>;

type ColorModeDefaultModeSuggestion = ArrayElement<
    NonNullable<
        Parameters<
            TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
        >[0]["suggest"]
    >
>;

type MessageIds =
    | "requireColorModeDefaultMode"
    | "setColorModeDefaultModeDark"
    | "setColorModeDefaultModeLight";

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === AST_NODE_TYPES.Literal ||
    (expression.type === AST_NODE_TYPES.TemplateLiteral &&
        expression.expressions.length === 0);

const canAutofixStringExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    (expression.type === AST_NODE_TYPES.Literal &&
        typeof expression.value === "string") ||
    (expression.type === AST_NODE_TYPES.TemplateLiteral &&
        expression.expressions.length === 0);

const createInsertDefaultModeFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    colorModeObject: Readonly<TSESTree.ObjectExpression>,
    defaultMode: "dark" | "light"
): TSESLint.RuleFix => {
    const defaultModePropertyText = `defaultMode: ${JSON.stringify(defaultMode)}`;
    const firstProperty = arrayFirst(colorModeObject.properties);

    if (firstProperty === undefined) {
        return fixer.insertTextAfterRange(
            [
                arrayFirst(colorModeObject.range),
                arrayFirst(colorModeObject.range) + 1,
            ],
            ` ${defaultModePropertyText} `
        );
    }

    return fixer.insertTextBefore(
        firstProperty,
        `${defaultModePropertyText}, `
    );
};

const createReplaceDefaultModeFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    defaultModeProperty: Readonly<TSESTree.Property>,
    defaultModeExpression: Readonly<TSESTree.Expression>,
    defaultMode: "dark" | "light"
): TSESLint.RuleFix =>
    defaultModeProperty.shorthand
        ? fixer.replaceText(
              defaultModeProperty,
              `defaultMode: ${JSON.stringify(defaultMode)}`
          )
        : fixer.replaceText(defaultModeExpression, JSON.stringify(defaultMode));

const createSetDefaultModeSuggestion = (
    options: Readonly<{
        colorModeObject: Readonly<TSESTree.ObjectExpression>;
        defaultMode: "dark" | "light";
        defaultModeExpression: null | Readonly<TSESTree.Expression>;
        defaultModeProperty: null | Readonly<TSESTree.Property>;
        messageId:
            "setColorModeDefaultModeDark" | "setColorModeDefaultModeLight";
    }>
): ColorModeDefaultModeSuggestion => ({
    fix: (fixer) =>
        options.defaultModeProperty === null ||
        options.defaultModeExpression === null
            ? createInsertDefaultModeFix(
                  fixer,
                  options.colorModeObject,
                  options.defaultMode
              )
            : createReplaceDefaultModeFix(
                  fixer,
                  options.defaultModeProperty,
                  options.defaultModeExpression,
                  options.defaultMode
              ),
    messageId: options.messageId,
});

const reportNormalizedDefaultModeIfNeeded = (
    options: Readonly<{
        context: Readonly<ColorModeDefaultModeContext>;
        defaultModeExpression: Readonly<TSESTree.Expression>;
        staticDefaultMode: null | string;
    }>
): boolean => {
    if (options.staticDefaultMode === null) {
        return false;
    }

    const normalizedDefaultMode = options.staticDefaultMode
        .trim()
        .toLowerCase();

    if (!setHas(validDefaultModes, normalizedDefaultMode)) {
        return false;
    }

    if (options.staticDefaultMode === normalizedDefaultMode) {
        return true;
    }

    if (!canAutofixStringExpression(options.defaultModeExpression)) {
        return false;
    }

    reportWithOptionalFix({
        context: options.context,
        fix: (fixer) =>
            fixer.replaceText(
                options.defaultModeExpression,
                JSON.stringify(normalizedDefaultMode)
            ),
        messageId: "requireColorModeDefaultMode",
        node: options.defaultModeExpression,
    });

    return true;
};

/** Rule module for `validate-theme-config-color-mode-default-mode`. */
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

                    const colorModeExpression = getObjectPropertyValueByName(
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

                    const defaultModeProperty = findObjectPropertyByName(
                        colorModeObject,
                        "defaultMode"
                    );

                    if (defaultModeProperty === null) {
                        context.report({
                            messageId: "requireColorModeDefaultMode",
                            node: colorModeObject,
                            suggest: [
                                createSetDefaultModeSuggestion({
                                    colorModeObject,
                                    defaultMode: "light",
                                    defaultModeExpression: null,
                                    defaultModeProperty: null,
                                    messageId: "setColorModeDefaultModeLight",
                                }),
                                createSetDefaultModeSuggestion({
                                    colorModeObject,
                                    defaultMode: "dark",
                                    defaultModeExpression: null,
                                    defaultModeProperty: null,
                                    messageId: "setColorModeDefaultModeDark",
                                }),
                            ],
                        });

                        return;
                    }

                    const defaultModeExpression =
                        getObjectPropertyValueExpression(defaultModeProperty);
                    const staticDefaultMode =
                        getStaticStringValueFromExpressionOrIdentifier(
                            defaultModeExpression,
                            programNode
                        );

                    if (
                        reportNormalizedDefaultModeIfNeeded({
                            context,
                            defaultModeExpression,
                            staticDefaultMode,
                        })
                    ) {
                        return;
                    }

                    if (
                        staticDefaultMode === null &&
                        !isStaticLiteralLikeExpression(defaultModeExpression)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireColorModeDefaultMode",
                        node: defaultModeExpression,
                        suggest: [
                            createSetDefaultModeSuggestion({
                                colorModeObject,
                                defaultMode: "light",
                                defaultModeExpression,
                                defaultModeProperty,
                                messageId: "setColorModeDefaultModeLight",
                            }),
                            createSetDefaultModeSuggestion({
                                colorModeObject,
                                defaultMode: "dark",
                                defaultModeExpression,
                                defaultModeProperty,
                                messageId: "setColorModeDefaultModeDark",
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
                    'require `themeConfig.colorMode.defaultMode` to be present and to use the canonical `"light"` or `"dark"` values when colorMode config is authored statically.',
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-color-mode-default-mode",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                requireColorModeDefaultMode:
                    'Configure `themeConfig.colorMode.defaultMode` as `"light"` or `"dark"` when `colorMode` is authored statically.',
                setColorModeDefaultModeDark:
                    'Set `themeConfig.colorMode.defaultMode` to `"dark"`.',
                setColorModeDefaultModeLight:
                    'Set `themeConfig.colorMode.defaultMode` to `"light"`.',
            },
            schema: [],
            type: "problem",
        },
        name: "validate-theme-config-color-mode-default-mode",
    });

export default rule;
