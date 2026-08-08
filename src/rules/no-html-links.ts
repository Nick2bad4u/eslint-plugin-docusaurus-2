/**
 * @packageDocumentation
 * ESLint rule implementation for `no-html-links`.
 *
 * Adapted from `@docusaurus/eslint-plugin` under the MIT License.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { isDefined } from "ts-extras";

import {
    getJsxAttributeByName,
    getStaticStringValueFromJsxAttribute,
} from "../_internal/docusaurus-jsx-ast.js";
import {
    collectModuleImportBindings,
    combineImportBindings,
    getVisibleDefaultImportJsxTagNameAtNode,
} from "../_internal/module-import-bindings.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type Options = readonly [
    Readonly<{
        ignoreFullyResolved?: boolean;
    }>,
];

const defaultOptions: Options = [{ ignoreFullyResolved: false }];
const docusaurusLinkModuleSource = "@docusaurus/Link" as const;

type MessageIds = "preferDocusaurusLink" | "replaceWithDocusaurusLink";

const isFullyResolvedUrl = (value: string): boolean => {
    try {
        const url = new URL(value);

        return url.protocol.length > 0;
    } catch {
        return false;
    }
};

const combineDefaultImportBindings = (
    bindings: ReturnType<typeof collectModuleImportBindings>
): ReadonlyMap<string, TSESTree.Identifier> =>
    combineImportBindings(
        bindings.defaultBindings,
        bindings.namedBindings.get("default") ?? new Map()
    );

/** Rule module for `no-html-links`. */
const rule: TSESLint.RuleModule<MessageIds, Options> = createTypedRule({
    create(context, [options]) {
        const moduleBindings = collectModuleImportBindings(
            context.sourceCode.ast,
            docusaurusLinkModuleSource
        );
        const linkBindings = combineDefaultImportBindings(moduleBindings);

        const checkJsxOpeningElement = (
            node: Readonly<TSESTree.JSXOpeningElement>
        ): void => {
            if (
                node.name.type !== AST_NODE_TYPES.JSXIdentifier ||
                node.name.name !== "a"
            ) {
                return;
            }

            const hrefAttribute = getJsxAttributeByName(node, "href");
            const hrefAttributeCount = node.attributes.filter(
                (attribute) =>
                    attribute.type === AST_NODE_TYPES.JSXAttribute &&
                    attribute.name.type === AST_NODE_TYPES.JSXIdentifier &&
                    attribute.name.name === "href"
            ).length;
            const hrefValue =
                hrefAttribute === null
                    ? null
                    : getStaticStringValueFromJsxAttribute(hrefAttribute);

            const shouldIgnoreFullyResolvedUrl =
                options.ignoreFullyResolved === true
                    ? hrefValue !== null && isFullyResolvedUrl(hrefValue)
                    : false;

            if (shouldIgnoreFullyResolvedUrl) {
                return;
            }

            const linkTagName = getVisibleDefaultImportJsxTagNameAtNode(
                context,
                node,
                linkBindings,
                moduleBindings.namespaceBindings
            );
            const parent = node.parent;
            const hasAmbiguousAttributes =
                getJsxAttributeByName(node, "to") !== null ||
                node.attributes.some(
                    (attribute) =>
                        attribute.type === AST_NODE_TYPES.JSXSpreadAttribute
                );
            const canSuggest =
                isDefined(linkTagName) &&
                hrefAttribute !== null &&
                hrefAttributeCount === 1 &&
                !hasAmbiguousAttributes;
            const suggestions = canSuggest
                ? [
                      {
                          fix(fixer: Readonly<TSESLint.RuleFixer>) {
                              const fixes: TSESLint.RuleFix[] = [
                                  fixer.replaceText(node.name, linkTagName),
                                  fixer.replaceText(hrefAttribute.name, "to"),
                              ];

                              if (
                                  parent.closingElement?.name.type ===
                                  AST_NODE_TYPES.JSXIdentifier
                              ) {
                                  fixes.push(
                                      fixer.replaceText(
                                          parent.closingElement.name,
                                          linkTagName
                                      )
                                  );
                              }

                              return fixes;
                          },
                          messageId: "replaceWithDocusaurusLink" as const,
                      },
                  ]
                : undefined;

            context.report({
                messageId: "preferDocusaurusLink",
                node: node.name,
                ...(isDefined(suggestions) && { suggest: suggestions }),
            });
        };

        return {
            JSXOpeningElement: checkJsxOpeningElement,
        };
    },
    defaultOptions,
    meta: {
        defaultOptions: [...defaultOptions],
        deprecated: false,
        docs: {
            description:
                "enforce using the Docusaurus `Link` component instead of intrinsic anchor elements.",
            frozen: false,
            presets: [
                "recommended",
                "strict",
                "all",
                "experimental",
            ],
            recommended: true,
            url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-html-links",
        },
        hasSuggestions: true,
        languages: ["js/js"],
        messages: {
            preferDocusaurusLink:
                "Use the `Link` component from `@docusaurus/Link` instead of an intrinsic `<a>` element for navigation.",
            replaceWithDocusaurusLink:
                "Replace this anchor with the imported Docusaurus `Link` component.",
        },
        schema: [
            {
                additionalProperties: false,
                description:
                    "Controls whether static fully resolved URLs may remain intrinsic anchors.",
                properties: {
                    ignoreFullyResolved: {
                        description:
                            "Allow static URLs with an explicit protocol, such as https, mailto, or tel.",
                        type: "boolean",
                    },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
    name: "no-html-links",
});

export default rule;
