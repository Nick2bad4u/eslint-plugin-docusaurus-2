/**
 * @packageDocumentation
 * ESLint rule implementation for `require-head-tag-attributes-when-no-inner-html`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireHeadTagAttributesWhenNoInnerHtml";

const hasPresentAttributes = (
    attributesExpression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (attributesExpression === null) {
        return false;
    }

    const attributesObject = getObjectExpressionFromExpressionOrIdentifier(
        attributesExpression,
        programNode
    );

    if (attributesObject === null) {
        return true;
    }

    return attributesObject.properties.length > 0;
};

const hasPresentInnerHtml = (
    innerHtmlExpression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (innerHtmlExpression === null) {
        return false;
    }

    const staticInnerHtml = getStaticStringValueFromExpressionOrIdentifier(
        innerHtmlExpression,
        programNode
    );

    if (staticInnerHtml !== null) {
        return staticInnerHtml.trim().length > 0;
    }

    return true;
};

/** Rule module for `require-head-tag-attributes-when-no-inner-html`. */
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

                    const headTagsExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "headTags"
                    );
                    const headTagsArrayExpression =
                        headTagsExpression === null
                            ? null
                            : getArrayExpressionFromExpressionOrIdentifier(
                                  headTagsExpression,
                                  programNode
                              );

                    if (headTagsArrayExpression === null) {
                        return;
                    }

                    for (const headTagEntry of headTagsArrayExpression.elements) {
                        if (headTagEntry?.type !== "ObjectExpression") {
                            continue;
                        }

                        const attributesExpression =
                            getObjectPropertyValueByName(
                                headTagEntry,
                                "attributes"
                            );
                        const innerHtmlExpression =
                            getObjectPropertyValueByName(
                                headTagEntry,
                                "innerHTML"
                            );

                        if (
                            hasPresentInnerHtml(
                                innerHtmlExpression,
                                programNode
                            ) ||
                            hasPresentAttributes(
                                attributesExpression,
                                programNode
                            )
                        ) {
                            continue;
                        }

                        context.report({
                            messageId:
                                "requireHeadTagAttributesWhenNoInnerHtml",
                            node: headTagEntry,
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
                    "require top-level `headTags` entries without `innerHTML` to provide meaningful `attributes`.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-head-tag-attributes-when-no-inner-html",
            },
            messages: {
                requireHeadTagAttributesWhenNoInnerHtml:
                    "Top-level `headTags` entries without `innerHTML` should provide meaningful `attributes`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-head-tag-attributes-when-no-inner-html",
    });

export default rule;
