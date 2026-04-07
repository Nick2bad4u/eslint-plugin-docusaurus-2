/**
 * @packageDocumentation
 * Integrity checks for the hand-authored docs/rules surface.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

const rulesDocsDirectoryPath = path.join(process.cwd(), "docs", "rules");
const presetDocsDirectoryPath = path.join(rulesDocsDirectoryPath, "presets");
const expectedTopLevelDocs = ["getting-started.md", "overview.md"] as const;
const expectedPresetDocs = [
    "all.md",
    "experimental.md",
    "index.md",
    "minimal.md",
    "recommended-type-checked.md",
    "recommended.md",
    "strict.md",
] as const;
const createTextFromCodePoints = (codePoints: readonly number[]): string =>
    String.fromCodePoint(...codePoints);

const legacyBrandingTokens = [
    createTextFromCodePoints([
        84,
        121,
        112,
        101,
        70,
        101,
        115,
        116,
    ]),
    createTextFromCodePoints([
        116,
        121,
        112,
        101,
        102,
        101,
        115,
        116,
    ]),
    createTextFromCodePoints([
        116,
        121,
        112,
        101,
        45,
        102,
        101,
        115,
        116,
    ]),
    createTextFromCodePoints([
        116,
        115,
        45,
        101,
        120,
        116,
        114,
        97,
        115,
    ]),
] as const;

describe("docs/rules integrity", () => {
    it("contains the expected scaffold docs and no leftover rule pages", () => {
        expect.hasAssertions();

        const topLevelEntries = fs
            .readdirSync(rulesDocsDirectoryPath)
            .filter((entry) => entry.endsWith(".md"))
            .toSorted((left, right) => left.localeCompare(right));
        const presetEntries = fs
            .readdirSync(presetDocsDirectoryPath)
            .filter((entry) => entry.endsWith(".md"))
            .toSorted((left, right) => left.localeCompare(right));

        expect(topLevelEntries).toStrictEqual([...expectedTopLevelDocs]);
        expect(presetEntries).toStrictEqual([...expectedPresetDocs]);
    });

    it("keeps docs/rules free of legacy template branding", () => {
        expect.hasAssertions();

        const markdownFilePaths = [
            ...expectedTopLevelDocs.map((fileName) =>
                path.join(rulesDocsDirectoryPath, fileName)
            ),
            ...expectedPresetDocs.map((fileName) =>
                path.join(presetDocsDirectoryPath, fileName)
            ),
        ];

        for (const filePath of markdownFilePaths) {
            const markdown = fs.readFileSync(filePath, "utf8");

            expect(
                legacyBrandingTokens.some((token) => markdown.includes(token))
            ).toBeFalsy();
        }
    });
});
