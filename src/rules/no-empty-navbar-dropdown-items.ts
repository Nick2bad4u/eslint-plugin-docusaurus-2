/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-navbar-dropdown-items`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyNavbarDropdownItems";

const collectNavbarDropdownEntries = (
    options: Readonly<{
        dropdownEntries: TSESTree.ObjectExpression[];
        itemsArrayExpression: Readonly<TSESTree.ArrayExpression>;
        programNode: Readonly<TSESTree.Program>;
    }>
): void => {
    for (const itemElement of options.itemsArrayExpression.elements) {
        if (itemElement?.type !== "ObjectExpression") {
            continue;
        }

        const typeExpression = getObjectPropertyValueByName(
            itemElement,
            "type"
        );

        if (
            typeExpression !== null &&
            getStaticStringValue(typeExpression) === "dropdown"
        ) {
            options.dropdownEntries.push(itemElement);
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

        collectNavbarDropdownEntries({
            dropdownEntries: options.dropdownEntries,
            itemsArrayExpression: nestedItemsArrayExpression,
            programNode: options.programNode,
        });
    }
};

/** Rule module for `no-empty-navbar-dropdown-items`. */
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

                    const dropdownEntries: TSESTree.ObjectExpression[] = [];

                    collectNavbarDropdownEntries({
                        dropdownEntries,
                        itemsArrayExpression,
                        programNode,
                    });

                    const emptyDropdownEntries = dropdownEntries.filter(
                        (dropdownEntry) => {
                            const dropdownItemsExpression =
                                getObjectPropertyValueByName(
                                    dropdownEntry,
                                    "items"
                                );
                            const dropdownItemsArrayExpression =
                                dropdownItemsExpression === null
                                    ? null
                                    : getArrayExpressionFromExpressionOrIdentifier(
                                          dropdownItemsExpression,
                                          programNode
                                      );

                            return (
                                dropdownItemsArrayExpression !== null &&
                                dropdownItemsArrayExpression.elements.length ===
                                    0
                            );
                        }
                    );

                    if (emptyDropdownEntries.length === 0) {
                        return;
                    }

                    for (const [
                        index,
                        emptyDropdownEntry,
                    ] of emptyDropdownEntries.entries()) {
                        const parentArray = emptyDropdownEntry.parent;

                        if (parentArray?.type !== "ArrayExpression") {
                            continue;
                        }

                        const siblingItems = parentArray.elements.filter(
                            (element): element is TSESTree.ObjectExpression =>
                                element?.type === "ObjectExpression"
                        );

                        context.report({
                            fix:
                                index === 0
                                    ? (fixer) =>
                                          createRemoveCommaSeparatedItemsFixes(
                                              fixer,
                                              context.sourceCode,
                                              {
                                                  container: parentArray,
                                                  items: siblingItems,
                                                  itemsToRemove:
                                                      emptyDropdownEntries.filter(
                                                          (entry) =>
                                                              entry.parent ===
                                                              parentArray
                                                      ),
                                              }
                                          )
                                    : null,
                            messageId: "noEmptyNavbarDropdownItems",
                            node: emptyDropdownEntry,
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
                    "disallow navbar dropdown items whose `items` arrays resolve statically to empty arrays.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-navbar-dropdown-items",
            },
            fixable: "code",
            messages: {
                noEmptyNavbarDropdownItems:
                    "Remove empty navbar dropdown items whose `items` arrays do not contain any entries.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-navbar-dropdown-items",
    });

export default rule;
