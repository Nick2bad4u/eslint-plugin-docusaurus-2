/**
 * @packageDocumentation
 * ESLint rule implementation for `require-plugin-pwa-head-manifest`.
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

type MessageIds = "requirePluginPwaHeadManifest";

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

/** Rule module for `require-plugin-pwa-head-manifest`. */
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
                                    rel: "manifest",
                                    tagName: "link",
                                }
                            )
                        ) {
                            return;
                        }
                    }

                    if (
                        findPluginOptionsObjectsByName(
                            configObjectExpression,
                            pluginPwaModuleName
                        ).length === 0
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requirePluginPwaHeadManifest",
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
                    "require plugin-pwa `pwaHead` to include a manifest link tag.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-manifest",
            },
            messages: {
                requirePluginPwaHeadManifest:
                    'When `@docusaurus/plugin-pwa` is configured, its `pwaHead` should include a manifest link tag (`{ tagName: "link", rel: "manifest", href: ... }`).',
            },
            schema: [],
            type: "problem",
        },
        name: "require-plugin-pwa-head-manifest",
    });

export default rule;
