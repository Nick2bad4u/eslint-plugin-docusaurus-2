/**
 * @packageDocumentation
 * ESLint rule implementation for `require-sidebar-category-label`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusSidebarCategoryObject,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireSidebarCategoryLabel";

const hasPresentCategoryLabel = (
    labelExpression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (labelExpression === null) {
        return false;
    }

    const staticValue = getStaticStringValueFromExpressionOrIdentifier(
        labelExpression,
        programNode
    );

    if (staticValue !== null) {
        return staticValue.trim().length > 0;
    }

    return labelExpression.type !== "Literal";
};

/** Rule module for `require-sidebar-category-label`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSidebarFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (
                        node.parent?.type !== "ArrayExpression" ||
                        !isDocusaurusSidebarCategoryObject(node)
                    ) {
                        return;
                    }

                    const labelExpression = getObjectPropertyValueByName(
                        node,
                        "label"
                    );

                    if (
                        hasPresentCategoryLabel(
                            labelExpression,
                            context.sourceCode.ast
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireSidebarCategoryLabel",
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
                    "require a non-empty `label` for explicit Docusaurus sidebar category objects.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-label",
            },
            messages: {
                requireSidebarCategoryLabel:
                    "Explicit Docusaurus sidebar category objects should include a non-empty `label`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-sidebar-category-label",
    });

export default rule;
