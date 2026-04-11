/**
 * @packageDocumentation
 * ESLint rule implementation for `require-head-tag-content-or-attributes`.
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

type MessageIds = "requireHeadTagContentOrAttributes";

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

/** Rule module for `require-head-tag-content-or-attributes`. */
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
                            hasPresentAttributes(
                                attributesExpression,
                                programNode
                            ) ||
                            hasPresentInnerHtml(
                                innerHtmlExpression,
                                programNode
                            )
                        ) {
                            continue;
                        }

                        context.report({
                            messageId: "requireHeadTagContentOrAttributes",
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
                    "require top-level `headTags` entries to provide either meaningful `attributes` or non-empty `innerHTML`.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-head-tag-content-or-attributes",
            },
            messages: {
                requireHeadTagContentOrAttributes:
                    "Top-level `headTags` entries should provide either meaningful `attributes` or non-empty `innerHTML` content.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-head-tag-content-or-attributes",
    });

export default rule;
