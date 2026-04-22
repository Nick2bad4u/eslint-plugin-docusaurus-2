/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-plugin-pwa-head-tags`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayJoin, setHas } from "ts-extras";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findPluginOptionsObjectsByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectPropertyName,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const pluginPwaModuleName = "@docusaurus/plugin-pwa" as const;

type MessageIds = "noDuplicatePluginPwaHeadTags";

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

const getHeadTagSignature = (
    tagObjectExpression: Readonly<TSESTree.ObjectExpression>,
    sourceCode: Readonly<TSESLint.SourceCode>
): null | string => {
    const propertyEntries: string[] = [];

    for (const property of tagObjectExpression.properties) {
        if (property.type !== "Property") {
            return null;
        }

        if (property.computed || property.kind !== "init") {
            return null;
        }

        const propertyName = getObjectPropertyName(property);

        if (propertyName === null) {
            return null;
        }

        propertyEntries.push(
            `${propertyName}:${sourceCode.getText(property.value).trim()}`
        );
    }

    propertyEntries.sort((left, right) => left.localeCompare(right));

    return arrayJoin(propertyEntries, "|");
};

/** Rule module for `no-duplicate-plugin-pwa-head-tags`. */
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

                    for (const pluginOptionsObject of findPluginOptionsObjectsByName(
                        configObjectExpression,
                        pluginPwaModuleName
                    )) {
                        const pwaHeadExpression = getObjectPropertyValueByName(
                            pluginOptionsObject,
                            "pwaHead"
                        );

                        if (pwaHeadExpression === null) {
                            continue;
                        }

                        const pwaHeadArrayExpression =
                            getArrayExpressionFromExpressionOrIdentifier(
                                pwaHeadExpression,
                                programNode
                            );

                        if (pwaHeadArrayExpression === null) {
                            continue;
                        }

                        const pwaHeadArrayItems =
                            pwaHeadArrayExpression.elements.filter(
                                isPresentArrayElement
                            );
                        const duplicateTagEntries: TSESTree.ObjectExpression[] =
                            [];
                        const seenSignatures = new Set<string>();

                        for (const headTagEntry of pwaHeadArrayItems) {
                            if (headTagEntry.type !== "ObjectExpression") {
                                continue;
                            }

                            const entrySignature = getHeadTagSignature(
                                headTagEntry,
                                context.sourceCode
                            );

                            if (entrySignature === null) {
                                continue;
                            }

                            if (setHas(seenSignatures, entrySignature)) {
                                duplicateTagEntries.push(headTagEntry);

                                continue;
                            }

                            seenSignatures.add(entrySignature);
                        }

                        if (duplicateTagEntries.length === 0) {
                            continue;
                        }

                        reportWithOptionalFix({
                            context,
                            fix: (fixer) =>
                                createRemoveCommaSeparatedItemsFixes(
                                    fixer,
                                    context.sourceCode,
                                    {
                                        container: pwaHeadArrayExpression,
                                        items: pwaHeadArrayItems,
                                        itemsToRemove: duplicateTagEntries,
                                    }
                                ),
                            messageId: "noDuplicatePluginPwaHeadTags",
                            node: pwaHeadArrayExpression,
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
                    "disallow duplicate object entries in `@docusaurus/plugin-pwa` `pwaHead` arrays.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-plugin-pwa-head-tags",
            },
            fixable: "code",
            messages: {
                noDuplicatePluginPwaHeadTags:
                    "Remove duplicate `@docusaurus/plugin-pwa` `pwaHead` entries that repeat an earlier tag definition.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-plugin-pwa-head-tags",
    });

export default rule;
