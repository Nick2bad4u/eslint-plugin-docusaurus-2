import type { TSESLint } from "@typescript-eslint/utils";
/**
 * @packageDocumentation
 * Public plugin entrypoint for eslint-plugin-docusaurus-2 exports and preset wiring.
 */
import type { ESLint, Linter } from "eslint";

import typeScriptParser from "@typescript-eslint/parser";

import type { UnknownArray } from "./_internal/types.js";

import packageJson from "../package.json" with { type: "json" };
import {
    presetConfigMetadataByName,
    presetConfigNames,
} from "./_internal/preset-config-references.js";
import {
    deriveRuleDocsMetadataByName,
    deriveRulePresetMembershipByRuleName,
    deriveTypeCheckedRuleNameSet,
} from "./_internal/rule-docs-metadata.js";
import { docusaurusRules } from "./_internal/rules-registry.js";

/** ESLint severity used by generated preset rule maps. */
const ERROR_SEVERITY = "error" as const;

/** Default file globs targeted by plugin presets when `files` is omitted. */
const DEFAULT_PLUGIN_FILE_GLOBS = [
    "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}",
] as const;

/** Flat-config preset shape produced by this plugin. */
export type Docusaurus2PresetConfig = Linter.Config & {
    rules: NonNullable<Linter.Config["rules"]>;
};

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
type Docusaurus2ConfigName = (typeof presetConfigNames)[number];

/** Internal alias for flat config objects handled by preset builders. */
type FlatConfig = Linter.Config;

/** Normalized language-options shape for preset composition helpers. */
type FlatLanguageOptions = NonNullable<FlatConfig["languageOptions"]>;

/** Normalized parser-options shape for preset composition helpers. */
type FlatParserOptions = NonNullable<FlatLanguageOptions["parserOptions"]>;

/** Rule-map type used by preset rule-list expansion helpers. */
type RulesConfig = Docusaurus2PresetConfig["rules"];

/** Resolve package version from package.json data. */
const getPackageVersion = (pkg: unknown): string => {
    if (typeof pkg !== "object" || pkg === null) {
        return "0.0.0";
    }

    const version = Reflect.get(pkg, "version");

    return typeof version === "string" ? version : "0.0.0";
};

/** Parser module reused across preset construction. */
const typeScriptParserValue: FlatLanguageOptions["parser"] = typeScriptParser;

/** Default parser options applied when a preset omits parser options. */
const defaultParserOptions = {
    ecmaVersion: "latest",
    sourceType: "module",
} satisfies FlatParserOptions;

/** Normalize unknown parser options into a mutable parser-options object. */
const normalizeParserOptions = (
    parserOptions: FlatLanguageOptions["parserOptions"]
): FlatParserOptions =>
    parserOptions !== null &&
    typeof parserOptions === "object" &&
    !Array.isArray(parserOptions)
        ? { ...parserOptions }
        : { ...defaultParserOptions };

/** Fully-qualified ESLint rule id used by this plugin. */
export type Docusaurus2RuleId = `docusaurus-2/${Docusaurus2RuleName}`;

/** Unqualified rule name supported by `eslint-plugin-docusaurus-2`. */
export type Docusaurus2RuleName = keyof typeof docusaurusRules;

const runtimeRules = docusaurusRules as Readonly<
    Record<string, TSESLint.RuleModule<string, Readonly<UnknownArray>>>
>;

/** ESLint-compatible rule map view of the strongly typed internal rule record. */
const docusaurusEslintRules: NonNullable<ESLint.Plugin["rules"]> &
    typeof docusaurusRules = docusaurusRules as NonNullable<
    ESLint.Plugin["rules"]
> &
    typeof docusaurusRules;

const ruleDocsMetadataByRuleName = deriveRuleDocsMetadataByName(runtimeRules);
const rulePresetMembership = deriveRulePresetMembershipByRuleName(
    ruleDocsMetadataByRuleName
);
const typeCheckedRuleNames = deriveTypeCheckedRuleNameSet(
    ruleDocsMetadataByRuleName
);
const docusaurusRuleEntries = Object.entries(runtimeRules);

const createEmptyPresetRuleMap = (): Record<
    Docusaurus2ConfigName,
    string[]
> => {
    const presetRuleMap = {} as Record<Docusaurus2ConfigName, string[]>;

    for (const configName of presetConfigNames) {
        presetRuleMap[configName] = [];
    }

    return presetRuleMap;
};

const dedupeRuleNames = (ruleNames: readonly string[]): string[] => [
    ...new Set(ruleNames),
];

const derivePresetRuleNamesByConfig = (): Readonly<
    Record<Docusaurus2ConfigName, readonly string[]>
> => {
    const presetRuleNamesByConfig = createEmptyPresetRuleMap();

    for (const [ruleName] of docusaurusRuleEntries) {
        const configNames = rulePresetMembership[ruleName];

        if (configNames === undefined || configNames.length === 0) {
            throw new TypeError(
                `Rule '${ruleName}' is missing preset membership metadata.`
            );
        }

        for (const configName of configNames) {
            presetRuleNamesByConfig[configName].push(ruleName);
        }
    }

    return {
        all: dedupeRuleNames(presetRuleNamesByConfig.all),
        experimental: dedupeRuleNames(presetRuleNamesByConfig.experimental),
        minimal: dedupeRuleNames(presetRuleNamesByConfig.minimal),
        recommended: dedupeRuleNames(presetRuleNamesByConfig.recommended),
        "recommended-type-checked": dedupeRuleNames(
            presetRuleNamesByConfig["recommended-type-checked"]
        ),
        strict: dedupeRuleNames(presetRuleNamesByConfig.strict),
    };
};

