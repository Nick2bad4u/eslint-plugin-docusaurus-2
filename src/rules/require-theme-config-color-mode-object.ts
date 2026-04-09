/**
 * @packageDocumentation
 * ESLint rule implementation for `require-theme-config-color-mode-object`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    getObjectExpressionPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type ColorModeObjectSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

type MessageIds =
    | "insertColorModeDark"
    | "insertColorModeLight"
    | "requireThemeConfigColorModeObject";

const createInsertColorModeSuggestion = (
    options: Readonly<{
        messageId: "insertColorModeDark" | "insertColorModeLight";
        themeConfigObject: Readonly<TSESTree.ObjectExpression>;
        value: "dark" | "light";
    }>
): ColorModeObjectSuggestion => ({
    fix: (fixer) => {
        const colorModeText = `colorMode: { defaultMode: ${JSON.stringify(options.value)} }`;
        const firstProperty = options.themeConfigObject.properties[0];

        if (firstProperty === undefined) {
            return fixer.insertTextAfterRange(
                [
                    options.themeConfigObject.range[0],
                    options.themeConfigObject.range[0] + 1,
                ],
                ` ${colorModeText} `
            );
        }

        return fixer.insertTextBefore(firstProperty, `${colorModeText}, `);
    },
    messageId: options.messageId,
});

/** Rule module for `require-theme-config-color-mode-object`. */
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

                    if (
                        getObjectExpressionPropertyValueByName(
                            themeConfigObject,
                            "colorMode"
                        ) !== null
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireThemeConfigColorModeObject",
                        node: themeConfigObject,
                        suggest: [
                            createInsertColorModeSuggestion({
                                messageId: "insertColorModeLight",
                                themeConfigObject,
                                value: "light",
                            }),
                            createInsertColorModeSuggestion({
                                messageId: "insertColorModeDark",
                                themeConfigObject,
                                value: "dark",
                            }),
                        ],
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `themeConfig.colorMode` to be explicitly configured when theme color mode behavior is part of the authored site contract.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-color-mode-object",
            },
            hasSuggestions: true,
            messages: {
                insertColorModeDark:
                    'Insert `themeConfig.colorMode` with `defaultMode: "dark"`.',
                insertColorModeLight:
                    'Insert `themeConfig.colorMode` with `defaultMode: "light"`.',
                requireThemeConfigColorModeObject:
                    "Configure `themeConfig.colorMode` explicitly so color-mode behavior is part of the authored Docusaurus contract.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-theme-config-color-mode-object",
    });

export default rule;
