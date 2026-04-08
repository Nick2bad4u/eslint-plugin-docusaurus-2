/**
 * @packageDocumentation
 * ESLint rule implementation for `no-mixed-sidebar-link-kinds`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getObjectPropertyName,
    getStaticStringValue,
    hasGeneratedIndexMetadataProperties,
    isDocusaurusSidebarCategoryObject,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const generatedIndexMetadataPropertyNames = [
    "description",
    "image",
    "keywords",
    "slug",
    "title",
] as const;

type MessageIds =
    | "noMixedSidebarLinkKinds"
    | "removeDocIdFromGeneratedIndexLink"
    | "removeGeneratedIndexMetadataFromDocLink";

type MixedSidebarLinkKindSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

/** Rule module for `no-mixed-sidebar-link-kinds`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSidebarFilePath(context.filename)) {
                return {};
            }

            return {
                'Property[key.type="Identifier"][key.name="link"], Property[key.type="Literal"][key.value="link"]'(
                    node: TSESTree.Node
                ) {
                    if (
                        node.type !== "Property" ||
                        node.value.type !== "ObjectExpression"
                    ) {
                        return;
                    }

                    const propertyName = getObjectPropertyName(node);

                    if (propertyName !== "link") {
                        return;
                    }

                    const parentObject = node.parent;

                    if (
                        parentObject?.type !== "ObjectExpression" ||
                        !isDocusaurusSidebarCategoryObject(parentObject)
                    ) {
                        return;
                    }

                    const linkObject = node.value;
                    const idProperty = findObjectPropertyByName(
                        linkObject,
                        "id"
                    );

                    if (
                        idProperty === null ||
                        !hasGeneratedIndexMetadataProperties(linkObject)
                    ) {
                        return;
                    }

                    const typeProperty = findObjectPropertyByName(
                        linkObject,
                        "type"
                    );
                    const typeValue =
                        typeProperty === null
                            ? null
                            : getStaticStringValue(
                                  typeProperty.value as TSESTree.Expression
                              );
                    const metadataProperties =
                        generatedIndexMetadataPropertyNames
                            .map((propertyName_) =>
                                findObjectPropertyByName(
                                    linkObject,
                                    propertyName_
                                )
                            )
                            .filter(
                                (property): property is TSESTree.Property =>
                                    property !== null
                            );
                    const suggestions:
                        | readonly MixedSidebarLinkKindSuggestion[]
                        | undefined =
                        typeValue === "generated-index"
                            ? [
                                  {
                                      fix: (fixer) =>
                                          createRemoveCommaSeparatedItemsFixes(
                                              fixer,
                                              context.sourceCode,
                                              {
                                                  container: linkObject,
                                                  items: linkObject.properties,
                                                  itemsToRemove: [idProperty],
                                              }
                                          ),
                                      messageId:
                                          "removeDocIdFromGeneratedIndexLink",
                                  },
                              ]
                            : typeValue === "doc" &&
                                metadataProperties.length > 0
                              ? [
                                    {
                                        fix: (fixer) =>
                                            createRemoveCommaSeparatedItemsFixes(
                                                fixer,
                                                context.sourceCode,
                                                {
                                                    container: linkObject,
                                                    items: linkObject.properties,
                                                    itemsToRemove:
                                                        metadataProperties,
                                                }
                                            ),
                                        messageId:
                                            "removeGeneratedIndexMetadataFromDocLink",
                                    },
                                ]
                              : undefined;

                    context.report({
                        messageId: "noMixedSidebarLinkKinds",
                        node: idProperty.key,
                        ...(suggestions === undefined
                            ? {}
                            : {
                                  suggest: suggestions,
                              }),
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow Docusaurus sidebar category link objects from mixing `doc`-style and `generated-index`-style fields.",
                frozen: false,
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-mixed-sidebar-link-kinds",
            },
            hasSuggestions: true,
            messages: {
                noMixedSidebarLinkKinds:
                    "Do not mix `id` with generated-index metadata in the same sidebar category link object. Choose one Docusaurus link kind and keep its fields consistent.",
                removeDocIdFromGeneratedIndexLink:
                    "Remove `id` so this link stays a generated-index link.",
                removeGeneratedIndexMetadataFromDocLink:
                    "Remove generated-index metadata so this link stays a doc link.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-mixed-sidebar-link-kinds",
    });

export default rule;
