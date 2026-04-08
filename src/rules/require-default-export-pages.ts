/**
 * @packageDocumentation
 * ESLint rule implementation for `require-default-export-pages`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isRoutableDocusaurusSitePageFilePath } from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "invalidDefaultExport" | "missingDefaultExport";

const isLikelyPageComponentExport = (
    node:
        | Readonly<TSESTree.ExportDefaultDeclaration["declaration"]>
        | Readonly<TSESTree.Expression>
): boolean => {
    if (
        node.type === "TSAsExpression" ||
        node.type === "TSSatisfiesExpression" ||
        node.type === "TSTypeAssertion"
    ) {
        return isLikelyPageComponentExport(node.expression);
    }

    return (
        node.type === "ArrowFunctionExpression" ||
        node.type === "CallExpression" ||
        node.type === "ClassDeclaration" ||
        node.type === "FunctionDeclaration" ||
        node.type === "FunctionExpression" ||
        node.type === "Identifier"
    );
};

/** Rule module for `require-default-export-pages`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isRoutableDocusaurusSitePageFilePath(context.filename)) {
                return {};
            }

            return {
                Program(programNode: TSESTree.Program) {
                    const defaultExportDeclaration = programNode.body.find(
                        (
                            statement
                        ): statement is TSESTree.ExportDefaultDeclaration =>
                            statement.type === "ExportDefaultDeclaration"
                    );

                    if (defaultExportDeclaration === undefined) {
                        reportWithOptionalFix({
                            context,
                            fix: null,
                            messageId: "missingDefaultExport",
                            node: programNode,
                        });

                        return;
                    }

                    if (
                        isLikelyPageComponentExport(
                            defaultExportDeclaration.declaration
                        )
                    ) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix: null,
                        messageId: "invalidDefaultExport",
                        node: defaultExportDeclaration,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require routable Docusaurus page modules to default-export a React page component.",
                frozen: false,
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-default-export-pages",
            },
            messages: {
                invalidDefaultExport:
                    "Docusaurus page modules should default-export a React page component. Export a component instead of a non-component value, or move the file out of `src/pages`.",
                missingDefaultExport:
                    "Routable Docusaurus page modules need a default-exported React page component. Export one, or move/prefix the file so Docusaurus does not treat it as a page.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-default-export-pages",
    });

export default rule;
