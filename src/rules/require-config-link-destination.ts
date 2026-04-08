/**
 * @packageDocumentation
 * ESLint rule implementation for `require-config-link-destination`.
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

type MessageIds = "requireConfigLinkDestination";

const hasPresentDestinationValue = (
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

/** Rule module for `require-config-link-destination`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    const themeLinkContext =
                        getDefaultDocusaurusThemeConfigLinkContext(node);

                    if (themeLinkContext === null) {
                        return;
                    }

                    const programNode = context.sourceCode.ast;
                    const hrefExpression = getObjectPropertyValueByName(
                        node,
                        "href"
                    );
                    const toExpression = getObjectPropertyValueByName(
                        node,
                        "to"
                    );

                    if (
                        hasPresentDestinationValue(
                            hrefExpression,
                            programNode
                        ) ||
                        hasPresentDestinationValue(toExpression, programNode)
                    ) {
                        return;
                    }

                    if (themeLinkContext === "footer") {
                        const htmlExpression = getObjectPropertyValueByName(
                            node,
                            "html"
                        );

                        if (
                            hasPresentDestinationValue(
                                htmlExpression,
                                programNode
                            )
                        ) {
                            return;
                        }
                    }

                    context.report({
                        messageId: "requireConfigLinkDestination",
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
                    "require Docusaurus theme-config link items to provide a destination through `to`, `href`, or footer `html`.",
                frozen: false,
                presets: [
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-destination",
            },
            messages: {
                requireConfigLinkDestination:
                    "Docusaurus theme-config link items should include a destination through `to` or `href`. Footer HTML pass-through items may use `html` instead.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-config-link-destination",
    });

export default rule;
