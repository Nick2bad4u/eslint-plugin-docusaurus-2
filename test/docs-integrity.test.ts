/**
 * @packageDocumentation
 * Integrity checks for the hand-authored docs/rules surface.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import docusaurus2Plugin from "../src/plugin";

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
const legacyBrandingTokens = [
    "\u0054\u0079\u0070\u0065\u0046\u0065\u0073\u0074",
    "\u0074\u0079\u0070\u0065\u0066\u0065\u0073\u0074",
    "\u0074\u0079\u0070\u0065\u002D\u0066\u0065\u0073\u0074",
    "\u0074\u0073\u002D\u0065\u0078\u0074\u0072\u0061\u0073",
] as const;

const sortStrings = (values: readonly string[]): string[] => {
    const sortedValues = [...values];

    sortedValues.sort((left, right) => left.localeCompare(right));

    return sortedValues;
};

describe("docs/rules integrity", () => {
    it("contains the expected scaffold docs and no leftover rule pages", () => {
        expect.hasAssertions();

        const expectedRuleDocs = sortStrings(
            Object.keys(docusaurus2Plugin.rules).map(
                (ruleName) => `${ruleName}.md`
            )
        );

        const topLevelEntries = sortStrings(
            fs
                .readdirSync(rulesDocsDirectoryPath)
                .filter((entry) => entry.endsWith(".md"))
        );
        const presetEntries = sortStrings(
            fs
                .readdirSync(presetDocsDirectoryPath)
                .filter((entry) => entry.endsWith(".md"))
        );

        expect(topLevelEntries).toStrictEqual(
            sortStrings([...expectedTopLevelDocs, ...expectedRuleDocs])
        );
        expect(presetEntries).toStrictEqual([...expectedPresetDocs]);
    });

    it("keeps docs/rules free of legacy template branding", () => {
        expect.hasAssertions();

        const markdownFilePaths = [
            ...expectedTopLevelDocs.map((fileName) =>
                path.join(rulesDocsDirectoryPath, fileName)
            ),
            ...Object.keys(docusaurus2Plugin.rules).map((ruleName) =>
                path.join(rulesDocsDirectoryPath, `${ruleName}.md`)
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
