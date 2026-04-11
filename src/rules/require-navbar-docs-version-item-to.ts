/**
 * @packageDocumentation
 * ESLint rule implementation for `require-navbar-docs-version-item-to`.
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

type MessageIds = "requireNavbarDocsVersionItemTo";

const hasPresentToValue = (
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

/** Rule module for `require-navbar-docs-version-item-to`. */
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
                        getStaticStringValue(typeExpression) !== "docsVersion"
                    ) {
                        return;
                    }

                    const toExpression = getObjectPropertyValueByName(
                        node,
                        "to"
                    );

                    if (
                        hasPresentToValue(toExpression, context.sourceCode.ast)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireNavbarDocsVersionItemTo",
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
                    'require `to` for Docusaurus navbar items with `type: "docsVersion"`.',
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-docs-version-item-to",
            },
            messages: {
                requireNavbarDocsVersionItemTo:
                    'Docusaurus navbar items with `type: "docsVersion"` should include a non-empty `to` field.',
            },
            schema: [],
            type: "problem",
        },
        name: "require-navbar-docs-version-item-to",
    });

export default rule;
