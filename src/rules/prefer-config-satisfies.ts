/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-config-satisfies`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isTypeScriptDocusaurusConfigFilePath } from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferConfigSatisfies";

const isConfigTypeReference = (
    typeNode: Readonly<TSESTree.TypeNode>
): typeNode is TSESTree.TSTypeReference & { typeName: TSESTree.Identifier } =>
    typeNode.type === "TSTypeReference" &&
    typeNode.typeName.type === "Identifier" &&
    typeNode.typeName.name === "Config";

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

/** Rule module for `prefer-config-satisfies`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isTypeScriptDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ExportDefaultDeclaration(
                    node: Readonly<TSESTree.ExportDefaultDeclaration>
                ) {
                    const exportDeclaration = node.declaration;

                    if (
                        exportDeclaration.type !== "TSAsExpression" ||
                        !isConfigTypeReference(exportDeclaration.typeAnnotation)
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
                        messageId: "preferConfigSatisfies",
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
                        !isConfigTypeReference(
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
                        messageId: "preferConfigSatisfies",
                        node: typeAnnotation,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            docs: {
                description:
                    "require `satisfies Config` over direct `Config` annotations in TypeScript Docusaurus config files.",
                presets: [
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-config-satisfies",
            },
            fixable: "code",
            messages: {
                preferConfigSatisfies:
                    "Prefer `satisfies Config` in Docusaurus config files so TypeScript validates the config shape without widening literal values.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-config-satisfies",
    });

export default rule;
