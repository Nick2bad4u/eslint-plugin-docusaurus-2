/**
 * @packageDocumentation
 * Vitest coverage for exported preset behavior.
 */
import { describe, expect, it } from "vitest";

import {
    presetConfigMetadataByName,
    presetConfigNames,
} from "../src/_internal/preset-config-references";
import docusaurus2Plugin from "../src/plugin";

const getNormalizedRulePresetNames = (ruleName: string): readonly string[] => {
    const ruleModule = docusaurus2Plugin.rules[ruleName];
    const rawPresets = ruleModule?.meta.docs?.presets;

    return Array.isArray(rawPresets)
        ? rawPresets
        : typeof rawPresets === "string"
          ? [rawPresets]
          : [];
};

const getExpectedRuleIdsForPreset = (presetName: string): readonly string[] =>
    Object.keys(docusaurus2Plugin.rules)
        .filter((ruleName) =>
            getNormalizedRulePresetNames(ruleName).includes(presetName)
        )
        .map((ruleName) => `docusaurus-2/${ruleName}`)
        .toSorted((left, right) => left.localeCompare(right));

describe("docusaurus-2 plugin configs", () => {
    it("exports exactly the supported preset keys", () => {
        expect.hasAssertions();

        const keys = Object.keys(docusaurus2Plugin.configs);

        expect(keys).toHaveLength(presetConfigNames.length);
        expect(new Set(keys)).toStrictEqual(new Set(presetConfigNames));
    });

    it("registers plugin and TypeScript parser defaults in every preset", () => {
        expect.hasAssertions();

        for (const config of Object.values(docusaurus2Plugin.configs)) {
            expect(config.files).toStrictEqual([
                "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}",
            ]);
            expect(config.plugins).toHaveProperty("docusaurus-2");
            expect(config.languageOptions?.["parser"]).toBeDefined();
            expect(config.languageOptions?.["parserOptions"]).toStrictEqual(
                expect.objectContaining({
                    ecmaVersion: "latest",
                    sourceType: "module",
                })
            );
        }
    });

    it("keeps languageOptions isolated across presets", () => {
        expect.hasAssertions();

        const minimalConfig = docusaurus2Plugin.configs.minimal;
        const recommendedConfig = docusaurus2Plugin.configs.recommended;
        const strictConfig = docusaurus2Plugin.configs.strict;

        expect(minimalConfig.languageOptions).not.toBe(
            recommendedConfig.languageOptions
        );
        expect(recommendedConfig.languageOptions).not.toBe(
            strictConfig.languageOptions
        );
        expect(minimalConfig.languageOptions?.["parserOptions"]).not.toBe(
            strictConfig.languageOptions?.["parserOptions"]
        );
    });

    it("enables projectService only for the typed presets", () => {
        expect.hasAssertions();

        for (const configName of presetConfigNames) {
            const config = docusaurus2Plugin.configs[configName];
            const parserOptions = config.languageOptions?.["parserOptions"] as
                | Readonly<Record<string, unknown>>
                | undefined;
            const hasProjectService =
                typeof parserOptions === "object" &&
                parserOptions !== null &&
                Object.hasOwn(parserOptions, "projectService") &&
                parserOptions["projectService"] === true;

            expect(hasProjectService).toBe(
                presetConfigMetadataByName[configName].requiresTypeChecking
            );
        }
    });

    it("keeps minimal empty while the broader presets include the current rule catalog", () => {
        expect.hasAssertions();

        expect(
            Object.keys(docusaurus2Plugin.configs.minimal.rules)
        ).toHaveLength(0);

        const expectedRecommendedRuleIds =
            getExpectedRuleIdsForPreset("recommended");
        const expectedRecommendedTypeCheckedRuleIds =
            getExpectedRuleIdsForPreset("recommended-type-checked");
        const expectedStrictRuleIds = getExpectedRuleIdsForPreset("strict");
        const expectedAllRuleIds = getExpectedRuleIdsForPreset("all");
        const expectedExperimentalRuleIds =
            getExpectedRuleIdsForPreset("experimental");

        expect(
            Object.keys(docusaurus2Plugin.configs.recommended.rules).toSorted(
                (left, right) => left.localeCompare(right)
            )
        ).toStrictEqual(expectedRecommendedRuleIds);
        expect(
            Object.keys(
                docusaurus2Plugin.configs["recommended-type-checked"].rules
            ).toSorted((left, right) => left.localeCompare(right))
        ).toStrictEqual(expectedRecommendedTypeCheckedRuleIds);
        expect(
            Object.keys(docusaurus2Plugin.configs.strict.rules).toSorted(
                (left, right) => left.localeCompare(right)
            )
        ).toStrictEqual(expectedStrictRuleIds);
        expect(
            Object.keys(docusaurus2Plugin.configs.all.rules).toSorted(
                (left, right) => left.localeCompare(right)
            )
        ).toStrictEqual(expectedAllRuleIds);
        expect(
            Object.keys(docusaurus2Plugin.configs.experimental.rules).toSorted(
                (left, right) => left.localeCompare(right)
            )
        ).toStrictEqual(expectedExperimentalRuleIds);
    });
});
