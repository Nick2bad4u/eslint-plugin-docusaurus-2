/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-navbar-item-objects`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyNavbarItemObjects";

const collectNavbarItemArrays = (
    options: Readonly<{
        arrays: TSESTree.ArrayExpression[];
        itemsArrayExpression: Readonly<TSESTree.ArrayExpression>;
        programNode: Readonly<TSESTree.Program>;
    }>
): void => {
    options.arrays.push(options.itemsArrayExpression);

    for (const itemElement of options.itemsArrayExpression.elements) {
        if (itemElement?.type !== "ObjectExpression") {
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

        collectNavbarItemArrays({
            arrays: options.arrays,
            itemsArrayExpression: nestedItemsArrayExpression,
            programNode: options.programNode,
        });
    }
};

/** Rule module for `no-empty-navbar-item-objects`. */
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

                    const navbarItemArrays: TSESTree.ArrayExpression[] = [];

                    collectNavbarItemArrays({
                        arrays: navbarItemArrays,
                        itemsArrayExpression,
                        programNode,
                    });

                    for (const navbarItemArray of navbarItemArrays) {
                        const navbarItems = navbarItemArray.elements.filter(
                            (element): element is TSESTree.ObjectExpression =>
                                element?.type === "ObjectExpression"
                        );
                        const emptyNavbarItems = navbarItems.filter(
                            (navbarItem) => navbarItem.properties.length === 0
                        );

                        if (emptyNavbarItems.length === 0) {
                            continue;
                        }

                        for (const [
                            index,
                            emptyNavbarItem,
                        ] of emptyNavbarItems.entries()) {
                            context.report({
                                fix:
                                    index === 0
                                        ? (fixer) =>
                                              createRemoveCommaSeparatedItemsFixes(
                                                  fixer,
                                                  context.sourceCode,
                                                  {
                                                      container:
                                                          navbarItemArray,
                                                      items: navbarItems,
                                                      itemsToRemove:
                                                          emptyNavbarItems,
                                                  }
                                              )
                                        : null,
                                messageId: "noEmptyNavbarItemObjects",
                                node: emptyNavbarItem,
                            });
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
                    "disallow empty navbar item objects inside static navbar item arrays.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-navbar-item-objects",
            },
            fixable: "code",
            messages: {
                noEmptyNavbarItemObjects:
                    "Remove empty navbar item objects that do not contribute any label, destination, dropdown items, or HTML content.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-navbar-item-objects",
    });

export default rule;
