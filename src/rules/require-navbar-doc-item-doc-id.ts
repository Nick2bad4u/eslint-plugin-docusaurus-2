/**
 * @packageDocumentation
 * ESLint rule implementation for `require-navbar-doc-item-doc-id`.
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

type MessageIds = "requireNavbarDocItemDocId";

const hasPresentStringField = (
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

/** Rule module for `require-navbar-doc-item-doc-id`. */
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
                        getStaticStringValue(typeExpression) !== "doc"
                    ) {
                        return;
                    }

                    const docIdExpression = getObjectPropertyValueByName(
                        node,
                        "docId"
                    );

                    if (
                        hasPresentStringField(
                            docIdExpression,
                            context.sourceCode.ast
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireNavbarDocItemDocId",
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
                    'require `docId` for Docusaurus navbar items with `type: "doc"`.',
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-item-doc-id",
            },
            messages: {
                requireNavbarDocItemDocId:
                    'Docusaurus navbar items with `type: "doc"` should include a non-empty `docId`.',
            },
            schema: [],
            type: "problem",
        },
        name: "require-navbar-doc-item-doc-id",
    });

export default rule;
