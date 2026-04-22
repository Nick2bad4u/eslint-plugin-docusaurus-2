/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-head-tags`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayFirst, arrayJoin, setHas } from "ts-extras";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectPropertyName,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDuplicateHeadTags";

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

const getExpressionSignature = (
    expression: Readonly<TSESTree.Expression>,
    sourceCode: Readonly<TSESLint.SourceCode>
): null | string => {
    if (expression.type === "ArrayExpression") {
        const elementSignatures: string[] = [];

        for (const element of expression.elements) {
            if (element === null) {
                elementSignatures.push("null");
                continue;
            }

            if (element.type === "SpreadElement") {
                return `spread:${sourceCode.getText(element).trim()}`;
            }

            const elementSignature = getExpressionSignature(
                element,
                sourceCode
            );

            if (elementSignature === null) {
                return null;
            }

            elementSignatures.push(elementSignature);
        }

        return `array:[${arrayJoin(elementSignatures, ",")}]`;
    }

    if (expression.type === "Identifier") {
        return null;
    }

    if (expression.type === "Literal") {
        return `literal:${JSON.stringify(expression.value)}`;
    }

    if (expression.type === "ObjectExpression") {
        const propertyEntries: string[] = [];

        for (const property of expression.properties) {
            if (property.type !== "Property") {
                return `spread:${sourceCode.getText(property).trim()}`;
            }

            if (property.computed || property.kind !== "init") {
                return null;
            }

            const propertyName = getObjectPropertyName(property);

            if (propertyName === null) {
                return null;
            }

            const propertyValueSignature = getExpressionSignature(
                property.value as TSESTree.Expression,
                sourceCode
            );

            if (propertyValueSignature === null) {
                return null;
            }

            propertyEntries.push(`${propertyName}:${propertyValueSignature}`);
        }

        propertyEntries.sort((left, right) => left.localeCompare(right));

        return `object:{${arrayJoin(propertyEntries, "|")}}`;
    }

    if (expression.type === "TemplateLiteral") {
        return expression.expressions.length === 0
            ? `template:${arrayFirst(expression.quasis)?.value.cooked ?? ""}`
            : null;
    }

    if (
        expression.type === "TSAsExpression" ||
        expression.type === "TSSatisfiesExpression" ||
        expression.type === "TSTypeAssertion"
    ) {
        return getExpressionSignature(expression.expression, sourceCode);
    }

    return `text:${sourceCode.getText(expression).trim()}`;
};

/** Rule module for `no-duplicate-head-tags`. */
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

                    const headTagArrayItems =
                        headTagsArrayExpression.elements.filter(
                            isPresentArrayElement
                        );
                    const duplicateHeadTagEntries: TSESTree.ObjectExpression[] =
                        [];
                    const seenSignatures = new Set<string>();

                    for (const headTagEntry of headTagArrayItems) {
                        if (headTagEntry.type !== "ObjectExpression") {
                            continue;
                        }

                        const headTagSignature = getExpressionSignature(
                            headTagEntry,
                            context.sourceCode
                        );

                        if (headTagSignature === null) {
                            continue;
                        }

                        if (setHas(seenSignatures, headTagSignature)) {
                            duplicateHeadTagEntries.push(headTagEntry);
                            continue;
                        }

                        seenSignatures.add(headTagSignature);
                    }

                    if (duplicateHeadTagEntries.length === 0) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: (fixer) =>
                            createRemoveCommaSeparatedItemsFixes(
                                fixer,
                                context.sourceCode,
                                {
                                    container: headTagsArrayExpression,
                                    items: headTagArrayItems,
                                    itemsToRemove: duplicateHeadTagEntries,
                                }
                            ),
                        messageId: "noDuplicateHeadTags",
                        node: headTagsArrayExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow duplicate top-level `headTags` entries in Docusaurus config.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-head-tags",
            },
            fixable: "code",
            messages: {
                noDuplicateHeadTags:
                    "Remove duplicate top-level `headTags` entries that repeat an earlier tag definition.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-head-tags",
    });

export default rule;
