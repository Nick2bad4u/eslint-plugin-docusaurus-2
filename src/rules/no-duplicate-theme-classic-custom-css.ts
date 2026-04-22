/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-theme-classic-custom-css`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayFirst, isDefined, setHas } from "ts-extras";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import { getStaticConfiguredPathResolution } from "../_internal/config-paths.js";
import {
    findObjectPropertyByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findThemeClassicOptionsObjects } from "../_internal/theme-classic-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDuplicateThemeClassicCustomCss";

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

/** Rule module for `no-duplicate-theme-classic-custom-css`. */
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
                        configObjectExpression,
                        programNode
                    )) {
                        const customCssExpression = findObjectPropertyByName(
                            themeOptionsObject,
                            "customCss"
                        );

                        if (customCssExpression?.type !== "Property") {
                            continue;
                        }

                        const customCssArrayExpression =
                            getArrayExpressionFromExpressionOrIdentifier(
                                customCssExpression.value as TSESTree.Expression,
                                programNode
                            );

                        if (customCssArrayExpression === null) {
                            continue;
                        }

                        const presentItems =
                            customCssArrayExpression.elements.filter(
                                isPresentArrayElement
                            );
                        const duplicateItems: TSESTree.Expression[] = [];
                        const seenResolvedPaths = new Set<string>();

                        for (const item of presentItems) {
                            if (item.type === "SpreadElement") {
                                continue;
                            }

                            const pathResolution =
                                getStaticConfiguredPathResolution(
                                    item,
                                    programNode,
                                    context.filename
                                );

                            if (pathResolution === null) {
                                continue;
                            }

                            if (
                                setHas(
                                    seenResolvedPaths,
                                    pathResolution.resolvedPath
                                )
                            ) {
                                duplicateItems.push(item);

                                continue;
                            }

                            seenResolvedPaths.add(pathResolution.resolvedPath);
                        }

                        if (duplicateItems.length === 0) {
                            continue;
                        }

                        const firstDuplicateItem = arrayFirst(duplicateItems);

                        if (!isDefined(firstDuplicateItem)) {
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
                                        itemsToRemove: duplicateItems,
                                    }
                                ),
                            messageId: "noDuplicateThemeClassicCustomCss",
                            node: firstDuplicateItem,
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
                    "disallow duplicate `customCss` entries in Docusaurus classic theme config.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-theme-classic-custom-css",
            },
            fixable: "code",
            messages: {
                noDuplicateThemeClassicCustomCss:
                    "Remove duplicate `customCss` entries that resolve to the same classic theme stylesheet path.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-theme-classic-custom-css",
    });

export default rule;
