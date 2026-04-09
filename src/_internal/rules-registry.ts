/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by this plugin.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import type { UnknownArray } from "./types.js";

import noConflictingConfigLinkContentPropsRule from "../rules/no-conflicting-config-link-content-props.js";
import noConflictingConfigLinkPropsRule from "../rules/no-conflicting-config-link-props.js";
import noConflictingFooterHtmlItemPropsRule from "../rules/no-conflicting-footer-html-item-props.js";
import noConflictingNavbarDocItemPropsRule from "../rules/no-conflicting-navbar-doc-item-props.js";
import noConflictingNavbarDocSidebarItemPropsRule from "../rules/no-conflicting-navbar-doc-sidebar-item-props.js";
import noDeprecatedOnBrokenMarkdownLinksRule from "../rules/no-deprecated-on-broken-markdown-links.js";
import noDuplicateSidebarDocIdsRule from "../rules/no-duplicate-sidebar-doc-ids.js";
import noIgnoredSiteValidationsRule from "../rules/no-ignored-site-validations.js";
import noMixedSidebarLinkKindsRule from "../rules/no-mixed-sidebar-link-kinds.js";
import noPageCssModuleImportsInComponentsRule from "../rules/no-page-css-module-imports-in-components.js";
import noRedundantSocialCardMetadataRule from "../rules/no-redundant-social-card-metadata.js";
import noSvgSocialCardImageRule from "../rules/no-svg-social-card-image.js";
import noUseBaseUrlForInternalLinkComponentsRule from "../rules/no-use-base-url-for-internal-link-components.js";
import noUselessCollapsedSidebarCategoriesRule from "../rules/no-useless-collapsed-sidebar-categories.js";
import preferConfigSatisfiesRule from "../rules/prefer-config-satisfies.js";
import preferCssModulesInSiteSrcRule from "../rules/prefer-css-modules-in-site-src.js";
import preferHrefForExternalLinkComponentsRule from "../rules/prefer-href-for-external-link-components.js";
import preferHrefForExternalLinksRule from "../rules/prefer-href-for-external-links.js";
import preferSidebarsConfigSatisfiesRule from "../rules/prefer-sidebars-config-satisfies.js";
import preferToForInternalLinkComponentsRule from "../rules/prefer-to-for-internal-link-components.js";
import preferToForInternalLinksRule from "../rules/prefer-to-for-internal-links.js";
import preferUseBaseUrlForStaticAssetsRule from "../rules/prefer-use-base-url-for-static-assets.js";
import requireConfigLinkContentRule from "../rules/require-config-link-content.js";
import requireConfigLinkDestinationRule from "../rules/require-config-link-destination.js";
import requireDefaultExportPagesRule from "../rules/require-default-export-pages.js";
import requireDocSidebarLinkTypeRule from "../rules/require-doc-sidebar-link-type.js";
import requireFooterLinkColumnItemsRule from "../rules/require-footer-link-column-items.js";
import requireFooterLinkColumnTitleRule from "../rules/require-footer-link-column-title.js";
import requireGeneratedIndexLinkTypeRule from "../rules/require-generated-index-link-type.js";
import requireNavbarDocItemDocIdRule from "../rules/require-navbar-doc-item-doc-id.js";
import requireNavbarDocSidebarItemSidebarIdRule from "../rules/require-navbar-doc-sidebar-item-sidebar-id.js";
import requireNavbarDocsVersionItemToRule from "../rules/require-navbar-docs-version-item-to.js";
import requireNavbarDropdownItemsRule from "../rules/require-navbar-dropdown-items.js";
import requireNavbarDropdownLabelRule from "../rules/require-navbar-dropdown-label.js";
import requireNavbarHtmlItemValueRule from "../rules/require-navbar-html-item-value.js";
import requirePagesPluginExcludesRule from "../rules/require-pages-plugin-excludes.js";
import requirePluginPwaHeadManifestRule from "../rules/require-plugin-pwa-head-manifest.js";
import requirePluginPwaHeadThemeColorRule from "../rules/require-plugin-pwa-head-theme-color.js";
import requirePluginPwaSetupRule from "../rules/require-plugin-pwa-setup.js";
import requireSidebarCategoryItemsRule from "../rules/require-sidebar-category-items.js";
import requireSidebarCategoryLabelRule from "../rules/require-sidebar-category-label.js";
import requireSidebarCategoryTypeRule from "../rules/require-sidebar-category-type.js";
import requireSiteConfigFieldsRule from "../rules/require-site-config-fields.js";
import requireThemeConfigImageRule from "../rules/require-theme-config-image.js";
import validateThemeConfigMetadataRule from "../rules/validate-theme-config-metadata.js";

