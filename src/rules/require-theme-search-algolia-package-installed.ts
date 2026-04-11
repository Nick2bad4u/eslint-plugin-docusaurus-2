/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-search-algolia-package-installed`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    findTopLevelModuleConfigurationsByName,
    getTopLevelModuleConfigurationSpecifierNode,
} from "../_internal/docusaurus-module-config.js";
import { isAnyPackageDeclaredInNearestManifest } from "../_internal/package-manifest.js";
import {
    themeClassicPresetModuleName,
    themeSearchAlgoliaModuleName,
} from "../_internal/theme-classic-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireThemeSearchAlgoliaPackageInstalled";

/** Rule module for `require-theme-search-algolia-package-installed`. */
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

                    if (
                        configObjectExpression === null ||
                        isAnyPackageDeclaredInNearestManifest(
                            context.filename,
                            [
                                themeClassicPresetModuleName,
                                themeSearchAlgoliaModuleName,
                            ]
                        )
                    ) {
                        return;
                    }

                    for (const moduleEntry of findTopLevelModuleConfigurationsByName(
                        configObjectExpression,
                        "themes",
                        themeSearchAlgoliaModuleName
                    )) {
                        context.report({
                            messageId:
                                "requireThemeSearchAlgoliaPackageInstalled",
                            node:
                                getTopLevelModuleConfigurationSpecifierNode(
                                    moduleEntry
                                ) ?? moduleEntry.node,
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
                    "require `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` to be declared in the nearest package manifest when `@docusaurus/theme-search-algolia` is configured directly.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-search-algolia-package-installed",
            },
            messages: {
                requireThemeSearchAlgoliaPackageInstalled:
                    "`@docusaurus/theme-search-algolia` is configured directly in this Docusaurus site config but neither `@docusaurus/theme-search-algolia` nor `@docusaurus/preset-classic` is declared in the nearest `package.json` dependency fields.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-search-algolia-package-installed",
    });

export default rule;
