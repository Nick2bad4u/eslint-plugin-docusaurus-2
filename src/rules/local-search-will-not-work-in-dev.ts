/**
 * @packageDocumentation
 * ESLint rule implementation for `local-search-will-not-work-in-dev`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    findLocalSearchPluginConfigurations,
    getPluginConfigurationSpecifierNode,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "localSearchWillNotWorkInDev";

/** Rule module for `local-search-will-not-work-in-dev`. */
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

                    for (const localSearchConfiguration of findLocalSearchPluginConfigurations(
                        configObjectExpression
                    )) {
                        context.report({
                            data: {
                                pluginName: localSearchConfiguration.pluginName,
                            },
                            messageId: "localSearchWillNotWorkInDev",
                            node:
                                getPluginConfigurationSpecifierNode(
                                    localSearchConfiguration.entry
                                ) ?? localSearchConfiguration.entry.node,
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
                    "disallow assuming configured local-search providers will produce a reliable search experience during `docusaurus start`.",
                frozen: false,
                presets: [],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/local-search-will-not-work-in-dev",
            },
            messages: {
                localSearchWillNotWorkInDev:
                    "Configured local-search provider `{{ pluginName }}` builds a static index and does not provide a reliable search experience during `docusaurus start`. Test it with `docusaurus build` and `docusaurus serve` instead.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "local-search-will-not-work-in-dev",
    });

export default rule;
