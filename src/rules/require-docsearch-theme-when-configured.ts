/**
 * @packageDocumentation
 * ESLint rule implementation for `require-docsearch-theme-when-configured`.
 */

import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { isAnyPackageDeclaredInNearestManifest } from "../_internal/package-manifest.js";
import { getEffectiveSearchThemeConfigProperty } from "../_internal/search-config.js";
import {
    themeClassicPresetModuleName,
    themeSearchAlgoliaModuleName,
} from "../_internal/theme-classic-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireDocsearchThemeWhenConfigured";

/** Rule module for `require-docsearch-theme-when-configured`. */
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

                    const effectiveSearchConfigProperty =
                        getEffectiveSearchThemeConfigProperty(
                            configObjectExpression,
                            programNode
                        );

                    if (effectiveSearchConfigProperty === null) {
                        return;
                    }

                    context.report({
                        data: {
                            searchConfigKey: `\`${effectiveSearchConfigProperty.keyLabel}\``,
                        },
                        messageId: "requireDocsearchThemeWhenConfigured",
                        node: effectiveSearchConfigProperty.property.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                configs: [],
                description:
                    "require `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` when DocSearch or Algolia search config is present.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-docsearch-theme-when-configured",
            },
            messages: {
                requireDocsearchThemeWhenConfigured:
                    "{{ searchConfigKey }} is configured, but neither `@docusaurus/theme-search-algolia` nor `@docusaurus/preset-classic` is declared in the nearest `package.json` dependency fields.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-docsearch-theme-when-configured",
    });

export default rule;
