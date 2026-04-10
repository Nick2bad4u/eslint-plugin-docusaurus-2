/**
 * @packageDocumentation
 * Shared preset/config reference constants and type guards.
 */

import { objectHasOwn } from "./runtime-utils.js";

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export const presetConfigNames = [
    "all",
    "config",
    "experimental",
    "minimal",
    "recommended",
    "strict",
] as const;

/** Additional opt-in config keys exposed outside the preset ladder. */
export const additionalConfigNames = ["content", "strict-mdx-upgrade"] as const;

/** Metadata contract for non-preset opt-in config surfaces. */
export type AdditionalConfigMetadata = Readonly<{
    description: string;
    icon: string;
    reference:
        | `docusaurus2.configs.${string}`
        | `docusaurus2.configs["${string}"]`;
}>;

/** Additional opt-in config key type exposed through `plugin.configs`. */
export type AdditionalConfigName = (typeof additionalConfigNames)[number];

/** Metadata contract shared across preset wiring, docs, and README rendering. */
export type PresetConfigMetadata = Readonly<{
    description: string;
    icon: string;
    presetName: `docusaurus-2:${PresetConfigName}`;
    readmeOrder: number;
}>;

/** Canonical flat-config preset key type exposed through `plugin.configs`. */
export type PresetConfigName = (typeof presetConfigNames)[number];

/** Canonical metadata for every exported opt-in config key. */
export const additionalConfigMetadataByName: Readonly<
    Record<AdditionalConfigName, AdditionalConfigMetadata>
> = {
    content: {
        description:
            "Opt-in content-aware docs rules for Markdown and MDX files.",
        icon: "📝",
        reference: "docusaurus2.configs.content",
    },
    "strict-mdx-upgrade": {
        description:
            "Opt-in Docusaurus 3.10 strict-MDX migration rules for `.mdx` only.",
        icon: "🧭",
        reference: 'docusaurus2.configs["strict-mdx-upgrade"]',
    },
};

/** Canonical metadata for every exported preset key. */
export const presetConfigMetadataByName: Readonly<
    Record<PresetConfigName, PresetConfigMetadata>
> = {
    all: {
        description: "Every stable rule once the rule catalog grows.",
        icon: "🟣",
        presetName: "docusaurus-2:all",
        readmeOrder: 6,
    },
    config: {
        description:
            "Focused preset for Docusaurus config, themeConfig, navbar/footer, and plugin-setup rules.",
        icon: "🔵",
        presetName: "docusaurus-2:config",
        readmeOrder: 2,
    },
    experimental: {
        description: "Stable rules plus future experimental additions.",
        icon: "🧪",
        presetName: "docusaurus-2:experimental",
        readmeOrder: 6,
    },
    minimal: {
        description: "Smallest future-ready baseline for Docusaurus projects.",
        icon: "🟢",
        presetName: "docusaurus-2:minimal",
        readmeOrder: 1,
    },
    recommended: {
        description: "Balanced default preset for most Docusaurus codebases.",
        icon: "🟡",
        presetName: "docusaurus-2:recommended",
        readmeOrder: 3,
    },
    strict: {
        description:
            "Recommended plus stricter consistency rules for mature sites.",
        icon: "🔴",
        presetName: "docusaurus-2:strict",
        readmeOrder: 4,
    },
};

/** Stable README legend/rendering order for preset icons. */
export const presetConfigNamesByReadmeOrder: readonly PresetConfigName[] = [
    "minimal",
    "config",
    "recommended",
    "strict",
    "all",
    "experimental",
] as const;

const presetConfigNameLookup = Object.freeze(
    Object.fromEntries(
        presetConfigNames.map((presetName) => [presetName, true] as const)
    )
);

const additionalConfigNameLookup = Object.freeze(
    Object.fromEntries(
        additionalConfigNames.map((configName) => [configName, true] as const)
    )
);

/** Check whether a string is a supported preset key. */
export const isPresetConfigName = (value: string): value is PresetConfigName =>
    objectHasOwn(presetConfigNameLookup, value);

/** Check whether a string is a supported opt-in config key. */
export const isAdditionalConfigName = (
    value: string
): value is AdditionalConfigName =>
    objectHasOwn(additionalConfigNameLookup, value);
