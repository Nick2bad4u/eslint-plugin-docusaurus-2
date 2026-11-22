/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-theme-config-docsearch`.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { hasAnyTopLevelModuleConfigurationByName } from "../_internal/docusaurus-module-config.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import {
    docsearchAdapterPluginModuleName,
    docsearchThemeConfigPropertyName,
    getThemeConfigSearchProperties,
} from "../_internal/search-config.js";
import { themeSearchAlgoliaModuleName } from "../_internal/theme-classic-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    "noConflictingThemeConfigSearchKeys" | "preferThemeConfigDocsearch";

const createPropertyKeyReplacementText = (
    property: Readonly<TSESTree.Property>,
    replacementPropertyName: string
): null | string => {
    if (property.key.type === AST_NODE_TYPES.Identifier) {
        return property.shorthand
            ? `${replacementPropertyName}: ${property.key.name}`
            : replacementPropertyName;
    }

    return property.key.type === AST_NODE_TYPES.Literal &&
        typeof property.key.value === "string"
        ? JSON.stringify(replacementPropertyName)
        : null;
};

/** Rule module for `prefer-theme-config-docsearch`. */
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
                        !hasAnyTopLevelModuleConfigurationByName(
                            configObjectExpression,
                            docsearchAdapterPluginModuleName,
                            programNode
                        ) ||
                        hasAnyTopLevelModuleConfigurationByName(
                            configObjectExpression,
                            themeSearchAlgoliaModuleName,
                            programNode
                        )
                    ) {
                        return;
                    }

                    const { algoliaProperty, docsearchProperty } =
                        getThemeConfigSearchProperties(
                            configObjectExpression,
                            programNode
                        );

                    if (algoliaProperty === null) {
                        return;
                    }

                    if (docsearchProperty !== null) {
                        context.report({
                            messageId: "noConflictingThemeConfigSearchKeys",
                            node: algoliaProperty.key,
                        });

                        return;
                    }

                    const replacementText = createPropertyKeyReplacementText(
                        algoliaProperty,
                        docsearchThemeConfigPropertyName
                    );

                    reportWithOptionalFix({
                        context,
                        fix:
                            replacementText === null
                                ? null
                                : (fixer) =>
                                      fixer.replaceText(
                                          algoliaProperty.key,
                                          replacementText
                                      ),
                        messageId: "preferThemeConfigDocsearch",
                        node: algoliaProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "enforce `themeConfig.docsearch` when the standalone DocSearch adapter is configured.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-docsearch",
            },
            fixable: "code",
            languages: ["js/js"],
            messages: {
                noConflictingThemeConfigSearchKeys:
                    "Keep one DocSearch adapter configuration under `themeConfig.docsearch`.",
                preferThemeConfigDocsearch:
                    "Prefer `themeConfig.docsearch` when using the standalone DocSearch adapter.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-theme-config-docsearch",
    });

export default rule;
