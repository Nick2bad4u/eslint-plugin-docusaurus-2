/**
 * @packageDocumentation
 * ESLint rule implementation for `no-search-link-without-search-provider`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
    isInternalRouteLikeValue,
} from "../_internal/docusaurus-config-ast.js";
import { getDefaultDocusaurusThemeConfigLinkContext } from "../_internal/docusaurus-theme-config-link-items.js";
import {
    defaultSearchPagePath,
    getConfiguredSearchProviderKinds,
    normalizeRoutePath,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noSearchLinkWithoutSearchProvider";

/** Rule module for `no-search-link-without-search-provider`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            let searchProviderKinds = new Set<string>();

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (searchProviderKinds.size > 0) {
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
                        !isInternalRouteLikeValue(destinationValue) ||
                        normalizeRoutePath(destinationValue) !==
                            defaultSearchPagePath
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "noSearchLinkWithoutSearchProvider",
                        node: destinationExpression,
                    });
                },
                Program(programNode: TSESTree.Program) {
                    const configObjectExpression =
                        getDefaultExportedObjectExpression(programNode);

                    searchProviderKinds =
                        configObjectExpression === null
                            ? new Set<string>()
                            : new Set(
                                  getConfiguredSearchProviderKinds(
                                      configObjectExpression
                                  )
                              );
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow linking theme-config navbar or footer items to the default search page when no known search provider is configured.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-search-link-without-search-provider",
            },
            messages: {
                noSearchLinkWithoutSearchProvider:
                    "Do not link to `/search` from theme-config navbar or footer items unless a known search provider is configured for the site.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-search-link-without-search-provider",
    });

export default rule;
