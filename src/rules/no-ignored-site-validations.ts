/**
 * @packageDocumentation
 * ESLint rule implementation for `no-ignored-site-validations`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findNestedObjectPropertyByNamePath,
    getDefaultExportedObjectExpression,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "avoidIgnoredValidation";

type ValidationSetting = Readonly<{
    defaultSeverity: ValidationSeverity;
    propertyNamePath: readonly string[];
    settingName: string;
}>;

type ValidationSeverity = "throw" | "warn";

const validationSettings = [
    {
        defaultSeverity: "throw",
        propertyNamePath: ["onBrokenLinks"],
        settingName: "onBrokenLinks",
    },
    {
        defaultSeverity: "warn",
        propertyNamePath: ["onBrokenAnchors"],
        settingName: "onBrokenAnchors",
    },
    {
        defaultSeverity: "warn",
        propertyNamePath: ["onDuplicateRoutes"],
        settingName: "onDuplicateRoutes",
    },
    {
        defaultSeverity: "warn",
        propertyNamePath: [
            "markdown",
            "hooks",
            "onBrokenMarkdownLinks",
        ],
        settingName: "markdown.hooks.onBrokenMarkdownLinks",
    },
    {
        defaultSeverity: "throw",
        propertyNamePath: [
            "markdown",
            "hooks",
            "onBrokenMarkdownImages",
        ],
        settingName: "markdown.hooks.onBrokenMarkdownImages",
    },
] as const satisfies readonly ValidationSetting[];

/** Rule module for `no-ignored-site-validations`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                Program(programNode: TSESTree.Program) {
                    const configObjectExpression =
                        getDefaultExportedObjectExpression(programNode);

                    if (configObjectExpression === null) {
                        return;
                    }

                    for (const validationSetting of validationSettings) {
                        const property = findNestedObjectPropertyByNamePath(
                            configObjectExpression,
                            validationSetting.propertyNamePath
                        );

                        if (property === null) {
                            continue;
                        }

                        const propertyValue = getStaticStringValue(
                            property.value as TSESTree.Expression
                        );

                        if (propertyValue !== "ignore") {
                            continue;
                        }

                        reportWithOptionalFix({
                            context,
                            data: {
                                defaultSeverity:
                                    validationSetting.defaultSeverity,
                                settingName: validationSetting.settingName,
                            },
                            fix(fixer) {
                                return fixer.replaceText(
                                    property.value,
                                    JSON.stringify(
                                        validationSetting.defaultSeverity
                                    )
                                );
                            },
                            messageId: "avoidIgnoredValidation",
                            node: property.value,
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            docs: {
                description:
                    "disallow `ignore` severities for Docusaurus site validation settings.",
                presets: [
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-ignored-site-validations",
            },
            fixable: "code",
            messages: {
                avoidIgnoredValidation:
                    'Do not set `{{ settingName }}` to `"ignore"`; Docusaurus would silently skip that site validation. Use `"{{ defaultSeverity }}"` or another non-ignore severity instead.',
            },
            schema: [],
            type: "problem",
        },
        name: "no-ignored-site-validations",
    });

export default rule;
