/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-i18n-locales`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayIncludes, arrayJoin, setHas } from "ts-extras";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
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

type MessageIds = "noDuplicateI18nLocales" | "replaceWithDedupedLocales";

type StaticLocaleArrayData = Readonly<{
    dedupedLocaleValues: readonly string[];
    duplicateLocaleElements: readonly TSESTree.Expression[];
    duplicateLocaleValues: readonly string[];
    localeElements: readonly TSESTree.Expression[];
}>;

const createLocaleArrayText = (locales: readonly string[]): string =>
    `[${arrayJoin(
        locales.map((locale) => JSON.stringify(locale)),
        ", "
    )}]`;

const getStaticLocaleArrayData = (
    localesArrayExpression: Readonly<TSESTree.ArrayExpression>,
    programNode: Readonly<TSESTree.Program>
): null | StaticLocaleArrayData => {
    const localeElements: TSESTree.Expression[] = [];
    const duplicateLocaleElements: TSESTree.Expression[] = [];
    const duplicateLocaleValues: string[] = [];
    const dedupedLocaleValues: string[] = [];
    const seenLocales = new Set<string>();

    for (const element of localesArrayExpression.elements) {
        if (element === null || element.type === "SpreadElement") {
            return null;
        }

        const staticLocaleValue =
            getStaticStringValueFromExpressionOrIdentifier(
                element,
                programNode
            );

        if (staticLocaleValue === null) {
            return null;
        }

        const normalizedLocaleValue = staticLocaleValue.trim();

        localeElements.push(element);

        if (setHas(seenLocales, normalizedLocaleValue)) {
            duplicateLocaleElements.push(element);

            if (!arrayIncludes(duplicateLocaleValues, normalizedLocaleValue)) {
                duplicateLocaleValues.push(normalizedLocaleValue);
            }

            continue;
        }

        seenLocales.add(normalizedLocaleValue);
        dedupedLocaleValues.push(normalizedLocaleValue);
    }

    return {
        dedupedLocaleValues,
        duplicateLocaleElements,
        duplicateLocaleValues,
        localeElements,
    };
};

const createReplaceWithDedupedLocalesSuggestion = (
    localesProperty: Readonly<TSESTree.Property>,
    localesExpression: Readonly<TSESTree.Expression>,
    dedupedLocaleValues: readonly string[]
): I18nLocaleSuggestion => ({
    fix: (fixer) => {
        const localeArrayText = createLocaleArrayText(dedupedLocaleValues);

        return localesProperty.shorthand
            ? fixer.replaceText(localesProperty, `locales: ${localeArrayText}`)
            : fixer.replaceText(localesExpression, localeArrayText);
    },
    messageId: "replaceWithDedupedLocales",
});

/** Rule module for `no-duplicate-i18n-locales`. */
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

                    const staticLocaleArrayData = getStaticLocaleArrayData(
                        localesArrayExpression,
                        programNode
                    );

                    if (staticLocaleArrayData === null) {
                        return;
                    }

                    if (
                        staticLocaleArrayData.duplicateLocaleElements.length ===
                        0
                    ) {
                        return;
                    }

                    const duplicateLocalesText = arrayJoin(
                        staticLocaleArrayData.duplicateLocaleValues.map(
                            (localeValue) => JSON.stringify(localeValue)
                        ),
                        ", "
                    );

                    if (localesExpression.type === "ArrayExpression") {
                        reportWithOptionalFix({
                            context,
                            data: {
                                duplicateLocales: duplicateLocalesText,
                            },
                            fix: (fixer) =>
                                createRemoveCommaSeparatedItemsFixes(
                                    fixer,
                                    context.sourceCode,
                                    {
                                        container: localesExpression,
                                        items: staticLocaleArrayData.localeElements,
                                        itemsToRemove:
                                            staticLocaleArrayData.duplicateLocaleElements,
                                    }
                                ),
                            messageId: "noDuplicateI18nLocales",
                            node: localesExpression,
                        });

                        return;
                    }

                    context.report({
                        data: {
                            duplicateLocales: duplicateLocalesText,
                        },
                        messageId: "noDuplicateI18nLocales",
                        node: localesExpression,
                        suggest: [
                            createReplaceWithDedupedLocalesSuggestion(
                                localesProperty,
                                localesExpression,
                                staticLocaleArrayData.dedupedLocaleValues
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
                    "disallow duplicate locale entries in `i18n.locales` when locale arrays are statically resolvable.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-i18n-locales",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                noDuplicateI18nLocales:
                    "Remove duplicate locale entries from `i18n.locales` (duplicates: {{ duplicateLocales }}).",
                replaceWithDedupedLocales:
                    "Replace with a deduplicated locales array.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-i18n-locales",
    });

export default rule;
