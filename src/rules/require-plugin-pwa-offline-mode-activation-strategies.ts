/**
 * @packageDocumentation
 * ESLint rule implementation for `require-plugin-pwa-offline-mode-activation-strategies`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    arrayIncludes,
    arrayJoin,
    isDefined,
    isEmpty,
    not,
    setHas,
} from "ts-extras";

import {
    findObjectPropertyByName,
    findPluginConfigurationsByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const pluginPwaModuleName = "@docusaurus/plugin-pwa" as const;
const defaultRequiredStrategies = [
    "appInstalled",
    "standalone",
    "queryString",
] as const;

type Options = readonly [PwaOfflineModeActivationStrategiesRuleOption];

type PwaOfflineModeActivationStrategiesRuleOption = Readonly<{
    requiredStrategies?: string[];
}>;

const defaultOptions = [
    {
        requiredStrategies: [...defaultRequiredStrategies],
    },
] satisfies Options;

type MessageIds = "requirePluginPwaOfflineModeActivationStrategies";

type ResolvedPwaOfflineModeActivationStrategiesRuleOption = Readonly<{
    requiredStrategies: readonly string[];
}>;

const normalizeRequiredStrategies = (
    requiredStrategies: readonly string[] | undefined
): readonly string[] => {
    if (!isDefined(requiredStrategies) || isEmpty(requiredStrategies)) {
        return [...defaultRequiredStrategies];
    }

    const normalizedStrategies: string[] = [];
    const seenStrategies = new Set<string>();

    for (const candidate of requiredStrategies) {
        const normalizedCandidate = candidate.trim();

        if (
            normalizedCandidate.length === 0 ||
            setHas(seenStrategies, normalizedCandidate)
        ) {
            continue;
        }

        seenStrategies.add(normalizedCandidate);
        normalizedStrategies.push(normalizedCandidate);
    }

    return normalizedStrategies.length > 0
        ? normalizedStrategies
        : [...defaultRequiredStrategies];
};

const normalizeRuleOption = (
    option: PwaOfflineModeActivationStrategiesRuleOption
): ResolvedPwaOfflineModeActivationStrategiesRuleOption => ({
    requiredStrategies: normalizeRequiredStrategies(option?.requiredStrategies),
});

const getStaticStringArrayValues = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>,
    programNode: Readonly<TSESTree.Program>
): null | readonly string[] => {
    const values: string[] = [];

    for (const element of arrayExpression.elements) {
        if (element === null || element.type === "SpreadElement") {
            return null;
        }

        const staticValue = getStaticStringValueFromExpressionOrIdentifier(
            element,
            programNode
        );

        if (staticValue === null) {
            return null;
        }

        values.push(staticValue);
    }

    return values;
};

const getMissingRequiredStrategies = (
    configuredStrategies: readonly string[],
    requiredStrategies: readonly string[]
): readonly string[] =>
    requiredStrategies.filter(
        not((requiredStrategy) =>
            arrayIncludes(configuredStrategies, requiredStrategy)
        )
    );

const formatQuotedStrategies = (strategies: readonly string[]): string =>
    arrayJoin(
        strategies.map((strategy) => JSON.stringify(strategy)),
        ", "
    );

/** Rule module for `require-plugin-pwa-offline-mode-activation-strategies`. */
const rule: TSESLint.RuleModule<MessageIds, Options> = createTypedRule({
    create(context, [option]) {
        if (!isDocusaurusConfigFilePath(context.filename)) {
            return {};
        }

        const resolvedOption = normalizeRuleOption(option);
        const requiredStrategiesText = formatQuotedStrategies(
            resolvedOption.requiredStrategies
        );

        return {
            Program(programNode: TSESTree.Program) {
                const configObjectExpression =
                    getDefaultExportedObjectExpression(programNode);

                if (configObjectExpression === null) {
                    return;
                }

                const pluginEntries = findPluginConfigurationsByName(
                    configObjectExpression,
                    pluginPwaModuleName
                );

                if (isEmpty(pluginEntries)) {
                    return;
                }

                for (const pluginEntry of pluginEntries) {
                    if (!isDefined(pluginEntry.optionsExpression)) {
                        continue;
                    }

                    const pluginOptionsObject =
                        getObjectExpressionFromExpressionOrIdentifier(
                            pluginEntry.optionsExpression,
                            programNode
                        );

                    if (pluginOptionsObject === null) {
                        continue;
                    }

                    const strategiesProperty = findObjectPropertyByName(
                        pluginOptionsObject,
                        "offlineModeActivationStrategies"
                    );

                    if (strategiesProperty === null) {
                        context.report({
                            data: {
                                missingStrategies: requiredStrategiesText,
                            },
                            messageId:
                                "requirePluginPwaOfflineModeActivationStrategies",
                            node: pluginOptionsObject,
                        });
                        continue;
                    }

                    const strategiesExpression =
                        strategiesProperty.value as TSESTree.Expression;
                    const strategiesArrayExpression =
                        getArrayExpressionFromExpressionOrIdentifier(
                            strategiesExpression,
                            programNode
                        );

                    if (strategiesArrayExpression === null) {
                        continue;
                    }

                    const configuredStrategies = getStaticStringArrayValues(
                        strategiesArrayExpression,
                        programNode
                    );

                    if (configuredStrategies === null) {
                        continue;
                    }

                    const missingStrategies = getMissingRequiredStrategies(
                        configuredStrategies,
                        resolvedOption.requiredStrategies
                    );

                    if (isEmpty(missingStrategies)) {
                        continue;
                    }

                    context.report({
                        data: {
                            missingStrategies:
                                formatQuotedStrategies(missingStrategies),
                        },
                        messageId:
                            "requirePluginPwaOfflineModeActivationStrategies",
                        node: strategiesExpression,
                    });
                }
            },
        };
    },
    defaultOptions,
    meta: {
        defaultOptions: [
            {
                requiredStrategies: [
                    "appInstalled",
                    "standalone",
                    "queryString",
                ],
            },
        ] satisfies [PwaOfflineModeActivationStrategiesRuleOption],
        deprecated: false,
        docs: {
            description:
                "require plugin-pwa `offlineModeActivationStrategies` to include explicit activation strategies for installed, standalone, and query-string activation modes.",
            frozen: false,
            presets: [
                "config",
                "strict",
                "all",
                "experimental",
            ],
            recommended: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-offline-mode-activation-strategies",
        },
        messages: {
            requirePluginPwaOfflineModeActivationStrategies:
                "When `@docusaurus/plugin-pwa` is configured, `offlineModeActivationStrategies` should include {{ missingStrategies }}.",
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    requiredStrategies: {
                        description:
                            "Required strategy strings that must be present in `offlineModeActivationStrategies`.",
                        items: {
                            minLength: 1,
                            type: "string",
                        },
                        minItems: 1,
                        type: "array",
                        uniqueItems: true,
                    },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
    name: "require-plugin-pwa-offline-mode-activation-strategies",
});

export default rule;
