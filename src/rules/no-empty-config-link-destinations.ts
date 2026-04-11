/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-config-link-destinations`.
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

type MessageIds = "noEmptyConfigLinkDestinations";

const hasPresentDestination = (
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

/** Rule module for `no-empty-config-link-destinations`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    const linkContext =
                        getDefaultDocusaurusThemeConfigLinkContext(node);

                    if (linkContext === null) {
                        return;
                    }

                    const hrefProperty = findObjectPropertyByName(node, "href");
                    const toProperty = findObjectPropertyByName(node, "to");
                    const hrefExpression = getObjectPropertyValueByName(
                        node,
                        "href"
                    );
                    const toExpression = getObjectPropertyValueByName(
                        node,
                        "to"
                    );
                    const htmlExpression =
                        linkContext === "footer"
                            ? getObjectPropertyValueByName(node, "html")
                            : null;

                    for (const [property, siblingExpression] of [
                        [hrefProperty, toExpression],
                        [toProperty, hrefExpression],
                    ] as const) {
                        if (property === null || property === undefined) {
                            continue;
                        }

                        const propertyExpression =
                            property.value as TSESTree.Expression;
                        const staticValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                propertyExpression,
                                context.sourceCode.ast
                            );

                        if (
                            staticValue === null ||
                            staticValue.trim().length > 0
                        ) {
                            continue;
                        }

                        const hasAlternativeDestination =
                            hasPresentDestination(
                                siblingExpression ?? null,
                                context.sourceCode.ast
                            ) ||
                            hasPresentDestination(
                                htmlExpression,
                                context.sourceCode.ast
                            );

                        context.report({
                            fix: hasAlternativeDestination
                                ? (fixer) =>
                                      createRemoveCommaSeparatedItemsFixes(
                                          fixer,
                                          context.sourceCode,
                                          {
                                              container: node,
                                              items: node.properties,
                                              itemsToRemove: [property],
                                          }
                                      )
                                : null,
                            messageId: "noEmptyConfigLinkDestinations",
                            node: property.value,
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
                    "disallow `href` or `to` properties on Docusaurus theme-config link items when the static destination text is empty.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-config-link-destinations",
            },
            fixable: "code",
            messages: {
                noEmptyConfigLinkDestinations:
                    "Remove or replace empty `href` / `to` destination values on Docusaurus theme-config link items.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-config-link-destinations",
    });

export default rule;
