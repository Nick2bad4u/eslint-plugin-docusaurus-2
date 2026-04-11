/**
 * @packageDocumentation
 * Vitest coverage for normalized rule docs metadata derivation.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import { describe, expect, it } from "vitest";

import {
    deriveRuleAdditionalConfigMembershipByRuleName,
    deriveRuleDocsMetadataByName,
    deriveRulePresetMembershipByRuleName,
} from "../src/_internal/rule-docs-metadata";

const createRuleModule = (
    docs: Readonly<Record<string, unknown>> & TSESLint.RuleMetaDataDocs
): TSESLint.RuleModule<string, readonly []> => ({
    create() {
        return {};
    },
    defaultOptions: [],
    meta: {
        docs,
        messages: {
            sample: "sample",
        },
        schema: [],
        type: "problem",
    },
});

describe("rule-docs-metadata", () => {
    it("derives preset and additional config membership", () => {
        expect.hasAssertions();

        const rules = {
            "no-deprecated-html-comments-in-mdx": createRuleModule({
                configs: [
                    "content",
                    "strict-mdx-upgrade",
                    "content",
                ],
                description: "docs",
                presets: [],
                recommended: false,
                ruleId: "R114",
                ruleNumber: 114,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-html-comments-in-mdx",
            }),
            "prefer-theme-config-docsearch": createRuleModule({
                configs: [],
                description: "docs",
                presets: [
                    "config",
                    "recommended",
                    "config",
                ],
                recommended: true,
                ruleId: "R089",
                ruleNumber: 89,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-docsearch",
            }),
        };

        const metadata = deriveRuleDocsMetadataByName(rules);

        expect(
            metadata["no-deprecated-html-comments-in-mdx"]
                ?.additionalConfigNames
        ).toStrictEqual(["content", "strict-mdx-upgrade"]);
        expect(
            metadata["prefer-theme-config-docsearch"]?.presetNames
        ).toStrictEqual(["config", "recommended"]);
        expect(
            deriveRuleAdditionalConfigMembershipByRuleName(metadata)
        ).toStrictEqual({
            "no-deprecated-html-comments-in-mdx": [
                "content",
                "strict-mdx-upgrade",
            ],
            "prefer-theme-config-docsearch": [],
        });
        expect(deriveRulePresetMembershipByRuleName(metadata)).toStrictEqual({
            "no-deprecated-html-comments-in-mdx": [],
            "prefer-theme-config-docsearch": ["config", "recommended"],
        });
    });

    it("defaults missing configs to an empty array", () => {
        expect.hasAssertions();

        const metadata = deriveRuleDocsMetadataByName({
            "require-docsearch-theme-when-configured": createRuleModule({
                description: "docs",
                presets: ["config"],
                recommended: true,
                ruleId: "R118",
                ruleNumber: 118,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-docsearch-theme-when-configured",
            }),
        });

        expect(
            metadata["require-docsearch-theme-when-configured"]
                ?.additionalConfigNames
        ).toStrictEqual([]);
    });
});
