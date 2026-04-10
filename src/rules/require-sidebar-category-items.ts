/**
 * @packageDocumentation
 * ESLint rule implementation for `require-sidebar-category-items`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getStaticStringValue,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireSidebarCategoryItems";

/** Rule module for `require-sidebar-category-items`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSidebarFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (node.parent?.type !== "ArrayExpression") {
                        return;
                    }

                    const typeProperty = findObjectPropertyByName(node, "type");
                    const typeValue =
                        typeProperty === null
                            ? null
                            : getStaticStringValue(
                                  typeProperty.value as TSESTree.Expression
                              );

                    if (typeValue !== "category") {
                        return;
                    }

                    if (findObjectPropertyByName(node, "items") !== null) {
                        return;
                    }

                    context.report({
                        messageId: "requireSidebarCategoryItems",
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
                    "require `items` for explicit Docusaurus sidebar category objects.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-items",
            },
            messages: {
                requireSidebarCategoryItems:
                    "Explicit Docusaurus sidebar category objects should include an `items` array.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-sidebar-category-items",
    });

export default rule;
