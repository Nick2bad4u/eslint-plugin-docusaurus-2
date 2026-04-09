/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-theme-config-metadata-property-for-og-tags`.
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

type MessageIds = "preferThemeConfigMetadataPropertyForOgTags";

const getReplacementKeyText = (
    key: Readonly<TSESTree.Property["key"]>
): string => {
    if (
        key.type === "Literal" &&
        typeof key.raw === "string" &&
        key.raw.startsWith("'")
    ) {
        return "'property'";
    }

    if (key.type === "Literal") {
        return '"property"';
    }

    return "property";
};

const isOgMetadataName = (value: string): boolean =>
    value.trim().toLowerCase().startsWith("og:");

/** Rule module for `prefer-theme-config-metadata-property-for-og-tags`. */
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

                        const nameProperty = findObjectPropertyByName(
                            metadataElement,
                            "name"
                        );
                        const propertyProperty = findObjectPropertyByName(
                            metadataElement,
                            "property"
                        );

                        if (
                            nameProperty === null ||
                            propertyProperty !== null
                        ) {
                            continue;
                        }

                        const staticNameValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                nameProperty.value as TSESTree.Expression,
                                programNode
                            );

                        if (
                            staticNameValue === null ||
                            !isOgMetadataName(staticNameValue)
                        ) {
                            continue;
                        }

                        reportWithOptionalFix({
                            context,
                            fix: (fixer) =>
                                fixer.replaceText(
                                    nameProperty.key,
                                    getReplacementKeyText(nameProperty.key)
                                ),
                            messageId:
                                "preferThemeConfigMetadataPropertyForOgTags",
                            node: nameProperty.key,
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
                    "require `themeConfig.metadata` Open Graph entries to use `property` instead of `name`.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-metadata-property-for-og-tags",
            },
            fixable: "code",
            messages: {
                preferThemeConfigMetadataPropertyForOgTags:
                    "Use `property` instead of `name` for Open Graph metadata entries such as `og:*`.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-theme-config-metadata-property-for-og-tags",
    });

export default rule;
