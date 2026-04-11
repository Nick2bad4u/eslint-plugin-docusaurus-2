/**
 * @packageDocumentation
 * ESLint rule implementation for `no-svg-social-card-image`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findNestedObjectPropertyByNamePath,
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noSvgSocialCardImage";

const svgExtensionPattern = /\.svg$/iu;

/** Rule module for `no-svg-social-card-image`. */
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

                    const imageProperties = [
                        {
                            property: findObjectPropertyByName(
                                configObjectExpression,
                                "image"
                            ),
                            propertyPath: "image",
                        },
                        {
                            property: findNestedObjectPropertyByNamePath(
                                configObjectExpression,
                                ["themeConfig", "image"]
                            ),
                            propertyPath: "themeConfig.image",
                        },
                    ] as const;

                    for (const imagePropertyEntry of imageProperties) {
                        const imageProperty = imagePropertyEntry.property;

                        if (imageProperty === null) {
                            continue;
                        }

                        const imageValue =
                            getStaticStringValueFromExpressionOrIdentifier(
                                imageProperty.value as TSESTree.Expression,
                                programNode
                            );

                        if (
                            imageValue === null ||
                            !svgExtensionPattern.test(imageValue)
                        ) {
                            continue;
                        }

                        context.report({
                            data: {
                                propertyPath: imagePropertyEntry.propertyPath,
                            },
                            messageId: "noSvgSocialCardImage",
                            node: imageProperty.value,
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
                    "disallow SVG values for Docusaurus social-card image config fields.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-svg-social-card-image",
            },
            messages: {
                noSvgSocialCardImage:
                    "Docusaurus `{{ propertyPath }}` social-card images should not be SVG. Use a raster format such as PNG, JPG, or WebP instead.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-svg-social-card-image",
    });

export default rule;
