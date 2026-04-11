/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-mermaid-when-markdown-mermaid-enabled`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { hasAnyTopLevelModuleConfigurationByName } from "../_internal/docusaurus-module-config.js";
import { createInsertObjectPropertyFix } from "../_internal/object-literal-fixes.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const themeMermaidModuleName = "@docusaurus/theme-mermaid" as const;

type MessageIds =
    | "addThemeMermaidToThemes"
    | "requireThemeMermaidWhenMarkdownMermaidEnabled";
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
    propertyName: "themes",
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

const createAddThemeMermaidSuggestion = (
    options: Readonly<{
        configObjectExpression: Readonly<TSESTree.ObjectExpression>;
        sourceCode: Readonly<TSESLint.SourceCode>;
        themesArrayExpression: null | Readonly<TSESTree.ArrayExpression>;
    }>
): null | RuleSuggestion => {
    const { configObjectExpression, sourceCode, themesArrayExpression } =
        options;

    if (themesArrayExpression !== null) {
        return {
            fix: (fixer) =>
                createAppendModuleEntryFix(
                    fixer,
                    themesArrayExpression,
                    themeMermaidModuleName
                ),
            messageId: "addThemeMermaidToThemes",
        };
    }

    return findObjectPropertyByName(configObjectExpression, "themes") === null
        ? {
              fix: (fixer) =>
                  createInsertTopLevelArrayPropertyFix(
                      fixer,
                      configObjectExpression,
                      "themes",
                      themeMermaidModuleName,
                      sourceCode
                  ),
              messageId: "addThemeMermaidToThemes",
          }
        : null;
};

/** Rule module for `require-theme-mermaid-when-markdown-mermaid-enabled`. */
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

                    const markdownExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "markdown"
                    );
                    const markdownObject =
                        markdownExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  markdownExpression,
                                  programNode
                              );

                    if (markdownObject === null) {
                        return;
                    }

                    const mermaidExpression = getObjectPropertyValueByName(
                        markdownObject,
                        "mermaid"
                    );

                    if (mermaidExpression === null) {
                        return;
                    }

                    const mermaidEnabled =
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            mermaidExpression,
                            programNode
                        );

                    if (
                        mermaidEnabled !== true ||
                        hasAnyTopLevelModuleConfigurationByName(
                            configObjectExpression,
                            themeMermaidModuleName
                        )
                    ) {
                        return;
                    }

                    const themesArrayExpression =
                        getArrayExpressionPropertyValueByName(
                            configObjectExpression,
                            "themes"
                        );
                    const addThemeMermaidSuggestion =
                        createAddThemeMermaidSuggestion({
                            configObjectExpression,
                            sourceCode: contextSourceCode,
                            themesArrayExpression,
                        });

                    context.report({
                        messageId:
                            "requireThemeMermaidWhenMarkdownMermaidEnabled",
                        node: mermaidExpression,
                        suggest:
                            addThemeMermaidSuggestion === null
                                ? null
                                : [addThemeMermaidSuggestion],
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `@docusaurus/theme-mermaid` when `markdown.mermaid` is enabled.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-mermaid-when-markdown-mermaid-enabled",
            },
            hasSuggestions: true,
            messages: {
                addThemeMermaidToThemes:
                    "Add `@docusaurus/theme-mermaid` to the top-level `themes` array.",
                requireThemeMermaidWhenMarkdownMermaidEnabled:
                    "When `markdown.mermaid` is `true`, also configure `@docusaurus/theme-mermaid` so Mermaid diagrams can render.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-mermaid-when-markdown-mermaid-enabled",
    });

export default rule;
