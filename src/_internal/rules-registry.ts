/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by this plugin.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import type { UnknownArray } from "./types.js";

import noDeprecatedOnBrokenMarkdownLinksRule from "../rules/no-deprecated-on-broken-markdown-links.js";
import noIgnoredSiteValidationsRule from "../rules/no-ignored-site-validations.js";
import noPageCssModuleImportsInComponentsRule from "../rules/no-page-css-module-imports-in-components.js";
import noUselessCollapsedSidebarCategoriesRule from "../rules/no-useless-collapsed-sidebar-categories.js";
import preferConfigSatisfiesRule from "../rules/prefer-config-satisfies.js";
import preferCssModulesInSiteSrcRule from "../rules/prefer-css-modules-in-site-src.js";
import preferSidebarsConfigSatisfiesRule from "../rules/prefer-sidebars-config-satisfies.js";
import preferToForInternalLinksRule from "../rules/prefer-to-for-internal-links.js";
import requireDefaultExportPagesRule from "../rules/require-default-export-pages.js";
import requireDocSidebarLinkTypeRule from "../rules/require-doc-sidebar-link-type.js";
import requireGeneratedIndexLinkTypeRule from "../rules/require-generated-index-link-type.js";

/** Runtime rule module shape used by registry/preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, UnknownArray>;

/**
 * Runtime map of all rule modules keyed by unqualified rule name.
 */
const docusaurusRuleRegistry = {
    "no-deprecated-on-broken-markdown-links":
        noDeprecatedOnBrokenMarkdownLinksRule,
    "no-ignored-site-validations": noIgnoredSiteValidationsRule,
    "no-page-css-module-imports-in-components":
        noPageCssModuleImportsInComponentsRule,
    "no-useless-collapsed-sidebar-categories":
        noUselessCollapsedSidebarCategoriesRule,
    "prefer-config-satisfies": preferConfigSatisfiesRule,
    "prefer-css-modules-in-site-src": preferCssModulesInSiteSrcRule,
    "prefer-sidebars-config-satisfies": preferSidebarsConfigSatisfiesRule,
    "prefer-to-for-internal-links": preferToForInternalLinksRule,
    "require-default-export-pages": requireDefaultExportPagesRule,
    "require-doc-sidebar-link-type": requireDocSidebarLinkTypeRule,
    "require-generated-index-link-type": requireGeneratedIndexLinkTypeRule,
} as const satisfies Readonly<Record<string, RuleWithDocs>>;

/** Exported typed view consumed by the plugin entrypoint. */
export const docusaurusRules: Readonly<Record<string, RuleWithDocs>> =
    docusaurusRuleRegistry;

export default docusaurusRules;