/** Runtime rule module shape used by registry/preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, UnknownArray>;

/**
 * Runtime map of all rule modules keyed by unqualified rule name.
 */
const docusaurusRuleRegistry = {
    "no-conflicting-config-link-content-props":
        noConflictingConfigLinkContentPropsRule,
    "no-conflicting-config-link-props": noConflictingConfigLinkPropsRule,
    "no-conflicting-footer-html-item-props":
        noConflictingFooterHtmlItemPropsRule,
    "no-conflicting-navbar-doc-item-props": noConflictingNavbarDocItemPropsRule,
    "no-conflicting-navbar-doc-sidebar-item-props":
        noConflictingNavbarDocSidebarItemPropsRule,
    "no-deprecated-on-broken-markdown-links":
        noDeprecatedOnBrokenMarkdownLinksRule,
    "no-duplicate-sidebar-doc-ids": noDuplicateSidebarDocIdsRule,
    "no-ignored-site-validations": noIgnoredSiteValidationsRule,
    "no-mixed-sidebar-link-kinds": noMixedSidebarLinkKindsRule,
    "no-page-css-module-imports-in-components":
        noPageCssModuleImportsInComponentsRule,
    "no-redundant-social-card-metadata": noRedundantSocialCardMetadataRule,
    "no-svg-social-card-image": noSvgSocialCardImageRule,
    "no-use-base-url-for-internal-link-components":
        noUseBaseUrlForInternalLinkComponentsRule,
    "no-useless-collapsed-sidebar-categories":
        noUselessCollapsedSidebarCategoriesRule,
    "prefer-config-satisfies": preferConfigSatisfiesRule,
    "prefer-css-modules-in-site-src": preferCssModulesInSiteSrcRule,
    "prefer-href-for-external-link-components":
        preferHrefForExternalLinkComponentsRule,
    "prefer-href-for-external-links": preferHrefForExternalLinksRule,
    "prefer-sidebars-config-satisfies": preferSidebarsConfigSatisfiesRule,
    "prefer-to-for-internal-link-components":
        preferToForInternalLinkComponentsRule,
    "prefer-to-for-internal-links": preferToForInternalLinksRule,
    "prefer-use-base-url-for-static-assets":
        preferUseBaseUrlForStaticAssetsRule,
    "require-config-link-content": requireConfigLinkContentRule,
    "require-config-link-destination": requireConfigLinkDestinationRule,
    "require-default-export-pages": requireDefaultExportPagesRule,
    "require-doc-sidebar-link-type": requireDocSidebarLinkTypeRule,
    "require-footer-link-column-items": requireFooterLinkColumnItemsRule,
    "require-footer-link-column-title": requireFooterLinkColumnTitleRule,
    "require-generated-index-link-type": requireGeneratedIndexLinkTypeRule,
    "require-navbar-doc-item-doc-id": requireNavbarDocItemDocIdRule,
    "require-navbar-doc-sidebar-item-sidebar-id":
        requireNavbarDocSidebarItemSidebarIdRule,
    "require-navbar-docs-version-item-to": requireNavbarDocsVersionItemToRule,
    "require-navbar-dropdown-items": requireNavbarDropdownItemsRule,
    "require-navbar-dropdown-label": requireNavbarDropdownLabelRule,
    "require-navbar-html-item-value": requireNavbarHtmlItemValueRule,
    "require-pages-plugin-excludes": requirePagesPluginExcludesRule,
    "require-plugin-pwa-head-manifest": requirePluginPwaHeadManifestRule,
    "require-plugin-pwa-head-theme-color": requirePluginPwaHeadThemeColorRule,
    "require-plugin-pwa-setup": requirePluginPwaSetupRule,
    "require-sidebar-category-items": requireSidebarCategoryItemsRule,
    "require-sidebar-category-label": requireSidebarCategoryLabelRule,
    "require-sidebar-category-type": requireSidebarCategoryTypeRule,
    "require-site-config-fields": requireSiteConfigFieldsRule,
    "require-theme-config-image": requireThemeConfigImageRule,
    "validate-theme-config-metadata": validateThemeConfigMetadataRule,
} as const satisfies Readonly<Record<string, RuleWithDocs>>;

/** Exported typed view consumed by the plugin entrypoint. */
export const docusaurusRules: Readonly<Record<string, RuleWithDocs>> =
    docusaurusRuleRegistry;

export default docusaurusRules;
