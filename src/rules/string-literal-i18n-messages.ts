/**
 * @packageDocumentation
 * ESLint rule implementation for `string-literal-i18n-messages`.
 *
 * Adapted from `@docusaurus/eslint-plugin` under the MIT License.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";

import { getStaticStringValue } from "../_internal/docusaurus-config-ast.js";
import {
    collectDocusaurusTranslateBindings,
    isDocusaurusTranslateCall,
    isDocusaurusTranslateTagName,
    isStaticTranslateMessageChild,
} from "../_internal/docusaurus-translation-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireStaticMessageArgument" | "requireStaticMessageChild";

const isMessageProperty = (
    property: Readonly<TSESTree.ObjectLiteralElement>
): property is TSESTree.Property => {
    if (property.type !== AST_NODE_TYPES.Property) {
        return false;
    }

    const { key } = property;

    return (
        (key.type === AST_NODE_TYPES.Identifier && key.name === "message") ||
        (key.type === AST_NODE_TYPES.Literal && key.value === "message")
    );
};

const isStaticMessagePropertyValue = (
    property: Readonly<TSESTree.Property>
): boolean => {
    const { value } = property;

    if (
        value.type === AST_NODE_TYPES.ArrayPattern ||
        value.type === AST_NODE_TYPES.AssignmentPattern ||
        value.type === AST_NODE_TYPES.ObjectPattern ||
        value.type === AST_NODE_TYPES.TSEmptyBodyFunctionExpression
    ) {
        return false;
    }

    return getStaticStringValue(value) !== null;
};

/** Rule module for `string-literal-i18n-messages`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            const translateBindings = collectDocusaurusTranslateBindings(
                context.sourceCode.ast
            );

            const checkCallExpression = (
                node: Readonly<TSESTree.CallExpression>
            ): void => {
                if (
                    !isDocusaurusTranslateCall(
                        context,
                        node.callee,
                        translateBindings
                    )
                ) {
                    return;
                }

                const [firstArgument] = node.arguments;

                if (firstArgument?.type !== AST_NODE_TYPES.ObjectExpression) {
                    context.report({
                        messageId: "requireStaticMessageArgument",
                        node: firstArgument ?? node.callee,
                    });
                    return;
                }

                for (const property of firstArgument.properties) {
                    if (
                        !isMessageProperty(property) ||
                        isStaticMessagePropertyValue(property)
                    ) {
                        continue;
                    }

                    context.report({
                        messageId: "requireStaticMessageArgument",
                        node: property.value,
                    });
                }
            };

            const checkJsxElement = (
                node: Readonly<TSESTree.JSXElement>
            ): void => {
                if (
                    !isDocusaurusTranslateTagName(
                        context,
                        node.openingElement.name,
                        translateBindings
                    )
                ) {
                    return;
                }

                for (const child of node.children) {
                    if (isStaticTranslateMessageChild(child)) {
                        continue;
                    }

                    context.report({
                        messageId: "requireStaticMessageChild",
                        node: child,
                    });
                }
            };

            return {
                CallExpression: checkCallExpression,
                JSXElement: checkJsxElement,
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                configs: ["i18n"],
                description:
                    "require imported Docusaurus translation APIs to receive hardcoded message strings.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/string-literal-i18n-messages",
            },
            languages: ["js/js"],
            messages: {
                requireStaticMessageArgument:
                    "Pass a hardcoded string as the `message` property. Put dynamic values in the translation values argument instead.",
                requireStaticMessageChild:
                    "Use only hardcoded string children inside `Translate`. Put dynamic placeholders in the `values` prop instead.",
            },
            schema: [],
            type: "problem",
        },
        name: "string-literal-i18n-messages",
    });

export default rule;
