/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-head-tags`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyHeadTags";

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

const hasMeaningfulStaticAttributes = (
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

const hasMeaningfulStaticInnerHtml = (
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

/** Rule module for `no-empty-head-tags`. */
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

                    const headTagItems =
                        headTagsArrayExpression.elements.filter(
                            isPresentArrayElement
                        );
                    const emptyHeadTagEntries: TSESTree.ObjectExpression[] = [];

                    for (const headTagEntry of headTagItems) {
                        if (headTagEntry.type !== "ObjectExpression") {
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
                            hasMeaningfulStaticAttributes(
                                attributesExpression,
                                programNode
                            ) ||
                            hasMeaningfulStaticInnerHtml(
                                innerHtmlExpression,
                                programNode
                            )
                        ) {
                            continue;
                        }

                        emptyHeadTagEntries.push(headTagEntry);
                    }

                    if (emptyHeadTagEntries.length === 0) {
                        return;
                    }

                    for (const [
                        index,
                        emptyHeadTagEntry,
                    ] of emptyHeadTagEntries.entries()) {
                        reportWithOptionalFix({
                            context,
                            fix:
                                index === 0
                                    ? (fixer) =>
                                          createRemoveCommaSeparatedItemsFixes(
                                              fixer,
                                              context.sourceCode,
                                              {
                                                  container:
                                                      headTagsArrayExpression,
                                                  items: headTagItems,
                                                  itemsToRemove:
                                                      emptyHeadTagEntries,
                                              }
                                          )
                                    : null,
                            messageId: "noEmptyHeadTags",
                            node: emptyHeadTagEntry,
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
                    "disallow top-level `headTags` entries that do not provide meaningful `attributes` or `innerHTML` content.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-head-tags",
            },
            fixable: "code",
            messages: {
                noEmptyHeadTags:
                    "Remove empty top-level `headTags` entries that do not contribute any attributes or inline content.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-head-tags",
    });

export default rule;
