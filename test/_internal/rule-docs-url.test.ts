import { describe, expect, it } from "vitest";

import {
    createRuleDocsUrl,
    RULE_DOCS_URL_BASE,
} from "../../src/_internal/rule-docs-url";

describe("rule-docs-url", () => {
    it("uses the canonical docs base URL", () => {
        expect.hasAssertions();
        expect(RULE_DOCS_URL_BASE).toBe(
            "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/"
        );
    });

    it("concatenates rule names without altering the provided suffix", () => {
        expect.hasAssertions();

        const opaqueRuleName = "sidebar-docs-order";

        expect(createRuleDocsUrl(opaqueRuleName)).toBe(
            `${RULE_DOCS_URL_BASE}${opaqueRuleName}`
        );
    });
});
