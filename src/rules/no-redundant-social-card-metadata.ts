/**
 * @packageDocumentation
 * ESLint rule implementation for `no-redundant-social-card-metadata`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noRedundantSocialCardMetadata";

const socialCardMetadataNames = new Set(["og:image", "twitter:image"]);

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

/** Rule module for `no-redundant-social-card-metadata`. */
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

                    const themeConfigImageValue = getObjectPropertyValueByName(
                        themeConfigObject,
                        "image"
                    );
                    const metadataArrayExpression =
                        getArrayExpressionPropertyValueByName(
                            themeConfigObject,
                            "metadata"
                        );

                    if (
                        themeConfigImageValue === null ||
                        metadataArrayExpression === null
                    ) {
                        return;
                    }

                    const metadataArrayItems =
                        metadataArrayExpression.elements.filter(
                            isPresentArrayElement
                        );

                    for (const metadataElement of metadataArrayExpression.elements) {
                        if (metadataElement?.type !== "ObjectExpression") {
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
                        const nameValue =
                            nameExpression === null
                                ? null
                                : getStaticStringValue(nameExpression);
                        const propertyValue =
                            propertyExpression === null
                                ? null
                                : getStaticStringValue(propertyExpression);
                        const metadataName = nameValue ?? propertyValue;

                        if (
                            metadataName === null ||
                            !socialCardMetadataNames.has(metadataName)
                        ) {
                            continue;
                        }

                        context.report({
                            data: {
                                metadataName,
                            },
                            fix: (fixer) =>
                                createRemoveCommaSeparatedItemsFixes(
                                    fixer,
                                    context.sourceCode,
                                    {
                                        container: metadataArrayExpression,
                                        items: metadataArrayItems,
                                        itemsToRemove: [metadataElement],
                                    }
                                ),
                            messageId: "noRedundantSocialCardMetadata",
                            node: metadataElement,
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
                    "disallow manual `og:image` and `twitter:image` metadata entries when `themeConfig.image` is already configured.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-redundant-social-card-metadata",
            },
            fixable: "code",
            messages: {
                noRedundantSocialCardMetadata:
                    "Remove manual `{{ metadataName }}` metadata when `themeConfig.image` is already configured. Docusaurus already uses that image for social-card metadata.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "no-redundant-social-card-metadata",
    });

export default rule;
