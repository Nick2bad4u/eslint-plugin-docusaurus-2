/**
 * @packageDocumentation
 * Derivation helpers for canonical rule docs metadata.
 */
import type { TSESLint } from "@typescript-eslint/utils";

import { arrayIncludes, isDefined, isInteger, objectKeys } from "ts-extras";

import type {
    AdditionalConfigName,
    PresetConfigName,
} from "./preset-config-references.js";
import type { UnknownArray, UnknownRecord } from "./types.js";

import {
    isAdditionalConfigName,
    isPresetConfigName,
} from "./preset-config-references.js";
import { createRuleDocsUrl } from "./rule-docs-url.js";

/** Normalized docs metadata derived for each rule. */
export type RuleDocsMetadata = Readonly<{
    additionalConfigNames: readonly AdditionalConfigName[];
    description: string;
    presetNames: readonly PresetConfigName[];
    recommended: boolean;
    ruleId: string;
    ruleNumber: number;
    url: string;
}>;

/** Rule-name keyed metadata map derived from static docs contracts. */
export type RuleDocsMetadataByName<RuleName extends string = string> = Readonly<
    Record<RuleName, RuleDocsMetadata>
>;

/** Canonical docs contract required on every plugin rule. */
type PluginRuleDocsContract = Readonly<{
    configs: AdditionalConfigName | readonly AdditionalConfigName[];
    description: string;
    presets: PresetConfigName | readonly PresetConfigName[];
    recommended: boolean;
    requiresTypeChecking?: boolean;
    ruleId: string;
    ruleNumber: number;
    url: string;
}>;

/** Rule-map contract accepted by docs metadata derivation helpers. */
type RuleMap<RuleName extends string = string> = Readonly<
    Record<RuleName, TSESLint.RuleModule<string, Readonly<UnknownArray>>>
>;

const RULE_ID_PREFIX = "R" as const;
const RULE_ID_LENGTH = 4 as const;
const RULE_ID_DIGIT_START_INDEX = 1 as const;
const RULE_ID_DIGIT_END_INDEX = 4 as const;
const ASCII_ZERO_CODE_POINT = 48 as const;
const ASCII_NINE_CODE_POINT = 57 as const;

/** Guard dynamic rule ids to the canonical `R###` identifier contract. */
const isRuleIdInCanonicalFormat = (value: string): boolean => {
    if (value.length !== RULE_ID_LENGTH || !value.startsWith(RULE_ID_PREFIX)) {
        return false;
    }

    for (
        let index = RULE_ID_DIGIT_START_INDEX;
        index < RULE_ID_DIGIT_END_INDEX;
        index += 1
    ) {
        const codePoint = value.codePointAt(index);

        if (!isDefined(codePoint)) {
            return false;
        }

        if (
            codePoint < ASCII_ZERO_CODE_POINT ||
            codePoint > ASCII_NINE_CODE_POINT
        ) {
            return false;
        }
    }

    return true;
};

/** Guard dynamic values to object-shaped records. */
const isUnknownRecord = (value: unknown): value is Readonly<UnknownRecord> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

/** Convert rule docs `presets` into a normalized, deduped preset-name list. */
const normalizePresetNames = (
    ruleName: string,
    presets: PluginRuleDocsContract["presets"]
): readonly PresetConfigName[] => {
    const candidates = typeof presets === "string" ? [presets] : [...presets];
    const normalizedPresetNames: PresetConfigName[] = [];

    for (const candidate of candidates) {
        if (!isPresetConfigName(candidate)) {
            throw new TypeError(
                `Rule '${ruleName}' has invalid docs.presets value '${String(candidate)}'.`
            );
        }

        if (arrayIncludes(normalizedPresetNames, candidate)) {
            continue;
        }

        normalizedPresetNames.push(candidate);
    }

    return normalizedPresetNames;
};

const normalizeAdditionalConfigNames = (
    ruleName: string,
    configs: PluginRuleDocsContract["configs"]
): readonly AdditionalConfigName[] => {
    const candidates = typeof configs === "string" ? [configs] : [...configs];
    const normalizedConfigNames: AdditionalConfigName[] = [];

    for (const candidate of candidates) {
        if (!isAdditionalConfigName(candidate)) {
            throw new TypeError(
                `Rule '${ruleName}' has invalid docs.configs value '${String(candidate)}'.`
            );
        }

        if (arrayIncludes(normalizedConfigNames, candidate)) {
            continue;
        }

        normalizedConfigNames.push(candidate);
    }

    return normalizedConfigNames;
};

