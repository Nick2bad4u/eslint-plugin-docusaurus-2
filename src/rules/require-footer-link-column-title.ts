/**
 * @packageDocumentation
 * ESLint rule implementation for `require-footer-link-column-title`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findDocusaurusFooterLinkColumnObjects } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireFooterLinkColumnTitle";

const hasPresentFooterColumnTitle = (
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

/** Rule module for `require-footer-link-column-title`. */
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

                    for (const footerLinkColumn of findDocusaurusFooterLinkColumnObjects(
                        configObjectExpression
                    )) {
                        const titleExpression = getObjectPropertyValueByName(
                            footerLinkColumn,
                            "title"
                        );

                        if (
                            hasPresentFooterColumnTitle(
                                titleExpression,
                                programNode
                            )
                        ) {
                            continue;
                        }

                        context.report({
                            messageId: "requireFooterLinkColumnTitle",
                            node: footerLinkColumn,
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
                    "require a non-empty `title` for Docusaurus footer link columns.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-title",
            },
            messages: {
                requireFooterLinkColumnTitle:
                    "Docusaurus footer link columns should include a non-empty `title`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-footer-link-column-title",
    });

export default rule;
