/**
 * @packageDocumentation
 * Synchronize or validate the presets rule matrix from canonical rule metadata.
 */
// @ts-check

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @typedef {Readonly<{
 *     meta?: {
 *         docs?: {
 *             presets?: readonly string[] | string;
 *             url?: string;
 *         };
 *     };
 * }>} PresetsRuleModule
 */

/**
 * @typedef {"all"
 *     | "experimental"
 *     | "minimal"
 *     | "recommended"
 *     | "recommended-type-checked"
 *     | "strict"} PresetName
 */

const matrixSectionHeading = "## Rule matrix";
const presetsIndexPath = resolve(
    process.cwd(),
    "docs",
    "rules",
    "presets",
    "index.md"
);
/** @type {readonly PresetName[]} */
const presetConfigNamesByReadmeOrder = [
    "minimal",
    "recommended",
    "recommended-type-checked",
    "strict",
    "all",
    "experimental",
];
const presetOrder = [...presetConfigNamesByReadmeOrder];

/** @type {Readonly<Record<PresetName, Readonly<{ icon: string }>>>} */
const presetConfigMetadataByName = {
    all: { icon: "🟣" },
    experimental: { icon: "🧪" },
    minimal: { icon: "🟢" },
    recommended: { icon: "🟡" },
    "recommended-type-checked": { icon: "🟠" },
    strict: { icon: "🔴" },
};

/** @param {string} value */
const isPresetConfigName = (value) =>
    Object.hasOwn(presetConfigMetadataByName, value);

const loadBuiltPlugin = async () => {
    const pluginModuleUrl = new URL("../dist/plugin.js", import.meta.url);
    // eslint-disable-next-line no-unsanitized/method -- Local checked-in dist path derived from import.meta.url.
    const pluginModule = await import(pluginModuleUrl.href);

    return pluginModule.default;
};

/**
 * @param {readonly string[] | string | undefined} presets
 *
 * @returns {readonly PresetName[]}
 */
const normalizePresetNames = (presets) => {
    const values = Array.isArray(presets) ? presets : [presets];
    /** @type {PresetName[]} */
    const normalizedPresetNames = [];
    const seenPresetNames = new Set();

    for (const value of values) {
        if (typeof value !== "string" || !isPresetConfigName(value)) {
            continue;
        }

        if (seenPresetNames.has(value)) {
            continue;
        }

        seenPresetNames.add(value);
        normalizedPresetNames.push(/** @type {PresetName} */ (value));
    }

    return normalizedPresetNames;
};

/** @param {string} markdown */
const detectLineEnding = (markdown) =>
    markdown.includes("\r\n") ? "\r\n" : "\n";

/**
 * @param {string} markdown
 * @param {"\n" | "\r\n"} lineEnding
 */
const normalizeMarkdownLineEndings = (markdown, lineEnding) =>
    markdown.replace(/\r?\n/gv, lineEnding);

/** @returns {string} */
const createTableHeader = () => {
    const iconHeaders = presetOrder.map(
        (presetName) => presetConfigMetadataByName[presetName].icon
    );

    return [
        `| Rule | ${iconHeaders.join(" | ")} |`,
        `| --- | ${iconHeaders.map(() => ":-:").join(" | ")} |`,
    ].join("\n");
};

/**
 * @param {Readonly<Record<string, PresetsRuleModule>>} rules
 *
 * @returns {readonly string[]}
 */
const createRuleRows = (rules) => {
    const sortedRuleEntries = Object.entries(rules).toSorted(
        ([left], [right]) => left.localeCompare(right)
    );

    if (sortedRuleEntries.length === 0) {
        return [`| — | ${presetOrder.map(() => "—").join(" | ")} |`];
    }

    return sortedRuleEntries.map(([ruleName, ruleModule]) => {
        const docsUrl = ruleModule.meta?.docs?.url;
        const label =
            typeof docsUrl === "string" && docsUrl.length > 0
                ? `[\`${ruleName}\`](${docsUrl})`
                : `\`${ruleName}\``;
        const enabledPresetNames = new Set(
            normalizePresetNames(ruleModule.meta?.docs?.presets)
        );
        const cells = presetOrder.map((presetName) =>
            enabledPresetNames.has(presetName) ? "✅" : "—"
        );

        return `| ${label} | ${cells.join(" | ")} |`;
    });
};

