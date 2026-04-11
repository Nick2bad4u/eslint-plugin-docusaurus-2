/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-footer-link-columns`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyFooterLinkColumns";

/** Rule module for `no-empty-footer-link-columns`. */
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

                    const themeConfigObject =
                        getObjectExpressionPropertyValueByName(
                            configObjectExpression,
                            "themeConfig"
                        );

                    if (themeConfigObject === null) {
                        return;
                    }

                    const footerObject = getObjectExpressionPropertyValueByName(
                        themeConfigObject,
                        "footer"
                    );

                    if (footerObject === null) {
                        return;
                    }

                    const footerLinksArrayExpression =
                        getArrayExpressionPropertyValueByName(
                            footerObject,
                            "links"
                        );

                    if (footerLinksArrayExpression === null) {
                        return;
                    }

                    const footerLinkColumns =
                        footerLinksArrayExpression.elements.filter(
                            (element): element is TSESTree.ObjectExpression =>
                                element?.type === "ObjectExpression"
                        );
                    const emptyFooterColumns: TSESTree.ObjectExpression[] = [];

                    for (const footerLinkColumn of footerLinkColumns) {
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

                        if (itemsArrayExpression.elements.length === 0) {
                            emptyFooterColumns.push(footerLinkColumn);
                        }
                    }

                    if (emptyFooterColumns.length === 0) {
                        return;
                    }

                    for (const [
                        index,
                        emptyFooterColumn,
                    ] of emptyFooterColumns.entries()) {
                        context.report({
                            fix:
                                index === 0
                                    ? (fixer) =>
                                          createRemoveCommaSeparatedItemsFixes(
                                              fixer,
                                              context.sourceCode,
                                              {
                                                  container:
                                                      footerLinksArrayExpression,
                                                  items: footerLinkColumns,
                                                  itemsToRemove:
                                                      emptyFooterColumns,
                                              }
                                          )
                                    : null,
                            messageId: "noEmptyFooterLinkColumns",
                            node: emptyFooterColumn,
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
                    "disallow footer link columns whose `items` arrays are statically empty.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-footer-link-columns",
            },
            fixable: "code",
            messages: {
                noEmptyFooterLinkColumns:
                    "Remove empty footer link columns whose `items` arrays do not contain any links.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-footer-link-columns",
    });

export default rule;
