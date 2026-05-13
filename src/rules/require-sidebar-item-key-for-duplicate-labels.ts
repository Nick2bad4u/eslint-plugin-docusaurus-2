/**
 * @packageDocumentation
 * ESLint rule implementation for `require-sidebar-item-key-for-duplicate-labels`.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { safeCastTo } from "ts-extras";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectPropertyName,
    getObjectPropertyValueExpression,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireSidebarItemKeyForDuplicateLabels";

type NodeWithOptionalParent = Readonly<TSESTree.Node> & {
    parent?: Readonly<TSESTree.Node>;
};

type SidebarLabeledItem = Readonly<{
    label: string;
    labelExpression: Readonly<TSESTree.Expression>;
    objectExpression: Readonly<TSESTree.ObjectExpression>;
}>;

const getParentNode = (
    node: Readonly<TSESTree.Node>
): Readonly<TSESTree.Node> | undefined =>
    safeCastTo<NodeWithOptionalParent>(node).parent;

const normalizeLabelForComparison = (label: string): string =>
    label.trim().toLowerCase();

const isSidebarItemsArrayExpression = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>,
    rootObjectExpression: Readonly<TSESTree.ObjectExpression>
): boolean => {
    const parentProperty = getParentNode(arrayExpression);

    if (parentProperty?.type !== AST_NODE_TYPES.Property) {
        return false;
    }

    const propertyOwner = parentProperty.parent;

    if (propertyOwner?.type !== AST_NODE_TYPES.ObjectExpression) {
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

    return ownerParent?.type === AST_NODE_TYPES.ArrayExpression
        ? isSidebarItemsArrayExpression(ownerParent, rootObjectExpression)
        : false;
};

const getSidebarLabeledItems = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>,
    programNode: Readonly<TSESTree.Program>
): readonly SidebarLabeledItem[] => {
    const labeledItems: SidebarLabeledItem[] = [];

    for (const element of arrayExpression.elements) {
        if (element?.type !== AST_NODE_TYPES.ObjectExpression) {
            continue;
        }

        const labelProperty = findObjectPropertyByName(element, "label");

        if (labelProperty === null) {
            continue;
        }

        const labelExpression = getObjectPropertyValueExpression(labelProperty);
        const staticLabel = getStaticStringValueFromExpressionOrIdentifier(
            labelExpression,
            programNode
        );

        if (staticLabel === null || staticLabel.trim().length === 0) {
            continue;
        }

        labeledItems.push({
            label: staticLabel.trim(),
            labelExpression,
            objectExpression: element,
        });
    }

    return labeledItems;
};

const collectDuplicateGroupsByLabel = (
    labeledItems: readonly SidebarLabeledItem[]
): ReadonlyMap<string, readonly SidebarLabeledItem[]> => {
    const duplicateGroups = new Map<string, SidebarLabeledItem[]>();

    for (const item of labeledItems) {
        const normalizedLabel = normalizeLabelForComparison(item.label);
        const group = duplicateGroups.get(normalizedLabel) ?? [];

        group.push(item);
        duplicateGroups.set(normalizedLabel, group);
    }

    return duplicateGroups;
};

const reportDuplicateSidebarLabelItems = (
    context: Readonly<TSESLint.RuleContext<MessageIds, typeof defaultOptions>>,
    duplicateItems: readonly SidebarLabeledItem[]
): void => {
    if (duplicateItems.length < 2) {
        return;
    }

    for (const item of duplicateItems) {
        if (findObjectPropertyByName(item.objectExpression, "key") !== null) {
            continue;
        }

        context.report({
            data: { label: item.label },
            messageId: "requireSidebarItemKeyForDuplicateLabels",
            node: item.labelExpression,
        });
    }
};

/** Rule module for `require-sidebar-item-key-for-duplicate-labels`. */
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

                    const sidebarRootObjectExpression = rootObjectExpression;

                    const visitors = {
                        visitArrayExpression(
                            arrayExpression: Readonly<TSESTree.ArrayExpression>
                        ): void {
                            if (
                                isSidebarItemsArrayExpression(
                                    arrayExpression,
                                    sidebarRootObjectExpression
                                )
                            ) {
                                const labeledItems = getSidebarLabeledItems(
                                    arrayExpression,
                                    programNode
                                );
                                const duplicateGroups =
                                    collectDuplicateGroupsByLabel(labeledItems);

                                for (const duplicateItems of duplicateGroups.values()) {
                                    reportDuplicateSidebarLabelItems(
                                        context,
                                        duplicateItems
                                    );
                                }
                            }

                            for (const element of arrayExpression.elements) {
                                if (
                                    element?.type ===
                                    AST_NODE_TYPES.ArrayExpression
                                ) {
                                    visitors.visitArrayExpression(element);
                                }

                                if (
                                    element?.type !==
                                    AST_NODE_TYPES.ObjectExpression
                                ) {
                                    continue;
                                }

                                visitors.visitNode(element);
                            }
                        },

                        visitNode(node: Readonly<TSESTree.Node>): void {
                            if (node.type === AST_NODE_TYPES.ArrayExpression) {
                                visitors.visitArrayExpression(node);

                                return;
                            }

                            if (node.type !== AST_NODE_TYPES.ObjectExpression) {
                                return;
                            }

                            for (const property of node.properties) {
                                if (
                                    property.type === AST_NODE_TYPES.Property &&
                                    property.value.type ===
                                        AST_NODE_TYPES.ArrayExpression
                                ) {
                                    visitors.visitArrayExpression(
                                        property.value
                                    );
                                }
                            }
                        },
                    };

                    visitors.visitNode(sidebarRootObjectExpression);
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require explicit sidebar item `key` values when duplicate static labels appear in the same sidebar items array.",
                frozen: false,
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-item-key-for-duplicate-labels",
            },
            messages: {
                requireSidebarItemKeyForDuplicateLabels:
                    "Duplicate sidebar label {{ label }} should declare an explicit `key` to avoid translation key conflicts.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-sidebar-item-key-for-duplicate-labels",
    });

export default rule;
