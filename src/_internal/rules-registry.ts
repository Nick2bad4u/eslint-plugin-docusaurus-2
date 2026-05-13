/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by this plugin.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import type { UnknownArray } from "./types.js";

import * as localSearchWillNotWorkInDevRuleModule from "../rules/local-search-will-not-work-in-dev.js";
import * as noConflictingConfigLinkContentPropsRuleModule from "../rules/no-conflicting-config-link-content-props.js";
import * as noConflictingConfigLinkPropsRuleModule from "../rules/no-conflicting-config-link-props.js";
import * as noConflictingFooterHtmlItemPropsRuleModule from "../rules/no-conflicting-footer-html-item-props.js";
import * as noConflictingNavbarDocItemPropsRuleModule from "../rules/no-conflicting-navbar-doc-item-props.js";
import * as noConflictingNavbarDocSidebarItemPropsRuleModule from "../rules/no-conflicting-navbar-doc-sidebar-item-props.js";
import * as noConflictingSearchProvidersRuleModule from "../rules/no-conflicting-search-providers.js";
import * as noConflictingThemeConfigColorModeFlagsRuleModule from "../rules/no-conflicting-theme-config-color-mode-flags.js";
import * as noConflictingThemeConfigMetadataKeysRuleModule from "../rules/no-conflicting-theme-config-metadata-keys.js";
import * as noDeprecatedAdmonitionTitleSyntaxRuleModule from "../rules/no-deprecated-admonition-title-syntax.js";
import * as noDeprecatedFutureExperimentalFasterRuleModule from "../rules/no-deprecated-future-experimental-faster.js";
import * as noDeprecatedFutureExperimentalStorageRuleModule from "../rules/no-deprecated-future-experimental-storage.js";
import * as noDeprecatedGoogleAnalyticsRuleModule from "../rules/no-deprecated-google-analytics.js";
import * as noDeprecatedHeadingIdSyntaxRuleModule from "../rules/no-deprecated-heading-id-syntax.js";
import * as noDeprecatedHtmlCommentsInMdxRuleModule from "../rules/no-deprecated-html-comments-in-mdx.js";
import * as noDeprecatedOnBrokenMarkdownLinksRuleModule from "../rules/no-deprecated-on-broken-markdown-links.js";
import * as noDuplicateFooterColumnTitlesRuleModule from "../rules/no-duplicate-footer-column-titles.js";
import * as noDuplicateFooterLinkItemDestinationsRuleModule from "../rules/no-duplicate-footer-link-item-destinations.js";
import * as noDuplicateFooterLinkItemLabelsRuleModule from "../rules/no-duplicate-footer-link-item-labels.js";
import * as noDuplicateHeadTagsRuleModule from "../rules/no-duplicate-head-tags.js";
import * as noDuplicateI18nLocalesRuleModule from "../rules/no-duplicate-i18n-locales.js";
import * as noDuplicateNavbarItemDestinationsRuleModule from "../rules/no-duplicate-navbar-item-destinations.js";
import * as noDuplicateNavbarItemLabelsRuleModule from "../rules/no-duplicate-navbar-item-labels.js";
import * as noDuplicatePluginPwaHeadTagsRuleModule from "../rules/no-duplicate-plugin-pwa-head-tags.js";
import * as noDuplicateSidebarDocIdsRuleModule from "../rules/no-duplicate-sidebar-doc-ids.js";
import * as noDuplicateThemeClassicCustomCssRuleModule from "../rules/no-duplicate-theme-classic-custom-css.js";
import * as noDuplicateThemeConfigMetadataKeysRuleModule from "../rules/no-duplicate-theme-config-metadata-keys.js";
import * as noEmptyConfigLinkDestinationsRuleModule from "../rules/no-empty-config-link-destinations.js";
import * as noEmptyConfigLinkLabelsRuleModule from "../rules/no-empty-config-link-labels.js";
import * as noEmptyFooterLinkColumnsRuleModule from "../rules/no-empty-footer-link-columns.js";
import * as noEmptyFooterLinkItemsRuleModule from "../rules/no-empty-footer-link-items.js";
import * as noEmptyHeadTagsRuleModule from "../rules/no-empty-head-tags.js";
import * as noEmptyNavbarDropdownItemsRuleModule from "../rules/no-empty-navbar-dropdown-items.js";
import * as noEmptyNavbarItemObjectsRuleModule from "../rules/no-empty-navbar-item-objects.js";
import * as noEmptySidebarCategoriesRuleModule from "../rules/no-empty-sidebar-categories.js";
import * as noEmptyThemeClassicCustomCssRuleModule from "../rules/no-empty-theme-classic-custom-css.js";
import * as noEmptyThemeConfigMetadataRuleModule from "../rules/no-empty-theme-config-metadata.js";
import * as noIgnoredSiteValidationsRuleModule from "../rules/no-ignored-site-validations.js";
import * as noMixedSidebarLinkKindsRuleModule from "../rules/no-mixed-sidebar-link-kinds.js";
import * as noPageCssModuleImportsInComponentsRuleModule from "../rules/no-page-css-module-imports-in-components.js";
import * as noRedundantSocialCardMetadataRuleModule from "../rules/no-redundant-social-card-metadata.js";
import * as noSearchLinkWithoutSearchProviderRuleModule from "../rules/no-search-link-without-search-provider.js";
import * as noSearchPageLinkWhenSearchPageDisabledRuleModule from "../rules/no-search-page-link-when-search-page-disabled.js";
import * as noSearchPagePathConflictRuleModule from "../rules/no-search-page-path-conflict.js";
import * as noSvgSocialCardImageRuleModule from "../rules/no-svg-social-card-image.js";
import * as noUnknownI18nLocaleConfigsRuleModule from "../rules/no-unknown-i18n-locale-configs.js";
import * as noUseBaseUrlForInternalLinkComponentsRuleModule from "../rules/no-use-base-url-for-internal-link-components.js";
import * as noUselessCollapsedSidebarCategoriesRuleModule from "../rules/no-useless-collapsed-sidebar-categories.js";
import * as preferConfigSatisfiesRuleModule from "../rules/prefer-config-satisfies.js";
import * as preferCssModulesInSiteSrcRuleModule from "../rules/prefer-css-modules-in-site-src.js";
import * as preferHeadTagAttributesObjectRuleModule from "../rules/prefer-head-tag-attributes-object.js";
import * as preferHrefForExternalLinkComponentsRuleModule from "../rules/prefer-href-for-external-link-components.js";
import * as preferHrefForExternalLinksRuleModule from "../rules/prefer-href-for-external-links.js";
import * as preferI18nDefaultLocaleFirstRuleModule from "../rules/prefer-i18n-default-locale-first.js";
import * as preferSidebarsConfigSatisfiesRuleModule from "../rules/prefer-sidebars-config-satisfies.js";
import * as preferThemeConfigDocsearchRuleModule from "../rules/prefer-theme-config-docsearch.js";
import * as preferThemeConfigMetadataNameForTwitterTagsRuleModule from "../rules/prefer-theme-config-metadata-name-for-twitter-tags.js";
import * as preferThemeConfigMetadataPropertyForOgTagsRuleModule from "../rules/prefer-theme-config-metadata-property-for-og-tags.js";
import * as preferToForInternalLinkComponentsRuleModule from "../rules/prefer-to-for-internal-link-components.js";
import * as preferToForInternalLinksRuleModule from "../rules/prefer-to-for-internal-links.js";
import * as preferUseBaseUrlForStaticAssetsRuleModule from "../rules/prefer-use-base-url-for-static-assets.js";
import * as requireBalancedFooterLinkColumnsRuleModule from "../rules/require-balanced-footer-link-columns.js";
import * as requireBaseUrlIssueBannerEnabledRuleModule from "../rules/require-base-url-issue-banner-enabled.js";
import * as requireBaseUrlSlashesRuleModule from "../rules/require-base-url-slashes.js";
import * as requireConfigLinkContentRuleModule from "../rules/require-config-link-content.js";
import * as requireConfigLinkDestinationRuleModule from "../rules/require-config-link-destination.js";
import * as requireDefaultExportPagesRuleModule from "../rules/require-default-export-pages.js";
import * as requireDocSidebarLinkTypeRuleModule from "../rules/require-doc-sidebar-link-type.js";
import * as requireDocsearchAskAiAssistantIdRuleModule from "../rules/require-docsearch-ask-ai-assistant-id.js";
import * as requireDocsearchThemeWhenConfiguredRuleModule from "../rules/require-docsearch-theme-when-configured.js";
import * as requireDocusaurusFasterPackageInstalledRuleModule from "../rules/require-docusaurus-faster-package-installed.js";
import * as requireFooterLinkColumnItemsRuleModule from "../rules/require-footer-link-column-items.js";
import * as requireFooterLinkColumnTitleRuleModule from "../rules/require-footer-link-column-title.js";
import * as requireGeneratedIndexLinkTypeRuleModule from "../rules/require-generated-index-link-type.js";
import * as requireHeadTagAttributesWhenNoInnerHtmlRuleModule from "../rules/require-head-tag-attributes-when-no-inner-html.js";
import * as requireHeadTagContentOrAttributesRuleModule from "../rules/require-head-tag-content-or-attributes.js";
import * as requireHeadTagTagNameRuleModule from "../rules/require-head-tag-tag-name.js";
import * as requireI18nDefaultLocaleInLocalesRuleModule from "../rules/require-i18n-default-locale-in-locales.js";
import * as requireMarkdownFormatDetectRuleModule from "../rules/require-markdown-format-detect.js";
import * as requireMarkdownMermaidWhenThemeMermaidEnabledRuleModule from "../rules/require-markdown-mermaid-when-theme-mermaid-enabled.js";
import * as requireMermaidElkPackageInstalledRuleModule from "../rules/require-mermaid-elk-package-installed.js";
import * as requireNavbarDocItemDocIdRuleModule from "../rules/require-navbar-doc-item-doc-id.js";
import * as requireNavbarDocSidebarItemSidebarIdRuleModule from "../rules/require-navbar-doc-sidebar-item-sidebar-id.js";
import * as requireNavbarDocsVersionItemToRuleModule from "../rules/require-navbar-docs-version-item-to.js";
import * as requireNavbarDropdownItemsRuleModule from "../rules/require-navbar-dropdown-items.js";
import * as requireNavbarDropdownLabelRuleModule from "../rules/require-navbar-dropdown-label.js";
import * as requireNavbarHtmlItemValueRuleModule from "../rules/require-navbar-html-item-value.js";
import * as requirePagesPluginExcludesRuleModule from "../rules/require-pages-plugin-excludes.js";
import * as requirePluginPwaDebugRuleModule from "../rules/require-plugin-pwa-debug.js";
import * as requirePluginPwaHeadManifestRuleModule from "../rules/require-plugin-pwa-head-manifest.js";
import * as requirePluginPwaHeadThemeColorRuleModule from "../rules/require-plugin-pwa-head-theme-color.js";
import * as requirePluginPwaOfflineModeActivationStrategiesRuleModule from "../rules/require-plugin-pwa-offline-mode-activation-strategies.js";
import * as requirePluginPwaSetupRuleModule from "../rules/require-plugin-pwa-setup.js";
import * as requireRspackBundlerForFasterPersistentCacheRuleModule from "../rules/require-rspack-bundler-for-faster-persistent-cache.js";
import * as requireSearchProviderPackageInstalledRuleModule from "../rules/require-search-provider-package-installed.js";
import * as requireSidebarCategoryItemsRuleModule from "../rules/require-sidebar-category-items.js";
import * as requireSidebarCategoryLabelRuleModule from "../rules/require-sidebar-category-label.js";
import * as requireSidebarCategoryTypeRuleModule from "../rules/require-sidebar-category-type.js";
import * as requireSidebarItemKeyForDuplicateLabelsRuleModule from "../rules/require-sidebar-item-key-for-duplicate-labels.js";
import * as requireSiteConfigFieldsRuleModule from "../rules/require-site-config-fields.js";
import * as requireSiteUrlOriginRuleModule from "../rules/require-site-url-origin.js";
import * as requireThemeClassicCustomCssFilesExistRuleModule from "../rules/require-theme-classic-custom-css-files-exist.js";
import * as requireThemeClassicPackageInstalledRuleModule from "../rules/require-theme-classic-package-installed.js";
import * as requireThemeConfigAnnouncementBarIdRuleModule from "../rules/require-theme-config-announcement-bar-id.js";
import * as requireThemeConfigColorModeObjectRuleModule from "../rules/require-theme-config-color-mode-object.js";
import * as requireThemeConfigDocsearchConfigRuleModule from "../rules/require-theme-config-docsearch-config.js";
import * as requireThemeConfigImageRuleModule from "../rules/require-theme-config-image.js";
import * as requireThemeLiveCodeblockPackageInstalledRuleModule from "../rules/require-theme-live-codeblock-package-installed.js";
import * as requireThemeLiveCodeblockWhenLiveCodeblockConfiguredRuleModule from "../rules/require-theme-live-codeblock-when-live-codeblock-configured.js";
import * as requireThemeMermaidPackageInstalledRuleModule from "../rules/require-theme-mermaid-package-installed.js";
import * as requireThemeMermaidWhenMarkdownMermaidEnabledRuleModule from "../rules/require-theme-mermaid-when-markdown-mermaid-enabled.js";
import * as requireThemeSearchAlgoliaPackageInstalledRuleModule from "../rules/require-theme-search-algolia-package-installed.js";
import * as requireTrailingSlashExplicitRuleModule from "../rules/require-trailing-slash-explicit.js";
import * as requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreadsRuleModule from "../rules/require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads.js";
import * as validateLiveCodeblockPlaygroundPositionRuleModule from "../rules/validate-live-codeblock-playground-position.js";
import * as validateNavbarItemPositionRuleModule from "../rules/validate-navbar-item-position.js";
import * as validateThemeConfigAnnouncementBarIsCloseableRuleModule from "../rules/validate-theme-config-announcement-bar-is-closeable.js";
import * as validateThemeConfigColorModeDefaultModeRuleModule from "../rules/validate-theme-config-color-mode-default-mode.js";
import * as validateThemeConfigColorModeSwitchFlagsRuleModule from "../rules/validate-theme-config-color-mode-switch-flags.js";
import * as validateThemeConfigFooterStyleRuleModule from "../rules/validate-theme-config-footer-style.js";
import * as validateThemeConfigMetadataRuleModule from "../rules/validate-theme-config-metadata.js";
import * as validateThemeConfigNavbarStyleRuleModule from "../rules/validate-theme-config-navbar-style.js";

