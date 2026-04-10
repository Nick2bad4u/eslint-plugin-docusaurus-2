/**
 * @packageDocumentation
 * Stable catalog IDs for all plugin rules.
 */

import { objectFromEntries, setHas } from "./runtime-utils.js";

/** Catalog metadata for a single rule. */
export type RuleCatalogEntry = Readonly<{
    ruleId: RuleCatalogId;
    ruleName: string;
    ruleNumber: number;
}>;

/** Stable machine-friendly rule id format (for example: `R001`). */
export type RuleCatalogId = `R${string}`;

/**
 * Stable global ordering used for rule catalog IDs.
 *
 * @remarks
 * Append new rules to preserve existing IDs.
 */
const orderedRuleNames = [
    "prefer-to-for-internal-links",
    "require-generated-index-link-type",
    "no-ignored-site-validations",
    "no-page-css-module-imports-in-components",
    "prefer-config-satisfies",
    "prefer-css-modules-in-site-src",
    "no-deprecated-on-broken-markdown-links",
    "require-doc-sidebar-link-type",
    "require-default-export-pages",
    "prefer-sidebars-config-satisfies",
    "no-useless-collapsed-sidebar-categories",
    "require-pages-plugin-excludes",
    "no-duplicate-sidebar-doc-ids",
    "prefer-href-for-external-links",
    "prefer-to-for-internal-link-components",
    "no-svg-social-card-image",
    "prefer-use-base-url-for-static-assets",
    "no-conflicting-config-link-props",
    "no-use-base-url-for-internal-link-components",
    "no-mixed-sidebar-link-kinds",
    "no-redundant-social-card-metadata",
    "prefer-href-for-external-link-components",
    "require-sidebar-category-type",
    "require-theme-config-image",
    "validate-theme-config-metadata",
    "require-sidebar-category-items",
    "require-sidebar-category-label",
    "require-navbar-dropdown-items",
    "require-navbar-dropdown-label",
    "require-config-link-content",
    "require-config-link-destination",
    "no-conflicting-config-link-content-props",
    "no-conflicting-footer-html-item-props",
    "require-navbar-doc-item-doc-id",
    "require-navbar-doc-sidebar-item-sidebar-id",
    "require-plugin-pwa-setup",
    "require-site-config-fields",
    "require-footer-link-column-items",
    "require-footer-link-column-title",
    "require-navbar-docs-version-item-to",
    "require-navbar-html-item-value",
    "require-plugin-pwa-head-manifest",
    "require-plugin-pwa-head-theme-color",
    "no-conflicting-navbar-doc-item-props",
    "no-conflicting-navbar-doc-sidebar-item-props",
    "require-plugin-pwa-debug",
    "require-plugin-pwa-offline-mode-activation-strategies",
    "require-base-url-issue-banner-enabled",
    "require-base-url-slashes",
    "require-site-url-origin",
    "require-i18n-default-locale-in-locales",
    "no-duplicate-i18n-locales",
    "no-duplicate-plugin-pwa-head-tags",
    "require-trailing-slash-explicit",
    "prefer-i18n-default-locale-first",
    "no-duplicate-navbar-item-labels",
    "validate-navbar-item-position",
    "no-duplicate-footer-link-item-labels",
    "no-duplicate-theme-config-metadata-keys",
    "no-duplicate-footer-column-titles",
    "no-duplicate-head-tags",
    "require-head-tag-tag-name",
    "no-empty-head-tags",
    "no-conflicting-theme-config-metadata-keys",
    "no-duplicate-footer-link-item-destinations",
    "no-duplicate-navbar-item-destinations",
    "no-empty-footer-link-columns",
    "prefer-head-tag-attributes-object",
    "no-empty-theme-config-metadata",
    "prefer-theme-config-metadata-property-for-og-tags",
    "prefer-theme-config-metadata-name-for-twitter-tags",
    "no-empty-navbar-dropdown-items",
    "no-empty-sidebar-categories",
    "no-empty-footer-link-items",
    "require-head-tag-content-or-attributes",
    "no-empty-navbar-item-objects",
    "require-head-tag-attributes-when-no-inner-html",
    "validate-theme-config-color-mode-default-mode",
    "validate-theme-config-color-mode-switch-flags",
    "validate-theme-config-navbar-style",
    "validate-theme-config-footer-style",
    "require-theme-config-color-mode-object",
    "no-conflicting-theme-config-color-mode-flags",
    "no-empty-config-link-labels",
    "no-empty-config-link-destinations",
    "require-theme-config-announcement-bar-id",
    "validate-theme-config-announcement-bar-is-closeable",
    "no-deprecated-google-analytics",
    "prefer-theme-config-docsearch",
    "require-theme-config-docsearch-config",
    "no-conflicting-search-providers",
    "require-theme-mermaid-when-markdown-mermaid-enabled",
    "require-markdown-mermaid-when-theme-mermaid-enabled",
    "require-theme-live-codeblock-when-live-codeblock-configured",
    "validate-live-codeblock-playground-position",
    "no-empty-theme-classic-custom-css",
    "no-duplicate-theme-classic-custom-css",
    "require-theme-classic-custom-css-files-exist",
    "require-theme-mermaid-package-installed",
    "require-theme-live-codeblock-package-installed",
    "require-search-provider-package-installed",
    "require-theme-classic-package-installed",
    "require-theme-search-algolia-package-installed",
    "local-search-will-not-work-in-dev",
    "no-search-link-without-search-provider",
    "no-search-page-path-conflict",
] as const satisfies readonly string[];

