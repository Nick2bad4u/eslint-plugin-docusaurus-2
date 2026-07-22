/**
 * @packageDocumentation
 * Stable catalog IDs for all plugin rules.
 */

import {
    assertDefined,
    isDefined,
    objectFromEntries,
    objectValues,
    setHas,
} from "ts-extras";

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
const allRuleNames = [
    "local-search-will-not-work-in-dev",
    "no-conflicting-config-link-content-props",
    "no-conflicting-config-link-props",
    "no-conflicting-footer-html-item-props",
    "no-conflicting-navbar-doc-item-props",
    "no-conflicting-navbar-doc-sidebar-item-props",
    "no-conflicting-search-providers",
    "no-conflicting-theme-config-color-mode-flags",
    "no-conflicting-theme-config-metadata-keys",
    "no-deprecated-admonition-title-syntax",
    "no-deprecated-future-experimental-faster",
    "no-deprecated-future-experimental-storage",
    "no-deprecated-google-analytics",
    "no-deprecated-heading-id-syntax",
    "no-deprecated-html-comments-in-mdx",
    "no-deprecated-on-broken-markdown-links",
    "no-duplicate-footer-column-titles",
    "no-duplicate-footer-link-item-destinations",
    "no-duplicate-footer-link-item-labels",
    "no-duplicate-head-tags",
    "no-duplicate-i18n-locales",
    "no-duplicate-navbar-item-destinations",
    "no-duplicate-navbar-item-labels",
    "no-duplicate-plugin-pwa-head-tags",
    "no-duplicate-sidebar-doc-ids",
    "no-duplicate-theme-classic-custom-css",
    "no-duplicate-theme-config-metadata-keys",
    "no-empty-config-link-destinations",
    "no-empty-config-link-labels",
    "no-empty-footer-link-columns",
    "no-empty-footer-link-items",
    "no-empty-head-tags",
    "no-empty-navbar-dropdown-items",
    "no-empty-navbar-item-objects",
    "no-empty-sidebar-categories",
    "no-empty-theme-classic-custom-css",
    "no-empty-theme-config-metadata",
    "no-ignored-site-validations",
    "no-mixed-sidebar-link-kinds",
    "no-page-css-module-imports-in-components",
    "no-redundant-social-card-metadata",
    "no-search-link-without-search-provider",
    "no-search-page-link-when-search-page-disabled",
    "no-search-page-path-conflict",
    "no-svg-social-card-image",
    "no-unknown-i18n-locale-configs",
    "no-use-base-url-for-internal-link-components",
    "no-useless-collapsed-sidebar-categories",
    "prefer-config-satisfies",
    "prefer-css-modules-in-site-src",
    "prefer-head-tag-attributes-object",
    "prefer-href-for-external-link-components",
    "prefer-href-for-external-links",
    "prefer-i18n-default-locale-first",
    "prefer-sidebars-config-satisfies",
    "prefer-theme-config-docsearch",
    "prefer-theme-config-metadata-name-for-twitter-tags",
    "prefer-theme-config-metadata-property-for-og-tags",
    "prefer-to-for-internal-link-components",
    "prefer-to-for-internal-links",
    "prefer-use-base-url-for-static-assets",
    "require-balanced-footer-link-columns",
    "require-base-url-issue-banner-enabled",
    "require-base-url-slashes",
    "require-config-link-content",
    "require-config-link-destination",
    "require-default-export-pages",
    "require-doc-sidebar-link-type",
    "require-docsearch-ask-ai-assistant-id",
    "require-docsearch-theme-when-configured",
    "require-docusaurus-faster-package-installed",
    "require-footer-link-column-items",
    "require-footer-link-column-title",
    "require-generated-index-link-type",
    "require-head-tag-attributes-when-no-inner-html",
    "require-head-tag-content-or-attributes",
    "require-head-tag-tag-name",
    "require-i18n-default-locale-in-locales",
    "require-markdown-format-detect",
    "require-markdown-mermaid-when-theme-mermaid-enabled",
    "require-mermaid-elk-package-installed",
    "require-navbar-doc-item-doc-id",
    "require-navbar-doc-sidebar-item-sidebar-id",
    "require-navbar-docs-version-item-to",
    "require-navbar-dropdown-items",
    "require-navbar-dropdown-label",
    "require-navbar-html-item-value",
    "require-pages-plugin-excludes",
    "require-plugin-pwa-debug",
    "require-plugin-pwa-head-manifest",
    "require-plugin-pwa-head-theme-color",
    "require-plugin-pwa-offline-mode-activation-strategies",
    "require-plugin-pwa-setup",
    "require-rspack-bundler-for-faster-persistent-cache",
    "require-search-provider-package-installed",
    "require-sidebar-category-items",
    "require-sidebar-category-label",
    "require-sidebar-category-type",
    "require-sidebar-item-key-for-duplicate-labels",
    "require-site-config-fields",
    "require-site-url-origin",
    "require-theme-classic-custom-css-files-exist",
    "require-theme-classic-package-installed",
    "require-theme-config-announcement-bar-id",
    "require-theme-config-color-mode-object",
    "require-theme-config-docsearch-config",
    "require-theme-config-image",
    "require-theme-live-codeblock-package-installed",
    "require-theme-live-codeblock-when-live-codeblock-configured",
    "require-theme-mermaid-package-installed",
    "require-theme-mermaid-when-markdown-mermaid-enabled",
    "require-theme-search-algolia-package-installed",
    "require-trailing-slash-explicit",
    "require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads",
    "validate-live-codeblock-playground-position",
    "validate-navbar-item-position",
    "validate-theme-config-announcement-bar-is-closeable",
    "validate-theme-config-color-mode-default-mode",
    "validate-theme-config-color-mode-switch-flags",
    "validate-theme-config-footer-style",
    "validate-theme-config-metadata",
    "validate-theme-config-navbar-style",
    "no-html-links",
    "no-untranslated-text",
    "prefer-docusaurus-heading",
    "string-literal-i18n-messages",
] as const satisfies readonly string[];

