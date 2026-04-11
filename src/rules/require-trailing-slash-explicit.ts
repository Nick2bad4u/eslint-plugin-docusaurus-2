/**
 * @packageDocumentation
 * ESLint rule implementation for `require-trailing-slash-explicit`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getExpressionFromExpressionOrIdentifier,
    getStaticBooleanValueFromExpressionOrIdentifier,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "requireTrailingSlashExplicit"
    | "setTrailingSlashFalse"
    | "setTrailingSlashTrue";

type TrailingSlashSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === "Literal" ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const canAutofixTrailingSlashExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    (expression.type === "Literal" && typeof expression.value === "string") ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const createInsertTrailingSlashFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    value: boolean
): TSESLint.RuleFix => {
    const trailingSlashPropertyText = `trailingSlash: ${String(value)}`;
    const lastProperty = configObjectExpression.properties.at(-1);

    if (lastProperty === undefined) {
        return fixer.insertTextAfterRange(
            [
                configObjectExpression.range[0],
                configObjectExpression.range[0] + 1,
            ],
            trailingSlashPropertyText
        );
    }

    return fixer.insertTextAfter(
        lastProperty,
        `, ${trailingSlashPropertyText}`
    );
};

const createReplaceTrailingSlashFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    trailingSlashProperty: Readonly<TSESTree.Property>,
    trailingSlashExpression: Readonly<TSESTree.Expression>,
    value: boolean
): TSESLint.RuleFix =>
    trailingSlashProperty.shorthand
        ? fixer.replaceText(
              trailingSlashProperty,
              `trailingSlash: ${String(value)}`
          )
        : fixer.replaceText(trailingSlashExpression, String(value));

const createSetTrailingSlashSuggestion = (
    options: Readonly<{
        configObjectExpression: Readonly<TSESTree.ObjectExpression>;
        messageId: "setTrailingSlashFalse" | "setTrailingSlashTrue";
        trailingSlashExpression: null | Readonly<TSESTree.Expression>;
        trailingSlashProperty: null | Readonly<TSESTree.Property>;
        value: boolean;
    }>
): TrailingSlashSuggestion => ({
    fix: (fixer) =>
        options.trailingSlashProperty === null ||
        options.trailingSlashExpression === null
            ? createInsertTrailingSlashFix(
                  fixer,
                  options.configObjectExpression,
                  options.value
              )
            : createReplaceTrailingSlashFix(
                  fixer,
                  options.trailingSlashProperty,
                  options.trailingSlashExpression,
                  options.value
              ),
    messageId: options.messageId,
});

const getBooleanValueFromStaticString = (value: string): boolean | null => {
    const normalizedValue = value.trim().toLowerCase();

    if (normalizedValue === "true") {
        return true;
    }

    if (normalizedValue === "false") {
        return false;
    }

    return null;
};

/** Rule module for `require-trailing-slash-explicit`. */
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

                    const trailingSlashProperty = findObjectPropertyByName(
                        configObjectExpression,
                        "trailingSlash"
                    );

                    if (trailingSlashProperty === null) {
                        context.report({
                            messageId: "requireTrailingSlashExplicit",
                            node: configObjectExpression,
                            suggest: [
                                createSetTrailingSlashSuggestion({
                                    configObjectExpression,
                                    messageId: "setTrailingSlashFalse",
                                    trailingSlashExpression: null,
                                    trailingSlashProperty: null,
                                    value: false,
                                }),
                                createSetTrailingSlashSuggestion({
                                    configObjectExpression,
                                    messageId: "setTrailingSlashTrue",
                                    trailingSlashExpression: null,
                                    trailingSlashProperty: null,
                                    value: true,
                                }),
                            ],
                        });

                        return;
                    }

                    const trailingSlashExpression =
                        trailingSlashProperty.value as TSESTree.Expression;
                    const staticBooleanValue =
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            trailingSlashExpression,
                            programNode
                        );

                    if (
                        staticBooleanValue === true ||
                        staticBooleanValue === false
                    ) {
                        return;
                    }

                    const staticStringValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            trailingSlashExpression,
                            programNode
                        );
                    const booleanValueFromStaticString =
                        staticStringValue === null
                            ? null
                            : getBooleanValueFromStaticString(
                                  staticStringValue
                              );

                    if (booleanValueFromStaticString !== null) {
                        if (
                            canAutofixTrailingSlashExpression(
                                trailingSlashExpression
                            )
                        ) {
                            reportWithOptionalFix({
                                context,
                                fix: (fixer) =>
                                    fixer.replaceText(
                                        trailingSlashExpression,
                                        String(booleanValueFromStaticString)
                                    ),
                                messageId: "requireTrailingSlashExplicit",
                                node: trailingSlashExpression,
                            });

                            return;
                        }

                        context.report({
                            messageId: "requireTrailingSlashExplicit",
                            node: trailingSlashExpression,
                            suggest: [
                                createSetTrailingSlashSuggestion({
                                    configObjectExpression,
                                    messageId: "setTrailingSlashFalse",
                                    trailingSlashExpression,
                                    trailingSlashProperty,
                                    value: false,
                                }),
                                createSetTrailingSlashSuggestion({
                                    configObjectExpression,
                                    messageId: "setTrailingSlashTrue",
                                    trailingSlashExpression,
                                    trailingSlashProperty,
                                    value: true,
                                }),
                            ],
                        });

                        return;
                    }

                    const resolvedTrailingSlashExpression =
                        getExpressionFromExpressionOrIdentifier(
                            trailingSlashExpression,
                            programNode
                        );

                    if (
                        resolvedTrailingSlashExpression === null ||
                        !isStaticLiteralLikeExpression(
                            resolvedTrailingSlashExpression
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireTrailingSlashExplicit",
                        node: trailingSlashExpression,
                        suggest: [
                            createSetTrailingSlashSuggestion({
                                configObjectExpression,
                                messageId: "setTrailingSlashFalse",
                                trailingSlashExpression,
                                trailingSlashProperty,
                                value: false,
                            }),
                            createSetTrailingSlashSuggestion({
                                configObjectExpression,
                                messageId: "setTrailingSlashTrue",
                                trailingSlashExpression,
                                trailingSlashProperty,
                                value: true,
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
                    "require top-level `trailingSlash` to be explicitly configured with a boolean value.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-trailing-slash-explicit",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                requireTrailingSlashExplicit:
                    "Configure top-level `trailingSlash` explicitly as a boolean (`true` or `false`) in Docusaurus config.",
                setTrailingSlashFalse: "Set `trailingSlash` to `false`.",
                setTrailingSlashTrue: "Set `trailingSlash` to `true`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-trailing-slash-explicit",
    });

export default rule;