/**
 * @param {Readonly<Record<string, PresetsRuleModule>>} rules
 *
 * @returns {string}
 */
export const generatePresetsRulesMatrixSectionFromRules = (rules) =>
    [
        matrixSectionHeading,
        "",
        "This matrix is the canonical place to show how the current Docusaurus rule catalog maps onto each preset tier.",
        "",
        createTableHeader(),
        ...createRuleRows(rules),
        "",
    ].join("\n");

/**
 * @param {string} markdown
 *
 * @returns {string}
 */
const normalizeMatrixSectionMarkdown = (markdown) =>
    markdown
        .replace(/\r\n/gv, "\n")
        .split("\n")
        .map((line) => {
            const trimmedLine = line.trimEnd();

            if (!/^\|.*\|$/v.test(trimmedLine)) {
                return trimmedLine;
            }

            const cells = trimmedLine
                .split("|")
                .slice(1, -1)
                .map((cell) => {
                    const trimmedCell = cell.trim();

                    if (!/^:?-+:?$/v.test(trimmedCell)) {
                        return trimmedCell;
                    }

                    const hasStartColon = trimmedCell.startsWith(":");
                    const hasEndColon = trimmedCell.endsWith(":");

                    if (hasStartColon && hasEndColon) {
                        return ":-:";
                    }

                    if (hasStartColon) {
                        return ":--";
                    }

                    if (hasEndColon) {
                        return "--:";
                    }

                    return "---";
                });

            return `| ${cells.join(" | ")} |`;
        })
        .join("\n")
        .trimEnd();

/**
 * @param {string} markdown
 * @param {string} generatedSection
 */
const upsertMatrixSection = (markdown, generatedSection) => {
    const headingOffset = markdown.indexOf(matrixSectionHeading);

    if (headingOffset === -1) {
        return `${markdown.trimEnd()}\n\n${generatedSection}`;
    }

    const nextHeadingOffset = markdown.indexOf(
        "\n## ",
        headingOffset + matrixSectionHeading.length
    );
    const sectionEndOffset =
        nextHeadingOffset === -1 ? markdown.length : nextHeadingOffset;

    return (
        markdown.slice(0, headingOffset) +
        generatedSection +
        markdown.slice(sectionEndOffset)
    );
};

/**
 * @param {{ readonly writeChanges?: boolean }} [input]
 *
 * @returns {Promise<Readonly<{ changed: boolean }>>}
 */
export const syncPresetsRulesMatrix = async (input = {}) => {
    const writeChanges = input.writeChanges ?? true;
    const builtPlugin = await loadBuiltPlugin();
    const presetsIndexMarkdown = await readFile(presetsIndexPath, "utf8");
    const lineEnding = detectLineEnding(presetsIndexMarkdown);
    const generatedSection = normalizeMarkdownLineEndings(
        generatePresetsRulesMatrixSectionFromRules(builtPlugin.rules),
        lineEnding
    );
    const headingOffset = presetsIndexMarkdown.indexOf(matrixSectionHeading);
    const nextHeadingOffset =
        headingOffset === -1
            ? -1
            : presetsIndexMarkdown.indexOf(
                  "\n## ",
                  headingOffset + matrixSectionHeading.length
              );
    const currentMatrixSection =
        headingOffset === -1
            ? ""
            : presetsIndexMarkdown.slice(
                  headingOffset,
                  nextHeadingOffset === -1
                      ? presetsIndexMarkdown.length
                      : nextHeadingOffset
              );
    const changed =
        normalizeMatrixSectionMarkdown(currentMatrixSection) !==
        normalizeMatrixSectionMarkdown(generatedSection);

    if (!changed) {
        return Object.freeze({ changed: false });
    }

    const updatedMarkdown = upsertMatrixSection(
        presetsIndexMarkdown,
        generatedSection
    );

    if (changed && writeChanges) {
        await writeFile(presetsIndexPath, updatedMarkdown);
    }

    return Object.freeze({ changed });
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const writeChanges = !process.argv.includes("--check");
    const { changed } = await syncPresetsRulesMatrix({ writeChanges });

    if (changed && !writeChanges) {
        console.error(
            "Preset rules matrix is out of date. Run `npm run sync:presets-rules-matrix`."
        );
        process.exitCode = 1;
    }
}
