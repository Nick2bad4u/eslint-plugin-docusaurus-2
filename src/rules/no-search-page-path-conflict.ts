/**
 * @packageDocumentation
 * ESLint rule implementation for `no-search-page-path-conflict`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    getConfiguredSearchPagePath,
    getEffectiveSearchThemeConfigProperty,
    getSearchPagePathConflictCandidates,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noSearchPagePathConflict";

/** Rule module for `no-search-page-path-conflict`. */
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

                    const searchPagePath = getConfiguredSearchPagePath(
                        configObjectExpression,
                        programNode
                    );

                    if (searchPagePath === null) {
                        return;
                    }

                    const searchConfigNode = (() => {
                        const effectiveSearchConfigProperty =
                            getEffectiveSearchThemeConfigProperty(
                                configObjectExpression,
                                programNode
                            );
                        const searchConfigProperty =
                            effectiveSearchConfigProperty?.property;

                        if (
                            searchConfigProperty?.value.type !==
                            "ObjectExpression"
                        ) {
                            return null;
                        }

                        return (
                            findObjectPropertyByName(
                                searchConfigProperty.value,
                                "searchPagePath"
                            )?.value ?? searchConfigProperty.key
                        );
                    })();

                    if (searchConfigNode === null) {
                        return;
                    }

                    for (const candidate of getSearchPagePathConflictCandidates(
                        configObjectExpression,
                        programNode
                    )) {
                        if (candidate.routeBasePath !== searchPagePath) {
                            continue;
                        }

                        context.report({
                            data: {
                                owner: candidate.owner,
                                searchPagePath: `\`${searchPagePath}\``,
                            },
                            messageId: "noSearchPagePathConflict",
                            node: searchConfigNode,
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
                    "disallow Algolia/DocSearch `searchPagePath` values that collide with configured Docusaurus route base paths.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-search-page-path-conflict",
            },
            messages: {
                noSearchPagePathConflict:
                    "Configured search page path {{ searchPagePath }} conflicts with the route base path used by {{ owner }}.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-search-page-path-conflict",
    });

export default rule;
