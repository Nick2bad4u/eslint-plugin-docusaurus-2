/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-footer-html-item-props`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isPresent } from "ts-extras";

import {
    findObjectPropertyByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDefaultDocusaurusThemeConfigLinkContext } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noConflictingFooterHtmlItemProps";

/** Rule module for `no-conflicting-footer-html-item-props`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (
                        getDefaultDocusaurusThemeConfigLinkContext(node) !==
                        "footer"
                    ) {
                        return;
                    }

                    const htmlProperty = findObjectPropertyByName(node, "html");

                    if (htmlProperty === null) {
                        return;
                    }

                    const conflictingProperties = [
                        findObjectPropertyByName(node, "href"),
                        findObjectPropertyByName(node, "label"),
                        findObjectPropertyByName(node, "to"),
                    ].filter((property): property is TSESTree.Property =>
                        isPresent(property)
                    );

                    if (conflictingProperties.length === 0) {
                        return;
                    }

                    context.report({
                        messageId: "noConflictingFooterHtmlItemProps",
                        node: htmlProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow footer HTML pass-through items from mixing `html` with `label`, `to`, or `href`.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-footer-html-item-props",
            },
            messages: {
                noConflictingFooterHtmlItemProps:
                    "Docusaurus footer HTML pass-through items should not mix `html` with `label`, `to`, or `href`. Use either raw HTML or a normal footer link item.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-conflicting-footer-html-item-props",
    });

export default rule;
