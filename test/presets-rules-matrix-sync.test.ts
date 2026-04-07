/**
 * @packageDocumentation
 * Contract test that keeps the preset matrix synchronized with plugin metadata.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    generatePresetsRulesMatrixSectionFromRules,
    syncPresetsRulesMatrix,
} from "../scripts/sync-presets-rules-matrix.mjs";
import docusaurus2Plugin from "../src/plugin";

const MATRIX_SECTION_HEADING = "## Rule matrix";

const extractMatrixSection = (markdown: string): string => {
    const headingOffset = markdown.indexOf(MATRIX_SECTION_HEADING);

    if (headingOffset === -1) {
        throw new Error(
            "docs/rules/presets/index.md is missing the `## Rule matrix` section heading."
        );
    }

    const nextHeadingOffset = markdown.indexOf(
        "\n## ",
        headingOffset + MATRIX_SECTION_HEADING.length
    );
    const sectionEndOffset =
        nextHeadingOffset === -1 ? markdown.length : nextHeadingOffset;

    return markdown.slice(headingOffset, sectionEndOffset).trimEnd();
};

const normalizeLineEndings = (markdown: string): string =>
    markdown.replaceAll("\r\n", "\n").trimEnd();

describe("presets rules matrix synchronization", () => {
    it("matches the canonical matrix generated from plugin metadata", async () => {
        expect.hasAssertions();

        await syncPresetsRulesMatrix({ writeChanges: true });

        const presetsIndexPath = path.join(
            process.cwd(),
            "docs",
            "rules",
            "presets",
            "index.md"
        );
        const presetsMarkdown = await fs.readFile(presetsIndexPath, "utf8");

        const presetsMatrixSection = extractMatrixSection(presetsMarkdown);
        const expectedMatrixSection =
            generatePresetsRulesMatrixSectionFromRules(
                docusaurus2Plugin.rules
            ).trimEnd();

        expect(normalizeLineEndings(presetsMatrixSection)).toBe(
            normalizeLineEndings(expectedMatrixSection)
        );
    });
});
