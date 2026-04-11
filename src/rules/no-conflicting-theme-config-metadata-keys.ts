/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-theme-config-metadata-keys`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "noConflictingThemeConfigMetadataKeys"
    | "removeMetadataName"
    | "removeMetadataProperty";

/** Rule module for `no-conflicting-theme-config-metadata-keys`. */
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

                    const metadataExpression = getObjectPropertyValueByName(
                        themeConfigObject,
                        "metadata"
                    );
                    const metadataArrayExpression =
                        metadataExpression === null
                            ? null
                            : getArrayExpressionFromExpressionOrIdentifier(
                                  metadataExpression,
                                  programNode
                              );

                    if (metadataArrayExpression === null) {
                        return;
                    }

                    for (const metadataElement of metadataArrayExpression.elements) {
                        if (metadataElement?.type !== "ObjectExpression") {
                            continue;
                        }

                        const nameProperty = findObjectPropertyByName(
                            metadataElement,
                            "name"
                        );
                        const propertyProperty = findObjectPropertyByName(
                            metadataElement,
                            "property"
                        );

                        if (
                            nameProperty === null ||
                            propertyProperty === null
                        ) {
                            continue;
                        }

                        const nameValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                nameProperty.value as TSESTree.Expression,
                                programNode
                            )?.trim() ?? null;
                        const propertyValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                propertyProperty.value as TSESTree.Expression,
                                programNode
                            )?.trim() ?? null;

                        if (
                            nameValue === null ||
                            propertyValue === null ||
                            nameValue.length === 0 ||
                            propertyValue.length === 0
                        ) {
                            continue;
                        }

                        context.report({
                            messageId: "noConflictingThemeConfigMetadataKeys",
                            node: propertyProperty.key,
                            suggest: [
                                {
                                    fix: (fixer) =>
                                        createRemoveCommaSeparatedItemsFixes(
                                            fixer,
                                            context.sourceCode,
                                            {
                                                container: metadataElement,
                                                items: metadataElement.properties,
                                                itemsToRemove: [nameProperty],
                                            }
                                        ),
                                    messageId: "removeMetadataName",
                                },
                                {
                                    fix: (fixer) =>
                                        createRemoveCommaSeparatedItemsFixes(
                                            fixer,
                                            context.sourceCode,
                                            {
                                                container: metadataElement,
                                                items: metadataElement.properties,
                                                itemsToRemove: [
                                                    propertyProperty,
                                                ],
                                            }
                                        ),
                                    messageId: "removeMetadataProperty",
                                },
                            ],
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
                    "disallow `themeConfig.metadata` entries from declaring both `name` and `property` keys at once.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-theme-config-metadata-keys",
            },
            hasSuggestions: true,
            messages: {
                noConflictingThemeConfigMetadataKeys:
                    "Each `themeConfig.metadata` entry should use either `name` or `property`, not both.",
                removeMetadataName:
                    "Remove `name` and keep the `property`-based metadata entry.",
                removeMetadataProperty:
                    "Remove `property` and keep the `name`-based metadata entry.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-conflicting-theme-config-metadata-keys",
    });

export default rule;
