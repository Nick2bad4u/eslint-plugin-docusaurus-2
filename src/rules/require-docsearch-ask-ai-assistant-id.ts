/**
 * @packageDocumentation
 * ESLint rule implementation for `require-docsearch-ask-ai-assistant-id`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getThemeConfigSearchProperties } from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireDocsearchAskAiAssistantId";

/** Rule module for `require-docsearch-ask-ai-assistant-id`. */
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
                        getThemeConfigSearchProperties(configObjectExpression);
                    const searchConfigProperty =
                        docsearchProperty ?? algoliaProperty;

                    if (
                        searchConfigProperty === null ||
                        searchConfigProperty.value.type !== "ObjectExpression"
                    ) {
                        return;
                    }

                    const askAiExpression = getObjectPropertyValueByName(
                        searchConfigProperty.value,
                        "askAi"
                    );

                    if (askAiExpression === null) {
                        return;
                    }

                    const askAiStringValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            askAiExpression,
                            programNode
                        );

                    if (askAiStringValue !== null) {
                        if (askAiStringValue.trim().length > 0) {
                            return;
                        }

                        context.report({
                            messageId: "requireDocsearchAskAiAssistantId",
                            node: askAiExpression,
                        });

                        return;
                    }

                    if (askAiExpression.type !== "ObjectExpression") {
                        return;
                    }

                    const assistantIdProperty = findObjectPropertyByName(
                        askAiExpression,
                        "assistantId"
                    );

                    if (assistantIdProperty === null) {
                        context.report({
                            messageId: "requireDocsearchAskAiAssistantId",
                            node: askAiExpression,
                        });

                        return;
                    }

                    const assistantIdValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            assistantIdProperty.value as TSESTree.Expression,
                            programNode
                        );

                    if (
                        assistantIdValue !== null &&
                        assistantIdValue.trim().length === 0
                    ) {
                        context.report({
                            messageId: "requireDocsearchAskAiAssistantId",
                            node: assistantIdProperty.value,
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
                    "require a non-empty Ask AI assistant id when `themeConfig.algolia.askAi` or `themeConfig.docsearch.askAi` is configured.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-docsearch-ask-ai-assistant-id",
            },
            messages: {
                requireDocsearchAskAiAssistantId:
                    "Ask AI config should provide a non-empty assistant id, either as a string value or as `askAi.assistantId`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-docsearch-ask-ai-assistant-id",
    });

export default rule;
