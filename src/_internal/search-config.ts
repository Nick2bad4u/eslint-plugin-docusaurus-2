import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared Docusaurus search and analytics config constants and AST helpers.
 */
import type { DocusaurusTopLevelModuleConfigurationEntry } from "./docusaurus-module-config.js";

import {
    findClassicPresetOptionsObjects,
    findObjectPropertyByName,
    findPluginOptionsObjectsByName,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isInternalRouteLikeValue,
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
/** Default search page path used by Algolia/DocSearch when unspecified. */
export const defaultSearchPagePath = "search" as const;
/** Canonical module name for the Docusaurus blog content plugin. */
export const pluginContentBlogModuleName =
    "@docusaurus/plugin-content-blog" as const;
/** Canonical module name for the Docusaurus docs content plugin. */
export const pluginContentDocsModuleName =
    "@docusaurus/plugin-content-docs" as const;
/** Canonical module name for the Docusaurus pages content plugin. */
export const pluginContentPagesModuleName =
    "@docusaurus/plugin-content-pages" as const;

/** Kinds of search provider configuration recognized by this plugin. */
export type ConfiguredSearchProviderKind =
    | "algolia-theme-config"
    | "docsearch-theme-config"
    | "local-search-plugin";
/** Resolved effective search config property and its public key label. */
export type EffectiveSearchThemeConfigProperty = Readonly<{
    keyLabel: `themeConfig.${SearchThemeConfigPropertyName}`;
    property: Readonly<TSESTree.Property>;
}>;
/** Union of supported community local-search module names. */
export type LocalSearchPluginModuleName =
    (typeof localSearchPluginModuleNames)[number];
/** Named configured plugin/theme entry returned by shared search helpers. */
export type NamedPluginConfigurationEntry<PluginName extends string = string> =
    Readonly<{
        entry: Readonly<DocusaurusTopLevelModuleConfigurationEntry>;
        pluginName: PluginName;
    }>;
/** Route-base-path candidate that can conflict with a configured search page. */
export type SearchPagePathConflictCandidate = Readonly<{
    owner: string;
    routeBasePath: string;
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
    pluginNames: readonly PluginName[],
    programNode?: Readonly<TSESTree.Program>
): readonly NamedPluginConfigurationEntry<PluginName>[] => {
    const pluginConfigurations: NamedPluginConfigurationEntry<PluginName>[] =
        [];

    for (const pluginName of pluginNames) {
        for (const propertyName of ["plugins", "themes"] as const) {
            for (const entry of findTopLevelModuleConfigurationsByName(
                configObjectExpression,
                propertyName,
                pluginName,
                programNode
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
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode?: Readonly<TSESTree.Program>
): ThemeConfigSearchProperties => {
    const themeConfigObject = getObjectExpressionPropertyValueByName(
        configObjectExpression,
        "themeConfig",
        programNode
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

/** Resolve the effective search config property, preferring `docsearch`. */
export const getEffectiveSearchThemeConfigProperty = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode?: Readonly<TSESTree.Program>
): EffectiveSearchThemeConfigProperty | null => {
    const { algoliaProperty, docsearchProperty } =
        getThemeConfigSearchProperties(configObjectExpression, programNode);

    if (docsearchProperty !== null) {
        return {
            keyLabel: `themeConfig.${docsearchThemeConfigPropertyName}`,
            property: docsearchProperty,
        };
    }

    return algoliaProperty === null
        ? null
        : {
              keyLabel: `themeConfig.${algoliaThemeConfigPropertyName}`,
              property: algoliaProperty,
          };
};

/** Find configured local-search provider entries across `plugins` and `themes`. */
export const findLocalSearchPluginConfigurations = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode?: Readonly<TSESTree.Program>
): readonly NamedPluginConfigurationEntry<LocalSearchPluginModuleName>[] =>
    findNamedPluginConfigurationsByNames(
        configObjectExpression,
        localSearchPluginModuleNames,
        programNode
    );

/** Get the literal module-specifier node for a configured search-related entry. */
export const getPluginConfigurationSpecifierNode = (
    entry: Readonly<DocusaurusTopLevelModuleConfigurationEntry>
): null | Readonly<TSESTree.Literal> =>
    getTopLevelModuleConfigurationSpecifierNode(entry);

/** Normalize a Docusaurus route-like path for safe equality checks. */
export const normalizeRoutePath = (value: string): string => {
    let normalizedValue = value;

    while (normalizedValue.startsWith("/")) {
        normalizedValue = normalizedValue.slice(1);
    }

    while (normalizedValue.endsWith("/")) {
        normalizedValue = normalizedValue.slice(0, -1);
    }

    return normalizedValue;
};

/** Check whether a static route value targets the default search page. */
export const isDefaultSearchPageRouteValue = (value: string): boolean =>
    isInternalRouteLikeValue(value) &&
    normalizeRoutePath(value) === defaultSearchPagePath;

/** Determine whether search config is meaningfully configured in this file. */
export const getConfiguredSearchProviderKinds = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode?: Readonly<TSESTree.Program>
): ReadonlySet<ConfiguredSearchProviderKind> => {
    const providerKinds = new Set<ConfiguredSearchProviderKind>();
    const { algoliaProperty, docsearchProperty } =
        getThemeConfigSearchProperties(configObjectExpression, programNode);

    if (algoliaProperty !== null) {
        providerKinds.add("algolia-theme-config");
    }

    if (docsearchProperty !== null) {
        providerKinds.add("docsearch-theme-config");
    }

    if (
        findLocalSearchPluginConfigurations(configObjectExpression, programNode)
            .length > 0
    ) {
        providerKinds.add("local-search-plugin");
    }

    return providerKinds;
};

/**
 * Resolve an explicit or default search page path from Algolia/DocSearch
 * config.
 */
export const getConfiguredSearchPagePath = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode: Readonly<TSESTree.Program>
): null | string => {
    const effectiveSearchConfigProperty = getEffectiveSearchThemeConfigProperty(
        configObjectExpression,
        programNode
    );
    const searchConfigProperty = effectiveSearchConfigProperty?.property;

    if (searchConfigProperty?.value.type !== "ObjectExpression") {
        return null;
    }

    const searchPagePathExpression = getObjectPropertyValueByName(
        searchConfigProperty.value,
        "searchPagePath"
    );

    if (searchPagePathExpression === null) {
        return defaultSearchPagePath;
    }

    const staticBooleanValue = getStaticBooleanValueFromExpressionOrIdentifier(
        searchPagePathExpression,
        programNode
    );

    if (staticBooleanValue === false) {
        return null;
    }

    const staticStringValue = getStaticStringValueFromExpressionOrIdentifier(
        searchPagePathExpression,
        programNode
    );

    return staticStringValue === null
        ? null
        : normalizeRoutePath(staticStringValue);
};

/** Determine whether search page support is explicitly disabled with `false`. */
export const isSearchPageExplicitlyDisabled = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode?: Readonly<TSESTree.Program>
): boolean => {
    const effectiveSearchConfigProperty = getEffectiveSearchThemeConfigProperty(
        configObjectExpression,
        programNode
    );
    const searchConfigProperty = effectiveSearchConfigProperty?.property;

    if (searchConfigProperty?.value.type !== "ObjectExpression") {
        return false;
    }

    const searchPagePathExpression = getObjectPropertyValueByName(
        searchConfigProperty.value,
        "searchPagePath"
    );

    return (
        searchPagePathExpression !== null &&
        searchPagePathExpression.type === "Literal" &&
        searchPagePathExpression.value === false
    );
};

/** Collect route-base-path values that can conflict with a search page path. */
export const getSearchPagePathConflictCandidates = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode: Readonly<TSESTree.Program>
): readonly SearchPagePathConflictCandidate[] => {
    const conflictCandidates: SearchPagePathConflictCandidate[] = [];

    for (const presetOptionsObject of findClassicPresetOptionsObjects(
        configObjectExpression,
        programNode
    )) {
        const docsOptionsObject = getObjectExpressionPropertyValueByName(
            presetOptionsObject,
            "docs"
        );
        const blogOptionsObject = getObjectExpressionPropertyValueByName(
            presetOptionsObject,
            "blog"
        );
        const pagesOptionsObject = getObjectExpressionPropertyValueByName(
            presetOptionsObject,
            "pages"
        );

        if (docsOptionsObject !== null) {
            const routeBasePathExpression = getObjectPropertyValueByName(
                docsOptionsObject,
                "routeBasePath"
            );
            const routeBasePath =
                routeBasePathExpression === null
                    ? "docs"
                    : getStaticStringValueFromExpressionOrIdentifier(
                          routeBasePathExpression,
                          programNode
                      );

            if (routeBasePath !== null) {
                conflictCandidates.push({
                    owner: "classic preset docs",
                    routeBasePath: normalizeRoutePath(routeBasePath),
                });
            }
        }

        if (blogOptionsObject !== null) {
            const routeBasePathExpression = getObjectPropertyValueByName(
                blogOptionsObject,
                "routeBasePath"
            );
            const routeBasePath =
                routeBasePathExpression === null
                    ? "blog"
                    : getStaticStringValueFromExpressionOrIdentifier(
                          routeBasePathExpression,
                          programNode
                      );

            if (routeBasePath !== null) {
                conflictCandidates.push({
                    owner: "classic preset blog",
                    routeBasePath: normalizeRoutePath(routeBasePath),
                });
            }
        }

        if (pagesOptionsObject !== null) {
            const routeBasePathExpression = getObjectPropertyValueByName(
                pagesOptionsObject,
                "routeBasePath"
            );
            const routeBasePath =
                routeBasePathExpression === null
                    ? ""
                    : getStaticStringValueFromExpressionOrIdentifier(
                          routeBasePathExpression,
                          programNode
                      );

            if (routeBasePath !== null) {
                conflictCandidates.push({
                    owner: "classic preset pages",
                    routeBasePath: normalizeRoutePath(routeBasePath),
                });
            }
        }
    }

    for (const [pluginModuleName, ownerPrefix] of [
        [pluginContentBlogModuleName, "plugin-content-blog"],
        [pluginContentDocsModuleName, "plugin-content-docs"],
        [pluginContentPagesModuleName, "plugin-content-pages"],
    ] as const) {
        let pluginIndex = 0;

        for (const pluginOptionsObject of findPluginOptionsObjectsByName(
            configObjectExpression,
            pluginModuleName,
            programNode
        )) {
            pluginIndex += 1;
            const routeBasePathExpression = getObjectPropertyValueByName(
                pluginOptionsObject,
                "routeBasePath"
            );
            const routeBasePath =
                routeBasePathExpression === null
                    ? null
                    : getStaticStringValueFromExpressionOrIdentifier(
                          routeBasePathExpression,
                          programNode
                      );

            if (routeBasePath === null) {
                continue;
            }

            conflictCandidates.push({
                owner: `${ownerPrefix} #${String(pluginIndex)}`,
                routeBasePath: normalizeRoutePath(routeBasePath),
            });
        }
    }

    return conflictCandidates;
};
