/**
 * @packageDocumentation
 * ESLint rule implementation for `require-plugin-pwa-head-theme-color`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findPluginOptionsObjectsByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const pluginPwaModuleName = "@docusaurus/plugin-pwa" as const;

type MessageIds = "requirePluginPwaHeadThemeColor";

const hasMatchingHeadTagEntry = (
    pwaHeadArrayExpression: Readonly<TSESTree.ArrayExpression>,
    programNode: Readonly<TSESTree.Program>,
    matcher: Readonly<Record<string, string>>
): boolean => {
    for (const element of pwaHeadArrayExpression.elements) {
        if (element?.type !== "ObjectExpression") {
            continue;
        }

        const matchesEntry = Object.entries(matcher).every(
            ([propertyName, expectedValue]) => {
                const propertyValue = getObjectPropertyValueByName(
                    element,
                    propertyName
                );

                return (
                    propertyValue !== null &&
                    getStaticStringValueFromExpressionOrIdentifier(
                        propertyValue,
                        programNode
                    ) === expectedValue
                );
            }
        );

        if (matchesEntry) {
            return true;
        }
    }

    return false;
};

/** Rule module for `require-plugin-pwa-head-theme-color`. */
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

                    const pluginOptionsObjects = findPluginOptionsObjectsByName(
                        configObjectExpression,
                        pluginPwaModuleName
                    );

                    if (pluginOptionsObjects.length === 0) {
                        return;
                    }

                    for (const pluginOptionsObject of pluginOptionsObjects) {
                        const pwaHeadExpression = getObjectPropertyValueByName(
                            pluginOptionsObject,
                            "pwaHead"
                        );
                        const pwaHeadArrayExpression =
                            pwaHeadExpression === null
                                ? null
                                : getArrayExpressionFromExpressionOrIdentifier(
                                      pwaHeadExpression,
                                      programNode
                                  );

                        if (
                            pwaHeadExpression !== null &&
                            pwaHeadArrayExpression === null
                        ) {
                            return;
                        }

                        if (
                            pwaHeadArrayExpression !== null &&
                            hasMatchingHeadTagEntry(
                                pwaHeadArrayExpression,
                                programNode,
                                {
                                    name: "theme-color",
                                    tagName: "meta",
                                }
                            )
                        ) {
                            return;
                        }
                    }

                    context.report({
                        messageId: "requirePluginPwaHeadThemeColor",
                        node: configObjectExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require plugin-pwa `pwaHead` to include a `theme-color` meta tag.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-theme-color",
            },
            messages: {
                requirePluginPwaHeadThemeColor:
                    'When `@docusaurus/plugin-pwa` is configured, its `pwaHead` should include a theme-color meta tag (`{ tagName: "meta", name: "theme-color", content: ... }`).',
            },
            schema: [],
            type: "problem",
        },
        name: "require-plugin-pwa-head-theme-color",
    });

export default rule;
