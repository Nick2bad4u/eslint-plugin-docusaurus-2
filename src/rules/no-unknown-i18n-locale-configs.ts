/**
 * @packageDocumentation
 * ESLint rule implementation for `no-unknown-i18n-locale-configs`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyName,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noUnknownI18nLocaleConfigs";

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

/** Rule module for `no-unknown-i18n-locale-configs`. */
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

                    const i18nExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "i18n"
                    );
                    const i18nObject =
                        i18nExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  i18nExpression,
                                  programNode
                              );

                    if (i18nObject === null) {
                        return;
                    }

                    const localesExpression = getObjectPropertyValueByName(
                        i18nObject,
                        "locales"
                    );
                    const localesArray =
                        localesExpression === null
                            ? null
                            : getArrayExpressionFromExpressionOrIdentifier(
                                  localesExpression,
                                  programNode
                              );

                    if (localesArray === null) {
                        return;
                    }

                    const localeNames = getStaticStringArrayValues(
                        localesArray,
                        programNode
                    );

                    if (localeNames === null) {
                        return;
                    }

                    const localeConfigsExpression =
                        getObjectPropertyValueByName(
                            i18nObject,
                            "localeConfigs"
                        );
                    const localeConfigsObject =
                        localeConfigsExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  localeConfigsExpression,
                                  programNode
                              );

                    if (localeConfigsObject === null) {
                        return;
                    }

                    for (const property of localeConfigsObject.properties) {
                        if (property.type !== "Property") {
                            continue;
                        }

                        const localeName = getObjectPropertyName(property);

                        if (
                            localeName === null ||
                            localeNames.includes(localeName)
                        ) {
                            continue;
                        }

                        context.report({
                            data: {
                                localeName: `\`${localeName}\``,
                            },
                            messageId: "noUnknownI18nLocaleConfigs",
                            node: property.key,
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `i18n.localeConfigs` entries whose locale keys are not present in `i18n.locales`.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-unknown-i18n-locale-configs",
            },
            messages: {
                noUnknownI18nLocaleConfigs:
                    "`i18n.localeConfigs` key {{ localeName }} should also appear in `i18n.locales`.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-unknown-i18n-locale-configs",
    });

export default rule;
