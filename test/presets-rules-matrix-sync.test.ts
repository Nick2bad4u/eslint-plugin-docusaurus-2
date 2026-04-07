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

const normalizedAlignmentCellByKey = new Map<string, string>([
    ["00", "---"],
    ["01", "--:"],
    ["10", ":--"],
    ["11", ":-:"],
]);

const normalizeMatrixCell = (cell: string): string => {
    const trimmedCell = cell.trim();
    const alignmentKey = `${Number(trimmedCell.startsWith(":"))}${Number(trimmedCell.endsWith(":"))}`;

    return /^:?-+:?$/v.test(trimmedCell)
        ? (normalizedAlignmentCellByKey.get(alignmentKey) ?? trimmedCell)
        : trimmedCell;
};

const normalizeMatrixSectionMarkdown = (markdown: string): string =>
    markdown
        .replaceAll("\r\n", "\n")
        .split("\n")
        .map((line) => {
            const trimmedLine = line.trimEnd();

            return /^\|.*\|$/v.test(trimmedLine)
                ? `| ${trimmedLine
                      .split("|")
                      .slice(1, -1)
                      .map((cell) => normalizeMatrixCell(cell))
                      .join(" | ")} |`
                : trimmedLine;
        })
        .join("\n")
        .trimEnd();

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

        expect(normalizeMatrixSectionMarkdown(presetsMatrixSection)).toBe(
            normalizeMatrixSectionMarkdown(expectedMatrixSection)
        );
    });
});
