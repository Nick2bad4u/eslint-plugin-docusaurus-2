/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-theme-config-metadata-name-for-twitter-tags`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferThemeConfigMetadataNameForTwitterTags";

const getReplacementKeyText = (
    key: Readonly<TSESTree.Property["key"]>
): string => {
    if (
        key.type === "Literal" &&
        typeof key.raw === "string" &&
        key.raw.startsWith("'")
    ) {
        return "'name'";
    }

    if (key.type === "Literal") {
        return '"name"';
    }

    return "name";
};

const isTwitterMetadataProperty = (value: string): boolean =>
    value.trim().toLowerCase().startsWith("twitter:");

/** Rule module for `prefer-theme-config-metadata-name-for-twitter-tags`. */
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

                    const metadataExpression = getObjectPropertyValueByName(
                        themeConfigObject,
                        "metadata"
                    );
                    const metadataArrayExpression =
                        metadataExpression === null
                            ? null
                            : getArrayExpressionFromExpressionOrIdentifier(
                                  metadataExpression,
                                  programNode
                              );

                    if (metadataArrayExpression === null) {
                        return;
                    }

                    for (const metadataElement of metadataArrayExpression.elements) {
                        if (metadataElement?.type !== "ObjectExpression") {
                            continue;
                        }

                        const propertyProperty = findObjectPropertyByName(
                            metadataElement,
                            "property"
                        );
                        const nameProperty = findObjectPropertyByName(
                            metadataElement,
                            "name"
                        );

                        if (
                            propertyProperty === null ||
                            nameProperty !== null
                        ) {
                            continue;
                        }

                        const staticPropertyValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                propertyProperty.value as TSESTree.Expression,
                                programNode
                            );

                        if (
                            staticPropertyValue === null ||
                            !isTwitterMetadataProperty(staticPropertyValue)
                        ) {
                            continue;
                        }

                        reportWithOptionalFix({
                            context,
                            fix: (fixer) =>
                                fixer.replaceText(
                                    propertyProperty.key,
                                    getReplacementKeyText(propertyProperty.key)
                                ),
                            messageId:
                                "preferThemeConfigMetadataNameForTwitterTags",
                            node: propertyProperty.key,
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
                    "require `themeConfig.metadata` Twitter entries to use `name` instead of `property`.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-metadata-name-for-twitter-tags",
            },
            fixable: "code",
            messages: {
                preferThemeConfigMetadataNameForTwitterTags:
                    "Use `name` instead of `property` for Twitter metadata entries such as `twitter:*`.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-theme-config-metadata-name-for-twitter-tags",
    });

export default rule;
