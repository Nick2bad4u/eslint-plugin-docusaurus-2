/**
 * @packageDocumentation
 * ESLint rule implementation for `require-site-config-fields`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayFirst, isDefined, setHas } from "ts-extras";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type Options = readonly [SiteConfigFieldsRuleOption];

type SiteConfigFieldsRuleOption = Readonly<{
    requiredBooleanFields: string[];
    requiredReportingSeverityFields: string[];
    requiredStringFields: string[];
}>;

const defaultOptions: Options = [
    {
        requiredBooleanFields: ["baseUrlIssueBanner"],
        requiredReportingSeverityFields: [
            "onBrokenAnchors",
            "onBrokenLinks",
            "onDuplicateRoutes",
        ],
        requiredStringFields: [
            "baseUrl",
            "deploymentBranch",
            "favicon",
            "organizationName",
            "projectName",
        ],
    },
] as const;

type MessageIds =
    | "requireBooleanConfigField"
    | "requireReportingSeverityConfigField"
    | "requireStringConfigField";

const reportingSeverities = new Set([
    "ignore",
    "log",
    "throw",
    "warn",
]);

const hasPresentBooleanValue = (
    expression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (expression === null) {
        return false;
    }

    const staticValue = getStaticBooleanValueFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (staticValue === null) {
        return false;
    }

    if (isDefined(staticValue)) {
        return true;
    }

    return expression.type !== "Literal" && expression.type !== "Identifier";
};

const hasPresentReportingSeverityValue = (
    expression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (expression === null) {
        return false;
    }

    const staticValue = getStaticStringValueFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (staticValue !== null) {
        return setHas(reportingSeverities, staticValue);
    }

    return expression.type !== "Literal";
};

const hasPresentStringValue = (
    expression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (expression === null) {
        return false;
    }

    const staticValue = getStaticStringValueFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (staticValue !== null) {
        return staticValue.trim().length > 0;
    }

    return expression.type !== "Literal";
};

/** Rule module for `require-site-config-fields`. */
const rule: TSESLint.RuleModule<MessageIds, Options> = createTypedRule({
    create(context, [options]) {
        if (!isDocusaurusConfigFilePath(context.filename)) {
            return {};
        }

        const resolvedOptions = options ?? arrayFirst(defaultOptions);

        return {
            Program(programNode: TSESTree.Program) {
                const configObjectExpression =
                    getDefaultExportedObjectExpression(programNode);

                if (configObjectExpression === null) {
                    return;
                }

                for (const fieldName of resolvedOptions.requiredStringFields) {
                    const property = findObjectPropertyByName(
                        configObjectExpression,
                        fieldName
                    );
                    const expression = getObjectPropertyValueByName(
                        configObjectExpression,
                        fieldName
                    );

                    if (
                        hasPresentStringValue(expression ?? null, programNode)
                    ) {
                        continue;
                    }

                    context.report({
                        data: { fieldName },
                        messageId: "requireStringConfigField",
                        node: property?.value ?? configObjectExpression,
                    });
                }

                for (const fieldName of resolvedOptions.requiredBooleanFields) {
                    const property = findObjectPropertyByName(
                        configObjectExpression,
                        fieldName
                    );
                    const expression = getObjectPropertyValueByName(
                        configObjectExpression,
                        fieldName
                    );

                    if (
                        hasPresentBooleanValue(expression ?? null, programNode)
                    ) {
                        continue;
                    }

                    context.report({
                        data: { fieldName },
                        messageId: "requireBooleanConfigField",
                        node: property?.value ?? configObjectExpression,
                    });
                }

                for (const fieldName of resolvedOptions.requiredReportingSeverityFields) {
                    const property = findObjectPropertyByName(
                        configObjectExpression,
                        fieldName
                    );
                    const expression = getObjectPropertyValueByName(
                        configObjectExpression,
                        fieldName
                    );

                    if (
                        hasPresentReportingSeverityValue(
                            expression ?? null,
                            programNode
                        )
                    ) {
                        continue;
                    }

                    context.report({
                        data: { fieldName },
                        messageId: "requireReportingSeverityConfigField",
                        node: property?.value ?? configObjectExpression,
                    });
                }
            },
        };
    },
    defaultOptions,
    meta: {
        defaultOptions: [
            {
                requiredBooleanFields: ["baseUrlIssueBanner"],
                requiredReportingSeverityFields: [
                    "onBrokenAnchors",
                    "onBrokenLinks",
                    "onDuplicateRoutes",
                ],
                requiredStringFields: [
                    "baseUrl",
                    "deploymentBranch",
                    "favicon",
                    "organizationName",
                    "projectName",
                ],
            },
        ],
        deprecated: false,
        docs: {
            description:
                "require explicit top-level Docusaurus site config fields for deployment, asset loading, and site validation behavior.",
            frozen: false,
            presets: [
                "config",
                "strict",
                "all",
                "experimental",
            ],
            recommended: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-site-config-fields",
        },
        messages: {
            requireBooleanConfigField:
                "Configure `{{ fieldName }}` explicitly with `true` or `false` in `docusaurus.config.*`.",
            requireReportingSeverityConfigField:
                "Configure `{{ fieldName }}` explicitly with one of Docusaurus' reporting severities (`ignore`, `log`, `warn`, or `throw`).",
            requireStringConfigField:
                "Configure `{{ fieldName }}` explicitly with a non-empty string in `docusaurus.config.*`.",
        },
        schema: [
            {
                additionalProperties: false,
                description:
                    "Customize which top-level Docusaurus site config fields must be configured explicitly.",
                properties: {
                    requiredBooleanFields: {
                        description:
                            "Top-level config fields that should be present as booleans.",
                        items: {
                            description: "A required boolean field name.",
                            type: "string",
                        },
                        type: "array",
                    },
                    requiredReportingSeverityFields: {
                        description:
                            "Top-level config fields that should be present as Docusaurus reporting severities.",
                        items: {
                            description:
                                "A required reporting-severity field name.",
                            type: "string",
                        },
                        type: "array",
                    },
                    requiredStringFields: {
                        description:
                            "Top-level config fields that should be present as non-empty strings.",
                        items: {
                            description: "A required string field name.",
                            type: "string",
                        },
                        type: "array",
                    },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
    name: "require-site-config-fields",
});

export default rule;
