/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-css-modules-in-site-src`.
 */
import type { TSESLint } from "@typescript-eslint/utils";

import {
    isDocusaurusSiteComponentFilePath,
    isDocusaurusSitePageFilePath,
    isModuleStylesheetImportSpecifier,
    isStylesheetImportSpecifier,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferCssModules";

const isDocusaurusSiteComponentOrPageFilePath = (filePath: string): boolean =>
    isDocusaurusSiteComponentFilePath(filePath) ||
    isDocusaurusSitePageFilePath(filePath);

/** Rule module for `prefer-css-modules-in-site-src`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSiteComponentOrPageFilePath(context.filename)) {
                return {};
            }

            return {
                ImportDeclaration(node) {
                    const importSource = node.source.value;

                    if (
                        typeof importSource !== "string" ||
                        !isStylesheetImportSpecifier(importSource) ||
                        isModuleStylesheetImportSpecifier(importSource)
                    ) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        data: {
                            importSource,
                        },
                        fix: null,
                        messageId: "preferCssModules",
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
                    "disallow global stylesheet imports in Docusaurus component and page source files when CSS modules should be used instead.",
                frozen: false,
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-css-modules-in-site-src",
            },
            messages: {
                preferCssModules:
                    "Prefer CSS modules for `{{ importSource }}` in Docusaurus component/page files. Load truly global styles through `theme.customCss` or a client module instead.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-css-modules-in-site-src",
    });

export default rule;
