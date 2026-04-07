/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-sidebars-config-satisfies`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isTypeScriptDocusaurusSidebarFilePath } from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferSidebarsConfigSatisfies";

const isSidebarsConfigTypeReference = (
    typeNode: Readonly<TSESTree.TypeNode>
): typeNode is TSESTree.TSTypeReference & { typeName: TSESTree.Identifier } =>
    typeNode.type === "TSTypeReference" &&
    typeNode.typeName.type === "Identifier" &&
    typeNode.typeName.name === "SidebarsConfig";

const createSatisfiesText = (
    context: Readonly<TSESLint.RuleContext<MessageIds, typeof defaultOptions>>,
    typeNode: Readonly<TSESTree.TypeNode>
): string => ` satisfies ${context.sourceCode.getText(typeNode)}`;

const createSatisfiesReplacement = (
    context: Readonly<TSESLint.RuleContext<MessageIds, typeof defaultOptions>>,
    expression: Readonly<TSESTree.Expression>,
    typeNode: Readonly<TSESTree.TypeNode>
): string =>
    `${context.sourceCode.getText(expression)} satisfies ${context.sourceCode.getText(typeNode)}`;

/** Rule module for `prefer-sidebars-config-satisfies`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isTypeScriptDocusaurusSidebarFilePath(context.filename)) {
                return {};
            }

            return {
                ExportDefaultDeclaration(
                    node: Readonly<TSESTree.ExportDefaultDeclaration>
                ) {
                    const exportDeclaration = node.declaration;

                    if (
                        exportDeclaration.type !== "TSAsExpression" ||
                        !isSidebarsConfigTypeReference(
                            exportDeclaration.typeAnnotation
                        )
                    ) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return fixer.replaceText(
                                exportDeclaration,
                                createSatisfiesReplacement(
                                    context,
                                    exportDeclaration.expression,
                                    exportDeclaration.typeAnnotation
                                )
                            );
                        },
                        messageId: "preferSidebarsConfigSatisfies",
                        node: exportDeclaration.typeAnnotation,
                    });
                },
                VariableDeclarator(
                    node: Readonly<TSESTree.VariableDeclarator>
                ) {
                    if (
                        node.id.type !== "Identifier" ||
                        node.id.typeAnnotation === undefined ||
                        node.init === null ||
                        !isSidebarsConfigTypeReference(
                            node.id.typeAnnotation.typeAnnotation
                        ) ||
                        node.init.type === "TSSatisfiesExpression"
                    ) {
                        return;
                    }

                    const typeAnnotation = node.id.typeAnnotation;
                    const initializer = node.init;

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return [
                                fixer.remove(typeAnnotation),
                                fixer.insertTextAfter(
                                    initializer,
                                    createSatisfiesText(
                                        context,
                                        typeAnnotation.typeAnnotation
                                    )
                                ),
                            ];
                        },
                        messageId: "preferSidebarsConfigSatisfies",
                        node: typeAnnotation,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            docs: {
                description:
                    "require `satisfies SidebarsConfig` over direct `SidebarsConfig` annotations in TypeScript Docusaurus sidebar files.",
                presets: [
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-sidebars-config-satisfies",
            },
            fixable: "code",
            messages: {
                preferSidebarsConfigSatisfies:
                    "Prefer `satisfies SidebarsConfig` in Docusaurus sidebar files so TypeScript validates the sidebar shape without widening literal values.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-sidebars-config-satisfies",
    });

export default rule;
