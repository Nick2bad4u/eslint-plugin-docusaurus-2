/**
 * @packageDocumentation
 * ESLint rule implementation for `no-empty-theme-config-metadata`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noEmptyThemeConfigMetadata";

/** Rule module for `no-empty-theme-config-metadata`. */
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

                    const metadataProperty = findObjectPropertyByName(
                        themeConfigObject,
                        "metadata"
                    );

                    if (metadataProperty === null) {
                        return;
                    }

                    const metadataExpression =
                        metadataProperty.value as TSESTree.Expression;
                    const metadataArrayExpression =
                        getArrayExpressionFromExpressionOrIdentifier(
                            metadataExpression,
                            programNode
                        );

                    if (metadataArrayExpression === null) {
                        return;
                    }

                    if (metadataArrayExpression.elements.length > 0) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: (fixer) =>
                            createRemoveCommaSeparatedItemsFixes(
                                fixer,
                                context.sourceCode,
                                {
                                    container: themeConfigObject,
                                    items: themeConfigObject.properties,
                                    itemsToRemove: [metadataProperty],
                                }
                            ),
                        messageId: "noEmptyThemeConfigMetadata",
                        node: metadataProperty,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `themeConfig.metadata` arrays that are statically empty.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-theme-config-metadata",
            },
            fixable: "code",
            messages: {
                noEmptyThemeConfigMetadata:
                    "Remove empty `themeConfig.metadata` arrays that do not contribute any metadata entries.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-theme-config-metadata",
    });

export default rule;
