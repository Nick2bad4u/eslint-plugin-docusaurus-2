/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-navbar-item-destinations`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValue,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "noDuplicateNavbarItemDestinations"
    | "removeDuplicateNavbarItem";

type NavbarDestinationSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const normalizeDestination = (destination: string): string =>
    destination.trim();

const getStaticNavbarItemDestination = (
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
        navbarItems: readonly TSESTree.ObjectExpression[];
        navbarItemsArray: Readonly<TSESTree.ArrayExpression>;
        sourceCode: Readonly<TSESLint.SourceCode>;
    }>
): NavbarDestinationSuggestion => ({
    fix: (fixer) =>
        createRemoveCommaSeparatedItemsFixes(fixer, options.sourceCode, {
            container: options.navbarItemsArray,
            items: options.navbarItems,
            itemsToRemove: [options.duplicateItem],
        }),
    messageId: "removeDuplicateNavbarItem",
});

const collectNavbarItemsArrays = (
    options: Readonly<{
        arrayExpression: Readonly<TSESTree.ArrayExpression>;
        arrays: TSESTree.ArrayExpression[];
        programNode: Readonly<TSESTree.Program>;
    }>
): void => {
    options.arrays.push(options.arrayExpression);

    for (const itemElement of options.arrayExpression.elements) {
        if (itemElement?.type !== "ObjectExpression") {
            continue;
        }

        const typeExpression = getObjectPropertyValueByName(
            itemElement,
            "type"
        );

        if (
            typeExpression === null ||
            getStaticStringValue(typeExpression) !== "dropdown"
        ) {
            continue;
        }

        const nestedItemsExpression = getObjectPropertyValueByName(
            itemElement,
            "items"
        );
        const nestedItemsArrayExpression =
            nestedItemsExpression === null
                ? null
                : getArrayExpressionFromExpressionOrIdentifier(
                      nestedItemsExpression,
                      options.programNode
                  );

        if (nestedItemsArrayExpression === null) {
            continue;
        }

        collectNavbarItemsArrays({
            arrayExpression: nestedItemsArrayExpression,
            arrays: options.arrays,
            programNode: options.programNode,
        });
    }
};

/** Rule module for `no-duplicate-navbar-item-destinations`. */
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

                    const navbarObject = getObjectExpressionPropertyValueByName(
                        themeConfigObject,
                        "navbar"
                    );

                    if (navbarObject === null) {
                        return;
                    }

                    const itemsExpression = getObjectPropertyValueByName(
                        navbarObject,
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
                        return;
                    }

                    const navbarItemsArrays: TSESTree.ArrayExpression[] = [];

                    collectNavbarItemsArrays({
                        arrayExpression: itemsArrayExpression,
                        arrays: navbarItemsArrays,
                        programNode,
                    });

                    for (const navbarItemsArray of navbarItemsArrays) {
                        const navbarItems = navbarItemsArray.elements.filter(
                            (element): element is TSESTree.ObjectExpression =>
                                element?.type === "ObjectExpression"
                        );
                        const seenDestinations = new Set<string>();

                        for (const navbarItem of navbarItems) {
                            const destination = getStaticNavbarItemDestination(
                                navbarItem,
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
                                        "noDuplicateNavbarItemDestinations",
                                    node: navbarItem,
                                    suggest: [
                                        createRemoveDuplicateItemSuggestion({
                                            duplicateItem: navbarItem,
                                            navbarItems,
                                            navbarItemsArray,
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
                    "disallow duplicate static navbar item destinations within the same navbar items array or dropdown items array.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-navbar-item-destinations",
            },
            hasSuggestions: true,
            messages: {
                noDuplicateNavbarItemDestinations:
                    "Avoid duplicate navbar item destinations in the same menu array; found repeated destination {{ destination }}.",
                removeDuplicateNavbarItem:
                    "Remove the later duplicate navbar item.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-navbar-item-destinations",
    });

export default rule;
