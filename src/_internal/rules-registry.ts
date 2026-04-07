/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by this plugin.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import type { UnknownArray } from "./types.js";

import noIgnoredSiteValidationsRule from "../rules/no-ignored-site-validations.js";
import noPageCssModuleImportsInComponentsRule from "../rules/no-page-css-module-imports-in-components.js";
import preferConfigSatisfiesRule from "../rules/prefer-config-satisfies.js";
import preferCssModulesInSiteSrcRule from "../rules/prefer-css-modules-in-site-src.js";
import preferToForInternalLinksRule from "../rules/prefer-to-for-internal-links.js";
import requireGeneratedIndexLinkTypeRule from "../rules/require-generated-index-link-type.js";

/** Runtime rule module shape used by registry/preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, UnknownArray>;

/**
 * Runtime map of all rule modules keyed by unqualified rule name.
 */
const docusaurusRuleRegistry = {
    "no-ignored-site-validations": noIgnoredSiteValidationsRule,
    "no-page-css-module-imports-in-components":
        noPageCssModuleImportsInComponentsRule,
    "prefer-config-satisfies": preferConfigSatisfiesRule,
    "prefer-css-modules-in-site-src": preferCssModulesInSiteSrcRule,
    "prefer-to-for-internal-links": preferToForInternalLinksRule,
    "require-generated-index-link-type": requireGeneratedIndexLinkTypeRule,
} as const satisfies Readonly<Record<string, RuleWithDocs>>;

/** Exported typed view consumed by the plugin entrypoint. */
export const docusaurusRules: Readonly<Record<string, RuleWithDocs>> =
    docusaurusRuleRegistry;

export default docusaurusRules;