/** Validate and narrow dynamic `meta.docs` values to the plugin docs contract. */
const getRuleDocsContract = (
    ruleName: string,
    docs: unknown
): PluginRuleDocsContract => {
    if (!isUnknownRecord(docs)) {
        throw new TypeError(`Rule '${ruleName}' must declare meta.docs.`);
    }

    const description = docs["description"];
    const configs = docs["configs"];
    const recommended = docs["recommended"];
    const requiresTypeChecking = docs["requiresTypeChecking"];
    const ruleId = docs["ruleId"];
    const ruleNumber = docs["ruleNumber"];
    const presets = docs["presets"];
    const url = docs["url"];

    if (typeof description !== "string" || description.trim().length === 0) {
        throw new TypeError(
            `Rule '${ruleName}' must declare a non-empty docs.description.`
        );
    }

    if (typeof url !== "string" || url.trim().length === 0) {
        throw new TypeError(
            `Rule '${ruleName}' must declare a non-empty docs.url.`
        );
    }

    const expectedRuleDocsUrl = createRuleDocsUrl(ruleName);
    if (url !== expectedRuleDocsUrl) {
        throw new TypeError(
            `Rule '${ruleName}' must declare docs.url as '${expectedRuleDocsUrl}'.`
        );
    }

    if (typeof recommended !== "boolean") {
        throw new TypeError(
            `Rule '${ruleName}' must declare boolean docs.recommended.`
        );
    }

    if (
        isDefined(requiresTypeChecking) &&
        typeof requiresTypeChecking !== "boolean"
    ) {
        throw new TypeError(
            `Rule '${ruleName}' must declare boolean docs.requiresTypeChecking.`
        );
    }

    if (
        typeof ruleId !== "string" ||
        !isRuleIdInCanonicalFormat(ruleId) ||
        ruleId.trim().length === 0
    ) {
        throw new TypeError(
            `Rule '${ruleName}' must declare docs.ruleId using the 'R###' format.`
        );
    }

    if (
        typeof ruleNumber !== "number" ||
        !isInteger(ruleNumber) ||
        ruleNumber < 1
    ) {
        throw new TypeError(
            `Rule '${ruleName}' must declare positive integer docs.ruleNumber.`
        );
    }

    const normalizedConfigNames = (() => {
        if (!isDefined(configs)) {
            return [] as const;
        }

        if (typeof configs === "string") {
            if (!isAdditionalConfigName(configs)) {
                throw new TypeError(
                    `Rule '${ruleName}' has invalid docs.configs value '${configs}'.`
                );
            }

            return [configs] as const;
        }

        if (!Array.isArray(configs)) {
            throw new TypeError(
                `Rule '${ruleName}' must declare docs.configs as a config key or array.`
            );
        }

        return normalizeAdditionalConfigNames(ruleName, configs);
    })();

    if (typeof presets === "string") {
        if (!isPresetConfigName(presets)) {
            throw new TypeError(
                `Rule '${ruleName}' has invalid docs.presets value '${presets}'.`
            );
        }

        return {
            configs: normalizedConfigNames,
            description,
            presets,
            recommended,
            ...(isDefined(requiresTypeChecking)
                ? { requiresTypeChecking }
                : {}),
            ruleId,
            ruleNumber,
            url,
        };
    }

    if (!Array.isArray(presets)) {
        throw new TypeError(
            `Rule '${ruleName}' must declare docs.presets as a preset key or array.`
        );
    }

    const normalizedPresetNames: PresetConfigName[] = [];

    for (const candidate of presets) {
        if (typeof candidate !== "string" || !isPresetConfigName(candidate)) {
            throw new TypeError(
                `Rule '${ruleName}' has invalid docs.presets value '${String(candidate)}'.`
            );
        }

        normalizedPresetNames.push(candidate);
    }

    return {
        configs: normalizedConfigNames,
        description,
        presets: normalizedPresetNames,
        recommended,
        ...(isDefined(requiresTypeChecking) ? { requiresTypeChecking } : {}),
        ruleId,
        ruleNumber,
        url,
    };
};

/** Derive normalized docs metadata for every registered rule. */
export const deriveRuleDocsMetadataByName = <RuleName extends string>(
    rules: RuleMap<RuleName>
): RuleDocsMetadataByName<RuleName> => {
    const metadataByRuleName = {} as Record<RuleName, RuleDocsMetadata>;

    for (const ruleName of objectKeys(rules) as RuleName[]) {
        const rule = rules[ruleName];
        const ruleDocsContract = getRuleDocsContract(ruleName, rule.meta?.docs);
        const presetNames = normalizePresetNames(
            ruleName,
            ruleDocsContract.presets
        );
        const additionalConfigNames = normalizeAdditionalConfigNames(
            ruleName,
            ruleDocsContract.configs
        );

        metadataByRuleName[ruleName] = {
            additionalConfigNames,
            description: ruleDocsContract.description,
            presetNames,
            recommended: ruleDocsContract.recommended,
            ruleId: ruleDocsContract.ruleId,
            ruleNumber: ruleDocsContract.ruleNumber,
            url: ruleDocsContract.url,
        };
    }

    return metadataByRuleName;
};

/** Derive rule-to-config membership from normalized docs metadata. */
export const deriveRuleAdditionalConfigMembershipByRuleName = <
    RuleName extends string,
>(
    ruleDocsMetadataByName: RuleDocsMetadataByName<RuleName>
): Readonly<Record<RuleName, readonly AdditionalConfigName[]>> => {
    const membershipByRuleName = {} as Record<
        RuleName,
        readonly AdditionalConfigName[]
    >;

    for (const ruleName of objectKeys(ruleDocsMetadataByName) as RuleName[]) {
        membershipByRuleName[ruleName] =
            ruleDocsMetadataByName[ruleName].additionalConfigNames;
    }

    return membershipByRuleName;
};

/** Derive rule-to-preset membership from normalized docs metadata. */
export const deriveRulePresetMembershipByRuleName = <RuleName extends string>(
    ruleDocsMetadataByName: RuleDocsMetadataByName<RuleName>
): Readonly<Record<RuleName, readonly PresetConfigName[]>> => {
    const membershipByRuleName = {} as Record<
        RuleName,
        readonly PresetConfigName[]
    >;

    for (const ruleName of objectKeys(ruleDocsMetadataByName) as RuleName[]) {
        membershipByRuleName[ruleName] =
            ruleDocsMetadataByName[ruleName].presetNames;
    }

    return membershipByRuleName;
};
