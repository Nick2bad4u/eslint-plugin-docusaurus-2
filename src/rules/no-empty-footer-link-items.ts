/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-footer-link-items`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findDocusaurusFooterLinkColumnObjects } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyFooterLinkItems";

/** Rule module for `no-empty-footer-link-items`. */
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
                        const itemsExpression = getObjectPropertyValueByName(
                            footerLinkColumn,
                            "items"
                        );
                        const itemsArrayExpression =
                            itemsExpression === null
                                ? null
                                : getArrayExpressionFromExpressionOrIdentifier(
                                      itemsExpression,
                                      programNode
                                  );

                        if (itemsArrayExpression === null) {
                            continue;
                        }

                        const footerLinkItems =
                            itemsArrayExpression.elements.filter(
                                (
                                    element
                                ): element is TSESTree.ObjectExpression =>
                                    element?.type === "ObjectExpression"
                            );
                        const emptyFooterLinkItems = footerLinkItems.filter(
                            (footerLinkItem) =>
                                footerLinkItem.properties.length === 0
                        );

                        if (emptyFooterLinkItems.length === 0) {
                            continue;
                        }

                        for (const [
                            index,
                            emptyFooterLinkItem,
                        ] of emptyFooterLinkItems.entries()) {
                            context.report({
                                fix:
                                    index === 0
                                        ? (fixer) =>
                                              createRemoveCommaSeparatedItemsFixes(
                                                  fixer,
                                                  context.sourceCode,
                                                  {
                                                      container:
                                                          itemsArrayExpression,
                                                      items: footerLinkItems,
                                                      itemsToRemove:
                                                          emptyFooterLinkItems,
                                                  }
                                              )
                                        : null,
                                messageId: "noEmptyFooterLinkItems",
                                node: emptyFooterLinkItem,
                            });
                        }
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty footer link item objects inside static footer column `items` arrays.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-footer-link-items",
            },
            fixable: "code",
            messages: {
                noEmptyFooterLinkItems:
                    "Remove empty footer link item objects that do not contribute any label, destination, or HTML content.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-footer-link-items",
    });

export default rule;
