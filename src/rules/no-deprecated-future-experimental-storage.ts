/**
 * @packageDocumentation
 * ESLint rule implementation for `no-deprecated-future-experimental-storage`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createInsertObjectPropertyFix } from "../_internal/object-literal-fixes.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const replacementPropertyName = "storage" as const;

type MessageIds = "noDeprecatedFutureExperimentalStorage";

const createStoragePropertyText = (
    context: Readonly<TSESLint.RuleContext<MessageIds, typeof defaultOptions>>,
    property: Readonly<TSESTree.Property>
): string =>
    `${replacementPropertyName}: ${context.sourceCode.getText(property.value)}`;

/** Rule module for `no-deprecated-future-experimental-storage`. */
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

                    const futureExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "future"
                    );
                    const futureProperty = findObjectPropertyByName(
                        configObjectExpression,
                        "future"
                    );
                    const futureObject =
                        futureExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  futureExpression,
                                  programNode
                              );

                    if (
                        futureProperty === null ||
                        futureObject === null ||
                        findObjectPropertyByName(
                            futureObject,
                            "experimental_storage"
                        ) === null
                    ) {
                        return;
                    }

                    const experimentalStorageProperty =
                        findObjectPropertyByName(
                            futureObject,
                            "experimental_storage"
                        );
                    const storageProperty = findObjectPropertyByName(
                        configObjectExpression,
                        replacementPropertyName
                    );

                    if (experimentalStorageProperty === null) {
                        return;
                    }

                    const propertyText = createStoragePropertyText(
                        context,
                        experimentalStorageProperty
                    );

                    context.report({
                        fix:
                            storageProperty === null
                                ? (fixer) => {
                                      if (
                                          futureObject.properties.length === 1
                                      ) {
                                          return [
                                              fixer.replaceText(
                                                  futureProperty,
                                                  propertyText
                                              ),
                                          ];
                                      }

                                      return [
                                          ...createRemoveCommaSeparatedItemsFixes(
                                              fixer,
                                              context.sourceCode,
                                              {
                                                  container: futureObject,
                                                  items: futureObject.properties,
                                                  itemsToRemove: [
                                                      experimentalStorageProperty,
                                                  ],
                                              }
                                          ),
                                          createInsertObjectPropertyFix({
                                              fixer,
                                              indentation: "    ",
                                              objectExpression:
                                                  configObjectExpression,
                                              propertyText,
                                              sourceCode: context.sourceCode,
                                          }),
                                      ];
                                  }
                                : null,
                        messageId: "noDeprecatedFutureExperimentalStorage",
                        node: experimentalStorageProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow the deprecated `future.experimental_storage` config and prefer top-level `storage`.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-future-experimental-storage",
            },
            fixable: "code",
            messages: {
                noDeprecatedFutureExperimentalStorage:
                    "Move deprecated `future.experimental_storage` config to the stable top-level `storage` field introduced in Docusaurus 3.10.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-deprecated-future-experimental-storage",
    });

export default rule;
