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
    "config.md",
    "experimental.md",
    "index.md",
    "minimal.md",
    "recommended.md",
    "strict.md",
] as const;
const legacyBrandingTokens = [
    "\u0054\u0079\u0070\u0065\u0046\u0065\u0073\u0074",
    "\u0074\u0079\u0070\u0065\u0066\u0065\u0073\u0074",
    "\u0074\u0079\u0070\u0065\u002D\u0066\u0065\u0073\u0074",
    "\u0074\u0073\u002D\u0065\u0078\u0074\u0072\u0061\u0073",
] as const;

const supportedRuleDocExtensions = [".md", ".mdx"] as const;

const sortStrings = (values: readonly string[]): string[] => {
    const sortedValues = [...values];

    sortedValues.sort((left, right) => left.localeCompare(right));

    return sortedValues;
};

const hasSupportedRuleDocExtension = (fileName: string): boolean =>
    supportedRuleDocExtensions.some((extension) =>
        fileName.endsWith(extension)
    );

const stripSupportedRuleDocExtension = (fileName: string): string => {
    const matchingExtension = supportedRuleDocExtensions.find((extension) =>
        fileName.endsWith(extension)
    );

    return matchingExtension === undefined
        ? fileName
        : fileName.slice(0, -matchingExtension.length);
};

const resolveRuleDocPath = (ruleName: string): string => {
    for (const extension of supportedRuleDocExtensions) {
        const candidatePath = path.join(
            rulesDocsDirectoryPath,
            `${ruleName}${extension}`
        );

        if (fs.existsSync(candidatePath)) {
            return candidatePath;
        }
    }

    throw new Error(`Missing docs/rules page for rule '${ruleName}'.`);
};

describe("docs/rules integrity", () => {
    it("contains the expected scaffold docs and no leftover rule pages", () => {
        expect.hasAssertions();

        const expectedRuleDocs = sortStrings(
            Object.keys(docusaurus2Plugin.rules)
        );

        const topLevelEntries = sortStrings(
            fs
                .readdirSync(rulesDocsDirectoryPath)
                .filter(hasSupportedRuleDocExtension)
        );
        const presetEntries = sortStrings(
            fs
                .readdirSync(presetDocsDirectoryPath)
                .filter((entry) => entry.endsWith(".md"))
        );

        const topLevelScaffoldEntries = topLevelEntries.filter((entry) =>
            expectedTopLevelDocs.includes(
                entry as (typeof expectedTopLevelDocs)[number]
            )
        );
        const topLevelRuleDocNames = sortStrings(
            topLevelEntries
                .filter((entry) => !topLevelScaffoldEntries.includes(entry))
                .map(stripSupportedRuleDocExtension)
        );

        expect(topLevelScaffoldEntries).toStrictEqual(
            sortStrings([...expectedTopLevelDocs])
        );
        expect(topLevelRuleDocNames).toStrictEqual(expectedRuleDocs);
        expect(presetEntries).toStrictEqual([...expectedPresetDocs]);
    });

    it("keeps docs/rules free of legacy template branding", () => {
        expect.hasAssertions();

        const markdownFilePaths = [
            ...expectedTopLevelDocs.map((fileName) =>
                path.join(rulesDocsDirectoryPath, fileName)
            ),
            ...Object.keys(docusaurus2Plugin.rules).map((ruleName) =>
                resolveRuleDocPath(ruleName)
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
