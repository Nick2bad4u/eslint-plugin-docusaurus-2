/**
 * @packageDocumentation
 * Shared helpers for identifying Docusaurus theme-config link items in navbar
 * and footer arrays.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getObjectPropertyName,
    getStaticStringValue,
} from "./docusaurus-config-ast.js";

/** Theme-config area that owns a discovered link item. */
export type DocusaurusThemeConfigLinkContext = "footer" | "navbar";

const getEnclosingThemeConfigLinkContext = (
    node: Readonly<TSESTree.Node>
): DocusaurusThemeConfigLinkContext | null => {
    let currentNode: Readonly<TSESTree.Node> | undefined = node.parent;

    while (currentNode !== undefined) {
        if (currentNode.type === "Property") {
            const propertyName = getObjectPropertyName(currentNode);

            if (propertyName === "footer" || propertyName === "navbar") {
                return propertyName;
            }
        }

        currentNode = currentNode.parent ?? undefined;
    }

    return null;
};

/**
 * Resolve whether an object expression is authored directly inside a Docusaurus
 * theme-config navbar/footer array.
 */
export const getDocusaurusThemeConfigArrayItemContext = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): DocusaurusThemeConfigLinkContext | null =>
    objectExpression.parent?.type === "ArrayExpression"
        ? getEnclosingThemeConfigLinkContext(objectExpression)
        : null;

/**
 * Resolve whether an object is a default link item authored inside Docusaurus
 * theme-config navbar/footer arrays.
 */
export const getDefaultDocusaurusThemeConfigLinkContext = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): DocusaurusThemeConfigLinkContext | null => {
    const themeConfigLinkContext =
        getDocusaurusThemeConfigArrayItemContext(objectExpression);

    if (themeConfigLinkContext === null) {
        return null;
    }

    if (findObjectPropertyByName(objectExpression, "items") !== null) {
        return null;
    }

    const typeProperty = findObjectPropertyByName(objectExpression, "type");

    if (typeProperty !== null) {
        const typeValue = getStaticStringValue(
            typeProperty.value as TSESTree.Expression
        );

        if (typeValue !== "default") {
            return null;
        }
    }

    return themeConfigLinkContext;
};
