/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-theme-config-docsearch`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import {
    docsearchThemeConfigPropertyName,
    getThemeConfigSearchProperties,
} from "../_internal/search-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "noConflictingThemeConfigSearchKeys"
    | "preferThemeConfigDocsearch";

const createPropertyKeyReplacementText = (
    property: Readonly<TSESTree.Property>,
    replacementPropertyName: string
): null | string => {
    if (property.key.type === "Identifier") {
        return replacementPropertyName;
    }

    return property.key.type === "Literal" &&
        typeof property.key.value === "string"
        ? JSON.stringify(replacementPropertyName)
        : null;
};

/** Rule module for `prefer-theme-config-docsearch`. */
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

                    const { algoliaProperty, docsearchProperty } =
                        getThemeConfigSearchProperties(configObjectExpression);

                    if (algoliaProperty === null) {
                        return;
                    }

                    if (docsearchProperty !== null) {
                        context.report({
                            messageId: "noConflictingThemeConfigSearchKeys",
                            node: algoliaProperty.key,
                        });

                        return;
                    }

                    const replacementText = createPropertyKeyReplacementText(
                        algoliaProperty,
                        docsearchThemeConfigPropertyName
                    );

                    reportWithOptionalFix({
                        context,
                        fix:
                            replacementText === null
                                ? null
                                : (fixer) =>
                                      fixer.replaceText(
                                          algoliaProperty.key,
                                          replacementText
                                      ),
                        messageId: "preferThemeConfigDocsearch",
                        node: algoliaProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "enforce the canonical `themeConfig.docsearch` key over the backward-compatible `themeConfig.algolia` alias.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-docsearch",
            },
            fixable: "code",
            messages: {
                noConflictingThemeConfigSearchKeys:
                    "Do not define both `themeConfig.docsearch` and `themeConfig.algolia`. Keep only the canonical `themeConfig.docsearch` key.",
                preferThemeConfigDocsearch:
                    "Prefer `themeConfig.docsearch` over the backward-compatible `themeConfig.algolia` alias so DocSearch config stays on the canonical key.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-theme-config-docsearch",
    });

export default rule;
