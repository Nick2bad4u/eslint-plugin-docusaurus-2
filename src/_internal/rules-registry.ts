/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by this plugin.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import type { UnknownArray } from "./types.js";

import localSearchWillNotWorkInDevRule from "../rules/local-search-will-not-work-in-dev.js";
import noConflictingConfigLinkContentPropsRule from "../rules/no-conflicting-config-link-content-props.js";
import noConflictingConfigLinkPropsRule from "../rules/no-conflicting-config-link-props.js";
import noConflictingFooterHtmlItemPropsRule from "../rules/no-conflicting-footer-html-item-props.js";
import noConflictingNavbarDocItemPropsRule from "../rules/no-conflicting-navbar-doc-item-props.js";
import noConflictingNavbarDocSidebarItemPropsRule from "../rules/no-conflicting-navbar-doc-sidebar-item-props.js";
import noConflictingSearchProvidersRule from "../rules/no-conflicting-search-providers.js";
import noConflictingThemeConfigColorModeFlagsRule from "../rules/no-conflicting-theme-config-color-mode-flags.js";
import noConflictingThemeConfigMetadataKeysRule from "../rules/no-conflicting-theme-config-metadata-keys.js";
import noDeprecatedAdmonitionTitleSyntaxRule from "../rules/no-deprecated-admonition-title-syntax.js";
import noDeprecatedFutureExperimentalFasterRule from "../rules/no-deprecated-future-experimental-faster.js";
import noDeprecatedFutureExperimentalStorageRule from "../rules/no-deprecated-future-experimental-storage.js";
import noDeprecatedGoogleAnalyticsRule from "../rules/no-deprecated-google-analytics.js";
import noDeprecatedHeadingIdSyntaxRule from "../rules/no-deprecated-heading-id-syntax.js";
import noDeprecatedHtmlCommentsInMdxRule from "../rules/no-deprecated-html-comments-in-mdx.js";
import noDeprecatedOnBrokenMarkdownLinksRule from "../rules/no-deprecated-on-broken-markdown-links.js";
import noDuplicateFooterColumnTitlesRule from "../rules/no-duplicate-footer-column-titles.js";
import noDuplicateFooterLinkItemDestinationsRule from "../rules/no-duplicate-footer-link-item-destinations.js";
import noDuplicateFooterLinkItemLabelsRule from "../rules/no-duplicate-footer-link-item-labels.js";
import noDuplicateHeadTagsRule from "../rules/no-duplicate-head-tags.js";
import noDuplicateI18nLocalesRule from "../rules/no-duplicate-i18n-locales.js";
import noDuplicateNavbarItemDestinationsRule from "../rules/no-duplicate-navbar-item-destinations.js";
import noDuplicateNavbarItemLabelsRule from "../rules/no-duplicate-navbar-item-labels.js";
import noDuplicatePluginPwaHeadTagsRule from "../rules/no-duplicate-plugin-pwa-head-tags.js";
import noDuplicateSidebarDocIdsRule from "../rules/no-duplicate-sidebar-doc-ids.js";
import noDuplicateThemeClassicCustomCssRule from "../rules/no-duplicate-theme-classic-custom-css.js";
import noDuplicateThemeConfigMetadataKeysRule from "../rules/no-duplicate-theme-config-metadata-keys.js";
import noEmptyConfigLinkDestinationsRule from "../rules/no-empty-config-link-destinations.js";
import noEmptyConfigLinkLabelsRule from "../rules/no-empty-config-link-labels.js";
import noEmptyFooterLinkColumnsRule from "../rules/no-empty-footer-link-columns.js";
import noEmptyFooterLinkItemsRule from "../rules/no-empty-footer-link-items.js";
import noEmptyHeadTagsRule from "../rules/no-empty-head-tags.js";
import noEmptyNavbarDropdownItemsRule from "../rules/no-empty-navbar-dropdown-items.js";
import noEmptyNavbarItemObjectsRule from "../rules/no-empty-navbar-item-objects.js";
import noEmptySidebarCategoriesRule from "../rules/no-empty-sidebar-categories.js";
import noEmptyThemeClassicCustomCssRule from "../rules/no-empty-theme-classic-custom-css.js";
import noEmptyThemeConfigMetadataRule from "../rules/no-empty-theme-config-metadata.js";
import noIgnoredSiteValidationsRule from "../rules/no-ignored-site-validations.js";
import noMixedSidebarLinkKindsRule from "../rules/no-mixed-sidebar-link-kinds.js";
import noPageCssModuleImportsInComponentsRule from "../rules/no-page-css-module-imports-in-components.js";
import noRedundantSocialCardMetadataRule from "../rules/no-redundant-social-card-metadata.js";
import noSearchLinkWithoutSearchProviderRule from "../rules/no-search-link-without-search-provider.js";
import noSearchPageLinkWhenSearchPageDisabledRule from "../rules/no-search-page-link-when-search-page-disabled.js";
import noSearchPagePathConflictRule from "../rules/no-search-page-path-conflict.js";
import noSvgSocialCardImageRule from "../rules/no-svg-social-card-image.js";
import noUnknownI18nLocaleConfigsRule from "../rules/no-unknown-i18n-locale-configs.js";
import noUseBaseUrlForInternalLinkComponentsRule from "../rules/no-use-base-url-for-internal-link-components.js";
import noUselessCollapsedSidebarCategoriesRule from "../rules/no-useless-collapsed-sidebar-categories.js";
import preferConfigSatisfiesRule from "../rules/prefer-config-satisfies.js";
import preferCssModulesInSiteSrcRule from "../rules/prefer-css-modules-in-site-src.js";
import preferHeadTagAttributesObjectRule from "../rules/prefer-head-tag-attributes-object.js";
import preferHrefForExternalLinkComponentsRule from "../rules/prefer-href-for-external-link-components.js";
import preferHrefForExternalLinksRule from "../rules/prefer-href-for-external-links.js";
import preferI18nDefaultLocaleFirstRule from "../rules/prefer-i18n-default-locale-first.js";
import preferSidebarsConfigSatisfiesRule from "../rules/prefer-sidebars-config-satisfies.js";
import preferThemeConfigDocsearchRule from "../rules/prefer-theme-config-docsearch.js";
import preferThemeConfigMetadataNameForTwitterTagsRule from "../rules/prefer-theme-config-metadata-name-for-twitter-tags.js";
import preferThemeConfigMetadataPropertyForOgTagsRule from "../rules/prefer-theme-config-metadata-property-for-og-tags.js";
import preferToForInternalLinkComponentsRule from "../rules/prefer-to-for-internal-link-components.js";
import preferToForInternalLinksRule from "../rules/prefer-to-for-internal-links.js";
import preferUseBaseUrlForStaticAssetsRule from "../rules/prefer-use-base-url-for-static-assets.js";
import requireBaseUrlIssueBannerEnabledRule from "../rules/require-base-url-issue-banner-enabled.js";
import requireBalancedFooterLinkColumnsRule from "../rules/require-balanced-footer-link-columns.js";
import requireBaseUrlSlashesRule from "../rules/require-base-url-slashes.js";
import requireConfigLinkContentRule from "../rules/require-config-link-content.js";
import requireConfigLinkDestinationRule from "../rules/require-config-link-destination.js";
import requireDefaultExportPagesRule from "../rules/require-default-export-pages.js";
import requireDocSidebarLinkTypeRule from "../rules/require-doc-sidebar-link-type.js";
import requireDocsearchAskAiAssistantIdRule from "../rules/require-docsearch-ask-ai-assistant-id.js";
import requireDocsearchThemeWhenConfiguredRule from "../rules/require-docsearch-theme-when-configured.js";
import requireDocusaurusFasterPackageInstalledRule from "../rules/require-docusaurus-faster-package-installed.js";
import requireFooterLinkColumnItemsRule from "../rules/require-footer-link-column-items.js";
import requireFooterLinkColumnTitleRule from "../rules/require-footer-link-column-title.js";
import requireGeneratedIndexLinkTypeRule from "../rules/require-generated-index-link-type.js";
import requireHeadTagAttributesWhenNoInnerHtmlRule from "../rules/require-head-tag-attributes-when-no-inner-html.js";
import requireHeadTagContentOrAttributesRule from "../rules/require-head-tag-content-or-attributes.js";
import requireHeadTagTagNameRule from "../rules/require-head-tag-tag-name.js";
import requireI18nDefaultLocaleInLocalesRule from "../rules/require-i18n-default-locale-in-locales.js";
import requireMarkdownFormatDetectRule from "../rules/require-markdown-format-detect.js";
import requireMarkdownMermaidWhenThemeMermaidEnabledRule from "../rules/require-markdown-mermaid-when-theme-mermaid-enabled.js";
import requireMermaidElkPackageInstalledRule from "../rules/require-mermaid-elk-package-installed.js";
import requireNavbarDocItemDocIdRule from "../rules/require-navbar-doc-item-doc-id.js";
import requireNavbarDocSidebarItemSidebarIdRule from "../rules/require-navbar-doc-sidebar-item-sidebar-id.js";
import requireNavbarDocsVersionItemToRule from "../rules/require-navbar-docs-version-item-to.js";
import requireNavbarDropdownItemsRule from "../rules/require-navbar-dropdown-items.js";
import requireNavbarDropdownLabelRule from "../rules/require-navbar-dropdown-label.js";
import requireNavbarHtmlItemValueRule from "../rules/require-navbar-html-item-value.js";
import requirePagesPluginExcludesRule from "../rules/require-pages-plugin-excludes.js";
import requirePluginPwaDebugRule from "../rules/require-plugin-pwa-debug.js";
import requirePluginPwaHeadManifestRule from "../rules/require-plugin-pwa-head-manifest.js";
import requirePluginPwaHeadThemeColorRule from "../rules/require-plugin-pwa-head-theme-color.js";
import requirePluginPwaOfflineModeActivationStrategiesRule from "../rules/require-plugin-pwa-offline-mode-activation-strategies.js";
import requirePluginPwaSetupRule from "../rules/require-plugin-pwa-setup.js";
import requireRspackBundlerForFasterPersistentCacheRule from "../rules/require-rspack-bundler-for-faster-persistent-cache.js";
import requireSearchProviderPackageInstalledRule from "../rules/require-search-provider-package-installed.js";
import requireSidebarCategoryItemsRule from "../rules/require-sidebar-category-items.js";
import requireSidebarCategoryLabelRule from "../rules/require-sidebar-category-label.js";
import requireSidebarCategoryTypeRule from "../rules/require-sidebar-category-type.js";
import requireSidebarItemKeyForDuplicateLabelsRule from "../rules/require-sidebar-item-key-for-duplicate-labels.js";
import requireSiteConfigFieldsRule from "../rules/require-site-config-fields.js";
import requireSiteUrlOriginRule from "../rules/require-site-url-origin.js";
import requireThemeClassicCustomCssFilesExistRule from "../rules/require-theme-classic-custom-css-files-exist.js";
import requireThemeClassicPackageInstalledRule from "../rules/require-theme-classic-package-installed.js";
import requireThemeConfigAnnouncementBarIdRule from "../rules/require-theme-config-announcement-bar-id.js";
import requireThemeConfigColorModeObjectRule from "../rules/require-theme-config-color-mode-object.js";
import requireThemeConfigDocsearchConfigRule from "../rules/require-theme-config-docsearch-config.js";
import requireThemeConfigImageRule from "../rules/require-theme-config-image.js";
import requireThemeLiveCodeblockPackageInstalledRule from "../rules/require-theme-live-codeblock-package-installed.js";
import requireThemeLiveCodeblockWhenLiveCodeblockConfiguredRule from "../rules/require-theme-live-codeblock-when-live-codeblock-configured.js";
import requireThemeMermaidPackageInstalledRule from "../rules/require-theme-mermaid-package-installed.js";
import requireThemeMermaidWhenMarkdownMermaidEnabledRule from "../rules/require-theme-mermaid-when-markdown-mermaid-enabled.js";
import requireThemeSearchAlgoliaPackageInstalledRule from "../rules/require-theme-search-algolia-package-installed.js";
import requireTrailingSlashExplicitRule from "../rules/require-trailing-slash-explicit.js";
import requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreadsRule from "../rules/require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads.js";
import validateLiveCodeblockPlaygroundPositionRule from "../rules/validate-live-codeblock-playground-position.js";
import validateNavbarItemPositionRule from "../rules/validate-navbar-item-position.js";
import validateThemeConfigAnnouncementBarIsCloseableRule from "../rules/validate-theme-config-announcement-bar-is-closeable.js";
import validateThemeConfigColorModeDefaultModeRule from "../rules/validate-theme-config-color-mode-default-mode.js";
import validateThemeConfigColorModeSwitchFlagsRule from "../rules/validate-theme-config-color-mode-switch-flags.js";
import validateThemeConfigFooterStyleRule from "../rules/validate-theme-config-footer-style.js";
import validateThemeConfigMetadataRule from "../rules/validate-theme-config-metadata.js";
import validateThemeConfigNavbarStyleRule from "../rules/validate-theme-config-navbar-style.js";

