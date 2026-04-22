/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-navbar-item-labels`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isDefined } from "ts-extras";

import {
    getObjectPropertyName,
    getObjectPropertyValueByName,
    getStaticStringValue,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDuplicateNavbarItemLabels";

const normalizeLabelForComparison = (label: string): string =>
    label.trim().toLowerCase();

const isNavbarItemsArrayExpression = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>
): boolean => {
    const parentNode = arrayExpression.parent;

    if (parentNode?.type !== "Property") {
        return false;
    }

    if (getObjectPropertyName(parentNode) !== "items") {
        return false;
    }

    const ownerObject = parentNode.parent;

    if (ownerObject?.type !== "ObjectExpression") {
        return false;
    }

    const ownerProperty = ownerObject.parent;

    if (
        ownerProperty?.type === "Property" &&
        getObjectPropertyName(ownerProperty) === "navbar"
    ) {
        return true;
    }

    const ownerTypeExpression = getObjectPropertyValueByName(
        ownerObject,
        "type"
    );

    return (
        ownerTypeExpression !== null &&
        getStaticStringValue(ownerTypeExpression) === "dropdown"
    );
};

/** Rule module for `no-duplicate-navbar-item-labels`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ArrayExpression(node: Readonly<TSESTree.ArrayExpression>) {
                    if (!isNavbarItemsArrayExpression(node)) {
                        return;
                    }

                    const seenLabels = new Map<string, string>();

                    for (const itemElement of node.elements) {
                        if (itemElement?.type !== "ObjectExpression") {
                            continue;
                        }

                        const labelExpression = getObjectPropertyValueByName(
                            itemElement,
                            "label"
                        );

                        if (labelExpression === null) {
                            continue;
                        }

                        const staticLabel =
                            getStaticStringValueFromExpressionOrIdentifier(
                                labelExpression,
                                context.sourceCode.ast
                            );

                        if (staticLabel === null) {
                            continue;
                        }

                        const trimmedLabel = staticLabel.trim();

                        if (trimmedLabel.length === 0) {
                            continue;
                        }

                        const normalizedLabel =
                            normalizeLabelForComparison(trimmedLabel);
                        const firstSeenLabel = seenLabels.get(normalizedLabel);

                        if (!isDefined(firstSeenLabel)) {
                            seenLabels.set(normalizedLabel, trimmedLabel);
                            continue;
                        }

                        context.report({
                            data: {
                                label: trimmedLabel,
                            },
                            messageId: "noDuplicateNavbarItemLabels",
                            node: labelExpression,
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
                    "disallow duplicate static navbar item labels within the same navbar items array or dropdown items array.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-navbar-item-labels",
            },
            messages: {
                noDuplicateNavbarItemLabels:
                    "Avoid duplicate navbar item labels in the same menu array; found repeated label {{ label }}.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-navbar-item-labels",
    });

export default rule;
