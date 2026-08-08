/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-docusaurus-heading`.
 *
 * Adapted from `@docusaurus/eslint-plugin` under the MIT License.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { isDefined, setHas } from "ts-extras";

import { getJsxAttributeByName } from "../_internal/docusaurus-jsx-ast.js";
import {
    collectModuleImportBindings,
    combineImportBindings,
    getVisibleDefaultImportJsxTagNameAtNode,
} from "../_internal/module-import-bindings.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const docusaurusHeadingModuleSource = "@theme/Heading" as const;
const headingElementNames = new Set([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
]);

type MessageIds = "preferDocusaurusHeading" | "replaceWithDocusaurusHeading";

const combineDefaultImportBindings = (
    bindings: ReturnType<typeof collectModuleImportBindings>
): ReadonlyMap<string, TSESTree.Identifier> =>
    combineImportBindings(
        bindings.defaultBindings,
        bindings.namedBindings.get("default") ?? new Map()
    );

/** Rule module for `prefer-docusaurus-heading`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            const moduleBindings = collectModuleImportBindings(
                context.sourceCode.ast,
                docusaurusHeadingModuleSource
            );
            const directHeadingBindings =
                combineDefaultImportBindings(moduleBindings);

            const checkJsxOpeningElement = (
                node: Readonly<TSESTree.JSXOpeningElement>
            ): void => {
                if (
                    node.name.type !== AST_NODE_TYPES.JSXIdentifier ||
                    !setHas(headingElementNames, node.name.name)
                ) {
                    return;
                }

                const intrinsicHeadingName = node.name.name;

                const headingTagName = getVisibleDefaultImportJsxTagNameAtNode(
                    context,
                    node,
                    directHeadingBindings,
                    moduleBindings.namespaceBindings
                );
                const parent = node.parent;
                const hasAmbiguousAttributes =
                    getJsxAttributeByName(node, "as") !== null ||
                    node.attributes.some(
                        (attribute) =>
                            attribute.type === AST_NODE_TYPES.JSXSpreadAttribute
                    );
                const canSuggest =
                    isDefined(headingTagName) && !hasAmbiguousAttributes;
                const suggestions = canSuggest
                    ? [
                          {
                              fix(fixer: Readonly<TSESLint.RuleFixer>) {
                                  const fixes: TSESLint.RuleFix[] = [
                                      fixer.replaceText(
                                          node.name,
                                          `${headingTagName} as="${intrinsicHeadingName}"`
                                      ),
                                  ];

                                  if (
                                      parent.closingElement?.name.type ===
                                      AST_NODE_TYPES.JSXIdentifier
                                  ) {
                                      fixes.push(
                                          fixer.replaceText(
                                              parent.closingElement.name,
                                              headingTagName
                                          )
                                      );
                                  }

                                  return fixes;
                              },
                              messageId:
                                  "replaceWithDocusaurusHeading" as const,
                          },
                      ]
                    : undefined;

                context.report({
                    data: { headingName: intrinsicHeadingName },
                    messageId: "preferDocusaurusHeading",
                    node: node.name,
                    ...(isDefined(suggestions) && {
                        suggest: suggestions,
                    }),
                });
            };

            return {
                JSXOpeningElement: checkJsxOpeningElement,
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "enforce using the Docusaurus theme `Heading` component instead of intrinsic heading elements.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-docusaurus-heading",
            },
            hasSuggestions: true,
            languages: ["js/js"],
            messages: {
                preferDocusaurusHeading:
                    "Use the `Heading` component from `@theme/Heading` instead of `<{{headingName}}>`.",
                replaceWithDocusaurusHeading:
                    "Replace this intrinsic heading with the imported Docusaurus `Heading` component.",
            },
            schema: [],
            type: "problem",
        },
        name: "prefer-docusaurus-heading",
    });

export default rule;
