/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-config-link-labels`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDefaultDocusaurusThemeConfigLinkContext } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyConfigLinkLabels";

const hasPresentContent = (
    expression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (expression === null) {
        return false;
    }

    const staticValue = getStaticStringValueFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (staticValue !== null) {
        return staticValue.trim().length > 0;
    }

    return expression.type !== "Literal";
};

/** Rule module for `no-empty-config-link-labels`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (
                        getDefaultDocusaurusThemeConfigLinkContext(node) ===
                        null
                    ) {
                        return;
                    }

                    const labelProperty = findObjectPropertyByName(
                        node,
                        "label"
                    );

                    if (labelProperty === null) {
                        return;
                    }

                    const labelExpression =
                        labelProperty.value as TSESTree.Expression;
                    const staticLabelValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            labelExpression,
                            context.sourceCode.ast
                        );

                    if (
                        staticLabelValue === null ||
                        staticLabelValue.trim().length > 0
                    ) {
                        return;
                    }

                    const htmlExpression = getObjectPropertyValueByName(
                        node,
                        "html"
                    );

                    context.report({
                        fix: hasPresentContent(
                            htmlExpression,
                            context.sourceCode.ast
                        )
                            ? (fixer) =>
                                  createRemoveCommaSeparatedItemsFixes(
                                      fixer,
                                      context.sourceCode,
                                      {
                                          container: node,
                                          items: node.properties,
                                          itemsToRemove: [labelProperty],
                                      }
                                  )
                            : null,
                        messageId: "noEmptyConfigLinkLabels",
                        node: labelProperty.value,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `label` properties on Docusaurus theme-config link items when the static label text is empty.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-config-link-labels",
            },
            fixable: "code",
            messages: {
                noEmptyConfigLinkLabels:
                    "Remove or replace empty `label` values on Docusaurus theme-config link items.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-config-link-labels",
    });

export default rule;