/** Runtime rule module shape used by registry/preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, UnknownArray>;

/**
 * Runtime map of all rule modules keyed by unqualified rule name.
 */
const docusaurusRuleRegistry = {
    "local-search-will-not-work-in-dev": localSearchWillNotWorkInDevRule,
    "no-conflicting-config-link-content-props":
        noConflictingConfigLinkContentPropsRule,
    "no-conflicting-config-link-props": noConflictingConfigLinkPropsRule,
    "no-conflicting-footer-html-item-props":
        noConflictingFooterHtmlItemPropsRule,
    "no-conflicting-navbar-doc-item-props": noConflictingNavbarDocItemPropsRule,
    "no-conflicting-navbar-doc-sidebar-item-props":
        noConflictingNavbarDocSidebarItemPropsRule,
    "no-conflicting-search-providers": noConflictingSearchProvidersRule,
    "no-conflicting-theme-config-color-mode-flags":
        noConflictingThemeConfigColorModeFlagsRule,
    "no-conflicting-theme-config-metadata-keys":
        noConflictingThemeConfigMetadataKeysRule,
    "no-deprecated-admonition-title-syntax":
        noDeprecatedAdmonitionTitleSyntaxRule,
    "no-deprecated-future-experimental-faster":
        noDeprecatedFutureExperimentalFasterRule,
    "no-deprecated-future-experimental-storage":
        noDeprecatedFutureExperimentalStorageRule,
    "no-deprecated-google-analytics": noDeprecatedGoogleAnalyticsRule,
    "no-deprecated-heading-id-syntax": noDeprecatedHeadingIdSyntaxRule,
    "no-deprecated-html-comments-in-mdx": noDeprecatedHtmlCommentsInMdxRule,
    "no-deprecated-on-broken-markdown-links":
        noDeprecatedOnBrokenMarkdownLinksRule,
    "no-duplicate-footer-column-titles": noDuplicateFooterColumnTitlesRule,
    "no-duplicate-footer-link-item-destinations":
        noDuplicateFooterLinkItemDestinationsRule,
    "no-duplicate-footer-link-item-labels": noDuplicateFooterLinkItemLabelsRule,
    "no-duplicate-head-tags": noDuplicateHeadTagsRule,
    "no-duplicate-i18n-locales": noDuplicateI18nLocalesRule,
    "no-duplicate-navbar-item-destinations":
        noDuplicateNavbarItemDestinationsRule,
    "no-duplicate-navbar-item-labels": noDuplicateNavbarItemLabelsRule,
    "no-duplicate-plugin-pwa-head-tags": noDuplicatePluginPwaHeadTagsRule,
    "no-duplicate-sidebar-doc-ids": noDuplicateSidebarDocIdsRule,
    "no-duplicate-theme-classic-custom-css":
        noDuplicateThemeClassicCustomCssRule,
    "no-duplicate-theme-config-metadata-keys":
        noDuplicateThemeConfigMetadataKeysRule,
    "no-empty-config-link-destinations": noEmptyConfigLinkDestinationsRule,
    "no-empty-config-link-labels": noEmptyConfigLinkLabelsRule,
    "no-empty-footer-link-columns": noEmptyFooterLinkColumnsRule,
    "no-empty-footer-link-items": noEmptyFooterLinkItemsRule,
    "no-empty-head-tags": noEmptyHeadTagsRule,
    "no-empty-navbar-dropdown-items": noEmptyNavbarDropdownItemsRule,
    "no-empty-navbar-item-objects": noEmptyNavbarItemObjectsRule,
    "no-empty-sidebar-categories": noEmptySidebarCategoriesRule,
    "no-empty-theme-classic-custom-css": noEmptyThemeClassicCustomCssRule,
    "no-empty-theme-config-metadata": noEmptyThemeConfigMetadataRule,
    "no-ignored-site-validations": noIgnoredSiteValidationsRule,
    "no-mixed-sidebar-link-kinds": noMixedSidebarLinkKindsRule,
    "no-page-css-module-imports-in-components":
        noPageCssModuleImportsInComponentsRule,
    "no-redundant-social-card-metadata": noRedundantSocialCardMetadataRule,
    "no-search-link-without-search-provider":
        noSearchLinkWithoutSearchProviderRule,
    "no-search-page-link-when-search-page-disabled":
        noSearchPageLinkWhenSearchPageDisabledRule,
    "no-search-page-path-conflict": noSearchPagePathConflictRule,
    "no-svg-social-card-image": noSvgSocialCardImageRule,
    "no-unknown-i18n-locale-configs": noUnknownI18nLocaleConfigsRule,
    "no-use-base-url-for-internal-link-components":
        noUseBaseUrlForInternalLinkComponentsRule,
    "no-useless-collapsed-sidebar-categories":
        noUselessCollapsedSidebarCategoriesRule,
    "prefer-config-satisfies": preferConfigSatisfiesRule,
    "prefer-css-modules-in-site-src": preferCssModulesInSiteSrcRule,
    "prefer-head-tag-attributes-object": preferHeadTagAttributesObjectRule,
    "prefer-href-for-external-link-components":
        preferHrefForExternalLinkComponentsRule,
    "prefer-href-for-external-links": preferHrefForExternalLinksRule,
    "prefer-i18n-default-locale-first": preferI18nDefaultLocaleFirstRule,
    "prefer-sidebars-config-satisfies": preferSidebarsConfigSatisfiesRule,
    "prefer-theme-config-docsearch": preferThemeConfigDocsearchRule,
    "prefer-theme-config-metadata-name-for-twitter-tags":
        preferThemeConfigMetadataNameForTwitterTagsRule,
    "prefer-theme-config-metadata-property-for-og-tags":
        preferThemeConfigMetadataPropertyForOgTagsRule,
    "prefer-to-for-internal-link-components":
        preferToForInternalLinkComponentsRule,
    "prefer-to-for-internal-links": preferToForInternalLinksRule,
    "prefer-use-base-url-for-static-assets":
        preferUseBaseUrlForStaticAssetsRule,
    "require-base-url-issue-banner-enabled":
        requireBaseUrlIssueBannerEnabledRule,
    "require-balanced-footer-link-columns":
        requireBalancedFooterLinkColumnsRule,
    "require-base-url-slashes": requireBaseUrlSlashesRule,
    "require-config-link-content": requireConfigLinkContentRule,
    "require-config-link-destination": requireConfigLinkDestinationRule,
    "require-default-export-pages": requireDefaultExportPagesRule,
    "require-doc-sidebar-link-type": requireDocSidebarLinkTypeRule,
    "require-docsearch-ask-ai-assistant-id":
        requireDocsearchAskAiAssistantIdRule,
    "require-docsearch-theme-when-configured":
        requireDocsearchThemeWhenConfiguredRule,
    "require-docusaurus-faster-package-installed":
        requireDocusaurusFasterPackageInstalledRule,
    "require-footer-link-column-items": requireFooterLinkColumnItemsRule,
    "require-footer-link-column-title": requireFooterLinkColumnTitleRule,
    "require-generated-index-link-type": requireGeneratedIndexLinkTypeRule,
    "require-head-tag-attributes-when-no-inner-html":
        requireHeadTagAttributesWhenNoInnerHtmlRule,
    "require-head-tag-content-or-attributes":
        requireHeadTagContentOrAttributesRule,
    "require-head-tag-tag-name": requireHeadTagTagNameRule,
    "require-i18n-default-locale-in-locales":
        requireI18nDefaultLocaleInLocalesRule,
    "require-markdown-format-detect": requireMarkdownFormatDetectRule,
    "require-markdown-mermaid-when-theme-mermaid-enabled":
        requireMarkdownMermaidWhenThemeMermaidEnabledRule,
    "require-mermaid-elk-package-installed":
        requireMermaidElkPackageInstalledRule,
    "require-navbar-doc-item-doc-id": requireNavbarDocItemDocIdRule,
    "require-navbar-doc-sidebar-item-sidebar-id":
        requireNavbarDocSidebarItemSidebarIdRule,
    "require-navbar-docs-version-item-to": requireNavbarDocsVersionItemToRule,
    "require-navbar-dropdown-items": requireNavbarDropdownItemsRule,
    "require-navbar-dropdown-label": requireNavbarDropdownLabelRule,
    "require-navbar-html-item-value": requireNavbarHtmlItemValueRule,
    "require-pages-plugin-excludes": requirePagesPluginExcludesRule,
    "require-plugin-pwa-debug": requirePluginPwaDebugRule,
    "require-plugin-pwa-head-manifest": requirePluginPwaHeadManifestRule,
    "require-plugin-pwa-head-theme-color": requirePluginPwaHeadThemeColorRule,
    "require-plugin-pwa-offline-mode-activation-strategies":
        requirePluginPwaOfflineModeActivationStrategiesRule,
    "require-plugin-pwa-setup": requirePluginPwaSetupRule,
    "require-rspack-bundler-for-faster-persistent-cache":
        requireRspackBundlerForFasterPersistentCacheRule,
    "require-search-provider-package-installed":
        requireSearchProviderPackageInstalledRule,
    "require-sidebar-category-items": requireSidebarCategoryItemsRule,
    "require-sidebar-category-label": requireSidebarCategoryLabelRule,
    "require-sidebar-category-type": requireSidebarCategoryTypeRule,
    "require-sidebar-item-key-for-duplicate-labels":
        requireSidebarItemKeyForDuplicateLabelsRule,
    "require-site-config-fields": requireSiteConfigFieldsRule,
    "require-site-url-origin": requireSiteUrlOriginRule,
    "require-theme-classic-custom-css-files-exist":
        requireThemeClassicCustomCssFilesExistRule,
    "require-theme-classic-package-installed":
        requireThemeClassicPackageInstalledRule,
    "require-theme-config-announcement-bar-id":
        requireThemeConfigAnnouncementBarIdRule,
    "require-theme-config-color-mode-object":
        requireThemeConfigColorModeObjectRule,
    "require-theme-config-docsearch-config":
        requireThemeConfigDocsearchConfigRule,
    "require-theme-config-image": requireThemeConfigImageRule,
    "require-theme-live-codeblock-package-installed":
        requireThemeLiveCodeblockPackageInstalledRule,
    "require-theme-live-codeblock-when-live-codeblock-configured":
        requireThemeLiveCodeblockWhenLiveCodeblockConfiguredRule,
    "require-theme-mermaid-package-installed":
        requireThemeMermaidPackageInstalledRule,
    "require-theme-mermaid-when-markdown-mermaid-enabled":
        requireThemeMermaidWhenMarkdownMermaidEnabledRule,
    "require-theme-search-algolia-package-installed":
        requireThemeSearchAlgoliaPackageInstalledRule,
    "require-trailing-slash-explicit": requireTrailingSlashExplicitRule,
    "require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads":
        requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreadsRule,
    "validate-live-codeblock-playground-position":
        validateLiveCodeblockPlaygroundPositionRule,
    "validate-navbar-item-position": validateNavbarItemPositionRule,
    "validate-theme-config-announcement-bar-is-closeable":
        validateThemeConfigAnnouncementBarIsCloseableRule,
    "validate-theme-config-color-mode-default-mode":
        validateThemeConfigColorModeDefaultModeRule,
    "validate-theme-config-color-mode-switch-flags":
        validateThemeConfigColorModeSwitchFlagsRule,
    "validate-theme-config-footer-style": validateThemeConfigFooterStyleRule,
    "validate-theme-config-metadata": validateThemeConfigMetadataRule,
    "validate-theme-config-navbar-style": validateThemeConfigNavbarStyleRule,
} as const satisfies Readonly<Record<string, RuleWithDocs>>;

/** Exported typed view consumed by the plugin entrypoint. */
export const docusaurusRules: Readonly<Record<string, RuleWithDocs>> =
    docusaurusRuleRegistry;

export default docusaurusRules;
