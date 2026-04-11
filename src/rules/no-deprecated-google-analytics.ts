/**
 * @packageDocumentation
 * ESLint rule implementation for `no-deprecated-google-analytics`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findClassicPresetOptionsObjects,
    findObjectPropertyByName,
    findPluginConfigurationsByName,
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    getPluginConfigurationSpecifierNode,
    googleAnalyticsPluginModuleName,
    googleGtagPluginModuleName,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "noDeprecatedGoogleAnalytics"
    | "renamePluginToGoogleGtag"
    | "renamePresetOptionToGtag";
type RuleSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const createPropertyKeyReplacementText = (
    property: Readonly<TSESTree.Property>,
    replacementPropertyName: string
): null | string => {
    if (property.key.type === "Identifier") {
        return replacementPropertyName;
    }

    return property.key.type === "Literal" &&
        typeof property.key.value === "string"
        ? JSON.stringify(replacementPropertyName)
        : null;
};

const createRenamePluginSuggestion = (
    pluginSpecifierNode: Readonly<TSESTree.Literal>
): RuleSuggestion => ({
    fix: (fixer) =>
        fixer.replaceText(
            pluginSpecifierNode,
            JSON.stringify(googleGtagPluginModuleName)
        ),
    messageId: "renamePluginToGoogleGtag",
});

const createRenamePresetOptionSuggestion = (
    property: Readonly<TSESTree.Property>
): null | RuleSuggestion => {
    const replacementText = createPropertyKeyReplacementText(property, "gtag");

    return replacementText === null
        ? null
        : {
              fix: (fixer) => fixer.replaceText(property.key, replacementText),
              messageId: "renamePresetOptionToGtag",
          };
};

/** Rule module for `no-deprecated-google-analytics`. */
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

                    const hasGoogleGtagPlugin =
                        findPluginConfigurationsByName(
                            configObjectExpression,
                            googleGtagPluginModuleName
                        ).length > 0;

                    for (const pluginEntry of findPluginConfigurationsByName(
                        configObjectExpression,
                        googleAnalyticsPluginModuleName
                    )) {
                        const pluginSpecifierNode =
                            getPluginConfigurationSpecifierNode(pluginEntry);

                        if (pluginSpecifierNode === null) {
                            continue;
                        }

                        const pluginSuggestions: RuleSuggestion[] =
                            hasGoogleGtagPlugin
                                ? []
                                : [
                                      createRenamePluginSuggestion(
                                          pluginSpecifierNode
                                      ),
                                  ];

                        context.report({
                            messageId: "noDeprecatedGoogleAnalytics",
                            node: pluginSpecifierNode,
                            suggest:
                                pluginSuggestions.length === 0
                                    ? null
                                    : pluginSuggestions,
                        });
                    }

                    for (const presetOptionsObject of findClassicPresetOptionsObjects(
                        configObjectExpression
                    )) {
                        const googleAnalyticsProperty =
                            findObjectPropertyByName(
                                presetOptionsObject,
                                "googleAnalytics"
                            );

                        if (googleAnalyticsProperty === null) {
                            continue;
                        }

                        const hasGtagProperty =
                            findObjectPropertyByName(
                                presetOptionsObject,
                                "gtag"
                            ) !== null;
                        const renameSuggestion =
                            createRenamePresetOptionSuggestion(
                                googleAnalyticsProperty
                            );
                        const presetSuggestions: RuleSuggestion[] =
                            hasGtagProperty || renameSuggestion === null
                                ? []
                                : [renameSuggestion];

                        context.report({
                            messageId: "noDeprecatedGoogleAnalytics",
                            node: googleAnalyticsProperty.key,
                            suggest:
                                presetSuggestions.length === 0
                                    ? null
                                    : presetSuggestions,
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
                    "disallow the deprecated Universal Analytics Docusaurus plugin and classic-preset option.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-google-analytics",
            },
            hasSuggestions: true,
            messages: {
                noDeprecatedGoogleAnalytics:
                    "`@docusaurus/plugin-google-analytics` and the classic-preset `googleAnalytics` option are deprecated and no longer useful after the Universal Analytics shutdown. Migrate to `@docusaurus/plugin-google-gtag` or the classic-preset `gtag` option instead.",
                renamePluginToGoogleGtag:
                    "Rename the deprecated plugin entry to `@docusaurus/plugin-google-gtag`, then review your tracking IDs for GA4.",
                renamePresetOptionToGtag:
                    "Rename the deprecated classic-preset `googleAnalytics` option to `gtag`, then review your tracking IDs for GA4.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-deprecated-google-analytics",
    });

export default rule;
