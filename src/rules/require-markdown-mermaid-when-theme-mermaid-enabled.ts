/**
 * @packageDocumentation
 * ESLint rule implementation for `require-markdown-mermaid-when-theme-mermaid-enabled`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { hasAnyTopLevelModuleConfigurationByName } from "../_internal/docusaurus-module-config.js";
import { createInsertObjectPropertyFix } from "../_internal/object-literal-fixes.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const themeMermaidModuleName = "@docusaurus/theme-mermaid" as const;

type MessageIds = "requireMarkdownMermaidWhenThemeMermaidEnabled";

const createInsertTopLevelMarkdownFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    sourceCode: Readonly<TSESLint.SourceCode>
): TSESLint.RuleFix => {
    const propertyText = "markdown: { mermaid: true }";

    return createInsertObjectPropertyFix({
        fixer,
        indentation: "    ",
        objectExpression: configObjectExpression,
        propertyText,
        sourceCode,
    });
};

const createInsertMarkdownMermaidFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    markdownObject: Readonly<TSESTree.ObjectExpression>,
    sourceCode: Readonly<TSESLint.SourceCode>
): TSESLint.RuleFix => {
    const lastProperty = markdownObject.properties.at(-1);
    const propertyText = "mermaid: true";

    if (lastProperty === undefined) {
        return fixer.replaceText(markdownObject, `{ ${propertyText} }`);
    }

    return createInsertObjectPropertyFix({
        fixer,
        indentation: "        ",
        objectExpression: markdownObject,
        propertyText,
        sourceCode,
    });
};

const getMarkdownMermaidFix = (
    context: Readonly<TSESLint.RuleContext<MessageIds, typeof defaultOptions>>,
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    markdownExpression: null | Readonly<TSESTree.Expression>,
    markdownObject: null | Readonly<TSESTree.ObjectExpression>,
    mermaidExpression: null | Readonly<TSESTree.Expression>,
    mermaidEnabled: boolean | null | undefined
): ((fixer: Readonly<TSESLint.RuleFixer>) => TSESLint.RuleFix) | null => {
    if (markdownExpression === null) {
        return (fixer) =>
            createInsertTopLevelMarkdownFix(
                fixer,
                configObjectExpression,
                context.sourceCode
            );
    }

    if (markdownObject === null) {
        return null;
    }

    if (mermaidExpression === null) {
        return (fixer) =>
            createInsertMarkdownMermaidFix(
                fixer,
                markdownObject,
                context.sourceCode
            );
    }

    if (mermaidEnabled === false) {
        return (fixer) => fixer.replaceText(mermaidExpression, "true");
    }

    return null;
};

/** Rule module for `require-markdown-mermaid-when-theme-mermaid-enabled`. */
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

                    if (
                        configObjectExpression === null ||
                        !hasAnyTopLevelModuleConfigurationByName(
                            configObjectExpression,
                            themeMermaidModuleName
                        )
                    ) {
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
                    const mermaidExpression =
                        markdownObject === null
                            ? null
                            : getObjectPropertyValueByName(
                                  markdownObject,
                                  "mermaid"
                              );
                    const mermaidEnabled =
                        mermaidExpression === null
                            ? undefined
                            : getStaticBooleanValueFromExpressionOrIdentifier(
                                  mermaidExpression,
                                  programNode
                              );

                    if (mermaidEnabled === true) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: getMarkdownMermaidFix(
                            context,
                            configObjectExpression,
                            markdownExpression,
                            markdownObject,
                            mermaidExpression,
                            mermaidEnabled
                        ),
                        messageId:
                            "requireMarkdownMermaidWhenThemeMermaidEnabled",
                        node:
                            mermaidExpression ??
                            markdownExpression ??
                            configObjectExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `markdown.mermaid` to be `true` when `@docusaurus/theme-mermaid` is configured.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-markdown-mermaid-when-theme-mermaid-enabled",
            },
            fixable: "code",
            messages: {
                requireMarkdownMermaidWhenThemeMermaidEnabled:
                    "When `@docusaurus/theme-mermaid` is configured, set `markdown.mermaid` to `true` so Mermaid code blocks work.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-markdown-mermaid-when-theme-mermaid-enabled",
    });

export default rule;
