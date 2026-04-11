/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-footer-column-titles`.
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

type MessageIds = "noDuplicateFooterColumnTitles";

const normalizeTitleForComparison = (title: string): string =>
    title.trim().toLowerCase();

/** Rule module for `no-duplicate-footer-column-titles`. */
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

                    const seenTitles = new Set<string>();

                    for (const footerLinkColumn of findDocusaurusFooterLinkColumnObjects(
                        configObjectExpression
                    )) {
                        const titleExpression = getObjectPropertyValueByName(
                            footerLinkColumn,
                            "title"
                        );

                        if (titleExpression === null) {
                            continue;
                        }

                        const staticTitle =
                            getStaticStringValueFromExpressionOrIdentifier(
                                titleExpression,
                                programNode
                            );

                        if (staticTitle === null) {
                            continue;
                        }

                        const normalizedTitle =
                            normalizeTitleForComparison(staticTitle);

                        if (normalizedTitle.length === 0) {
                            continue;
                        }

                        if (seenTitles.has(normalizedTitle)) {
                            context.report({
                                data: {
                                    title: staticTitle.trim(),
                                },
                                messageId: "noDuplicateFooterColumnTitles",
                                node: titleExpression,
                            });
                            continue;
                        }

                        seenTitles.add(normalizedTitle);
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow duplicate static footer column titles in Docusaurus footer link groups.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-column-titles",
            },
            messages: {
                noDuplicateFooterColumnTitles:
                    "Avoid duplicate footer column titles; found repeated title {{ title }}.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-footer-column-titles",
    });

export default rule;
