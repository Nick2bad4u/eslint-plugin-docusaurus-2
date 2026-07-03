import type { ArrayElement } from "type-fest";

/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-footer-style`.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { setHas } from "ts-extras";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueExpression,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const validFooterStyles = new Set(["dark", "light"]);

type FooterStyleContext = TSESLint.RuleContext<
    MessageIds,
    typeof defaultOptions
>;

type FooterStyleSuggestion = ArrayElement<
    NonNullable<
        Parameters<
            TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
        >[0]["suggest"]
    >
>;

type MessageIds =
    | "setFooterStyleDark"
    | "setFooterStyleLight"
    | "validateThemeConfigFooterStyle";

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

const createSetFooterStyleSuggestion = (
    options: Readonly<{
        messageId: "setFooterStyleDark" | "setFooterStyleLight";
        property: Readonly<TSESTree.Property>;
        styleExpression: Readonly<TSESTree.Expression>;
        value: "dark" | "light";
    }>
): FooterStyleSuggestion => ({
    fix: (fixer) =>
        options.property.shorthand
            ? fixer.replaceText(
                  options.property,
                  `style: ${JSON.stringify(options.value)}`
              )
            : fixer.replaceText(
                  options.styleExpression,
                  JSON.stringify(options.value)
              ),
    messageId: options.messageId,
});

const reportNormalizedFooterStyleIfNeeded = (
    options: Readonly<{
        context: Readonly<FooterStyleContext>;
        staticStyle: null | string;
        styleExpression: Readonly<TSESTree.Expression>;
    }>
): boolean => {
    if (options.staticStyle === null) {
        return false;
    }

    const normalizedStyle = options.staticStyle.trim().toLowerCase();

    if (!setHas(validFooterStyles, normalizedStyle)) {
        return false;
    }

    if (options.staticStyle === normalizedStyle) {
        return true;
    }

    if (!canAutofixStringExpression(options.styleExpression)) {
        return false;
    }

    reportWithOptionalFix({
        context: options.context,
        fix: (fixer) =>
            fixer.replaceText(
                options.styleExpression,
                JSON.stringify(normalizedStyle)
            ),
        messageId: "validateThemeConfigFooterStyle",
        node: options.styleExpression,
    });

    return true;
};

/** Rule module for `validate-theme-config-footer-style`. */
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

                    const footerObject = getObjectExpressionPropertyValueByName(
                        themeConfigObject,
                        "footer"
                    );

                    if (footerObject === null) {
                        return;
                    }

                    const styleProperty = findObjectPropertyByName(
                        footerObject,
                        "style"
                    );

                    if (styleProperty === null) {
                        return;
                    }

                    const styleExpression =
                        getObjectPropertyValueExpression(styleProperty);
                    const staticStyle =
                        getStaticStringValueFromExpressionOrIdentifier(
                            styleExpression,
                            programNode
                        );

                    if (
                        reportNormalizedFooterStyleIfNeeded({
                            context,
                            staticStyle,
                            styleExpression,
                        })
                    ) {
                        return;
                    }

                    if (
                        staticStyle === null &&
                        !isStaticLiteralLikeExpression(styleExpression)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "validateThemeConfigFooterStyle",
                        node: styleExpression,
                        suggest: [
                            createSetFooterStyleSuggestion({
                                messageId: "setFooterStyleDark",
                                property: styleProperty,
                                styleExpression,
                                value: "dark",
                            }),
                            createSetFooterStyleSuggestion({
                                messageId: "setFooterStyleLight",
                                property: styleProperty,
                                styleExpression,
                                value: "light",
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
                    "require static `themeConfig.footer.style` values to use supported Docusaurus footer styles.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-footer-style",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                setFooterStyleDark:
                    'Set `themeConfig.footer.style` to `"dark"`.',
                setFooterStyleLight:
                    'Set `themeConfig.footer.style` to `"light"`.',
                validateThemeConfigFooterStyle:
                    'Configure `themeConfig.footer.style` with a supported static value (`"dark"` or `"light"`).',
            },
            schema: [],
            type: "problem",
        },
        name: "validate-theme-config-footer-style",
    });

export default rule;