/** Preserve legacy rule-number assignments that are already documented/public. */
const pinnedRuleNumbers: Readonly<Record<string, number>> = {
    "no-duplicate-sidebar-doc-ids": 13,
    "no-useless-collapsed-sidebar-categories": 11,
    "prefer-to-for-internal-link-components": 15,
    "prefer-to-for-internal-links": 1,
    "prefer-use-base-url-for-static-assets": 17,
    "require-default-export-pages": 9,
    "require-generated-index-link-type": 2,
};

const toRuleCatalogId = (ruleNumber: number): RuleCatalogId =>
    `R${String(ruleNumber).padStart(3, "0")}`;

/** Canonical catalog metadata entries in stable display/order form. */
export const ruleCatalogEntries: readonly RuleCatalogEntry[] = (() => {
    const totalRuleCount = allRuleNames.length;
    const reservedRuleNumbers = new Set<number>(
        objectValues(pinnedRuleNumbers)
    );
    const availableRuleNumbers: number[] = [];

    for (
        let candidateRuleNumber = 1;
        candidateRuleNumber <= totalRuleCount;
        candidateRuleNumber += 1
    ) {
        if (!setHas(reservedRuleNumbers, candidateRuleNumber)) {
            availableRuleNumbers.push(candidateRuleNumber);
        }
    }

    const entries: RuleCatalogEntry[] = [];
    let nextAvailableRuleNumberIndex = 0;

    for (const ruleName of allRuleNames) {
        const pinnedRuleNumber = pinnedRuleNumbers[ruleName];
        const ruleNumber =
            pinnedRuleNumber ??
            availableRuleNumbers[nextAvailableRuleNumberIndex];

        if (!isDefined(pinnedRuleNumber)) {
            nextAvailableRuleNumberIndex += 1;
        }
        assertDefined(ruleNumber);

        entries.push({
            ruleId: toRuleCatalogId(ruleNumber),
            ruleName,
            ruleNumber,
        });
    }

    entries.sort(
        (leftEntry: RuleCatalogEntry, rightEntry: RuleCatalogEntry): number =>
            leftEntry.ruleNumber - rightEntry.ruleNumber
    );

    return entries;
})();

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
