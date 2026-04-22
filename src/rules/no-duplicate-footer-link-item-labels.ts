/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-footer-link-item-labels`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { setHas } from "ts-extras";

import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findDocusaurusFooterLinkColumnObjects } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDuplicateFooterLinkItemLabels";

const normalizeLabelForComparison = (label: string): string =>
    label.trim().toLowerCase();

/** Rule module for `no-duplicate-footer-link-item-labels`. */
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

                        const seenLabels = new Set<string>();

                        for (const itemElement of itemsArrayExpression.elements) {
                            if (itemElement?.type !== "ObjectExpression") {
                                continue;
                            }

                            const labelExpression =
                                getObjectPropertyValueByName(
                                    itemElement,
                                    "label"
                                );

                            if (labelExpression === null) {
                                continue;
                            }

                            const staticLabel =
                                getStaticStringValueFromExpressionOrIdentifier(
                                    labelExpression,
                                    programNode
                                );

                            if (staticLabel === null) {
                                continue;
                            }

                            const normalizedLabel =
                                normalizeLabelForComparison(staticLabel);

                            if (normalizedLabel.length === 0) {
                                continue;
                            }

                            if (setHas(seenLabels, normalizedLabel)) {
                                context.report({
                                    data: {
                                        label: staticLabel.trim(),
                                    },
                                    messageId:
                                        "noDuplicateFooterLinkItemLabels",
                                    node: labelExpression,
                                });
                                continue;
                            }

                            seenLabels.add(normalizedLabel);
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
                    "disallow duplicate static footer link item labels within the same footer column.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-link-item-labels",
            },
            messages: {
                noDuplicateFooterLinkItemLabels:
                    "Avoid duplicate footer link item labels in the same column; found repeated label {{ label }}.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-footer-link-item-labels",
    });

export default rule;
