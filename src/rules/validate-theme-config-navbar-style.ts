/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-navbar-style`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

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
const validNavbarStyles = new Set(["dark", "primary"]);

type MessageIds =
    | "setNavbarStyleDark"
    | "setNavbarStylePrimary"
    | "validateThemeConfigNavbarStyle";

type NavbarStyleSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

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

const createSetNavbarStyleSuggestion = (
    options: Readonly<{
        messageId: "setNavbarStyleDark" | "setNavbarStylePrimary";
        property: Readonly<TSESTree.Property>;
        styleExpression: Readonly<TSESTree.Expression>;
        value: "dark" | "primary";
    }>
): NavbarStyleSuggestion => ({
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

/** Rule module for `validate-theme-config-navbar-style`. */
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

                    const navbarObject = getObjectExpressionPropertyValueByName(
                        themeConfigObject,
                        "navbar"
                    );

                    if (navbarObject === null) {
                        return;
                    }

                    const styleProperty = findObjectPropertyByName(
                        navbarObject,
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

                        if (validNavbarStyles.has(normalizedStyle)) {
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
                                    messageId: "validateThemeConfigNavbarStyle",
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
                        messageId: "validateThemeConfigNavbarStyle",
                        node: styleExpression,
                        suggest: [
                            createSetNavbarStyleSuggestion({
                                messageId: "setNavbarStyleDark",
                                property: styleProperty,
                                styleExpression,
                                value: "dark",
                            }),
                            createSetNavbarStyleSuggestion({
                                messageId: "setNavbarStylePrimary",
                                property: styleProperty,
                                styleExpression,
                                value: "primary",
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
                    "require static `themeConfig.navbar.style` values to use supported Docusaurus navbar styles.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-navbar-style",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                setNavbarStyleDark:
                    'Set `themeConfig.navbar.style` to `"dark"`.',
                setNavbarStylePrimary:
                    'Set `themeConfig.navbar.style` to `"primary"`.',
                validateThemeConfigNavbarStyle:
                    'Configure `themeConfig.navbar.style` with a supported static value (`"dark"` or `"primary"`).',
            },
            schema: [],
            type: "problem",
        },
        name: "validate-theme-config-navbar-style",
    });

export default rule;
