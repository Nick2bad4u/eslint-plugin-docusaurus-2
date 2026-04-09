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
 *         fixable?: string;
 *         hasSuggestions?: boolean;
 *     };
 * }>} PresetsRuleModule
 */

/**
 * @typedef {"all"
 *     | "config"
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
    "config",
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
    config: { icon: "🔵" },
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
    return ["| Rule | Fix | Preset key |", "| --- | :-: | --- |"].join("\n");
};

const PRESET_DOCS_URL_BASE =
    "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets";

/** @type {Readonly<Record<PresetName, string>>} */
const presetDocsSlugByName = {
    all: "all",
    config: "config",
    experimental: "experimental",
    minimal: "minimal",
    recommended: "recommended",
    "recommended-type-checked": "recommended-type-checked",
    strict: "strict",
};

/** @type {Readonly<Record<PresetName, string>>} */
const presetConfigReferenceByName = {
    all: "docusaurus2.configs.all",
    config: "docusaurus2.configs.config",
    experimental: "docusaurus2.configs.experimental",
    minimal: "docusaurus2.configs.minimal",
    recommended: "docusaurus2.configs.recommended",
    "recommended-type-checked":
        'docusaurus2.configs["recommended-type-checked"]',
    strict: "docusaurus2.configs.strict",
};

/** @param {PresetName} presetName */
const createPresetDocsUrl = (presetName) =>
    `${PRESET_DOCS_URL_BASE}/${presetDocsSlugByName[presetName]}`;

/** @returns {readonly string[]} */
const createPresetLegendLines = () =>
    presetOrder.map((presetName) => {
        const docsUrl = createPresetDocsUrl(presetName);
        const presetIcon = presetConfigMetadataByName[presetName].icon;
        const configReference = presetConfigReferenceByName[presetName];

        return `  - [${presetIcon}](${docsUrl}) — [\`${configReference}\`](${docsUrl})`;
    });

/** @param {PresetsRuleModule} ruleModule */
const getRuleFixIndicator = (ruleModule) => {
    const fixable = ruleModule.meta?.fixable === "code";
    const hasSuggestions = ruleModule.meta?.hasSuggestions === true;

    if (fixable && hasSuggestions) {
        return "🔧 💡";
    }

    if (fixable) {
        return "🔧";
    }

    if (hasSuggestions) {
        return "💡";
    }

    return "—";
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
        const presetNames = normalizePresetNames(
            ruleModule.meta?.docs?.presets
        );
        const presetIcons =
            presetNames.length === 0
                ? "—"
                : presetNames
                      .map(
                          (presetName) =>
                              presetConfigMetadataByName[presetName].icon
                      )
                      .join(" ");

        return `| ${label} | ${getRuleFixIndicator(ruleModule)} | ${presetIcons} |`;
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
        "The current rule catalog focuses on Docusaurus config, validation, sidebar, and site-source CSS correctness.",
        "",
        "The public preset surface is stable, and the rule catalog is intentionally focused while higher-value Docusaurus rule gaps are explored.",
        "",
        "- `Fix` legend:",
        "  - `🔧` = autofixable",
        "  - `💡` = suggestions available",
        "  - `—` = report only",
        "- `Preset key` legend:",
        ...createPresetLegendLines(),
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
export const normalizeMatrixSectionMarkdown = (markdown) =>
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
