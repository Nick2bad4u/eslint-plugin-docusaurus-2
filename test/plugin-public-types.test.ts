/**
 * @packageDocumentation
 * Runtime-backed type contract tests for public plugin exports.
 */

import type {
    Docusaurus2Plugin,
    Docusaurus2RuleId,
    Docusaurus2RuleName,
} from "eslint-plugin-docusaurus-2";

import docusaurus2Plugin from "eslint-plugin-docusaurus-2";
import { describe, expect, it } from "vitest";

type Docusaurus2ConfigName = keyof Docusaurus2Plugin["configs"];

const validConfigName: Docusaurus2ConfigName = "strict";
// @ts-expect-error Invalid preset key must not satisfy Docusaurus2ConfigName.
const invalidConfigName: Docusaurus2ConfigName = "recommendedTypeChecked";
const validRuleId =
    "docusaurus-2/no-redundant-social-card-metadata" satisfies Docusaurus2RuleId;
const validRuleName =
    "no-mixed-sidebar-link-kinds" satisfies Docusaurus2RuleName;

describe("plugin public types", () => {
    it("accepts the documented config and rule identifier surfaces", () => {
        expect.hasAssertions();

        expect(validConfigName).toBe("strict");
        expect(invalidConfigName).toBe("recommendedTypeChecked");
        expect(validRuleId).toBe(
            "docusaurus-2/no-redundant-social-card-metadata"
        );
        expect(validRuleName).toBe("no-mixed-sidebar-link-kinds");
    });

    it("exposes the expected plugin contract types", () => {
        expect.hasAssertions();

        const pluginContract: Docusaurus2Plugin = docusaurus2Plugin;
        const recommendedConfig: Docusaurus2Plugin["configs"]["recommended"] =
            pluginContract.configs.recommended;
        const configConfig: Docusaurus2Plugin["configs"]["config"] =
            pluginContract.configs.config;
        const allConfig: Docusaurus2Plugin["configs"]["all"] =
            pluginContract.configs.all;
        const experimentalConfig: Docusaurus2Plugin["configs"]["experimental"] =
            pluginContract.configs.experimental;
        const contentConfig: Docusaurus2Plugin["configs"]["content"] =
            pluginContract.configs.content;
        const strictMdxUpgradeConfig: Docusaurus2Plugin["configs"]["strict-mdx-upgrade"] =
            pluginContract.configs["strict-mdx-upgrade"];

        expect(recommendedConfig).toBeDefined();
        expect(configConfig).toBeDefined();
        expect(allConfig).toBeDefined();
        expect(experimentalConfig).toBeDefined();
        expect(contentConfig).toBeDefined();
        expect(strictMdxUpgradeConfig).toBeDefined();

        expect(pluginContract.meta.name).toBeTypeOf("string");
        expect(pluginContract.meta.version).toBeTypeOf("string");
        expect(pluginContract.meta.namespace).toBe("docusaurus-2");
    });
});
