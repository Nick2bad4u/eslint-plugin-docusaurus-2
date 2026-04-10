/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-live-codeblock-package-installed`.
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
const themeLiveCodeblockModuleName =
    "@docusaurus/theme-live-codeblock" as const;

type MessageIds = "requireThemeLiveCodeblockPackageInstalled";

/** Rule module for `require-theme-live-codeblock-package-installed`. */
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
                            themeLiveCodeblockModuleName
                        )
                    ) {
                        return;
                    }

                    for (const moduleEntry of findAnyTopLevelModuleConfigurationsByName(
                        configObjectExpression,
                        themeLiveCodeblockModuleName
                    )) {
                        context.report({
                            messageId:
                                "requireThemeLiveCodeblockPackageInstalled",
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
                    "require `@docusaurus/theme-live-codeblock` to be declared in the nearest package manifest when it is configured in Docusaurus config.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-live-codeblock-package-installed",
            },
            messages: {
                requireThemeLiveCodeblockPackageInstalled:
                    "`@docusaurus/theme-live-codeblock` is configured in this Docusaurus site config but is not declared in the nearest `package.json` dependency fields.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-live-codeblock-package-installed",
    });

export default rule;
