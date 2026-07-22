/**
 * @packageDocumentation
 * ESLint rule implementation for `no-untranslated-text`.
 *
 * Adapted from `@docusaurus/eslint-plugin` under the MIT License.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";

import {
    collectDocusaurusTranslateBindings,
    isUntranslatedTextLabel,
    isWithinDocusaurusTranslate,
} from "../_internal/docusaurus-translation-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type Options = readonly [
    Readonly<{
        ignoredStrings?: readonly string[];
    }>,
];

const defaultOptions = [{ ignoredStrings: [] }] as const;

type MessageIds = "wrapUntranslatedText";

/** Rule module for `no-untranslated-text`. */
const rule: TSESLint.RuleModule<MessageIds, Options> = createTypedRule({
    create(context, [options]) {
        const ignoredStrings = new Set(options.ignoredStrings);
        const translateBindings = collectDocusaurusTranslateBindings(
            context.sourceCode.ast
        );

        const checkTextChild = (child: Readonly<TSESTree.JSXChild>): void => {
            if (
                !isUntranslatedTextLabel(child, ignoredStrings) ||
                isWithinDocusaurusTranslate(context, child, translateBindings)
            ) {
                return;
            }

            context.report({
                messageId: "wrapUntranslatedText",
                node: child,
            });
        };

        const checkJsxExpressionContainer = (
            node: Readonly<TSESTree.JSXExpressionContainer>
        ): void => {
            if (
                node.parent.type !== AST_NODE_TYPES.JSXElement &&
                node.parent.type !== AST_NODE_TYPES.JSXFragment
            ) {
                return;
            }

            checkTextChild(node);
        };

        return {
            JSXExpressionContainer: checkJsxExpressionContainer,
            JSXText: checkTextChild,
        };
    },
    defaultOptions,
    meta: {
        defaultOptions: [...defaultOptions],
        deprecated: false,
        docs: {
            configs: ["i18n"],
            description:
                "require static JSX text labels to be wrapped by imported Docusaurus translation APIs.",
            frozen: false,
            presets: [
                "strict",
                "all",
                "experimental",
            ],
            recommended: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-untranslated-text",
        },
        languages: ["js/js"],
        messages: {
            wrapUntranslatedText:
                "Wrap this user-facing text with the `Translate` component from `@docusaurus/Translate`, or translate it before rendering.",
        },
        schema: [
            {
                additionalProperties: false,
                description:
                    "Controls exact static label tokens that may remain untranslated.",
                properties: {
                    ignoredStrings: {
                        description:
                            "Whitespace-delimited label tokens that the rule should ignore.",
                        items: {
                            type: "string",
                        },
                        type: "array",
                        uniqueItems: true,
                    },
                },
                type: "object",
            },
        ],
        type: "suggestion",
    },
    name: "no-untranslated-text",
});

export default rule;
