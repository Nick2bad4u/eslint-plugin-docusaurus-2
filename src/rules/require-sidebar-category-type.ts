/**
 * @packageDocumentation
 * ESLint rule implementation for `require-sidebar-category-type`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getStaticStringValue,
    isDocusaurusSidebarCategoryObject,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferSidebarCategoryType" | "requireSidebarCategoryType";

const createInsertCategoryTypeFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    sourceCode: Readonly<TSESLint.SourceCode>,
    categoryObject: Readonly<TSESTree.ObjectExpression>
): TSESLint.RuleFix => {
    const firstProperty = categoryObject.properties[0];

    if (firstProperty === undefined) {
        return fixer.insertTextAfterRange(
            [categoryObject.range[0], categoryObject.range[0] + 1],
            'type: "category"'
        );
    }

    const leadingTrivia = sourceCode.text.slice(
        categoryObject.range[0] + 1,
        firstProperty.range[0]
    );

    return fixer.insertTextAfterRange(
        [categoryObject.range[0], categoryObject.range[0] + 1],
        `${leadingTrivia}type: "category",`
    );
};

/** Rule module for `require-sidebar-category-type`. */
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

                    const typeProperty = findObjectPropertyByName(node, "type");

                    if (typeProperty === null) {
                        reportWithOptionalFix({
                            context,
                            fix(fixer) {
                                return createInsertCategoryTypeFix(
                                    fixer,
                                    context.sourceCode,
                                    node
                                );
                            },
                            messageId: "requireSidebarCategoryType",
                            node,
                        });

                        return;
                    }

                    const typeValue = getStaticStringValue(
                        typeProperty.value as TSESTree.Expression
                    );

                    if (typeValue === null || typeValue === "category") {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return fixer.replaceText(
                                typeProperty.value,
                                '"category"'
                            );
                        },
                        messageId: "preferSidebarCategoryType",
                        node: typeProperty.value,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    'require `type: "category"` for Docusaurus sidebar category objects.',
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-type",
            },
            fixable: "code",
            messages: {
                preferSidebarCategoryType:
                    'This sidebar item should use `type: "category"` because it has category-shaped fields such as `items`.',
                requireSidebarCategoryType:
                    'Docusaurus sidebar category objects should declare `type: "category"` explicitly.',
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-sidebar-category-type",
    });

export default rule;
