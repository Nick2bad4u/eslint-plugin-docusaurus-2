/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-to-for-internal-links`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getObjectPropertyName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
    isInternalRouteLikeValue,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferToForInternalLinks";

const getReplacementKeyText = (
    key: Readonly<TSESTree.Property["key"]>
): string => {
    if (
        key.type === "Literal" &&
        typeof key.raw === "string" &&
        key.raw.startsWith("'")
    ) {
        return "'to'";
    }

    if (key.type === "Literal") {
        return '"to"';
    }

    return "to";
};

const isLikelyDocusaurusLinkItemObject = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean =>
    findObjectPropertyByName(objectExpression, "label") !== null &&
    findObjectPropertyByName(objectExpression, "to") === null;

/** Rule module for `prefer-to-for-internal-links`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                'Property[key.type="Identifier"][key.name="href"], Property[key.type="Literal"][key.value="href"]'(
                    node: TSESTree.Node
                ) {
                    if (node.type !== "Property") {
                        return;
                    }

                    const parentObject = node.parent;

                    if (
                        parentObject?.type !== "ObjectExpression" ||
                        !isLikelyDocusaurusLinkItemObject(parentObject)
                    ) {
                        return;
                    }

                    const propertyName = getObjectPropertyName(node);

                    if (propertyName !== "href") {
                        return;
                    }

                    const hrefValue = getStaticStringValue(
                        node.value as TSESTree.Expression
                    );

                    if (
                        hrefValue === null ||
                        !isInternalRouteLikeValue(hrefValue)
                    ) {
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
                        messageId: "preferToForInternalLinks",
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
                    "require `to` instead of `href` for internal Docusaurus config links.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-links",
            },
            fixable: "code",
            messages: {
                preferToForInternalLinks:
                    "Use `to` instead of `href` for internal Docusaurus links so client-side routing and baseUrl handling are used.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-to-for-internal-links",
    });

export default rule;
