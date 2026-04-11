/**
 * @packageDocumentation
 * ESLint rule implementation for `no-search-page-link-when-search-page-disabled`.
 */

import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDefaultDocusaurusThemeConfigLinkContext } from "../_internal/docusaurus-theme-config-link-items.js";
import {
    isDefaultSearchPageRouteValue,
    isSearchPageExplicitlyDisabled,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noSearchPageLinkWhenSearchPageDisabled";

/** Rule module for `no-search-page-link-when-search-page-disabled`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            let isSearchPageDisabled = false;

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (!isSearchPageDisabled) {
                        return;
                    }

                    if (
                        getDefaultDocusaurusThemeConfigLinkContext(node) ===
                        null
                    ) {
                        return;
                    }

                    const destinationExpression =
                        getObjectPropertyValueByName(node, "to") ??
                        getObjectPropertyValueByName(node, "href");

                    if (destinationExpression === null) {
                        return;
                    }

                    const destinationValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            destinationExpression,
                            context.sourceCode.ast
                        );

                    if (
                        destinationValue === null ||
                        !isDefaultSearchPageRouteValue(destinationValue)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "noSearchPageLinkWhenSearchPageDisabled",
                        node: destinationExpression,
                    });
                },
                Program(programNode: TSESTree.Program) {
                    const configObjectExpression =
                        getDefaultExportedObjectExpression(programNode);

                    isSearchPageDisabled =
                        configObjectExpression !== null &&
                        isSearchPageExplicitlyDisabled(configObjectExpression);
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                configs: [],
                description:
                    "disallow theme-config navbar or footer links to `/search` when search page support is explicitly disabled.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-search-page-link-when-search-page-disabled",
            },
            messages: {
                noSearchPageLinkWhenSearchPageDisabled:
                    "Do not link to `/search` from theme-config navbar or footer items when `searchPagePath` is explicitly disabled with `false`.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-search-page-link-when-search-page-disabled",
    });

export default rule;
