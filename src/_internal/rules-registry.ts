/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by this plugin.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import type { UnknownArray } from "./types.js";

import noConflictingConfigLinkPropsRule from "../rules/no-conflicting-config-link-props.js";
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
import preferHrefForExternalLinksRule from "../rules/prefer-href-for-external-links.js";
import preferSidebarsConfigSatisfiesRule from "../rules/prefer-sidebars-config-satisfies.js";
import preferToForInternalLinkComponentsRule from "../rules/prefer-to-for-internal-link-components.js";
import preferToForInternalLinksRule from "../rules/prefer-to-for-internal-links.js";
import preferUseBaseUrlForStaticAssetsRule from "../rules/prefer-use-base-url-for-static-assets.js";
import requireDefaultExportPagesRule from "../rules/require-default-export-pages.js";
import requireDocSidebarLinkTypeRule from "../rules/require-doc-sidebar-link-type.js";
import requireGeneratedIndexLinkTypeRule from "../rules/require-generated-index-link-type.js";
import requirePagesPluginExcludesRule from "../rules/require-pages-plugin-excludes.js";

/** Runtime rule module shape used by registry/preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, UnknownArray>;

/**
 * Runtime map of all rule modules keyed by unqualified rule name.
 */
const docusaurusRuleRegistry = {
    "no-conflicting-config-link-props": noConflictingConfigLinkPropsRule,
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
    "prefer-href-for-external-links": preferHrefForExternalLinksRule,
    "prefer-sidebars-config-satisfies": preferSidebarsConfigSatisfiesRule,
    "prefer-to-for-internal-link-components":
        preferToForInternalLinkComponentsRule,
    "prefer-to-for-internal-links": preferToForInternalLinksRule,
    "prefer-use-base-url-for-static-assets":
        preferUseBaseUrlForStaticAssetsRule,
    "require-default-export-pages": requireDefaultExportPagesRule,
    "require-doc-sidebar-link-type": requireDocSidebarLinkTypeRule,
    "require-generated-index-link-type": requireGeneratedIndexLinkTypeRule,
    "require-pages-plugin-excludes": requirePagesPluginExcludesRule,
} as const satisfies Readonly<Record<string, RuleWithDocs>>;

/** Exported typed view consumed by the plugin entrypoint. */
export const docusaurusRules: Readonly<Record<string, RuleWithDocs>> =
    docusaurusRuleRegistry;

export default docusaurusRules;
