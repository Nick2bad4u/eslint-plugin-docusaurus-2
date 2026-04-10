import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared Docusaurus search and analytics config constants and AST helpers.
 */
import type { DocusaurusTopLevelModuleConfigurationEntry } from "./docusaurus-module-config.js";

import {
    findObjectPropertyByName,
    getObjectExpressionPropertyValueByName,
} from "./docusaurus-config-ast.js";
import {
    findTopLevelModuleConfigurationsByName,
    getTopLevelModuleConfigurationSpecifierNode,
} from "./docusaurus-module-config.js";

/** Canonical legacy Algolia config key used inside `themeConfig`. */
export const algoliaThemeConfigPropertyName = "algolia" as const;
/** Canonical DocSearch config key used inside `themeConfig`. */
export const docsearchThemeConfigPropertyName = "docsearch" as const;
/** Explicit DocSearch adapter plugin module name. */
export const docsearchAdapterPluginModuleName =
    "@docsearch/docusaurus-adapter" as const;
/** Deprecated Universal Analytics plugin module name. */
export const googleAnalyticsPluginModuleName =
    "@docusaurus/plugin-google-analytics" as const;
/** Modern Google gtag plugin module name. */
export const googleGtagPluginModuleName =
    "@docusaurus/plugin-google-gtag" as const;
/** Supported community local-search module names. */
export const localSearchPluginModuleNames = [
    "@cmfcmf/docusaurus-search-local",
    "@easyops-cn/docusaurus-search-local",
    "docusaurus-plugin-search-local",
] as const;
/** Required key names for static Algolia/DocSearch config. */
export const requiredDocsearchOptionNames = [
    "appId",
    "apiKey",
    "indexName",
] as const;

/** Union of supported community local-search module names. */
export type LocalSearchPluginModuleName =
    (typeof localSearchPluginModuleNames)[number];
/** Named configured plugin/theme entry returned by shared search helpers. */
export type NamedPluginConfigurationEntry<PluginName extends string = string> =
    Readonly<{
        entry: Readonly<DocusaurusTopLevelModuleConfigurationEntry>;
        pluginName: PluginName;
    }>;
/** Search-related `themeConfig` property keys understood by the plugin. */
export type SearchThemeConfigPropertyName =
    | typeof algoliaThemeConfigPropertyName
    | typeof docsearchThemeConfigPropertyName;
/** Resolved search-provider properties from a Docusaurus `themeConfig` object. */
export type ThemeConfigSearchProperties = Readonly<{
    algoliaProperty: null | Readonly<TSESTree.Property>;
    docsearchProperty: null | Readonly<TSESTree.Property>;
    themeConfigObject: null | Readonly<TSESTree.ObjectExpression>;
}>;

const findNamedPluginConfigurationsByNames = <PluginName extends string>(
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    pluginNames: readonly PluginName[]
): readonly NamedPluginConfigurationEntry<PluginName>[] => {
    const pluginConfigurations: NamedPluginConfigurationEntry<PluginName>[] =
        [];

    for (const pluginName of pluginNames) {
        for (const propertyName of ["plugins", "themes"] as const) {
            for (const entry of findTopLevelModuleConfigurationsByName(
                configObjectExpression,
                propertyName,
                pluginName
            )) {
                pluginConfigurations.push({
                    entry,
                    pluginName,
                });
            }
        }
    }

    return pluginConfigurations;
};

/** Resolve the `themeConfig.algolia` and `themeConfig.docsearch` properties. */
export const getThemeConfigSearchProperties = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>
): ThemeConfigSearchProperties => {
    const themeConfigObject = getObjectExpressionPropertyValueByName(
        configObjectExpression,
        "themeConfig"
    );

    return {
        algoliaProperty:
            themeConfigObject === null
                ? null
                : findObjectPropertyByName(
                      themeConfigObject,
                      algoliaThemeConfigPropertyName
                  ),
        docsearchProperty:
            themeConfigObject === null
                ? null
                : findObjectPropertyByName(
                      themeConfigObject,
                      docsearchThemeConfigPropertyName
                  ),
        themeConfigObject,
    };
};

/** Find configured local-search provider entries across `plugins` and `themes`. */
export const findLocalSearchPluginConfigurations = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>
): readonly NamedPluginConfigurationEntry<LocalSearchPluginModuleName>[] =>
    findNamedPluginConfigurationsByNames(
        configObjectExpression,
        localSearchPluginModuleNames
    );

/** Get the literal module-specifier node for a configured plugin/theme entry. */
/** Get the literal module-specifier node for a configured search-related entry. */
export const getPluginConfigurationSpecifierNode = (
    entry: Readonly<DocusaurusTopLevelModuleConfigurationEntry>
): null | Readonly<TSESTree.Literal> =>
    getTopLevelModuleConfigurationSpecifierNode(entry);
