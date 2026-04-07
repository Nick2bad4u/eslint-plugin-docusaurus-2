/**
 * @packageDocumentation
 * Shared preset/config reference constants and type guards.
 */

import { objectHasOwn } from "./runtime-utils.js";

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export const presetConfigNames = [
    "all",
    "experimental",
    "minimal",
    "recommended",
    "recommended-type-checked",
    "strict",
] as const;

/** Metadata contract shared across preset wiring, docs, and README rendering. */
export type PresetConfigMetadata = Readonly<{
    description: string;
    icon: string;
    presetName: `docusaurus-2:${PresetConfigName}`;
    readmeOrder: number;
    requiresTypeChecking: boolean;
}>;

/** Canonical flat-config preset key type exposed through `plugin.configs`. */
export type PresetConfigName = (typeof presetConfigNames)[number];

/** Canonical metadata for every exported preset key. */
export const presetConfigMetadataByName: Readonly<
    Record<PresetConfigName, PresetConfigMetadata>
> = {
    all: {
        description: "Every stable rule once the rule catalog grows.",
        icon: "🟣",
        presetName: "docusaurus-2:all",
        readmeOrder: 5,
        requiresTypeChecking: true,
    },
    experimental: {
        description: "Stable rules plus future experimental additions.",
        icon: "🧪",
        presetName: "docusaurus-2:experimental",
        readmeOrder: 6,
        requiresTypeChecking: true,
    },
    minimal: {
        description: "Smallest future-ready baseline for Docusaurus projects.",
        icon: "🟢",
        presetName: "docusaurus-2:minimal",
        readmeOrder: 1,
        requiresTypeChecking: false,
    },
    recommended: {
        description: "Balanced default preset for most Docusaurus codebases.",
        icon: "🟡",
        presetName: "docusaurus-2:recommended",
        readmeOrder: 2,
        requiresTypeChecking: false,
    },
    "recommended-type-checked": {
        description:
            "Recommended plus rules that rely on TypeScript type information.",
        icon: "🟠",
        presetName: "docusaurus-2:recommended-type-checked",
        readmeOrder: 3,
        requiresTypeChecking: true,
    },
    strict: {
        description:
            "Recommended plus stricter consistency rules for mature sites.",
        icon: "🔴",
        presetName: "docusaurus-2:strict",
        readmeOrder: 4,
        requiresTypeChecking: true,
    },
};

/** Stable README legend/rendering order for preset icons. */
export const presetConfigNamesByReadmeOrder: readonly PresetConfigName[] = [
    "minimal",
    "recommended",
    "recommended-type-checked",
    "strict",
    "all",
    "experimental",
] as const;

const presetConfigNameLookup = Object.freeze(
    Object.fromEntries(
        presetConfigNames.map((presetName) => [presetName, true] as const)
    )
);

/** Check whether a string is a supported preset key. */
export const isPresetConfigName = (value: string): value is PresetConfigName =>
    objectHasOwn(presetConfigNameLookup, value);