const toRuleCatalogId = (ruleNumber: number): RuleCatalogId =>
    `R${String(ruleNumber).padStart(3, "0")}`;

/** Canonical catalog metadata entries in stable display/order form. */
export const ruleCatalogEntries: readonly RuleCatalogEntry[] =
    orderedRuleNames.map((ruleName, index) => {
        const ruleNumber = index + 1;

        return {
            ruleId: toRuleCatalogId(ruleNumber),
            ruleName,
            ruleNumber,
        };
    });

/** Fast lookup map for rule catalog metadata by rule name. */
export const ruleCatalogByRuleName: Readonly<
    Partial<Record<string, RuleCatalogEntry>>
> = objectFromEntries(
    ruleCatalogEntries.map((entry) => [entry.ruleName, entry])
);

/** Resolve stable catalog metadata for a rule name when available. */
export const getRuleCatalogEntryForRuleNameOrNull = (
    ruleName: string
): null | RuleCatalogEntry => {
    if (ruleName.trim().length === 0) {
        return null;
    }

    return ruleCatalogByRuleName[ruleName] ?? null;
};

/**
 * Resolve stable catalog metadata for a rule name.
 *
 * @throws When the rule is missing from the catalog.
 */
export const getRuleCatalogEntryForRuleName = (
    ruleName: string
): RuleCatalogEntry => {
    const catalogEntry = getRuleCatalogEntryForRuleNameOrNull(ruleName);

    if (catalogEntry === null) {
        throw new TypeError(
            `Rule '${ruleName}' is missing from the stable rule catalog.`
        );
    }

    return catalogEntry;
};

/** Resolve stable catalog metadata by rule id. */
export const ruleCatalogByRuleId: ReadonlyMap<RuleCatalogId, RuleCatalogEntry> =
    new Map(ruleCatalogEntries.map((entry) => [entry.ruleId, entry]));

/** Resolve stable catalog metadata for a catalog id. */
export const getRuleCatalogEntryForRuleId = (
    ruleId: RuleCatalogId
): RuleCatalogEntry | undefined => ruleCatalogByRuleId.get(ruleId);

/** Validate that catalog IDs are unique and sequential. */
export const validateRuleCatalogIntegrity = (): boolean => {
    const seenRuleIds = new Set<RuleCatalogId>();

    for (const [index, entry] of ruleCatalogEntries.entries()) {
        if (setHas(seenRuleIds, entry.ruleId)) {
            return false;
        }

        seenRuleIds.add(entry.ruleId);

        const expectedRuleNumber = index + 1;
        if (entry.ruleNumber !== expectedRuleNumber) {
            return false;
        }

        if (entry.ruleId !== toRuleCatalogId(expectedRuleNumber)) {
            return false;
        }
    }

    return true;
};
