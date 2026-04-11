/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-footer-link-item-destinations`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
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

type FooterDestinationSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

type MessageIds =
    | "noDuplicateFooterLinkItemDestinations"
    | "removeDuplicateFooterLinkItem";

const normalizeDestination = (destination: string): string =>
    destination.trim();

const getStaticFooterItemDestination = (
    itemObject: Readonly<TSESTree.ObjectExpression>,
    programNode: Readonly<TSESTree.Program>
): null | string => {
    const toExpression = getObjectPropertyValueByName(itemObject, "to");

    if (toExpression !== null) {
        const toValue = getStaticStringValueFromExpressionOrIdentifier(
            toExpression,
            programNode
        );

        if (toValue !== null) {
            const normalizedToValue = normalizeDestination(toValue);

            if (normalizedToValue.length > 0) {
                return normalizedToValue;
            }
        }
    }

    const hrefExpression = getObjectPropertyValueByName(itemObject, "href");

    if (hrefExpression === null) {
        return null;
    }

    const hrefValue = getStaticStringValueFromExpressionOrIdentifier(
        hrefExpression,
        programNode
    );

    if (hrefValue === null) {
        return null;
    }

    const normalizedHrefValue = normalizeDestination(hrefValue);

    return normalizedHrefValue.length > 0 ? normalizedHrefValue : null;
};

const createRemoveDuplicateItemSuggestion = (
    options: Readonly<{
        duplicateItem: Readonly<TSESTree.ObjectExpression>;
        footerItems: readonly TSESTree.ObjectExpression[];
        footerItemsArray: Readonly<TSESTree.ArrayExpression>;
        sourceCode: Readonly<TSESLint.SourceCode>;
    }>
): FooterDestinationSuggestion => ({
    fix: (fixer) =>
        createRemoveCommaSeparatedItemsFixes(fixer, options.sourceCode, {
            container: options.footerItemsArray,
            items: options.footerItems,
            itemsToRemove: [options.duplicateItem],
        }),
    messageId: "removeDuplicateFooterLinkItem",
});

/** Rule module for `no-duplicate-footer-link-item-destinations`. */
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

                        const footerItems =
                            itemsArrayExpression.elements.filter(
                                (
                                    element
                                ): element is TSESTree.ObjectExpression =>
                                    element?.type === "ObjectExpression"
                            );
                        const seenDestinations = new Set<string>();

                        for (const footerItem of footerItems) {
                            const destination = getStaticFooterItemDestination(
                                footerItem,
                                programNode
                            );

                            if (destination === null) {
                                continue;
                            }

                            if (seenDestinations.has(destination)) {
                                context.report({
                                    data: {
                                        destination,
                                    },
                                    messageId:
                                        "noDuplicateFooterLinkItemDestinations",
                                    node: footerItem,
                                    suggest: [
                                        createRemoveDuplicateItemSuggestion({
                                            duplicateItem: footerItem,
                                            footerItems,
                                            footerItemsArray:
                                                itemsArrayExpression,
                                            sourceCode: context.sourceCode,
                                        }),
                                    ],
                                });
                                continue;
                            }

                            seenDestinations.add(destination);
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
                    "disallow duplicate static footer link destinations within the same footer column.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-link-item-destinations",
            },
            hasSuggestions: true,
            messages: {
                noDuplicateFooterLinkItemDestinations:
                    "Avoid duplicate footer link destinations in the same column; found repeated destination {{ destination }}.",
                removeDuplicateFooterLinkItem:
                    "Remove the later duplicate footer link item.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-footer-link-item-destinations",
    });

export default rule;
