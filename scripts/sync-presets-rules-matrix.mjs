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
 *             configs?: readonly string[] | string;
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
 *     | "strict"} PresetName
 */

/**
 * @typedef {"content" | "strict-mdx-upgrade"} AdditionalConfigName
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

/** @type {Readonly<Record<PresetName, string>>} */
const presetDocsSlugByName = {
    all: "all",
    config: "config",
    experimental: "experimental",
    minimal: "minimal",
    recommended: "recommended",
    strict: "strict",
};

/** @type {Readonly<Record<PresetName, string>>} */
const presetConfigReferenceByName = {
    all: "docusaurus2.configs.all",
    config: "docusaurus2.configs.config",
    experimental: "docusaurus2.configs.experimental",
    minimal: "docusaurus2.configs.minimal",
    recommended: "docusaurus2.configs.recommended",
    strict: "docusaurus2.configs.strict",
};

const CONFIG_SURFACES_DOCS_PATH = "../guides/config-surfaces.md";

/**
 * @type {Readonly<
 *     Record<
 *         AdditionalConfigName,
 *         Readonly<{ icon: string; reference: string }>
 *     >
 * >}
 */
const additionalConfigMetadataByName = {
    content: {
        icon: "📝",
        reference: "docusaurus2.configs.content",
    },
    "strict-mdx-upgrade": {
        icon: "🧭",
        reference: 'docusaurus2.configs["strict-mdx-upgrade"]',
    },
};

/** @param {PresetName} presetName */
const createPresetDocsUrl = (presetName) =>
    `./${presetDocsSlugByName[presetName]}.md`;

/** @param {PresetName} presetName */
const createPresetIconLink = (presetName) => {
    const docsUrl = createPresetDocsUrl(presetName);
    const presetIcon = presetConfigMetadataByName[presetName].icon;

    return `[${presetIcon}](${docsUrl})`;
};

/** @returns {readonly string[]} */
const createPresetLegendLines = () =>
    presetOrder.map((presetName) => {
        const docsUrl = createPresetDocsUrl(presetName);
        const presetIcon = presetConfigMetadataByName[presetName].icon;
        const configReference = presetConfigReferenceByName[presetName];

        return `  - [${presetIcon}](${docsUrl}) — [\`${configReference}\`](${docsUrl})`;
    });

/** @param {string} value */
const isAdditionalConfigName = (value) =>
    Object.hasOwn(additionalConfigMetadataByName, value);

/**
 * @param {readonly string[] | string | undefined} configs
 *
 * @returns {readonly AdditionalConfigName[]}
 */
const normalizeAdditionalConfigNames = (configs) => {
    const values = Array.isArray(configs) ? configs : [configs];
    /** @type {AdditionalConfigName[]} */
    const normalizedConfigNames = [];
    const seenConfigNames = new Set();

    for (const value of values) {
        if (typeof value !== "string" || !isAdditionalConfigName(value)) {
            continue;
        }

        if (seenConfigNames.has(value)) {
            continue;
        }

        seenConfigNames.add(value);
        normalizedConfigNames.push(/** @type {AdditionalConfigName} */ (value));
    }

    return normalizedConfigNames;
};

/** @param {AdditionalConfigName} configName */
const createAdditionalConfigSurfaceLabel = (configName) => {
    const metadata = additionalConfigMetadataByName[configName];

    return `[${metadata.icon}](${CONFIG_SURFACES_DOCS_PATH}) [\`${metadata.reference}\`](${CONFIG_SURFACES_DOCS_PATH})`;
};

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
                : presetNames.map(createPresetIconLink).join(" ");

        return `| ${label} | ${getRuleFixIndicator(ruleModule)} | ${presetIcons} |`;
    });
};

/**
 * @param {Readonly<Record<string, PresetsRuleModule>>} rules
 *
 * @returns {readonly string[]}
 */
const createOptInRuleRows = (rules) => {
    const sortedRuleEntries = Object.entries(rules)
        .filter(([, ruleModule]) => {
            const presetNames = normalizePresetNames(
                ruleModule.meta?.docs?.presets
            );

            return presetNames.length === 0;
        })
        .toSorted(([left], [right]) => left.localeCompare(right));

    if (sortedRuleEntries.length === 0) {
        return ["| — | — | — |"];
    }

    return sortedRuleEntries.map(([ruleName, ruleModule]) => {
        const docsUrl = ruleModule.meta?.docs?.url;
        const label =
            typeof docsUrl === "string" && docsUrl.length > 0
                ? `[\`${ruleName}\`](${docsUrl})`
                : `\`${ruleName}\``;
        const configNames = normalizeAdditionalConfigNames(
            ruleModule.meta?.docs?.configs
        );
        const configSurface =
            configNames.length === 0
                ? "direct rule opt-in only"
                : configNames.map(createAdditionalConfigSurfaceLabel).join(" ");

        return `| ${label} | ${getRuleFixIndicator(ruleModule)} | ${configSurface} |`;
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
        "- Rules shown without preset membership appear in the opt-in rules table below.",
        "- `Preset key` legend:",
        ...createPresetLegendLines(),
        "",
        createTableHeader(),
        ...createRuleRows(rules).filter((row) => !row.endsWith("| — |")),
        "",
        "### Opt-in rules",
        "",
        "These rules are intentionally outside the preset ladder. Some are enabled through opt-in content configs; others are direct rule opt-ins only.",
        "",
        "| Rule | Fix | Config surface |",
        "| --- | :-: | --- |",
        ...createOptInRuleRows(rules),
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
