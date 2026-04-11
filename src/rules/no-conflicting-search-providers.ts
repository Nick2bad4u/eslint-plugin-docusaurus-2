/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-search-providers`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    findLocalSearchPluginConfigurations,
    getEffectiveSearchThemeConfigProperty,
    getPluginConfigurationSpecifierNode,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noConflictingSearchProviders";

/** Rule module for `no-conflicting-search-providers`. */
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

                    const effectiveSearchConfigProperty =
                        getEffectiveSearchThemeConfigProperty(
                            configObjectExpression,
                            programNode
                        );
                    const searchConfigKey =
                        effectiveSearchConfigProperty?.keyLabel ?? null;

                    if (searchConfigKey === null) {
                        return;
                    }

                    for (const localSearchPluginConfiguration of findLocalSearchPluginConfigurations(
                        configObjectExpression,
                        programNode
                    )) {
                        const pluginSpecifierNode =
                            getPluginConfigurationSpecifierNode(
                                localSearchPluginConfiguration.entry
                            );

                        context.report({
                            data: {
                                pluginName:
                                    localSearchPluginConfiguration.pluginName,
                                searchConfigKey,
                            },
                            messageId: "noConflictingSearchProviders",
                            node:
                                pluginSpecifierNode ??
                                localSearchPluginConfiguration.entry.node,
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
                    "disallow configuring a local-search plugin together with Algolia/DocSearch provider settings in the same Docusaurus site config.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-search-providers",
            },
            messages: {
                noConflictingSearchProviders:
                    "Do not configure the local-search plugin `{{ pluginName }}` together with `{{ searchConfigKey }}`. Pick one search provider so the site does not ship conflicting search integrations.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-conflicting-search-providers",
    });

export default rule;
