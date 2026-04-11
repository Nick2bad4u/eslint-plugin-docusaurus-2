/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-live-codeblock-when-live-codeblock-configured`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { hasAnyTopLevelModuleConfigurationByName } from "../_internal/docusaurus-module-config.js";
import { createInsertObjectPropertyFix } from "../_internal/object-literal-fixes.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const themeLiveCodeblockModuleName =
    "@docusaurus/theme-live-codeblock" as const;

type MessageIds =
    | "addThemeLiveCodeblockToPlugins"
    | "requireThemeLiveCodeblockWhenLiveCodeblockConfigured";
type RuleSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const createAppendModuleEntryFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    arrayExpression: Readonly<TSESTree.ArrayExpression>,
    moduleName: string
): TSESLint.RuleFix => {
    const lastElement = arrayExpression.elements.at(-1);
    const moduleText = JSON.stringify(moduleName);

    if (lastElement === undefined || lastElement === null) {
        return fixer.insertTextAfterRange(
            [arrayExpression.range[0], arrayExpression.range[0] + 1],
            moduleText
        );
    }

    return fixer.insertTextAfter(lastElement, `, ${moduleText}`);
};

const createInsertTopLevelArrayPropertyFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: "plugins",
    moduleName: string,
    sourceCode: Readonly<TSESLint.SourceCode>
): TSESLint.RuleFix => {
    const propertyText = `${propertyName}: [${JSON.stringify(moduleName)}]`;

    return createInsertObjectPropertyFix({
        fixer,
        indentation: "    ",
        objectExpression: configObjectExpression,
        propertyText,
        sourceCode,
    });
};

const createAddThemeLiveCodeblockSuggestion = (
    options: Readonly<{
        configObjectExpression: Readonly<TSESTree.ObjectExpression>;
        pluginsArrayExpression: null | Readonly<TSESTree.ArrayExpression>;
        sourceCode: Readonly<TSESLint.SourceCode>;
    }>
): null | RuleSuggestion => {
    const { configObjectExpression, pluginsArrayExpression, sourceCode } =
        options;

    if (pluginsArrayExpression !== null) {
        return {
            fix: (fixer) =>
                createAppendModuleEntryFix(
                    fixer,
                    pluginsArrayExpression,
                    themeLiveCodeblockModuleName
                ),
            messageId: "addThemeLiveCodeblockToPlugins",
        };
    }

    return findObjectPropertyByName(configObjectExpression, "plugins") === null
        ? {
              fix: (fixer) =>
                  createInsertTopLevelArrayPropertyFix(
                      fixer,
                      configObjectExpression,
                      "plugins",
                      themeLiveCodeblockModuleName,
                      sourceCode
                  ),
              messageId: "addThemeLiveCodeblockToPlugins",
          }
        : null;
};

/**
 * Rule module for
 * `require-theme-live-codeblock-when-live-codeblock-configured`.
 */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            const contextSourceCode = context.sourceCode;

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

                    const themeConfigExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "themeConfig"
                    );
                    const themeConfigObject =
                        themeConfigExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  themeConfigExpression,
                                  programNode
                              );

                    if (
                        themeConfigObject === null ||
                        getObjectPropertyValueByName(
                            themeConfigObject,
                            "liveCodeBlock"
                        ) === null ||
                        hasAnyTopLevelModuleConfigurationByName(
                            configObjectExpression,
                            themeLiveCodeblockModuleName
                        )
                    ) {
                        return;
                    }

                    const pluginsArrayExpression =
                        getArrayExpressionPropertyValueByName(
                            configObjectExpression,
                            "plugins"
                        );
                    const addThemeLiveCodeblockSuggestion =
                        createAddThemeLiveCodeblockSuggestion({
                            configObjectExpression,
                            pluginsArrayExpression,
                            sourceCode: contextSourceCode,
                        });

                    context.report({
                        messageId:
                            "requireThemeLiveCodeblockWhenLiveCodeblockConfigured",
                        node: themeConfigObject,
                        suggest:
                            addThemeLiveCodeblockSuggestion === null
                                ? null
                                : [addThemeLiveCodeblockSuggestion],
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `@docusaurus/theme-live-codeblock` when `themeConfig.liveCodeBlock` is configured.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-live-codeblock-when-live-codeblock-configured",
            },
            hasSuggestions: true,
            messages: {
                addThemeLiveCodeblockToPlugins:
                    "Add `@docusaurus/theme-live-codeblock` to the top-level `plugins` array.",
                requireThemeLiveCodeblockWhenLiveCodeblockConfigured:
                    "When `themeConfig.liveCodeBlock` is configured, also add `@docusaurus/theme-live-codeblock` so the live code block theme is enabled.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-live-codeblock-when-live-codeblock-configured",
    });

export default rule;
