/**
 * @packageDocumentation
 * ESLint rule implementation for `no-deprecated-on-broken-markdown-links`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findNestedObjectPropertyByNamePath,
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDeprecatedOnBrokenMarkdownLinks";

const deprecatedPropertyName = "onBrokenMarkdownLinks" as const;

const createMarkdownHooksReplacementText = (
    context: Readonly<TSESLint.RuleContext<MessageIds, typeof defaultOptions>>,
    property: Readonly<TSESTree.Property>
): string =>
    `markdown: { hooks: { ${deprecatedPropertyName}: ${context.sourceCode.getText(property.value)} } }`;

/** Rule module for `no-deprecated-on-broken-markdown-links`. */
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

                    const deprecatedProperty = findObjectPropertyByName(
                        configObjectExpression,
                        deprecatedPropertyName
                    );

                    if (deprecatedProperty === null) {
                        return;
                    }

                    const nestedProperty = findNestedObjectPropertyByNamePath(
                        configObjectExpression,
                        [
                            "markdown",
                            "hooks",
                            deprecatedPropertyName,
                        ]
                    );
                    const markdownProperty = findObjectPropertyByName(
                        configObjectExpression,
                        "markdown"
                    );

                    reportWithOptionalFix({
                        context,
                        fix:
                            nestedProperty === null && markdownProperty === null
                                ? (fixer) =>
                                      fixer.replaceText(
                                          deprecatedProperty,
                                          createMarkdownHooksReplacementText(
                                              context,
                                              deprecatedProperty
                                          )
                                      )
                                : null,
                        messageId: "noDeprecatedOnBrokenMarkdownLinks",
                        node: deprecatedProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            docs: {
                description:
                    "disallow the deprecated top-level `onBrokenMarkdownLinks` Docusaurus config property.",
                presets: [
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-on-broken-markdown-links",
            },
            fixable: "code",
            messages: {
                noDeprecatedOnBrokenMarkdownLinks:
                    "Move the deprecated top-level `onBrokenMarkdownLinks` setting to `markdown.hooks.onBrokenMarkdownLinks`. Docusaurus v3.9 deprecated the top-level property.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-deprecated-on-broken-markdown-links",
    });

export default rule;
