/**
 * @packageDocumentation
 * ESLint rule implementation for `require-i18n-default-locale-in-locales`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type I18nLocaleSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

type MessageIds =
    | "addDefaultLocaleToLocales"
    | "requireI18nDefaultLocale"
    | "requireI18nDefaultLocaleInLocales";

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === "Literal" ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const getStaticLocaleArrayValues = (
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

        values.push(staticValue.trim());
    }

    return values;
};

const createLocalesArrayText = (locales: readonly string[]): string =>
    `[${locales.map((locale) => JSON.stringify(locale)).join(", ")}]`;

const createInsertLocalesPropertyFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    i18nObject: Readonly<TSESTree.ObjectExpression>,
    defaultLocale: string
): TSESLint.RuleFix => {
    const lastProperty = i18nObject.properties.at(-1);
    const localesPropertyText = `locales: [${JSON.stringify(defaultLocale)}]`;

    if (lastProperty === undefined) {
        return fixer.insertTextAfterRange(
            [i18nObject.range[0], i18nObject.range[0] + 1],
            localesPropertyText
        );
    }

    return fixer.insertTextAfter(lastProperty, `, ${localesPropertyText}`);
};

const createAppendDefaultLocaleFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    localesArrayExpression: Readonly<TSESTree.ArrayExpression>,
    defaultLocale: string
): TSESLint.RuleFix => {
    const defaultLocaleText = JSON.stringify(defaultLocale);
    const lastElement = localesArrayExpression.elements.at(-1);

    if (lastElement === undefined || lastElement === null) {
        return fixer.insertTextAfterRange(
            [
                localesArrayExpression.range[0],
                localesArrayExpression.range[0] + 1,
            ],
            defaultLocaleText
        );
    }

    return fixer.insertTextAfter(lastElement, `, ${defaultLocaleText}`);
};

const createAddDefaultLocaleSuggestion = (
    localesProperty: Readonly<TSESTree.Property>,
    expression: Readonly<TSESTree.Expression>,
    locales: readonly string[]
): I18nLocaleSuggestion => ({
    fix: (fixer) => {
        const localesArrayText = createLocalesArrayText(locales);

        return localesProperty.shorthand
            ? fixer.replaceText(localesProperty, `locales: ${localesArrayText}`)
            : fixer.replaceText(expression, localesArrayText);
    },
    messageId: "addDefaultLocaleToLocales",
});

/** Rule module for `require-i18n-default-locale-in-locales`. */
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

                    const i18nObject = getObjectExpressionPropertyValueByName(
                        configObjectExpression,
                        "i18n"
                    );

                    if (i18nObject === null) {
                        return;
                    }

                    const defaultLocaleProperty = findObjectPropertyByName(
                        i18nObject,
                        "defaultLocale"
                    );

                    if (defaultLocaleProperty === null) {
                        context.report({
                            messageId: "requireI18nDefaultLocale",
                            node: i18nObject,
                        });

                        return;
                    }

                    const defaultLocaleExpression =
                        defaultLocaleProperty.value as TSESTree.Expression;
                    const defaultLocaleValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            defaultLocaleExpression,
                            programNode
                        );

                    if (defaultLocaleValue === null) {
                        if (
                            !isStaticLiteralLikeExpression(
                                defaultLocaleExpression
                            )
                        ) {
                            return;
                        }

                        context.report({
                            messageId: "requireI18nDefaultLocale",
                            node: defaultLocaleExpression,
                        });

                        return;
                    }

                    const normalizedDefaultLocale = defaultLocaleValue.trim();

                    if (normalizedDefaultLocale.length === 0) {
                        context.report({
                            messageId: "requireI18nDefaultLocale",
                            node: defaultLocaleExpression,
                        });

                        return;
                    }

                    const localesProperty = findObjectPropertyByName(
                        i18nObject,
                        "locales"
                    );

                    if (localesProperty === null) {
                        reportWithOptionalFix({
                            context,
                            data: {
                                defaultLocale: normalizedDefaultLocale,
                            },
                            fix: (fixer) =>
                                createInsertLocalesPropertyFix(
                                    fixer,
                                    i18nObject,
                                    normalizedDefaultLocale
                                ),
                            messageId: "requireI18nDefaultLocaleInLocales",
                            node: i18nObject,
                        });

                        return;
                    }

                    const localesExpression =
                        localesProperty.value as TSESTree.Expression;
                    const localesArrayExpression =
                        getArrayExpressionFromExpressionOrIdentifier(
                            localesExpression,
                            programNode
                        );

                    if (localesArrayExpression === null) {
                        return;
                    }

                    const localesValues = getStaticLocaleArrayValues(
                        localesArrayExpression,
                        programNode
                    );

                    if (localesValues === null) {
                        return;
                    }

                    if (localesValues.includes(normalizedDefaultLocale)) {
                        return;
                    }

                    const nextLocalesValues = [
                        ...localesValues,
                        normalizedDefaultLocale,
                    ];

                    if (localesExpression.type === "ArrayExpression") {
                        reportWithOptionalFix({
                            context,
                            data: {
                                defaultLocale: normalizedDefaultLocale,
                            },
                            fix: (fixer) =>
                                createAppendDefaultLocaleFix(
                                    fixer,
                                    localesExpression,
                                    normalizedDefaultLocale
                                ),
                            messageId: "requireI18nDefaultLocaleInLocales",
                            node: localesExpression,
                        });

                        return;
                    }

                    const suggestions = [
                        createAddDefaultLocaleSuggestion(
                            localesProperty,
                            localesExpression,
                            nextLocalesValues
                        ),
                    ];

                    context.report({
                        data: {
                            defaultLocale: normalizedDefaultLocale,
                        },
                        messageId: "requireI18nDefaultLocaleInLocales",
                        node: localesExpression,
                        suggest: suggestions,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `i18n.locales` to include `i18n.defaultLocale` when i18n config is declared.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-i18n-default-locale-in-locales",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                addDefaultLocaleToLocales:
                    "Replace with an explicit locales array that includes `defaultLocale`.",
                requireI18nDefaultLocale:
                    "Configure `i18n.defaultLocale` as a non-empty locale string when `i18n` config is declared.",
                requireI18nDefaultLocaleInLocales:
                    "Ensure `i18n.locales` includes the `defaultLocale` value (`{{ defaultLocale }}`).",
            },
            schema: [],
            type: "problem",
        },
        name: "require-i18n-default-locale-in-locales",
    });

export default rule;
