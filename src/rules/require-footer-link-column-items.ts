/**
 * @packageDocumentation
 * ESLint rule implementation for `require-footer-link-column-items`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findDocusaurusFooterLinkColumnObjects } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "requireFooterLinkColumnItems"
    | "requireFooterLinkColumnItemsArray";

const hasPresentFooterColumnTitle = (
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

/** Rule module for `require-footer-link-column-items`. */
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

                    for (const footerLinkColumn of findDocusaurusFooterLinkColumnObjects(
                        configObjectExpression
                    )) {
                        const titleExpression = getObjectPropertyValueByName(
                            footerLinkColumn,
                            "title"
                        );

                        if (
                            !hasPresentFooterColumnTitle(
                                titleExpression,
                                programNode
                            )
                        ) {
                            continue;
                        }

                        const itemsProperty = findObjectPropertyByName(
                            footerLinkColumn,
                            "items"
                        );

                        if (itemsProperty === null) {
                            context.report({
                                messageId: "requireFooterLinkColumnItems",
                                node: footerLinkColumn,
                            });

                            continue;
                        }

                        const itemsExpression =
                            itemsProperty.value as TSESTree.Expression;

                        if (
                            itemsExpression.type === "ArrayExpression" ||
                            itemsExpression.type === "Identifier"
                        ) {
                            continue;
                        }

                        context.report({
                            messageId: "requireFooterLinkColumnItemsArray",
                            node: itemsProperty.value,
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require an `items` array for Docusaurus footer link columns.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-items",
            },
            messages: {
                requireFooterLinkColumnItems:
                    "Docusaurus footer link columns should include an `items` array.",
                requireFooterLinkColumnItemsArray:
                    "Docusaurus footer link column `items` should be configured as an array when authored statically.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-footer-link-column-items",
    });

export default rule;
