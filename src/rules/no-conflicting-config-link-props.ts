/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-config-link-props`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
    isExternalLinkLikeValue,
    isInternalRouteLikeValue,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noConflictingConfigLinkProps";

const isLikelyDocusaurusConfigLinkItemObject = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean => findObjectPropertyByName(objectExpression, "label") !== null;

const getRedundantPropertyToRemove = (
    options: Readonly<{
        hrefProperty: Readonly<TSESTree.Property>;
        hrefValue: string;
        objectExpression: Readonly<TSESTree.ObjectExpression>;
        toProperty: Readonly<TSESTree.Property>;
        toValue: string;
    }>
): null | Readonly<TSESTree.Property> => {
    const { hrefProperty, hrefValue, toProperty, toValue } = options;

    if (hrefValue !== toValue) {
        return null;
    }

    if (isInternalRouteLikeValue(toValue)) {
        return hrefProperty;
    }

    if (isExternalLinkLikeValue(toValue)) {
        return toProperty;
    }

    return null;
};

/** Rule module for `no-conflicting-config-link-props`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (!isLikelyDocusaurusConfigLinkItemObject(node)) {
                        return;
                    }

                    const hrefProperty = findObjectPropertyByName(node, "href");
                    const toProperty = findObjectPropertyByName(node, "to");

                    if (hrefProperty === null || toProperty === null) {
                        return;
                    }

                    const hrefValue = getStaticStringValue(
                        hrefProperty.value as TSESTree.Expression
                    );
                    const toValue = getStaticStringValue(
                        toProperty.value as TSESTree.Expression
                    );
                    const redundantPropertyToRemove =
                        hrefValue === null || toValue === null
                            ? null
                            : getRedundantPropertyToRemove({
                                  hrefProperty,
                                  hrefValue,
                                  objectExpression: node,
                                  toProperty,
                                  toValue,
                              });

                    reportWithOptionalFix({
                        context,
                        fix:
                            redundantPropertyToRemove === null
                                ? null
                                : (fixer) =>
                                      createRemoveCommaSeparatedItemsFixes(
                                          fixer,
                                          context.sourceCode,
                                          {
                                              container: node,
                                              items: node.properties,
                                              itemsToRemove: [
                                                  redundantPropertyToRemove,
                                              ],
                                          }
                                      ),
                        messageId: "noConflictingConfigLinkProps",
                        node: toProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow Docusaurus config link items from declaring both `to` and `href` at the same time.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-props",
            },
            fixable: "code",
            messages: {
                noConflictingConfigLinkProps:
                    "Do not declare both `to` and `href` on the same Docusaurus config link item. Keep only the single destination prop that matches the link kind.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-conflicting-config-link-props",
    });

export default rule;
