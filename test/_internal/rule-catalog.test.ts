import { describe, expect, it } from "vitest";

import {
    getRuleCatalogEntryForRuleId,
    getRuleCatalogEntryForRuleName,
    getRuleCatalogEntryForRuleNameOrNull,
    ruleCatalogEntries,
    validateRuleCatalogIntegrity,
} from "../../src/_internal/rule-catalog";
import { docusaurusRules } from "../../src/_internal/rules-registry";

describe("rule-catalog", () => {
    it("stays synchronized with the runtime rules registry", () => {
        expect.hasAssertions();

        const catalogRuleNames = ruleCatalogEntries.map(
            (entry) => entry.ruleName
        );
        const registryRuleNames = Object.keys(docusaurusRules).toSorted(
            (left, right) => left.localeCompare(right)
        );

        expect(ruleCatalogEntries).toHaveLength(11);
        expect(
            catalogRuleNames.toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toStrictEqual(registryRuleNames);
    });

    it("resolves the known catalog entries by name and id", () => {
        expect.hasAssertions();

        expect(
            getRuleCatalogEntryForRuleName("prefer-to-for-internal-links")
        ).toStrictEqual({
            ruleId: "R001",
            ruleName: "prefer-to-for-internal-links",
            ruleNumber: 1,
        });
        expect(getRuleCatalogEntryForRuleId("R002")).toStrictEqual({
            ruleId: "R002",
            ruleName: "require-generated-index-link-type",
            ruleNumber: 2,
        });
        expect(getRuleCatalogEntryForRuleId("R009")).toStrictEqual({
            ruleId: "R009",
            ruleName: "require-default-export-pages",
            ruleNumber: 9,
        });
        expect(getRuleCatalogEntryForRuleId("R011")).toStrictEqual({
            ruleId: "R011",
            ruleName: "no-useless-collapsed-sidebar-categories",
            ruleNumber: 11,
        });
    });

    it("returns null or undefined for unknown lookups", () => {
        expect.hasAssertions();

        expect(
            getRuleCatalogEntryForRuleNameOrNull("no-example-rule")
        ).toBeNull();
        expect(getRuleCatalogEntryForRuleId("R999")).toBeUndefined();
    });

    it("throws for strict lookup of unknown rule names", () => {
        expect.hasAssertions();
        expect(() => getRuleCatalogEntryForRuleName("no-example-rule")).toThrow(
            /missing from the stable rule catalog/v
        );
    });

    it("reports valid baseline catalog integrity", () => {
        expect.hasAssertions();
        expect(validateRuleCatalogIntegrity()).toBeTruthy();
    });
});
