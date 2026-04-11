/**
 * @packageDocumentation
 * ESLint rule implementation for `require-pages-plugin-excludes`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findClassicPresetOptionsObjects,
    findObjectPropertyByName,
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { arrayJoin } from "../_internal/runtime-utils.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const requiredPageExcludePatterns = [
    "**/*.d.ts",
    "**/*.d.tsx",
    "**/__tests__/**",
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*.spec.{js,jsx,ts,tsx}",
] as const;

type MessageIds = "requirePagesPluginExcludes";

const getStaticStringArrayValues = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>
): readonly string[] => {
    const values: string[] = [];

    for (const element of arrayExpression.elements) {
        if (element?.type === "Literal" && typeof element.value === "string") {
            values.push(element.value);
        }
    }

    return values;
};

const getMissingPageExcludePatterns = (
    existingPatterns: readonly string[]
): readonly string[] =>
    requiredPageExcludePatterns.filter(
        (requiredPattern) => !existingPatterns.includes(requiredPattern)
    );

const createMissingPatternsText = (patterns: readonly string[]): string =>
    arrayJoin(
        patterns.map((pattern) => JSON.stringify(pattern)),
        ", "
    );

const createInsertExcludePropertyFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    pagesOptionsObject: Readonly<TSESTree.ObjectExpression>,
    missingPatterns: readonly string[]
) => {
    const lastProperty = pagesOptionsObject.properties.at(-1);
    const propertyText = `exclude: [${createMissingPatternsText(missingPatterns)}]`;

    if (lastProperty === undefined) {
        return fixer.insertTextAfterRange(
            [pagesOptionsObject.range[0], pagesOptionsObject.range[0] + 1],
            propertyText
        );
    }

    return fixer.insertTextAfter(lastProperty, `, ${propertyText}`);
};

const createAppendExcludePatternsFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    excludeArrayExpression: Readonly<TSESTree.ArrayExpression>,
    missingPatterns: readonly string[]
) => {
    const lastElement = excludeArrayExpression.elements.at(-1);
    const missingPatternsText = createMissingPatternsText(missingPatterns);

    if (lastElement === undefined || lastElement === null) {
        return fixer.insertTextAfterRange(
            [
                excludeArrayExpression.range[0],
                excludeArrayExpression.range[0] + 1,
            ],
            missingPatternsText
        );
    }

    return fixer.insertTextAfter(lastElement, `, ${missingPatternsText}`);
};

/** Rule module for `require-pages-plugin-excludes`. */
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

                    for (const presetOptionsObject of findClassicPresetOptionsObjects(
                        configObjectExpression
                    )) {
                        const pagesOptionsObject =
                            getObjectExpressionPropertyValueByName(
                                presetOptionsObject,
                                "pages"
                            );

                        if (pagesOptionsObject === null) {
                            continue;
                        }

                        const includeArrayExpression =
                            getArrayExpressionPropertyValueByName(
                                pagesOptionsObject,
                                "include"
                            );

                        if (includeArrayExpression === null) {
                            continue;
                        }

                        const pathProperty = findObjectPropertyByName(
                            pagesOptionsObject,
                            "path"
                        );
                        const pathValue =
                            pathProperty === null
                                ? "src/pages"
                                : getStaticStringValue(
                                      pathProperty.value as TSESTree.Expression
                                  );

                        if (pathValue !== null && pathValue !== "src/pages") {
                            continue;
                        }

                        const excludeArrayExpression =
                            getArrayExpressionPropertyValueByName(
                                pagesOptionsObject,
                                "exclude"
                            );
                        const missingPatterns = getMissingPageExcludePatterns(
                            excludeArrayExpression === null
                                ? []
                                : getStaticStringArrayValues(
                                      excludeArrayExpression
                                  )
                        );

                        if (missingPatterns.length === 0) {
                            continue;
                        }

                        reportWithOptionalFix({
                            context,
                            data: {
                                missingPatterns: missingPatterns.join(", "),
                            },
                            fix(fixer) {
                                return excludeArrayExpression === null
                                    ? createInsertExcludePropertyFix(
                                          fixer,
                                          pagesOptionsObject,
                                          missingPatterns
                                      )
                                    : createAppendExcludePatternsFix(
                                          fixer,
                                          excludeArrayExpression,
                                          missingPatterns
                                      );
                            },
                            messageId: "requirePagesPluginExcludes",
                            node: includeArrayExpression,
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            docs: {
                description:
                    "require explicit `pages.exclude` patterns when Docusaurus classic preset pages config customizes `include`.",
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-pages-plugin-excludes",
            },
            fixable: "code",
            messages: {
                requirePagesPluginExcludes:
                    "When `pages.include` is customized, also configure `pages.exclude` so declarations and test helpers under `src/pages` do not become routes. Missing patterns: {{ missingPatterns }}.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-pages-plugin-excludes",
    });

export default rule;
