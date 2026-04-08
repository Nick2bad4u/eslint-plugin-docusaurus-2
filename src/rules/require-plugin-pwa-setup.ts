/**
 * @packageDocumentation
 * ESLint rule implementation for `require-plugin-pwa-setup`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findPluginConfigurationsByName,
    getDefaultExportedObjectExpression,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const pluginPwaModuleName = "@docusaurus/plugin-pwa" as const;

type MessageIds = "requirePluginPwaSetup";

const hasValidPluginPwaSetup = (
    pluginEntries: ReturnType<typeof findPluginConfigurationsByName>
): boolean =>
    pluginEntries.some((entry) => {
        if (entry.optionsExpression === undefined) {
            return false;
        }

        if (entry.optionsObject === null) {
            return true;
        }

        return entry.optionsObject.properties.length > 0;
    });

/** Rule module for `require-plugin-pwa-setup`. */
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

                    const pluginEntries = findPluginConfigurationsByName(
                        configObjectExpression,
                        pluginPwaModuleName
                    );

                    if (hasValidPluginPwaSetup(pluginEntries)) {
                        return;
                    }

                    context.report({
                        messageId: "requirePluginPwaSetup",
                        node: configObjectExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `@docusaurus/plugin-pwa` to be configured in `plugins` with an explicit setup entry.",
                frozen: false,
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-setup",
            },
            messages: {
                requirePluginPwaSetup:
                    "Configure `@docusaurus/plugin-pwa` in the top-level `plugins` array with an explicit setup entry instead of omitting it or relying on a bare string plugin declaration.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-plugin-pwa-setup",
    });

export default rule;
