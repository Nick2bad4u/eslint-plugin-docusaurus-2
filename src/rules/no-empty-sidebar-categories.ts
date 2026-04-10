/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-sidebar-categories`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    isDocusaurusSidebarCategoryObject,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptySidebarCategories";

/** Rule module for `no-empty-sidebar-categories`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSidebarFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (!isDocusaurusSidebarCategoryObject(node)) {
                        return;
                    }

                    const itemsExpression = getObjectPropertyValueByName(
                        node,
                        "items"
                    );
                    const itemsArrayExpression =
                        itemsExpression === null
                            ? null
                            : getArrayExpressionFromExpressionOrIdentifier(
                                  itemsExpression,
                                  context.sourceCode.ast
                              );

                    if (
                        itemsArrayExpression === null ||
                        itemsArrayExpression.elements.length > 0
                    ) {
                        return;
                    }

                    const parentArray = node.parent;

                    if (parentArray?.type !== "ArrayExpression") {
                        return;
                    }

                    const siblingItems = parentArray.elements.filter(
                        (element): element is TSESTree.ObjectExpression =>
                            element?.type === "ObjectExpression"
                    );

                    context.report({
                        fix: (fixer) =>
                            createRemoveCommaSeparatedItemsFixes(
                                fixer,
                                context.sourceCode,
                                {
                                    container: parentArray,
                                    items: siblingItems,
                                    itemsToRemove: [node],
                                }
                            ),
                        messageId: "noEmptySidebarCategories",
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
                    "disallow sidebar category objects whose `items` arrays resolve statically to empty arrays.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-sidebar-categories",
            },
            fixable: "code",
            messages: {
                noEmptySidebarCategories:
                    "Remove empty sidebar category objects whose `items` arrays do not contain any entries.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-sidebar-categories",
    });

export default rule;
