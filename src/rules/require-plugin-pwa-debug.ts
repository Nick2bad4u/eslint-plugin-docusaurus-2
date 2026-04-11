/**
 * @packageDocumentation
 * ESLint rule implementation for `require-plugin-pwa-debug`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    findPluginConfigurationsByName,
    getDefaultExportedObjectExpression,
    getExpressionFromExpressionOrIdentifier,
    getObjectExpressionFromExpressionOrIdentifier,
    getStaticBooleanValueFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    createTypedRule,
    isGlobalIdentifierNamed,
} from "../_internal/typed-rule.js";

const pluginPwaModuleName = "@docusaurus/plugin-pwa" as const;

const defaultAllowedEnvVarNames = ["DOCUSAURUS_PWA_DEBUG"] as const;

type Options = readonly [PwaDebugRuleOption];

type PwaDebugRuleOption = Readonly<{
    allowBooleanLiteralTrue?: boolean;
    allowedEnvVarNames?: string[];
}>;

const defaultOptions: Options = [
    {
        allowBooleanLiteralTrue: true,
        allowedEnvVarNames: [...defaultAllowedEnvVarNames],
    },
];

type MessageIds = "requirePluginPwaDebug" | "requirePluginPwaDebugValue";

type ResolvedPwaDebugRuleOption = Readonly<{
    allowBooleanLiteralTrue: boolean;
    allowedEnvVarNames: readonly string[];
}>;

const normalizeAllowedEnvVarNames = (
    allowedEnvVarNames: readonly string[] | undefined
): readonly string[] => {
    if (allowedEnvVarNames === undefined || allowedEnvVarNames.length === 0) {
        return [...defaultAllowedEnvVarNames];
    }

    const normalizedNames: string[] = [];
    const seenNames = new Set<string>();

    for (const candidate of allowedEnvVarNames) {
        const normalizedCandidate = candidate.trim();

        if (
            normalizedCandidate.length === 0 ||
            seenNames.has(normalizedCandidate)
        ) {
            continue;
        }

        seenNames.add(normalizedCandidate);
        normalizedNames.push(normalizedCandidate);
    }

    return normalizedNames.length > 0
        ? normalizedNames
        : [...defaultAllowedEnvVarNames];
};

const normalizeRuleOption = (
    option: PwaDebugRuleOption
): ResolvedPwaDebugRuleOption => ({
    allowBooleanLiteralTrue: option?.allowBooleanLiteralTrue ?? true,
    allowedEnvVarNames: normalizeAllowedEnvVarNames(option?.allowedEnvVarNames),
});

const unwrapTransparentExpression = (
    expression: Readonly<TSESTree.Expression>
): Readonly<TSESTree.Expression> => {
    if (expression.type === "TSAsExpression") {
        return unwrapTransparentExpression(expression.expression);
    }

    if (expression.type === "TSSatisfiesExpression") {
        return unwrapTransparentExpression(expression.expression);
    }

    if (expression.type === "TSTypeAssertion") {
        return unwrapTransparentExpression(expression.expression);
    }

    return expression;
};

const getMemberExpressionPropertyName = (
    memberExpression: Readonly<TSESTree.MemberExpression>,
    programNode: Readonly<TSESTree.Program>
): null | string => {
    if (!memberExpression.computed) {
        return memberExpression.property.type === "Identifier"
            ? memberExpression.property.name
            : null;
    }

    return getStaticStringValueFromExpressionOrIdentifier(
        memberExpression.property,
        programNode
    );
};

const getProcessEnvVariableName = (
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): null | string => {
    const resolvedExpression = getExpressionFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (resolvedExpression === null) {
        return null;
    }

    const normalizedExpression =
        unwrapTransparentExpression(resolvedExpression);

    if (normalizedExpression.type !== "MemberExpression") {
        return null;
    }

    const environmentObjectExpression = normalizedExpression.object;

    if (environmentObjectExpression.type !== "MemberExpression") {
        return null;
    }

    const processIdentifier = environmentObjectExpression.object;

    if (
        processIdentifier.type !== "Identifier" ||
        !isGlobalIdentifierNamed(context, processIdentifier, "process")
    ) {
        return null;
    }

    if (
        getMemberExpressionPropertyName(
            environmentObjectExpression,
            programNode
        ) !== "env"
    ) {
        return null;
    }

    return getMemberExpressionPropertyName(normalizedExpression, programNode);
};

const isTrueStringExpression = (
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean =>
    getStaticStringValueFromExpressionOrIdentifier(expression, programNode) ===
    "true";

const hasAllowedEnvironmentComparison = (
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>,
    allowedEnvVarNameSet: ReadonlySet<string>
): boolean => {
    const resolvedExpression = getExpressionFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (resolvedExpression === null) {
        return false;
    }

    const normalizedExpression =
        unwrapTransparentExpression(resolvedExpression);

    if (normalizedExpression.type !== "BinaryExpression") {
        return false;
    }

    if (
        normalizedExpression.operator !== "==" &&
        normalizedExpression.operator !== "==="
    ) {
        return false;
    }

    const leftVariableName = getProcessEnvVariableName(
        context,
        normalizedExpression.left,
        programNode
    );
    const rightVariableName = getProcessEnvVariableName(
        context,
        normalizedExpression.right,
        programNode
    );

    return (
        (leftVariableName !== null &&
            allowedEnvVarNameSet.has(leftVariableName) &&
            isTrueStringExpression(normalizedExpression.right, programNode)) ||
        (rightVariableName !== null &&
            allowedEnvVarNameSet.has(rightVariableName) &&
            isTrueStringExpression(normalizedExpression.left, programNode))
    );
};

const hasAllowedDebugExpression = (
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>,
    options: ResolvedPwaDebugRuleOption
): boolean => {
    if (options.allowBooleanLiteralTrue) {
        const staticBooleanValue =
            getStaticBooleanValueFromExpressionOrIdentifier(
                expression,
                programNode
            );

        if (staticBooleanValue === true) {
            return true;
        }
    }

    return hasAllowedEnvironmentComparison(
        context,
        expression,
        programNode,
        new Set(options.allowedEnvVarNames)
    );
};

/** Rule module for `require-plugin-pwa-debug`. */
const rule: TSESLint.RuleModule<MessageIds, Options> = createTypedRule({
    create(context, [option]) {
        if (!isDocusaurusConfigFilePath(context.filename)) {
            return {};
        }

        const resolvedOption = normalizeRuleOption(option);
        const exampleEnvVarName =
            resolvedOption.allowedEnvVarNames[0] ??
            defaultAllowedEnvVarNames[0];

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

                if (pluginEntries.length === 0) {
                    return;
                }

                for (const pluginEntry of pluginEntries) {
                    if (pluginEntry.optionsExpression === undefined) {
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

                    const debugProperty = findObjectPropertyByName(
                        pluginOptionsObject,
                        "debug"
                    );

                    if (debugProperty === null) {
                        context.report({
                            data: {
                                envVarName: exampleEnvVarName,
                            },
                            messageId: "requirePluginPwaDebug",
                            node: pluginOptionsObject,
                        });
                        continue;
                    }

                    const debugValue =
                        debugProperty.value as TSESTree.Expression;

                    if (
                        hasAllowedDebugExpression(
                            context,
                            debugValue,
                            programNode,
                            resolvedOption
                        )
                    ) {
                        continue;
                    }

                    context.report({
                        data: {
                            envVarName: exampleEnvVarName,
                        },
                        messageId: "requirePluginPwaDebugValue",
                        node: debugValue,
                    });
                }
            },
        };
    },
    defaultOptions,
    meta: {
        defaultOptions: [
            {
                allowBooleanLiteralTrue: true,
                allowedEnvVarNames: ["DOCUSAURUS_PWA_DEBUG"],
            },
        ] as [PwaDebugRuleOption],
        deprecated: false,
        docs: {
            description:
                "require plugin-pwa `debug` to be explicitly enabled (`true`) or gated by an allowed environment flag expression.",
            frozen: false,
            presets: [
                "config",
                "strict",
                "all",
                "experimental",
            ],
            recommended: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-debug",
        },
        messages: {
            requirePluginPwaDebug:
                'When `@docusaurus/plugin-pwa` uses object options, configure `debug` as `true` or an env-flag expression like `process.env["{{ envVarName }}"] === "true"`.',
            requirePluginPwaDebugValue:
                '`@docusaurus/plugin-pwa` `debug` must be `true` or compare an allowed env var to `"true"` (for example `process.env["{{ envVarName }}"] === "true"`).',
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allowBooleanLiteralTrue: {
                        description:
                            "Whether `debug: true` is accepted in addition to env-var comparisons.",
                        type: "boolean",
                    },
                    allowedEnvVarNames: {
                        description:
                            'Environment variable names that may be compared to "true" in the `debug` expression.',
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
    name: "require-plugin-pwa-debug",
});

export default rule;
