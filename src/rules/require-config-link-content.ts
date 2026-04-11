/**
 * @packageDocumentation
 * ESLint rule implementation for `require-config-link-content`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDefaultDocusaurusThemeConfigLinkContext } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireConfigLinkContent";

const hasPresentConfigLinkText = (
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

/** Rule module for `require-config-link-content`. */
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

                    const programNode = context.sourceCode.ast;
                    const labelExpression = getObjectPropertyValueByName(
                        node,
                        "label"
                    );
                    const htmlExpression = getObjectPropertyValueByName(
                        node,
                        "html"
                    );

                    if (
                        hasPresentConfigLinkText(
                            labelExpression,
                            programNode
                        ) ||
                        hasPresentConfigLinkText(htmlExpression, programNode)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireConfigLinkContent",
                        node,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require Docusaurus theme-config link items to provide visible content via `label` or `html`.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-content",
            },
            messages: {
                requireConfigLinkContent:
                    "Docusaurus theme-config link items should include visible content through `label` or `html`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-config-link-content",
    });

export default rule;
