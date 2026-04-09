/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-theme-config-color-mode-flags`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectExpressionPropertyValueByName,
    getObjectPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noConflictingThemeConfigColorModeFlags";

/** Rule module for `no-conflicting-theme-config-color-mode-flags`. */
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

                    const colorModeExpression = getObjectPropertyValueByName(
                        themeConfigObject,
                        "colorMode"
                    );
                    const colorModeObject =
                        colorModeExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  colorModeExpression,
                                  programNode
                              );

                    if (colorModeObject === null) {
                        return;
                    }

                    const disableSwitchProperty = findObjectPropertyByName(
                        colorModeObject,
                        "disableSwitch"
                    );
                    const respectPrefersColorSchemeProperty =
                        findObjectPropertyByName(
                            colorModeObject,
                            "respectPrefersColorScheme"
                        );

                    if (
                        disableSwitchProperty === null ||
                        respectPrefersColorSchemeProperty === null
                    ) {
                        return;
                    }

                    const disableSwitchValue =
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            disableSwitchProperty.value as TSESTree.Expression,
                            programNode
                        );
                    const respectPrefersColorSchemeValue =
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            respectPrefersColorSchemeProperty.value as TSESTree.Expression,
                            programNode
                        );

                    if (
                        disableSwitchValue !== true ||
                        respectPrefersColorSchemeValue !== true
                    ) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: (fixer) =>
                            respectPrefersColorSchemeProperty.shorthand
                                ? fixer.replaceText(
                                      respectPrefersColorSchemeProperty,
                                      "respectPrefersColorScheme: false"
                                  )
                                : fixer.replaceText(
                                      respectPrefersColorSchemeProperty.value,
                                      "false"
                                  ),
                        messageId: "noConflictingThemeConfigColorModeFlags",
                        node: respectPrefersColorSchemeProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `themeConfig.colorMode` from combining `disableSwitch: true` with `respectPrefersColorScheme: true` in static config.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-theme-config-color-mode-flags",
            },
            fixable: "code",
            messages: {
                noConflictingThemeConfigColorModeFlags:
                    "Do not combine `disableSwitch: true` with `respectPrefersColorScheme: true`; if the switch is disabled, respecting the user's preferred color scheme should also be disabled.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-conflicting-theme-config-color-mode-flags",
    });

export default rule;
