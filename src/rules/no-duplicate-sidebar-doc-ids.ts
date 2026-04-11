/**
 * @packageDocumentation
 * ESLint rule implementation for `no-duplicate-sidebar-doc-ids`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectPropertyName,
    getStaticStringValue,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type DocOccurrence = Readonly<{
    docId: string;
    node: Readonly<TSESTree.Expression | TSESTree.Property>;
    occurrenceKind: "explicit-doc-item" | "shorthand";
    typeProperty?: Readonly<TSESTree.Property>;
}>;

type DuplicateSidebarDocSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

type MessageIds = "duplicateSidebarDocId" | "preferRefForDuplicateSidebarDocId";

type NodeWithOptionalParent = Readonly<TSESTree.Node> & {
    parent?: Readonly<TSESTree.Node>;
};

const getParentNode = (
    node: Readonly<TSESTree.Node>
): Readonly<TSESTree.Node> | undefined =>
    (node as NodeWithOptionalParent).parent;

const getStaticDocId = (
    expression: Readonly<TSESTree.Expression>
): string | undefined => {
    const staticStringValue = getStaticStringValue(expression);

    return staticStringValue === null ? undefined : staticStringValue;
};

const isSidebarItemsArrayExpression = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>,
    rootObjectExpression: Readonly<TSESTree.ObjectExpression>
): boolean => {
    const parentProperty = getParentNode(arrayExpression);

    if (parentProperty?.type !== "Property") {
        return false;
    }

    const propertyOwner = parentProperty.parent;

    if (propertyOwner?.type !== "ObjectExpression") {
        return false;
    }

    const propertyName = getObjectPropertyName(parentProperty);

    if (propertyName === "items") {
        return true;
    }

    if (propertyOwner === rootObjectExpression) {
        return true;
    }

    const ownerParent = getParentNode(propertyOwner);

    return ownerParent?.type === "ArrayExpression"
        ? isSidebarItemsArrayExpression(ownerParent, rootObjectExpression)
        : false;
};

const collectDuplicateSidebarDocOccurrences = (
    rootObjectExpression: Readonly<TSESTree.ObjectExpression>
): readonly DocOccurrence[] => {
    const occurrences: DocOccurrence[] = [];

    const visitExpression = (
        expression: Readonly<TSESTree.Expression>
    ): void => {
        if (expression.type === "ArrayExpression") {
            for (const element of expression.elements) {
                if (element === null) {
                    continue;
                }

                if (
                    element.type === "Literal" &&
                    typeof element.value === "string" &&
                    isSidebarItemsArrayExpression(
                        expression,
                        rootObjectExpression
                    )
                ) {
                    occurrences.push({
                        docId: element.value,
                        node: element,
                        occurrenceKind: "shorthand",
                    });

                    continue;
                }

                if (element.type !== "SpreadElement") {
                    visitExpression(element);
                }
            }

            return;
        }

        if (expression.type !== "ObjectExpression") {
            return;
        }

        const typeProperty = findObjectPropertyByName(expression, "type");
        const idProperty = findObjectPropertyByName(expression, "id");
        const parentProperty = getParentNode(expression);
        const parentPropertyName =
            parentProperty?.type === "Property"
                ? getObjectPropertyName(parentProperty)
                : null;

        if (
            parentPropertyName !== "link" &&
            typeProperty !== null &&
            idProperty !== null &&
            getStaticStringValue(typeProperty.value as TSESTree.Expression) ===
                "doc"
        ) {
            const docId = getStaticDocId(
                idProperty.value as TSESTree.Expression
            );

            if (docId !== undefined) {
                occurrences.push({
                    docId,
                    node: idProperty,
                    occurrenceKind: "explicit-doc-item",
                    typeProperty,
                });
            }
        }

        for (const property of expression.properties) {
            if (property.type !== "Property") {
                continue;
            }

            visitExpression(property.value as TSESTree.Expression);
        }
    };

    visitExpression(rootObjectExpression);

    return occurrences;
};

const createQuotedStringLiteralText = (
    node: Readonly<TSESTree.Expression>,
    value: string
): string =>
    node.type === "Literal" &&
    typeof node.raw === "string" &&
    node.raw.startsWith("'")
        ? `'${value}'`
        : `"${value}"`;

const createSuggestionsForDuplicateSidebarDocOccurrence = (
    occurrence: Readonly<DocOccurrence>
): readonly DuplicateSidebarDocSuggestion[] | undefined => {
    const typeProperty = occurrence.typeProperty;

    if (
        occurrence.occurrenceKind === "explicit-doc-item" &&
        typeProperty !== undefined
    ) {
        return [
            {
                fix: (fixer) =>
                    fixer.replaceText(
                        typeProperty.value,
                        createQuotedStringLiteralText(
                            typeProperty.value as TSESTree.Expression,
                            "ref"
                        )
                    ),
                messageId: "preferRefForDuplicateSidebarDocId",
            },
        ];
    }

    if (
        occurrence.occurrenceKind === "shorthand" &&
        occurrence.node.type === "Literal"
    ) {
        return [
            {
                fix: (fixer) =>
                    fixer.replaceText(
                        occurrence.node,
                        `{ type: "ref", id: ${JSON.stringify(occurrence.docId)} }`
                    ),
                messageId: "preferRefForDuplicateSidebarDocId",
            },
        ];
    }

    return undefined;
};

/** Rule module for `no-duplicate-sidebar-doc-ids`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSidebarFilePath(context.filename)) {
                return {};
            }

            return {
                Program(programNode: TSESTree.Program) {
                    const rootObjectExpression =
                        getDefaultExportedObjectExpression(programNode);

                    if (rootObjectExpression === null) {
                        return;
                    }

                    const firstOccurrenceByDocId = new Map<
                        string,
                        DocOccurrence
                    >();

                    for (const occurrence of collectDuplicateSidebarDocOccurrences(
                        rootObjectExpression
                    )) {
                        const firstOccurrence = firstOccurrenceByDocId.get(
                            occurrence.docId
                        );

                        if (firstOccurrence === undefined) {
                            firstOccurrenceByDocId.set(
                                occurrence.docId,
                                occurrence
                            );

                            continue;
                        }

                        const suggestions =
                            createSuggestionsForDuplicateSidebarDocOccurrence(
                                occurrence
                            );

                        context.report({
                            data: {
                                docId: occurrence.docId,
                            },
                            messageId: "duplicateSidebarDocId",
                            node: occurrence.node,
                            ...(suggestions === undefined
                                ? {}
                                : {
                                      suggest: suggestions,
                                  }),
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            docs: {
                description:
                    "disallow assigning the same Docusaurus doc id to multiple sidebar doc items in one sidebars file.",
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-sidebar-doc-ids",
            },
            hasSuggestions: true,
            messages: {
                duplicateSidebarDocId:
                    "Doc `{{ docId }}` is already assigned earlier in this sidebars file. Docusaurus recommends using `ref` instead of assigning the same doc to multiple sidebars.",
                preferRefForDuplicateSidebarDocId:
                    "Convert this repeated doc item to `ref` so the doc is not assigned to multiple sidebars.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-duplicate-sidebar-doc-ids",
    });

export default rule;
