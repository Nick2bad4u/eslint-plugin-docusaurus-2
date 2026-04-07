/**
 * @packageDocumentation
 * Contract test that keeps the README rules section synchronized with plugin metadata.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    generateReadmeRulesSectionFromRules,
    normalizeRulesSectionMarkdown,
    syncReadmeRulesTable,
} from "../scripts/sync-readme-rules-table.mjs";
import docusaurus2Plugin from "../src/plugin";

const RULES_SECTION_SNAPSHOT_PATH = path.join(
    "temp",
    "readme-rules-section.generated.md"
);
const processEnvironment = globalThis.process.env;
const SHOULD_SYNC_README_IN_UPDATE_MODE =
    process.argv.includes("-u") ||
    process.argv.includes("--update") ||
    processEnvironment["DOCUSAURUS2_UPDATE_GENERATED_DOCS"] === "1";

const syncReadmeRulesTableIfRequested = async (): Promise<void> => {
    if (!SHOULD_SYNC_README_IN_UPDATE_MODE) {
        return;
    }

    await syncReadmeRulesTable({ writeChanges: true });
};

describe("readme rules table synchronization", () => {
    it("matches the canonical rules section generated from plugin metadata", async () => {
        expect.hasAssertions();

        await syncReadmeRulesTableIfRequested();

        const readmePath = path.join(process.cwd(), "README.md");
        const readmeMarkdown = await fs.readFile(readmePath, "utf8");
        const readmeRulesSection = normalizeRulesSectionMarkdown(
            readmeMarkdown.slice(
                readmeMarkdown.indexOf("## Rules"),
                readmeMarkdown.indexOf("\n## Documentation")
            )
        );
        const expectedRulesSection = normalizeRulesSectionMarkdown(
            generateReadmeRulesSectionFromRules(docusaurus2Plugin.rules)
        );

        expect(readmeRulesSection).toBe(expectedRulesSection);
    });

    it("keeps the generated rules section stable", async () => {
        expect.hasAssertions();

        const generatedRulesSection = generateReadmeRulesSectionFromRules(
            docusaurus2Plugin.rules
        );

        await fs.mkdir(path.join(process.cwd(), "temp"), { recursive: true });
        await fs.writeFile(
            path.join(process.cwd(), RULES_SECTION_SNAPSHOT_PATH),
            generatedRulesSection,
            "utf8"
        );

        expect(generatedRulesSection).toContain("no-ignored-site-validations");
        expect(generatedRulesSection).toContain("prefer-config-satisfies");
        expect(generatedRulesSection).toContain(
            "prefer-css-modules-in-site-src"
        );
        expect(generatedRulesSection).toContain(
            "no-page-css-module-imports-in-components"
        );
        expect(generatedRulesSection).toContain("prefer-to-for-internal-links");
        expect(generatedRulesSection).toContain(
            "require-generated-index-link-type"
        );
    });
});
