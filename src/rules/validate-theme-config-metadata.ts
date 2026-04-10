/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-theme-config-metadata`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "requireThemeConfigMetadataContent"
    | "requireThemeConfigMetadataKey"
    | "requireThemeConfigMetadataObject";

const hasPresentMetadataStringValue = (
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

/** Rule module for `validate-theme-config-metadata`. */
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

                    const themeConfigObject =
                        getObjectExpressionPropertyValueByName(
                            configObjectExpression,
                            "themeConfig"
                        );

                    if (themeConfigObject === null) {
                        return;
                    }

                    const metadataArrayExpression =
                        getArrayExpressionPropertyValueByName(
                            themeConfigObject,
                            "metadata"
                        );

                    if (metadataArrayExpression === null) {
                        return;
                    }

                    for (const metadataElement of metadataArrayExpression.elements) {
                        if (
                            metadataElement === null ||
                            metadataElement.type === "SpreadElement"
                        ) {
                            continue;
                        }

                        if (metadataElement.type !== "ObjectExpression") {
                            context.report({
                                messageId: "requireThemeConfigMetadataObject",
                                node: metadataElement,
                            });

                            continue;
                        }

                        const nameExpression = getObjectPropertyValueByName(
                            metadataElement,
                            "name"
                        );
                        const propertyExpression = getObjectPropertyValueByName(
                            metadataElement,
                            "property"
                        );
                        const contentExpression = getObjectPropertyValueByName(
                            metadataElement,
                            "content"
                        );

                        if (
                            !hasPresentMetadataStringValue(
                                nameExpression,
                                programNode
                            ) &&
                            !hasPresentMetadataStringValue(
                                propertyExpression,
                                programNode
                            )
                        ) {
                            context.report({
                                messageId: "requireThemeConfigMetadataKey",
                                node: metadataElement,
                            });
                        }

                        if (
                            !hasPresentMetadataStringValue(
                                contentExpression,
                                programNode
                            )
                        ) {
                            context.report({
                                messageId: "requireThemeConfigMetadataContent",
                                node: metadataElement,
                            });
                        }
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require valid minimal object shape for `themeConfig.metadata` entries.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-metadata",
            },
            messages: {
                requireThemeConfigMetadataContent:
                    "Each `themeConfig.metadata` entry should include a non-empty `content` field.",
                requireThemeConfigMetadataKey:
                    "Each `themeConfig.metadata` entry should include either `name` or `property`.",
                requireThemeConfigMetadataObject:
                    "Each `themeConfig.metadata` entry should be an object with Docusaurus metadata fields.",
            },
            schema: [],
            type: "problem",
        },
        name: "validate-theme-config-metadata",
    });

export default rule;
