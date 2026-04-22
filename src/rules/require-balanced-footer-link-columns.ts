/**
 * @packageDocumentation
 * ESLint rule implementation for `require-balanced-footer-link-columns`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayJoin } from "ts-extras";

import {
    getArrayExpressionFromExpressionOrIdentifier,
    getArrayExpressionPropertyValueByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findDocusaurusFooterLinkColumnObjects } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type FooterColumnLinkCount = Readonly<{
    column: Readonly<TSESTree.ObjectExpression>;
    linkCount: number;
}>;

type MessageIds = "requireBalancedFooterLinkColumns";

const getStaticFooterColumnLinkCounts = (
    footerLinkColumns: readonly Readonly<TSESTree.ObjectExpression>[],
    programNode: Readonly<TSESTree.Program>
): null | readonly FooterColumnLinkCount[] => {
    const counts: FooterColumnLinkCount[] = [];

    for (const footerLinkColumn of footerLinkColumns) {
        const itemsExpression = getObjectPropertyValueByName(
            footerLinkColumn,
            "items"
        );

        if (itemsExpression === null) {
            return null;
        }

        const itemsArrayExpression =
            getArrayExpressionFromExpressionOrIdentifier(
                itemsExpression,
                programNode
            );

        if (itemsArrayExpression === null) {
            return null;
        }

        if (
            itemsArrayExpression.elements.some(
                (element) =>
                    element === null || element.type === "SpreadElement"
            )
        ) {
            return null;
        }

        counts.push({
            column: footerLinkColumn,
            linkCount: itemsArrayExpression.elements.length,
        });
    }

    return counts;
};

const createCountsSummary = (
    columnLinkCounts: readonly FooterColumnLinkCount[]
): string =>
    arrayJoin(
        columnLinkCounts.map(({ linkCount }) => String(linkCount)),
        "/"
    );

/** Rule module for `require-balanced-footer-link-columns`. */
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
                            "themeConfig",
                            programNode
                        );

                    if (themeConfigObject === null) {
                        return;
                    }

                    const footerObject = getObjectExpressionPropertyValueByName(
                        themeConfigObject,
                        "footer",
                        programNode
                    );

                    if (footerObject === null) {
                        return;
                    }

                    const footerLinksArrayExpression =
                        getArrayExpressionPropertyValueByName(
                            footerObject,
                            "links",
                            programNode
                        );

                    if (footerLinksArrayExpression === null) {
                        return;
                    }

                    const footerLinkColumns =
                        findDocusaurusFooterLinkColumnObjects(
                            configObjectExpression,
                            programNode
                        );

                    if (footerLinkColumns.length < 2) {
                        return;
                    }

                    const columnLinkCounts = getStaticFooterColumnLinkCounts(
                        footerLinkColumns,
                        programNode
                    );

                    if (
                        columnLinkCounts === null ||
                        columnLinkCounts.length < 2
                    ) {
                        return;
                    }

                    const distinctLinkCounts = new Set(
                        columnLinkCounts.map(({ linkCount }) => linkCount)
                    );

                    if (distinctLinkCounts.size <= 1) {
                        return;
                    }

                    context.report({
                        data: {
                            counts: createCountsSummary(columnLinkCounts),
                        },
                        messageId: "requireBalancedFooterLinkColumns",
                        node: footerLinksArrayExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require footer link columns to contain the same number of statically known links.",
                frozen: false,
                presets: ["experimental"],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-balanced-footer-link-columns",
            },
            messages: {
                requireBalancedFooterLinkColumns:
                    "Balance footer link columns so each column contains the same number of links. Found column counts {{ counts }}.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-balanced-footer-link-columns",
    });

export default rule;
