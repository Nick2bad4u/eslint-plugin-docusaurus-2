/**
 * @packageDocumentation
 * ESLint rule implementation for `require-pages-plugin-excludes`.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import {
    arrayAt,
    arrayFirst,
    arrayIncludes,
    arrayJoin,
    isEmpty,
    isPresent,
    not,
} from "ts-extras";

import {
    findClassicPresetOptionsObjects,
    findObjectPropertyByName,
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueExpression,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const requiredPageExcludePatterns = [
    "**/*.d.ts",
    "**/*.d.tsx",
    "**/*.spec.{js,jsx,ts,tsx}",
    "**/*.test.{js,jsx,ts,tsx}",
    "**/__tests__/**",
] as const;

type MessageIds = "requirePagesPluginExcludes";

const getPageExcludePatternFixPriority = (pattern: string): number => {
    if (pattern === "**/*.d.ts") {
        return 1;
    }

    if (pattern === "**/*.d.tsx") {
        return 2;
    }

    if (pattern === "**/__tests__/**") {
        return 3;
    }

    if (pattern === "**/*.test.{js,jsx,ts,tsx}") {
        return 4;
    }

    if (pattern === "**/*.spec.{js,jsx,ts,tsx}") {
        return 5;
    }

    return Number.MAX_SAFE_INTEGER;
};

const getStaticStringArrayValues = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>
): readonly string[] => {
    const values: string[] = [];

    for (const element of arrayExpression.elements) {
        if (
            element?.type === AST_NODE_TYPES.Literal &&
            typeof element.value === "string"
        ) {
            values.push(element.value);
        }
    }

    return values;
};

const getMissingPageExcludePatterns = (
    existingPatterns: readonly string[]
): readonly string[] =>
    requiredPageExcludePatterns.filter(
        not((requiredPattern) =>
            arrayIncludes(existingPatterns, requiredPattern)
        )
    );

const createMissingPatternsText = (patterns: readonly string[]): string =>
    arrayJoin(
        patterns
            .toSorted(
                (leftPattern, rightPattern) =>
                    getPageExcludePatternFixPriority(leftPattern) -
                    getPageExcludePatternFixPriority(rightPattern)
            )
            .map((pattern) => JSON.stringify(pattern)),
        ", "
    );

const createInsertExcludePropertyFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    pagesOptionsObject: Readonly<TSESTree.ObjectExpression>,
    missingPatterns: readonly string[]
) => {
    const lastProperty = arrayAt(pagesOptionsObject.properties, -1);
    const propertyText = `exclude: [${createMissingPatternsText(missingPatterns)}]`;

    if (lastProperty === undefined) {
        return fixer.insertTextAfterRange(
            [
                arrayFirst(pagesOptionsObject.range),
                arrayFirst(pagesOptionsObject.range) + 1,
            ],
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
    const lastElement = arrayAt(excludeArrayExpression.elements, -1);
    const missingPatternsText = createMissingPatternsText(missingPatterns);

    if (!isPresent(lastElement)) {
        return fixer.insertTextAfterRange(
            [
                arrayFirst(excludeArrayExpression.range),
                arrayFirst(excludeArrayExpression.range) + 1,
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
                                      getObjectPropertyValueExpression(
                                          pathProperty
                                      )
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

                        if (isEmpty(missingPatterns)) {
                            continue;
                        }

                        reportWithOptionalFix({
                            context,
                            data: {
                                missingPatterns: arrayJoin(
                                    missingPatterns,
                                    ", "
                                ),
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
