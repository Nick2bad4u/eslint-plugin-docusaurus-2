/**
 * @packageDocumentation
 * Synchronize or validate the README rules section from canonical rule metadata.
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
 * }>} ReadmeRuleModule
 */

/**
 * @typedef {"all"
 *     | "experimental"
 *     | "minimal"
 *     | "recommended"
 *     | "recommended-type-checked"
 *     | "strict"} PresetName
 */

const rulesSectionHeading = "## Rules";
const readmePath = resolve(process.cwd(), "README.md");
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
const PRESET_DOCS_URL_BASE =
    "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets";

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

/** @type {Readonly<Record<PresetName, string>>} */
const presetDocsSlugByName = {
    all: "all",
    experimental: "experimental",
    minimal: "minimal",
    recommended: "recommended",
    "recommended-type-checked": "recommended-type-checked",
    strict: "strict",
};

/** @type {Readonly<Record<PresetName, string>>} */
const presetConfigReferenceByName = {
    all: "docusaurus2.configs.all",
    experimental: "docusaurus2.configs.experimental",
    minimal: "docusaurus2.configs.minimal",
    recommended: "docusaurus2.configs.recommended",
    "recommended-type-checked":
        'docusaurus2.configs["recommended-type-checked"]',
    strict: "docusaurus2.configs.strict",
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

/** @param {ReadmeRuleModule} ruleModule */
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

/**
 * @param {Readonly<Record<string, ReadmeRuleModule>>} rules
 *
 * @returns {readonly string[]}
 */
const createRuleRows = (rules) => {
    const sortedRuleEntries = Object.entries(rules).toSorted(
        ([left], [right]) => left.localeCompare(right)
    );

    if (sortedRuleEntries.length === 0) {
        return ["| — | — | — |"];
    }

    return sortedRuleEntries.map(([ruleName, ruleModule]) => {
        const docsUrl = ruleModule.meta?.docs?.url;
        const docsLink =
            typeof docsUrl === "string" && docsUrl.length > 0
                ? `| [\`${ruleName}\`](${docsUrl})`
                : `| \`${ruleName}\``;
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

        return `${docsLink} | ${getRuleFixIndicator(ruleModule)} | ${presetIcons} |`;
    });
};

/** @param {string} markdown */
const getReadmeRulesSectionBounds = (markdown) => {
    const startOffset = markdown.indexOf(rulesSectionHeading);

    if (startOffset < 0) {
        throw new Error("README.md is missing the '## Rules' section heading.");
    }

    const nextHeadingOffset = markdown.indexOf(
        "\n## ",
        startOffset + rulesSectionHeading.length
    );

    return {
        endOffset: nextHeadingOffset < 0 ? markdown.length : nextHeadingOffset,
        startOffset,
    };
};

/** @param {string} markdown */
export const extractReadmeRulesSection = (markdown) => {
    const { endOffset, startOffset } = getReadmeRulesSectionBounds(markdown);

    return markdown.slice(startOffset, endOffset);
};

/** @param {string} markdown */
export const normalizeRulesSectionMarkdown = (markdown) =>
    markdown
        .replace(/\r\n/gv, "\n")
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n")
        .trimEnd();

/**
 * @param {Readonly<Record<string, ReadmeRuleModule>>} rules
 *
 * @returns {string}
 */
export const generateReadmeRulesSectionFromRules = (rules) => {
    const ruleRows = createRuleRows(rules);

    return [
        rulesSectionHeading,
        "",
        "The first Docusaurus-specific rules are still in development.",
        "",
        "The public preset surface is stable, but the bundled rule catalog is intentionally empty for now.",
        "",
        "- `Fix` legend:",
        "  - `🔧` = autofixable",
        "  - `💡` = suggestions available",
        "  - `—` = report only",
        "- `Preset key` legend:",
        ...createPresetLegendLines(),
        "",
        "| Rule | Fix | Preset key |",
        "| --- | :-: | --- |",
        ...ruleRows,
        "",
    ].join("\n");
};

/**
 * @param {{ readonly writeChanges: boolean }} input
 *
 * @returns {Promise<Readonly<{ changed: boolean }>>}
 */
export const syncReadmeRulesTable = async ({ writeChanges }) => {
    const builtPlugin = await loadBuiltPlugin();
    const readmeMarkdown = await readFile(readmePath, "utf8");
    const lineEnding = detectLineEnding(readmeMarkdown);
    const generatedSection = normalizeMarkdownLineEndings(
        generateReadmeRulesSectionFromRules(builtPlugin.rules),
        lineEnding
    );
    const { endOffset, startOffset } =
        getReadmeRulesSectionBounds(readmeMarkdown);
    const updatedReadme =
        readmeMarkdown.slice(0, startOffset) +
        generatedSection +
        readmeMarkdown.slice(endOffset);
    const changed = updatedReadme !== readmeMarkdown;

    if (changed && writeChanges) {
        await writeFile(readmePath, updatedReadme);
    }

    return Object.freeze({ changed });
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const writeChanges = process.argv.includes("--write");
    const { changed } = await syncReadmeRulesTable({ writeChanges });

    if (changed && !writeChanges) {
        console.error(
            "README rules section is out of date. Run `npm run sync:readme-rules-table:write`."
        );
        process.exitCode = 1;
    }
}
