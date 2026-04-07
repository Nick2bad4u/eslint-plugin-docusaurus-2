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
