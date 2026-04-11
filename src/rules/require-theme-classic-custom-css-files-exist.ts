/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-classic-custom-css-files-exist`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    doesResolvedPathExist,
    getStaticConfiguredPathResolution,
} from "../_internal/config-paths.js";
import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { findThemeClassicOptionsObjects } from "../_internal/theme-classic-config.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireThemeClassicCustomCssFilesExist";

const isPresentArrayElement = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): element is TSESTree.Expression | TSESTree.SpreadElement => element !== null;

/** Rule module for `require-theme-classic-custom-css-files-exist`. */
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

                    for (const themeOptionsObject of findThemeClassicOptionsObjects(
                        configObjectExpression,
                        programNode
                    )) {
                        const customCssExpression =
                            getObjectPropertyValueByName(
                                themeOptionsObject,
                                "customCss"
                            );

                        if (customCssExpression === null) {
                            continue;
                        }

                        const customCssArrayExpression =
                            getArrayExpressionFromExpressionOrIdentifier(
                                customCssExpression,
                                programNode
                            );
                        const customCssExpressions =
                            customCssArrayExpression === null
                                ? [customCssExpression]
                                : customCssArrayExpression.elements.filter(
                                      isPresentArrayElement
                                  );

                        for (const customCssEntry of customCssExpressions) {
                            if (customCssEntry.type === "SpreadElement") {
                                continue;
                            }

                            const pathResolution =
                                getStaticConfiguredPathResolution(
                                    customCssEntry,
                                    programNode,
                                    context.filename
                                );

                            if (
                                pathResolution === null ||
                                doesResolvedPathExist(
                                    pathResolution.resolvedPath
                                )
                            ) {
                                continue;
                            }

                            context.report({
                                data: {
                                    configuredPath: `\`${pathResolution.configuredPath}\``,
                                },
                                messageId:
                                    "requireThemeClassicCustomCssFilesExist",
                                node: customCssEntry,
                            });
                        }
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require statically configured Docusaurus classic-theme `customCss` paths to exist.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-classic-custom-css-files-exist",
            },
            messages: {
                requireThemeClassicCustomCssFilesExist:
                    "`customCss` entry {{ configuredPath }} does not resolve to an existing file.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-theme-classic-custom-css-files-exist",
    });

export default rule;
