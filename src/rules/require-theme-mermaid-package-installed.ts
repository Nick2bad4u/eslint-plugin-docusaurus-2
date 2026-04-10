/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-mermaid-package-installed`.
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
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const themeMermaidModuleName = "@docusaurus/theme-mermaid" as const;

type MessageIds = "requireThemeMermaidPackageInstalled";

/** Rule module for `require-theme-mermaid-package-installed`. */
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
                        isPackageDeclaredInNearestManifest(
                            context.filename,
                            themeMermaidModuleName
                        )
                    ) {
                        return;
                    }

                    for (const moduleEntry of findAnyTopLevelModuleConfigurationsByName(
                        configObjectExpression,
                        themeMermaidModuleName
                    )) {
                        context.report({
                            messageId: "requireThemeMermaidPackageInstalled",
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
                    "require `@docusaurus/theme-mermaid` to be declared in the nearest package manifest when it is configured in Docusaurus config.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-mermaid-package-installed",
            },
            messages: {
                requireThemeMermaidPackageInstalled:
                    "`@docusaurus/theme-mermaid` is configured in this Docusaurus site config but is not declared in the nearest `package.json` dependency fields.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-mermaid-package-installed",
    });

export default rule;
