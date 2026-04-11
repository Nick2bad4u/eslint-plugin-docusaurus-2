/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-config-link-content-props`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDefaultDocusaurusThemeConfigLinkContext } from "../_internal/docusaurus-theme-config-link-items.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noConflictingConfigLinkContentProps";

/** Rule module for `no-conflicting-config-link-content-props`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (
                        getDefaultDocusaurusThemeConfigLinkContext(node) ===
                        null
                    ) {
                        return;
                    }

                    const labelProperty = findObjectPropertyByName(
                        node,
                        "label"
                    );
                    const htmlProperty = findObjectPropertyByName(node, "html");

                    if (labelProperty === null || htmlProperty === null) {
                        return;
                    }

                    context.report({
                        messageId: "noConflictingConfigLinkContentProps",
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
                    "disallow Docusaurus theme-config link items from declaring both `label` and `html`.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-content-props",
            },
            messages: {
                noConflictingConfigLinkContentProps:
                    "Do not declare both `label` and `html` on the same Docusaurus theme-config link item. Choose one visible-content prop shape.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-conflicting-config-link-content-props",
    });

export default rule;
