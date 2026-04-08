/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-config-link-props`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
    isInternalRouteLikeValue,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noConflictingConfigLinkProps";

const isExternalLinkLikeValue = (value: string): boolean =>
    /^https?:\/\//u.test(value) ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("//");

const isLikelyDocusaurusConfigLinkItemObject = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean => findObjectPropertyByName(objectExpression, "label") !== null;

const createRemoveObjectPropertyFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyToRemove: Readonly<TSESTree.Property>
): TSESLint.RuleFix => {
    const propertyIndex = objectExpression.properties.indexOf(propertyToRemove);

    if (propertyIndex === -1 || objectExpression.properties.length === 1) {
        return fixer.remove(propertyToRemove);
    }

    const nextProperty = objectExpression.properties[propertyIndex + 1];

    if (nextProperty !== undefined) {
        return fixer.removeRange([
            propertyToRemove.range[0],
            nextProperty.range[0],
        ]);
    }

    const previousProperty = objectExpression.properties[propertyIndex - 1];

    if (previousProperty === undefined) {
        return fixer.remove(propertyToRemove);
    }

    return fixer.removeRange([
        previousProperty.range[1],
        propertyToRemove.range[1],
    ]);
};

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
                                      createRemoveObjectPropertyFix(
                                          fixer,
                                          node,
                                          redundantPropertyToRemove
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
