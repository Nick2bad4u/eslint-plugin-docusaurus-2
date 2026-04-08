/**
 * @packageDocumentation
 * ESLint rule implementation for `require-navbar-doc-sidebar-item-sidebar-id`.
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

type MessageIds = "requireNavbarDocSidebarItemSidebarId";

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

/** Rule module for `require-navbar-doc-sidebar-item-sidebar-id`. */
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
                        getStaticStringValue(typeExpression) !== "docSidebar"
                    ) {
                        return;
                    }

                    const sidebarIdExpression = getObjectPropertyValueByName(
                        node,
                        "sidebarId"
                    );

                    if (
                        hasPresentStringField(
                            sidebarIdExpression,
                            context.sourceCode.ast
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireNavbarDocSidebarItemSidebarId",
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
                    'require `sidebarId` for Docusaurus navbar items with `type: "docSidebar"`.',
                frozen: false,
                presets: [
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-sidebar-item-sidebar-id",
            },
            messages: {
                requireNavbarDocSidebarItemSidebarId:
                    'Docusaurus navbar items with `type: "docSidebar"` should include a non-empty `sidebarId`.',
            },
            schema: [],
            type: "problem",
        },
        name: "require-navbar-doc-sidebar-item-sidebar-id",
    });

export default rule;
