/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-href-for-external-links`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getObjectPropertyName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
    isExternalLinkLikeValue,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferHrefForExternalLinks";

const getReplacementKeyText = (
    key: Readonly<TSESTree.Property["key"]>
): string => {
    if (
        key.type === "Literal" &&
        typeof key.raw === "string" &&
        key.raw.startsWith("'")
    ) {
        return "'href'";
    }

    if (key.type === "Literal") {
        return '"href"';
    }

    return "href";
};

const isLikelyDocusaurusConfigLinkItemObject = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean =>
    findObjectPropertyByName(objectExpression, "label") !== null &&
    findObjectPropertyByName(objectExpression, "href") === null;

/** Rule module for `prefer-href-for-external-links`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                'Property[key.type="Identifier"][key.name="to"], Property[key.type="Literal"][key.value="to"]'(
                    node: TSESTree.Node
                ) {
                    if (node.type !== "Property") {
                        return;
                    }

                    const parentObject = node.parent;

                    if (
                        parentObject?.type !== "ObjectExpression" ||
                        !isLikelyDocusaurusConfigLinkItemObject(parentObject)
                    ) {
                        return;
                    }

                    const propertyName = getObjectPropertyName(node);

                    if (propertyName !== "to") {
                        return;
                    }

                    const toValue = getStaticStringValue(
                        node.value as TSESTree.Expression
                    );

                    if (toValue === null || !isExternalLinkLikeValue(toValue)) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return fixer.replaceText(
                                node.key,
                                getReplacementKeyText(node.key)
                            );
                        },
                        messageId: "preferHrefForExternalLinks",
                        node: node.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `href` instead of `to` for external Docusaurus config links.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-links",
            },
            fixable: "code",
            messages: {
                preferHrefForExternalLinks:
                    "Use `href` instead of `to` for external Docusaurus config links so the config matches the documented theme link semantics.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-href-for-external-links",
    });

export default rule;
