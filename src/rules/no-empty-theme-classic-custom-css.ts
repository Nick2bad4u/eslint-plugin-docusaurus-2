/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-theme-classic-custom-css`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findThemeClassicOptionsObjects } from "../_internal/theme-classic-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyThemeClassicCustomCss";

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

/** Rule module for `no-empty-theme-classic-custom-css`. */
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

                    for (const themeOptionsObject of findThemeClassicOptionsObjects(
                        configObjectExpression
                    )) {
                        const customCssProperty = findObjectPropertyByName(
                            themeOptionsObject,
                            "customCss"
                        );

                        if (customCssProperty === null) {
                            continue;
                        }

                        const customCssExpression =
                            customCssProperty.value as TSESTree.Expression;
                        const customCssArrayExpression =
                            getArrayExpressionFromExpressionOrIdentifier(
                                customCssExpression,
                                programNode
                            );

                        if (customCssArrayExpression !== null) {
                            const presentItems =
                                customCssArrayExpression.elements.filter(
                                    isPresentArrayElement
                                );
                            const emptyItems = presentItems.filter(
                                (item): item is TSESTree.Expression => {
                                    if (item.type === "SpreadElement") {
                                        return false;
                                    }

                                    const staticValue =
                                        getStaticStringValueFromExpressionOrIdentifier(
                                            item,
                                            programNode
                                        );

                                    return (
                                        staticValue !== null &&
                                        staticValue.trim().length === 0
                                    );
                                }
                            );

                            if (emptyItems.length === 0) {
                                continue;
                            }

                            const firstEmptyItem = emptyItems[0];

                            if (firstEmptyItem === undefined) {
                                continue;
                            }

                            context.report({
                                fix: (fixer) =>
                                    createRemoveCommaSeparatedItemsFixes(
                                        fixer,
                                        context.sourceCode,
                                        {
                                            container: customCssArrayExpression,
                                            items: presentItems,
                                            itemsToRemove: emptyItems,
                                        }
                                    ),
                                messageId: "noEmptyThemeClassicCustomCss",
                                node: firstEmptyItem,
                            });

                            continue;
                        }

                        const staticCustomCssValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                customCssExpression,
                                programNode
                            );

                        if (
                            staticCustomCssValue === null ||
                            staticCustomCssValue.trim().length > 0
                        ) {
                            continue;
                        }

                        context.report({
                            fix: (fixer) =>
                                createRemoveCommaSeparatedItemsFixes(
                                    fixer,
                                    context.sourceCode,
                                    {
                                        container: themeOptionsObject,
                                        items: themeOptionsObject.properties,
                                        itemsToRemove: [customCssProperty],
                                    }
                                ),
                            messageId: "noEmptyThemeClassicCustomCss",
                            node: customCssExpression,
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
                    "disallow empty `customCss` entries in Docusaurus classic theme config.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-theme-classic-custom-css",
            },
            fixable: "code",
            messages: {
                noEmptyThemeClassicCustomCss:
                    "Remove empty `customCss` entries from Docusaurus classic theme config.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-theme-classic-custom-css",
    });

export default rule;
