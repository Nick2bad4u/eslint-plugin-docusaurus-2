/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-config-docsearch-config`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    algoliaThemeConfigPropertyName,
    docsearchThemeConfigPropertyName,
    getThemeConfigSearchProperties,
    requiredDocsearchOptionNames,
    type SearchThemeConfigPropertyName,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireThemeConfigDocsearchConfig";

const createThemeConfigSearchKeyLabel = (
    propertyName: SearchThemeConfigPropertyName
): string => `themeConfig.${propertyName}`;

const hasValidRequiredOptionValue = (
    property: Readonly<TSESTree.Property>
): boolean => {
    const propertyValue = property.value as TSESTree.Expression;

    if (propertyValue.type === "Literal") {
        return (
            typeof propertyValue.value === "string" &&
            propertyValue.value.trim().length > 0
        );
    }

    const staticStringValue = getStaticStringValue(propertyValue);

    return staticStringValue === null || staticStringValue.trim().length > 0;
};

const getMissingRequiredDocsearchOptionNames = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): readonly string[] => {
    const missingOptionNames: string[] = [];

    for (const optionName of requiredDocsearchOptionNames) {
        const property = findObjectPropertyByName(objectExpression, optionName);

        if (property === null || !hasValidRequiredOptionValue(property)) {
            missingOptionNames.push(optionName);
        }
    }

    return missingOptionNames;
};

/** Rule module for `require-theme-config-docsearch-config`. */
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

                    const { algoliaProperty, docsearchProperty } =
                        getThemeConfigSearchProperties(
                            configObjectExpression,
                            programNode
                        );

                    if (
                        algoliaProperty !== null &&
                        docsearchProperty !== null
                    ) {
                        return;
                    }

                    const searchConfigProperty =
                        docsearchProperty ?? algoliaProperty;

                    if (
                        searchConfigProperty?.value.type !== "ObjectExpression"
                    ) {
                        return;
                    }

                    const missingOptionNames =
                        getMissingRequiredDocsearchOptionNames(
                            searchConfigProperty.value
                        );

                    if (missingOptionNames.length === 0) {
                        return;
                    }

                    const searchConfigKeyLabel =
                        createThemeConfigSearchKeyLabel(
                            docsearchProperty === null
                                ? algoliaThemeConfigPropertyName
                                : docsearchThemeConfigPropertyName
                        );

                    context.report({
                        data: {
                            missingKeys: missingOptionNames
                                .map((optionName) => `\`${optionName}\``)
                                .join(", "),
                            searchConfigKey: searchConfigKeyLabel,
                        },
                        messageId: "requireThemeConfigDocsearchConfig",
                        node: searchConfigProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `themeConfig.docsearch` or the legacy `themeConfig.algolia` alias to declare non-empty `appId`, `apiKey`, and `indexName` values.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-docsearch-config",
            },
            messages: {
                requireThemeConfigDocsearchConfig:
                    "{{ searchConfigKey }} should declare non-empty `appId`, `apiKey`, and `indexName` values. Missing or invalid keys: {{ missingKeys }}.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-config-docsearch-config",
    });

export default rule;
