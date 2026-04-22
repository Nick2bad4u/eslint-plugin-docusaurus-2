/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-i18n-default-locale-first`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayIncludes, arrayJoin } from "ts-extras";

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

type MessageIds = "moveDefaultLocaleFirst" | "preferI18nDefaultLocaleFirst";

const createLocalesArrayText = (locales: readonly string[]): string =>
    `[${arrayJoin(
        locales.map((locale) => JSON.stringify(locale)),
        ", "
    )}]`;

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

const getLocalesWithDefaultFirst = (
    locales: readonly string[],
    defaultLocale: string
): readonly string[] => {
    const defaultLocaleIndex = locales.indexOf(defaultLocale);

    if (defaultLocaleIndex <= 0) {
        return locales;
    }

    return [
        defaultLocale,
        ...locales.slice(0, defaultLocaleIndex),
        ...locales.slice(defaultLocaleIndex + 1),
    ];
};

const createMoveDefaultLocaleFirstSuggestion = (
    localesProperty: Readonly<TSESTree.Property>,
    localesExpression: Readonly<TSESTree.Expression>,
    orderedLocales: readonly string[]
): I18nLocaleSuggestion => ({
    fix: (fixer) => {
        const localesArrayText = createLocalesArrayText(orderedLocales);

        return localesProperty.shorthand
            ? fixer.replaceText(localesProperty, `locales: ${localesArrayText}`)
            : fixer.replaceText(localesExpression, localesArrayText);
    },
    messageId: "moveDefaultLocaleFirst",
});

/** Rule module for `prefer-i18n-default-locale-first`. */
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

                    const i18nObjectExpression =
                        getObjectExpressionPropertyValueByName(
                            configObjectExpression,
                            "i18n"
                        );

                    if (i18nObjectExpression === null) {
                        return;
                    }

                    const defaultLocaleProperty = findObjectPropertyByName(
                        i18nObjectExpression,
                        "defaultLocale"
                    );

                    if (defaultLocaleProperty === null) {
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
                        return;
                    }

                    const normalizedDefaultLocale = defaultLocaleValue.trim();

                    if (normalizedDefaultLocale.length === 0) {
                        return;
                    }

                    const localesProperty = findObjectPropertyByName(
                        i18nObjectExpression,
                        "locales"
                    );

                    if (localesProperty === null) {
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

                    if (
                        !arrayIncludes(localesValues, normalizedDefaultLocale)
                    ) {
                        return;
                    }

                    const orderedLocales = getLocalesWithDefaultFirst(
                        localesValues,
                        normalizedDefaultLocale
                    );

                    if (orderedLocales === localesValues) {
                        return;
                    }

                    if (localesExpression.type === "ArrayExpression") {
                        reportWithOptionalFix({
                            context,
                            data: {
                                defaultLocale: normalizedDefaultLocale,
                            },
                            fix: (fixer) =>
                                fixer.replaceText(
                                    localesExpression,
                                    createLocalesArrayText(orderedLocales)
                                ),
                            messageId: "preferI18nDefaultLocaleFirst",
                            node: localesExpression,
                        });

                        return;
                    }

                    context.report({
                        data: {
                            defaultLocale: normalizedDefaultLocale,
                        },
                        messageId: "preferI18nDefaultLocaleFirst",
                        node: localesExpression,
                        suggest: [
                            createMoveDefaultLocaleFirstSuggestion(
                                localesProperty,
                                localesExpression,
                                orderedLocales
                            ),
                        ],
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `i18n.locales` to place `defaultLocale` first for clearer locale-priority intent when locale order is authored statically.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-i18n-default-locale-first",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                moveDefaultLocaleFirst:
                    "Replace with a locales array that puts `defaultLocale` first.",
                preferI18nDefaultLocaleFirst:
                    "Place `defaultLocale` (`{{ defaultLocale }}`) first in `i18n.locales` for clearer locale-priority intent.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-i18n-default-locale-first",
    });

export default rule;
