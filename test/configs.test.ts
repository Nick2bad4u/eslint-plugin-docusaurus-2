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
            expect(config.files).toStrictEqual(["**/*.{ts,tsx,mts,cts}"]);
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

    it("keeps every preset rule map intentionally empty until rules are added", () => {
        expect.hasAssertions();

        for (const config of Object.values(docusaurus2Plugin.configs)) {
            expect(Object.keys(config.rules)).toHaveLength(0);
        }
    });
});