/** Build an ESLint rules map that enables each provided rule at error level. */
function errorRulesFor(ruleNames: readonly string[]): RulesConfig {
    const rules: RulesConfig = {};

    for (const ruleName of ruleNames) {
        rules[`docusaurus-2/${ruleName}`] = ERROR_SEVERITY;
    }

    return rules;
}

const presetRuleNamesByConfig = derivePresetRuleNamesByConfig();

/** Recommended preset rule list for zero-type-info usage. */
const recommendedRuleNames: string[] = [];

for (const ruleName of presetRuleNamesByConfig.recommended) {
    if (typeCheckedRuleNames.has(ruleName)) {
        continue;
    }

    recommendedRuleNames.push(ruleName);
}

/** Type-aware recommended preset rule list. */
const recommendedTypeCheckedRuleNames = dedupeRuleNames([
    ...recommendedRuleNames,
    ...presetRuleNamesByConfig["recommended-type-checked"],
]);

/** Effective per-preset rule lists after applying derived policy overlays. */
const effectivePresetRuleNamesByConfig: Readonly<
    Record<Docusaurus2ConfigName, readonly string[]>
> = {
    ...presetRuleNamesByConfig,
    experimental: dedupeRuleNames([
        ...presetRuleNamesByConfig.all,
        ...presetRuleNamesByConfig.experimental,
    ]),
    recommended: recommendedRuleNames,
    "recommended-type-checked": recommendedTypeCheckedRuleNames,
};

/** Apply parser and plugin metadata required by all plugin presets. */
function withDocusaurusPlugin(
    config: Readonly<Docusaurus2PresetConfig>,
    plugin: Readonly<ESLint.Plugin>,
    options: Readonly<{ requiresTypeChecking: boolean }>
): Docusaurus2PresetConfig {
    const existingLanguageOptions = config.languageOptions ?? {};
    const existingParserOptions = existingLanguageOptions["parserOptions"];
    const parserOptions = normalizeParserOptions(existingParserOptions);

    if (
        options.requiresTypeChecking &&
        !Object.hasOwn(parserOptions, "projectService")
    ) {
        Reflect.set(parserOptions, "projectService", true);
    }

    const languageOptions: FlatLanguageOptions = {
        ...existingLanguageOptions,
        parser: existingLanguageOptions["parser"] ?? typeScriptParserValue,
        parserOptions,
    };

    return {
        ...config,
        files: config.files ?? [...DEFAULT_PLUGIN_FILE_GLOBS],
        languageOptions,
        plugins: {
            ...config.plugins,
            "docusaurus-2": plugin,
        },
    };
}

/** Minimal plugin object used when assembling flat-config presets. */
const pluginForConfigs: ESLint.Plugin = {
    rules: docusaurusEslintRules,
};

/** Flat config presets distributed by eslint-plugin-docusaurus-2. */
const createConfigsDefinition = (): Record<
    Docusaurus2ConfigName,
    Docusaurus2PresetConfig
> => {
    const configs = {} as Record<
        Docusaurus2ConfigName,
        Docusaurus2PresetConfig
    >;

    for (const configName of presetConfigNames) {
        const configMetadata = presetConfigMetadataByName[configName];

        configs[configName] = withDocusaurusPlugin(
            {
                name: configMetadata.presetName,
                rules: errorRulesFor(
                    effectivePresetRuleNamesByConfig[configName]
                ),
            },
            pluginForConfigs,
            {
                requiresTypeChecking: configMetadata.requiresTypeChecking,
            }
        );
    }

    return configs;
};

const configsDefinition = createConfigsDefinition();

/** Finalized typed view of all exported preset configurations. */
const docusaurus2Configs: Record<
    Docusaurus2ConfigName,
    Docusaurus2PresetConfig
> = configsDefinition;

/** Main plugin object exported for ESLint consumption. */
const docusaurus2Plugin: Omit<ESLint.Plugin, "configs" | "rules"> & {
    configs: Record<Docusaurus2ConfigName, Docusaurus2PresetConfig>;
    meta: {
        name: string;
        namespace: string;
        version: string;
    };
    processors: NonNullable<ESLint.Plugin["processors"]>;
    rules: NonNullable<ESLint.Plugin["rules"]>;
} = {
    configs: docusaurus2Configs,
    meta: {
        name: "eslint-plugin-docusaurus-2",
        namespace: "docusaurus-2",
        version: getPackageVersion(packageJson),
    },
    processors: {},
    rules: docusaurusEslintRules,
};

/** Runtime type for the plugin object exported as default. */
export type Docusaurus2Plugin = typeof docusaurus2Plugin;

/** Default plugin export consumed by ESLint flat config. */
export default docusaurus2Plugin;