/** Runtime rule module shape used by registry/preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, UnknownArray>;

/**
 * Runtime map of all rule modules keyed by unqualified rule name.
 */
const docusaurusRuleRegistry = {
    "local-search-will-not-work-in-dev":
        localSearchWillNotWorkInDevRuleModule.default,
    "no-conflicting-config-link-content-props":
        noConflictingConfigLinkContentPropsRuleModule.default,
    "no-conflicting-config-link-props":
        noConflictingConfigLinkPropsRuleModule.default,
    "no-conflicting-footer-html-item-props":
        noConflictingFooterHtmlItemPropsRuleModule.default,
    "no-conflicting-navbar-doc-item-props":
        noConflictingNavbarDocItemPropsRuleModule.default,
    "no-conflicting-navbar-doc-sidebar-item-props":
        noConflictingNavbarDocSidebarItemPropsRuleModule.default,
    "no-conflicting-search-providers":
        noConflictingSearchProvidersRuleModule.default,
    "no-conflicting-theme-config-color-mode-flags":
        noConflictingThemeConfigColorModeFlagsRuleModule.default,
    "no-conflicting-theme-config-metadata-keys":
        noConflictingThemeConfigMetadataKeysRuleModule.default,
    "no-deprecated-admonition-title-syntax":
        noDeprecatedAdmonitionTitleSyntaxRuleModule.default,
    "no-deprecated-future-experimental-faster":
        noDeprecatedFutureExperimentalFasterRuleModule.default,
    "no-deprecated-future-experimental-storage":
        noDeprecatedFutureExperimentalStorageRuleModule.default,
    "no-deprecated-google-analytics":
        noDeprecatedGoogleAnalyticsRuleModule.default,
    "no-deprecated-heading-id-syntax":
        noDeprecatedHeadingIdSyntaxRuleModule.default,
    "no-deprecated-html-comments-in-mdx":
        noDeprecatedHtmlCommentsInMdxRuleModule.default,
    "no-deprecated-on-broken-markdown-links":
        noDeprecatedOnBrokenMarkdownLinksRuleModule.default,
    "no-duplicate-footer-column-titles":
        noDuplicateFooterColumnTitlesRuleModule.default,
    "no-duplicate-footer-link-item-destinations":
        noDuplicateFooterLinkItemDestinationsRuleModule.default,
    "no-duplicate-footer-link-item-labels":
        noDuplicateFooterLinkItemLabelsRuleModule.default,
    "no-duplicate-head-tags": noDuplicateHeadTagsRuleModule.default,
    "no-duplicate-i18n-locales": noDuplicateI18nLocalesRuleModule.default,
    "no-duplicate-navbar-item-destinations":
        noDuplicateNavbarItemDestinationsRuleModule.default,
    "no-duplicate-navbar-item-labels":
        noDuplicateNavbarItemLabelsRuleModule.default,
    "no-duplicate-plugin-pwa-head-tags":
        noDuplicatePluginPwaHeadTagsRuleModule.default,
    "no-duplicate-sidebar-doc-ids": noDuplicateSidebarDocIdsRuleModule.default,
    "no-duplicate-theme-classic-custom-css":
        noDuplicateThemeClassicCustomCssRuleModule.default,
    "no-duplicate-theme-config-metadata-keys":
        noDuplicateThemeConfigMetadataKeysRuleModule.default,
    "no-empty-config-link-destinations":
        noEmptyConfigLinkDestinationsRuleModule.default,
    "no-empty-config-link-labels": noEmptyConfigLinkLabelsRuleModule.default,
    "no-empty-footer-link-columns": noEmptyFooterLinkColumnsRuleModule.default,
    "no-empty-footer-link-items": noEmptyFooterLinkItemsRuleModule.default,
    "no-empty-head-tags": noEmptyHeadTagsRuleModule.default,
    "no-empty-navbar-dropdown-items":
        noEmptyNavbarDropdownItemsRuleModule.default,
    "no-empty-navbar-item-objects": noEmptyNavbarItemObjectsRuleModule.default,
    "no-empty-sidebar-categories": noEmptySidebarCategoriesRuleModule.default,
    "no-empty-theme-classic-custom-css":
        noEmptyThemeClassicCustomCssRuleModule.default,
    "no-empty-theme-config-metadata":
        noEmptyThemeConfigMetadataRuleModule.default,
    "no-ignored-site-validations": noIgnoredSiteValidationsRuleModule.default,
    "no-mixed-sidebar-link-kinds": noMixedSidebarLinkKindsRuleModule.default,
    "no-page-css-module-imports-in-components":
        noPageCssModuleImportsInComponentsRuleModule.default,
    "no-redundant-social-card-metadata":
        noRedundantSocialCardMetadataRuleModule.default,
    "no-search-link-without-search-provider":
        noSearchLinkWithoutSearchProviderRuleModule.default,
    "no-search-page-link-when-search-page-disabled":
        noSearchPageLinkWhenSearchPageDisabledRuleModule.default,
    "no-search-page-path-conflict": noSearchPagePathConflictRuleModule.default,
    "no-svg-social-card-image": noSvgSocialCardImageRuleModule.default,
    "no-unknown-i18n-locale-configs":
        noUnknownI18nLocaleConfigsRuleModule.default,
    "no-use-base-url-for-internal-link-components":
        noUseBaseUrlForInternalLinkComponentsRuleModule.default,
    "no-useless-collapsed-sidebar-categories":
        noUselessCollapsedSidebarCategoriesRuleModule.default,
    "prefer-config-satisfies": preferConfigSatisfiesRuleModule.default,
    "prefer-css-modules-in-site-src":
        preferCssModulesInSiteSrcRuleModule.default,
    "prefer-head-tag-attributes-object":
        preferHeadTagAttributesObjectRuleModule.default,
    "prefer-href-for-external-link-components":
        preferHrefForExternalLinkComponentsRuleModule.default,
    "prefer-href-for-external-links":
        preferHrefForExternalLinksRuleModule.default,
    "prefer-i18n-default-locale-first":
        preferI18nDefaultLocaleFirstRuleModule.default,
    "prefer-sidebars-config-satisfies":
        preferSidebarsConfigSatisfiesRuleModule.default,
    "prefer-theme-config-docsearch":
        preferThemeConfigDocsearchRuleModule.default,
    "prefer-theme-config-metadata-name-for-twitter-tags":
        preferThemeConfigMetadataNameForTwitterTagsRuleModule.default,
    "prefer-theme-config-metadata-property-for-og-tags":
        preferThemeConfigMetadataPropertyForOgTagsRuleModule.default,
    "prefer-to-for-internal-link-components":
        preferToForInternalLinkComponentsRuleModule.default,
    "prefer-to-for-internal-links": preferToForInternalLinksRuleModule.default,
    "prefer-use-base-url-for-static-assets":
        preferUseBaseUrlForStaticAssetsRuleModule.default,
    "require-balanced-footer-link-columns":
        requireBalancedFooterLinkColumnsRuleModule.default,
    "require-base-url-issue-banner-enabled":
        requireBaseUrlIssueBannerEnabledRuleModule.default,
    "require-base-url-slashes": requireBaseUrlSlashesRuleModule.default,
    "require-config-link-content": requireConfigLinkContentRuleModule.default,
    "require-config-link-destination":
        requireConfigLinkDestinationRuleModule.default,
    "require-default-export-pages": requireDefaultExportPagesRuleModule.default,
    "require-doc-sidebar-link-type":
        requireDocSidebarLinkTypeRuleModule.default,
    "require-docsearch-ask-ai-assistant-id":
        requireDocsearchAskAiAssistantIdRuleModule.default,
    "require-docsearch-theme-when-configured":
        requireDocsearchThemeWhenConfiguredRuleModule.default,
    "require-docusaurus-faster-package-installed":
        requireDocusaurusFasterPackageInstalledRuleModule.default,
    "require-footer-link-column-items":
        requireFooterLinkColumnItemsRuleModule.default,
    "require-footer-link-column-title":
        requireFooterLinkColumnTitleRuleModule.default,
    "require-generated-index-link-type":
        requireGeneratedIndexLinkTypeRuleModule.default,
    "require-head-tag-attributes-when-no-inner-html":
        requireHeadTagAttributesWhenNoInnerHtmlRuleModule.default,
    "require-head-tag-content-or-attributes":
        requireHeadTagContentOrAttributesRuleModule.default,
    "require-head-tag-tag-name": requireHeadTagTagNameRuleModule.default,
    "require-i18n-default-locale-in-locales":
        requireI18nDefaultLocaleInLocalesRuleModule.default,
    "require-markdown-format-detect":
        requireMarkdownFormatDetectRuleModule.default,
    "require-markdown-mermaid-when-theme-mermaid-enabled":
        requireMarkdownMermaidWhenThemeMermaidEnabledRuleModule.default,
    "require-mermaid-elk-package-installed":
        requireMermaidElkPackageInstalledRuleModule.default,
    "require-navbar-doc-item-doc-id":
        requireNavbarDocItemDocIdRuleModule.default,
    "require-navbar-doc-sidebar-item-sidebar-id":
        requireNavbarDocSidebarItemSidebarIdRuleModule.default,
    "require-navbar-docs-version-item-to":
        requireNavbarDocsVersionItemToRuleModule.default,
    "require-navbar-dropdown-items":
        requireNavbarDropdownItemsRuleModule.default,
    "require-navbar-dropdown-label":
        requireNavbarDropdownLabelRuleModule.default,
    "require-navbar-html-item-value":
        requireNavbarHtmlItemValueRuleModule.default,
    "require-pages-plugin-excludes":
        requirePagesPluginExcludesRuleModule.default,
    "require-plugin-pwa-debug": requirePluginPwaDebugRuleModule.default,
    "require-plugin-pwa-head-manifest":
        requirePluginPwaHeadManifestRuleModule.default,
    "require-plugin-pwa-head-theme-color":
        requirePluginPwaHeadThemeColorRuleModule.default,
    "require-plugin-pwa-offline-mode-activation-strategies":
        requirePluginPwaOfflineModeActivationStrategiesRuleModule.default,
    "require-plugin-pwa-setup": requirePluginPwaSetupRuleModule.default,
    "require-rspack-bundler-for-faster-persistent-cache":
        requireRspackBundlerForFasterPersistentCacheRuleModule.default,
    "require-search-provider-package-installed":
        requireSearchProviderPackageInstalledRuleModule.default,
    "require-sidebar-category-items":
        requireSidebarCategoryItemsRuleModule.default,
    "require-sidebar-category-label":
        requireSidebarCategoryLabelRuleModule.default,
    "require-sidebar-category-type":
        requireSidebarCategoryTypeRuleModule.default,
    "require-sidebar-item-key-for-duplicate-labels":
        requireSidebarItemKeyForDuplicateLabelsRuleModule.default,
    "require-site-config-fields": requireSiteConfigFieldsRuleModule.default,
    "require-site-url-origin": requireSiteUrlOriginRuleModule.default,
    "require-theme-classic-custom-css-files-exist":
        requireThemeClassicCustomCssFilesExistRuleModule.default,
    "require-theme-classic-package-installed":
        requireThemeClassicPackageInstalledRuleModule.default,
    "require-theme-config-announcement-bar-id":
        requireThemeConfigAnnouncementBarIdRuleModule.default,
    "require-theme-config-color-mode-object":
        requireThemeConfigColorModeObjectRuleModule.default,
    "require-theme-config-docsearch-config":
        requireThemeConfigDocsearchConfigRuleModule.default,
    "require-theme-config-image": requireThemeConfigImageRuleModule.default,
    "require-theme-live-codeblock-package-installed":
        requireThemeLiveCodeblockPackageInstalledRuleModule.default,
    "require-theme-live-codeblock-when-live-codeblock-configured":
        requireThemeLiveCodeblockWhenLiveCodeblockConfiguredRuleModule.default,
    "require-theme-mermaid-package-installed":
        requireThemeMermaidPackageInstalledRuleModule.default,
    "require-theme-mermaid-when-markdown-mermaid-enabled":
        requireThemeMermaidWhenMarkdownMermaidEnabledRuleModule.default,
    "require-theme-search-algolia-package-installed":
        requireThemeSearchAlgoliaPackageInstalledRuleModule.default,
    "require-trailing-slash-explicit":
        requireTrailingSlashExplicitRuleModule.default,
    "require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads":
        requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreadsRuleModule.default,
    "validate-live-codeblock-playground-position":
        validateLiveCodeblockPlaygroundPositionRuleModule.default,
    "validate-navbar-item-position":
        validateNavbarItemPositionRuleModule.default,
    "validate-theme-config-announcement-bar-is-closeable":
        validateThemeConfigAnnouncementBarIsCloseableRuleModule.default,
    "validate-theme-config-color-mode-default-mode":
        validateThemeConfigColorModeDefaultModeRuleModule.default,
    "validate-theme-config-color-mode-switch-flags":
        validateThemeConfigColorModeSwitchFlagsRuleModule.default,
    "validate-theme-config-footer-style":
        validateThemeConfigFooterStyleRuleModule.default,
    "validate-theme-config-metadata":
        validateThemeConfigMetadataRuleModule.default,
    "validate-theme-config-navbar-style":
        validateThemeConfigNavbarStyleRuleModule.default,
} as const satisfies Readonly<Record<string, RuleWithDocs>>;

/** Exported typed view consumed by the plugin entrypoint. */
export const docusaurusRules: Readonly<Record<string, RuleWithDocs>> =
    docusaurusRuleRegistry;

export default docusaurusRules;
