/**
 * @packageDocumentation
 * ESLint rule implementation for `no-page-css-module-imports-in-components`.
 */
import type { TSESLint } from "@typescript-eslint/utils";

import {
    isDocusaurusSiteComponentFilePath,
    isPageStylesheetImportSpecifier,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noPageCssModuleImportsInComponents";

/** Rule module for `no-page-css-module-imports-in-components`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSiteComponentFilePath(context.filename)) {
                return {};
            }

            return {
                ImportDeclaration(node) {
                    const importSource = node.source.value;

                    if (
                        typeof importSource !== "string" ||
                        !isPageStylesheetImportSpecifier(importSource)
                    ) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        data: {
                            importSource,
                        },
                        fix: null,
                        messageId: "noPageCssModuleImportsInComponents",
                        node: node.source,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow page-scoped CSS module imports from Docusaurus component modules.",
                frozen: false,
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-page-css-module-imports-in-components",
            },
            messages: {
                noPageCssModuleImportsInComponents:
                    "Do not import page-scoped stylesheet `{{ importSource }}` from a reusable Docusaurus component. Move shared styles into the component's own module or a shared styles module instead.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "no-page-css-module-imports-in-components",
    });

export default rule;
