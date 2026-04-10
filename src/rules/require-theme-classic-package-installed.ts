/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-classic-package-installed`.
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
    themeClassicModuleName,
    themeClassicPresetModuleName,
} from "../_internal/theme-classic-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireThemeClassicPackageInstalled";

/** Rule module for `require-theme-classic-package-installed`. */
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
                                themeClassicModuleName,
                                themeClassicPresetModuleName,
                            ]
                        )
                    ) {
                        return;
                    }

                    for (const moduleEntry of findTopLevelModuleConfigurationsByName(
                        configObjectExpression,
                        "themes",
                        themeClassicModuleName
                    )) {
                        context.report({
                            messageId: "requireThemeClassicPackageInstalled",
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
                    "require `@docusaurus/theme-classic` or `@docusaurus/preset-classic` to be declared in the nearest package manifest when `@docusaurus/theme-classic` is configured directly.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-classic-package-installed",
            },
            messages: {
                requireThemeClassicPackageInstalled:
                    "`@docusaurus/theme-classic` is configured directly in this Docusaurus site config but neither `@docusaurus/theme-classic` nor `@docusaurus/preset-classic` is declared in the nearest `package.json` dependency fields.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-classic-package-installed",
    });

export default rule;
