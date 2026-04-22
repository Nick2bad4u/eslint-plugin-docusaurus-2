/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-head-tag-attributes-object`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayFirst, arrayJoin, setHas } from "ts-extras";

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

const reservedHeadTagPropertyNames = new Set([
    "attributes",
    "innerHTML",
    "tagName",
]);

type MessageIds = "preferHeadTagAttributesObject";

const canAutofixHeadTagObject = (
    headTagObject: Readonly<TSESTree.ObjectExpression>
): boolean =>
    headTagObject.properties.every(
        (property) =>
            property.type === "Property" &&
            !property.computed &&
            property.kind === "init"
    );

const createAttributesWrappedObjectText = (
    headTagObject: Readonly<TSESTree.ObjectExpression>,
    sourceCode: Readonly<TSESLint.SourceCode>
): string => {
    const preservedPropertyTexts: string[] = [];
    const attributePropertyTexts: string[] = [];

    for (const property of headTagObject.properties) {
        if (property.type !== "Property") {
            continue;
        }

        const propertyName = getObjectPropertyName(property);

        if (
            propertyName !== null &&
            setHas(reservedHeadTagPropertyNames, propertyName)
        ) {
            preservedPropertyTexts.push(sourceCode.getText(property));
            continue;
        }

        attributePropertyTexts.push(sourceCode.getText(property));
    }

    const nextPropertyTexts = [...preservedPropertyTexts];

    if (attributePropertyTexts.length > 0) {
        nextPropertyTexts.splice(
            preservedPropertyTexts.some((text) => text.startsWith("innerHTML"))
                ? preservedPropertyTexts.findIndex((text) =>
                      text.startsWith("innerHTML")
                  )
                : preservedPropertyTexts.length,
            0,
            `attributes: { ${arrayJoin(attributePropertyTexts, ", ")} }`
        );
    }

    return `{ ${arrayJoin(nextPropertyTexts, ", ")} }`;
};

/** Rule module for `prefer-head-tag-attributes-object`. */
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
                        const directAttributeProperties =
                            headTagEntry.properties.filter(
                                (property): property is TSESTree.Property => {
                                    if (property.type !== "Property") {
                                        return false;
                                    }

                                    const propertyName =
                                        getObjectPropertyName(property);

                                    return (
                                        propertyName !== null &&
                                        !setHas(
                                            reservedHeadTagPropertyNames,
                                            propertyName
                                        )
                                    );
                                }
                            );

                        if (directAttributeProperties.length === 0) {
                            continue;
                        }

                        if (attributesExpression !== null) {
                            context.report({
                                messageId: "preferHeadTagAttributesObject",
                                node:
                                    arrayFirst(directAttributeProperties)
                                        ?.key ?? headTagEntry,
                            });

                            continue;
                        }

                        reportWithOptionalFix({
                            context,
                            fix: canAutofixHeadTagObject(headTagEntry)
                                ? (fixer) =>
                                      fixer.replaceText(
                                          headTagEntry,
                                          createAttributesWrappedObjectText(
                                              headTagEntry,
                                              context.sourceCode
                                          )
                                      )
                                : null,
                            messageId: "preferHeadTagAttributesObject",
                            node:
                                arrayFirst(directAttributeProperties)?.key ??
                                headTagEntry,
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
                    "require top-level `headTags` entries to place HTML attributes inside an `attributes` object instead of flat root properties.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-head-tag-attributes-object",
            },
            fixable: "code",
            messages: {
                preferHeadTagAttributesObject:
                    "Move head-tag attribute fields into an `attributes` object so the top-level `headTags` entry matches Docusaurus' expected shape.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-head-tag-attributes-object",
    });

export default rule;
