/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-config-image`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireThemeConfigImage";

/** Rule module for `require-theme-config-image`. */
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
                        context.report({
                            messageId: "requireThemeConfigImage",
                            node: configObjectExpression,
                        });

                        return;
                    }

                    const imageProperty = findObjectPropertyByName(
                        themeConfigObject,
                        "image"
                    );

                    if (imageProperty === null) {
                        context.report({
                            messageId: "requireThemeConfigImage",
                            node: themeConfigObject,
                        });

                        return;
                    }

                    const imageExpression =
                        imageProperty.value as TSESTree.Expression;
                    const imageValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            imageExpression,
                            programNode
                        );

                    if (imageValue !== null) {
                        if (imageValue.trim().length > 0) {
                            return;
                        }

                        context.report({
                            messageId: "requireThemeConfigImage",
                            node: imageProperty.value,
                        });

                        return;
                    }

                    if (imageExpression.type !== "Literal") {
                        return;
                    }

                    context.report({
                        messageId: "requireThemeConfigImage",
                        node: imageProperty.value,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `themeConfig.image` so Docusaurus has a default social-card image.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-image",
            },
            messages: {
                requireThemeConfigImage:
                    "Configure `themeConfig.image` with a non-empty social-card image path so Docusaurus can provide a default Open Graph and Twitter image.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-theme-config-image",
    });

export default rule;
