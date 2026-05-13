/**
 * @packageDocumentation
 * Shared JSX/import helpers for Docusaurus component rules.
 */
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { arrayFirst } from "ts-extras";

/**
 * Collect local names introduced by default imports from one module source.
 */
export const collectDefaultImportLocalNamesFromModule = (
    programNode: Readonly<TSESTree.Program>,
    sourceModuleName: string
): ReadonlySet<string> => {
    const localNames = new Set<string>();

    for (const statement of programNode.body) {
        if (
            statement.type !== AST_NODE_TYPES.ImportDeclaration ||
            statement.source.value !== sourceModuleName
        ) {
            continue;
        }

        for (const specifier of statement.specifiers) {
            if (specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
                localNames.add(specifier.local.name);
            }
        }
    }

    return localNames;
};

/**
 * Get a JSX attribute by name when present.
 */
export const getJsxAttributeByName = (
    openingElement: Readonly<TSESTree.JSXOpeningElement>,
    attributeName: string
): null | TSESTree.JSXAttribute => {
    for (const attribute of openingElement.attributes) {
        if (
            attribute.type === AST_NODE_TYPES.JSXAttribute &&
            attribute.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attribute.name.name === attributeName
        ) {
            return attribute;
        }
    }

    return null;
};

/**
 * Resolve a static string value from a JSX attribute when possible.
 */
export const getStaticStringValueFromJsxAttribute = (
    attribute: Readonly<TSESTree.JSXAttribute>
): null | string => {
    const attributeValue = attribute.value;

    if (attributeValue === null) {
        return null;
    }

    if (attributeValue.type === AST_NODE_TYPES.Literal) {
        return typeof attributeValue.value === "string"
            ? attributeValue.value
            : null;
    }

    if (attributeValue.type !== AST_NODE_TYPES.JSXExpressionContainer) {
        return null;
    }

    const expression = attributeValue.expression;

    if (
        expression.type === AST_NODE_TYPES.Literal &&
        typeof expression.value === "string"
    ) {
        return expression.value;
    }

    return expression.type === AST_NODE_TYPES.TemplateLiteral &&
        expression.expressions.length === 0
        ? (arrayFirst(expression.quasis)?.value.cooked ?? null)
        : null;
};
