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
 *             configs?: readonly string[] | string;
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
 *     | "config"
 *     | "experimental"
 *     | "minimal"
 *     | "recommended"
 *     | "strict"} PresetName
 */

/**
 * @typedef {"content" | "strict-mdx-upgrade"} AdditionalConfigName
 */

const rulesSectionHeading = "## Rules";
const readmePath = resolve(process.cwd(), "README.md");
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
const PRESET_DOCS_URL_BASE =
    "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets";
const CONFIG_SURFACES_DOCS_URL =
    "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/guides/config-surfaces";

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

    return `[${metadata.icon} \`${metadata.reference}\`](${CONFIG_SURFACES_DOCS_URL})`;
};

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
                : presetNames.map(createPresetIconLink).join(" ");

        return `${docsLink} | ${getRuleFixIndicator(ruleModule)} | ${presetIcons} |`;
    });
};

/**
 * @param {Readonly<Record<string, ReadmeRuleModule>>} rules
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
        const docsLink =
            typeof docsUrl === "string" && docsUrl.length > 0
                ? `| [\`${ruleName}\`](${docsUrl})`
                : `| \`${ruleName}\``;
        const configNames = normalizeAdditionalConfigNames(
            ruleModule.meta?.docs?.configs
        );
        const configSurface =
            configNames.length === 0
                ? "direct rule opt-in only"
                : configNames.map(createAdditionalConfigSurfaceLabel).join(" ");

        return `${docsLink} | ${getRuleFixIndicator(ruleModule)} | ${configSurface} |`;
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
 * @param {Readonly<Record<string, ReadmeRuleModule>>} rules
 *
 * @returns {string}
 */
export const generateReadmeRulesSectionFromRules = (rules) => {
    const ruleRows = createRuleRows(rules);

    return [
        rulesSectionHeading,
        "",
        "The current rule catalog focuses on Docusaurus config, validation, sidebar, and site-source CSS correctness.",
        "",
        "The public preset surface is stable, and the rule catalog is intentionally focused while higher-value Docusaurus rule gaps are explored.",
        "",
        "- `Fix` legend:",
        "  - `🔧` = autofixable",
        "  - `💡` = suggestions available",
        "  - `—` = report only",
        "- Rules shown with no preset membership are rendered in the opt-in rules table below.",
        "- `Preset key` legend:",
        ...createPresetLegendLines(),
        "",
        "| Rule | Fix | Preset key |",
        "| --- | :-: | --- |",
        ...ruleRows.filter((row) => !row.endsWith("| — |")),
        "",
        "### Opt-in rules",
        "",
        "These rules are intentionally outside the six preset tiers. Some are available through opt-in content configs; others are direct rule opt-ins only.",
        "",
        "| Rule | Fix | Config surface |",
        "| --- | :-: | --- |",
        ...createOptInRuleRows(rules),
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
    const currentRulesSection = extractReadmeRulesSection(readmeMarkdown);
    const changed =
        normalizeRulesSectionMarkdown(currentRulesSection) !==
        normalizeRulesSectionMarkdown(generatedSection);

    if (!changed) {
        return Object.freeze({ changed: false });
    }

    const { endOffset, startOffset } =
        getReadmeRulesSectionBounds(readmeMarkdown);
    const updatedReadme =
        readmeMarkdown.slice(0, startOffset) +
        generatedSection +
        readmeMarkdown.slice(endOffset);

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
