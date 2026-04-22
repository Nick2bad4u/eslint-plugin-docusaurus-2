/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-theme-config-metadata-keys`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayFirst, setHas } from "ts-extras";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDuplicateThemeConfigMetadataKeys";

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

const normalizeMetadataKey = (value: string): string =>
    value.trim().toLowerCase();

/** Rule module for `no-duplicate-theme-config-metadata-keys`. */
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

                    const metadataArrayItems =
                        metadataArrayExpression.elements.filter(
                            isPresentArrayElement
                        );
                    const seenMetadataKeys = new Set<string>();
                    const duplicateMetadataEntries: TSESTree.ObjectExpression[] =
                        [];

                    for (const metadataElement of metadataArrayItems) {
                        if (metadataElement.type !== "ObjectExpression") {
                            continue;
                        }

                        const nameExpression = getObjectPropertyValueByName(
                            metadataElement,
                            "name"
                        );
                        const propertyExpression = getObjectPropertyValueByName(
                            metadataElement,
                            "property"
                        );
                        const metadataKeyExpression =
                            nameExpression ?? propertyExpression;

                        if (metadataKeyExpression === null) {
                            continue;
                        }

                        const metadataKeyValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                metadataKeyExpression,
                                programNode
                            );

                        if (metadataKeyValue === null) {
                            continue;
                        }

                        const normalizedMetadataKey =
                            normalizeMetadataKey(metadataKeyValue);

                        if (normalizedMetadataKey.length === 0) {
                            continue;
                        }

                        if (setHas(seenMetadataKeys, normalizedMetadataKey)) {
                            duplicateMetadataEntries.push(metadataElement);
                            continue;
                        }

                        seenMetadataKeys.add(normalizedMetadataKey);
                    }

                    if (duplicateMetadataEntries.length === 0) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: (fixer) =>
                            createRemoveCommaSeparatedItemsFixes(
                                fixer,
                                context.sourceCode,
                                {
                                    container: metadataArrayExpression,
                                    items: metadataArrayItems,
                                    itemsToRemove: duplicateMetadataEntries,
                                }
                            ),
                        messageId: "noDuplicateThemeConfigMetadataKeys",
                        node:
                            arrayFirst(duplicateMetadataEntries) ??
                            metadataArrayExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow duplicate `themeConfig.metadata` keys across `name` and `property` entries when authored statically.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-theme-config-metadata-keys",
            },
            fixable: "code",
            messages: {
                noDuplicateThemeConfigMetadataKeys:
                    "Remove duplicate `themeConfig.metadata` entries that repeat an earlier `name` or `property` key.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-theme-config-metadata-keys",
    });

export default rule;
