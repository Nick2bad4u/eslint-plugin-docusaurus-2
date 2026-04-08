/**
 * @packageDocumentation
 * ESLint rule implementation for `no-useless-collapsed-sidebar-categories`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    isDocusaurusSidebarCategoryObject,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noUselessCollapsedSidebarCategory";

const getBooleanLiteralValue = (
    expression: Readonly<TSESTree.Expression>
): boolean | undefined =>
    expression.type === "Literal" && typeof expression.value === "boolean"
        ? expression.value
        : undefined;

const createRemoveObjectPropertyFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyToRemove: Readonly<TSESTree.Property>
): TSESLint.RuleFix => {
    const propertyIndex = objectExpression.properties.indexOf(propertyToRemove);

    if (propertyIndex === -1) {
        return fixer.remove(propertyToRemove);
    }

    if (objectExpression.properties.length === 1) {
        return fixer.remove(propertyToRemove);
    }

    const nextProperty = objectExpression.properties[propertyIndex + 1];

    if (nextProperty !== undefined) {
        return fixer.removeRange([
            propertyToRemove.range[0],
            nextProperty.range[0],
        ]);
    }

    const previousProperty = objectExpression.properties[propertyIndex - 1];

    if (previousProperty === undefined) {
        return fixer.remove(propertyToRemove);
    }

    return fixer.removeRange([
        previousProperty.range[1],
        propertyToRemove.range[1],
    ]);
};

/** Rule module for `no-useless-collapsed-sidebar-categories`. */
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

                    const collapsibleProperty = findObjectPropertyByName(
                        node,
                        "collapsible"
                    );
                    const collapsedProperty = findObjectPropertyByName(
                        node,
                        "collapsed"
                    );

                    if (
                        collapsibleProperty === null ||
                        collapsedProperty === null
                    ) {
                        return;
                    }

                    const collapsibleValue = getBooleanLiteralValue(
                        collapsibleProperty.value as TSESTree.Expression
                    );

                    if (collapsibleValue !== false) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return createRemoveObjectPropertyFix(
                                fixer,
                                node,
                                collapsedProperty
                            );
                        },
                        messageId: "noUselessCollapsedSidebarCategory",
                        node: collapsedProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `collapsed` on Docusaurus sidebar categories that already set `collapsible: false`.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-useless-collapsed-sidebar-categories",
            },
            fixable: "code",
            messages: {
                noUselessCollapsedSidebarCategory:
                    "Do not set `collapsed` when `collapsible: false` is already present. Docusaurus ignores `collapsed` in that configuration.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-useless-collapsed-sidebar-categories",
    });

export default rule;
