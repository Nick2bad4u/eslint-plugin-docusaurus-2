/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-footer-style`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { setHas } from "ts-extras";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const validFooterStyles = new Set(["dark", "light"]);

type FooterStyleSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

type MessageIds =
    | "setFooterStyleDark"
    | "setFooterStyleLight"
    | "validateThemeConfigFooterStyle";

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
                        styleProperty.value as TSESTree.Expression;
                    const staticStyle =
                        getStaticStringValueFromExpressionOrIdentifier(
                            styleExpression,
                            programNode
                        );

                    if (staticStyle !== null) {
                        const normalizedStyle = staticStyle
                            .trim()
                            .toLowerCase();

                        if (setHas(validFooterStyles, normalizedStyle)) {
                            if (
                                staticStyle === normalizedStyle ||
                                !canAutofixStringExpression(styleExpression)
                            ) {
                                if (staticStyle === normalizedStyle) {
                                    return;
                                }
                            } else {
                                reportWithOptionalFix({
                                    context,
                                    fix: (fixer) =>
                                        fixer.replaceText(
                                            styleExpression,
                                            JSON.stringify(normalizedStyle)
                                        ),
                                    messageId: "validateThemeConfigFooterStyle",
                                    node: styleExpression,
                                });

                                return;
                            }
                        }
                    } else if (
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
