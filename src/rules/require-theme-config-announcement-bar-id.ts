/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-config-announcement-bar-id`.
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

type MessageIds = "requireThemeConfigAnnouncementBarId";

/** Rule module for `require-theme-config-announcement-bar-id`. */
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

                    const announcementBarObject =
                        getObjectExpressionPropertyValueByName(
                            themeConfigObject,
                            "announcementBar"
                        );

                    if (announcementBarObject === null) {
                        return;
                    }

                    const idProperty = findObjectPropertyByName(
                        announcementBarObject,
                        "id"
                    );

                    if (idProperty === null) {
                        context.report({
                            messageId: "requireThemeConfigAnnouncementBarId",
                            node: announcementBarObject,
                        });

                        return;
                    }

                    const staticId =
                        getStaticStringValueFromExpressionOrIdentifier(
                            idProperty.value as TSESTree.Expression,
                            programNode
                        );

                    if (staticId === null || staticId.trim().length > 0) {
                        return;
                    }

                    context.report({
                        messageId: "requireThemeConfigAnnouncementBarId",
                        node: idProperty.value,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `themeConfig.announcementBar.id` to be present and non-empty when an announcement bar is configured.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-announcement-bar-id",
            },
            messages: {
                requireThemeConfigAnnouncementBarId:
                    "Configure `themeConfig.announcementBar.id` with a non-empty string so Docusaurus can persist dismissal state reliably.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-config-announcement-bar-id",
    });

export default rule;
