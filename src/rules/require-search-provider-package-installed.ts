/**
 * @packageDocumentation
 * ESLint rule implementation for `require-search-provider-package-installed`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    findAnyTopLevelModuleConfigurationsByName,
    getTopLevelModuleConfigurationSpecifierNode,
} from "../_internal/docusaurus-module-config.js";
import { isPackageDeclaredInNearestManifest } from "../_internal/package-manifest.js";
import {
    docsearchAdapterPluginModuleName,
    localSearchPluginModuleNames,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const supportedSearchProviderModuleNames = [
    docsearchAdapterPluginModuleName,
    ...localSearchPluginModuleNames,
] as const;

type MessageIds = "requireSearchProviderPackageInstalled";

/** Rule module for `require-search-provider-package-installed`. */
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

                    for (const moduleName of supportedSearchProviderModuleNames) {
                        if (
                            isPackageDeclaredInNearestManifest(
                                context.filename,
                                moduleName
                            )
                        ) {
                            continue;
                        }

                        for (const moduleEntry of findAnyTopLevelModuleConfigurationsByName(
                            configObjectExpression,
                            moduleName
                        )) {
                            context.report({
                                data: { moduleName: `\`${moduleName}\`` },
                                messageId:
                                    "requireSearchProviderPackageInstalled",
                                node:
                                    getTopLevelModuleConfigurationSpecifierNode(
                                        moduleEntry
                                    ) ?? moduleEntry.node,
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
                    "require explicitly configured search-provider modules to be declared in the nearest package manifest.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-search-provider-package-installed",
            },
            messages: {
                requireSearchProviderPackageInstalled:
                    "Search-provider module {{ moduleName }} is configured in this Docusaurus site config but is not declared in the nearest `package.json` dependency fields.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-search-provider-package-installed",
    });

export default rule;
