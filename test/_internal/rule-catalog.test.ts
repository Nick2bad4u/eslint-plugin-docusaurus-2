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
        expect(ruleCatalogEntries).toHaveLength(0);
        expect(Object.keys(docusaurusRules)).toHaveLength(0);
    });

    it("returns null or undefined for unknown lookups when the catalog is empty", () => {
        expect.hasAssertions();
        expect(
            getRuleCatalogEntryForRuleNameOrNull("no-example-rule")
        ).toBeNull();
        expect(getRuleCatalogEntryForRuleId("R001")).toBeUndefined();
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
