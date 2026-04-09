/**
 * @packageDocumentation
 * ESLint rule implementation for `require-navbar-html-item-value`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getObjectPropertyValueByName,
    getStaticStringValue,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDocusaurusThemeConfigArrayItemContext } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireNavbarHtmlItemValue";

const hasPresentHtmlValue = (
    expression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (expression === null) {
        return false;
    }

    const staticValue = getStaticStringValueFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (staticValue !== null) {
        return staticValue.trim().length > 0;
    }

    return expression.type !== "Literal";
};

/** Rule module for `require-navbar-html-item-value`. */
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

                    const typeExpression = getObjectPropertyValueByName(
                        node,
                        "type"
                    );

                    if (
                        typeExpression === null ||
                        getStaticStringValue(typeExpression) !== "html"
                    ) {
                        return;
                    }

                    const valueExpression = getObjectPropertyValueByName(
                        node,
                        "value"
                    );

                    if (
                        hasPresentHtmlValue(
                            valueExpression,
                            context.sourceCode.ast
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireNavbarHtmlItemValue",
                        node,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    'require `value` for Docusaurus navbar items with `type: "html"`.',
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-html-item-value",
            },
            messages: {
                requireNavbarHtmlItemValue:
                    'Docusaurus navbar items with `type: "html"` should include a non-empty `value` string.',
            },
            schema: [],
            type: "problem",
        },
        name: "require-navbar-html-item-value",
    });

export default rule;
