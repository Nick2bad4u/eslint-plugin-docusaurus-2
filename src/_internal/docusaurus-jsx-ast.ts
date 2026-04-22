/**
 * @packageDocumentation
 * Shared JSX/import helpers for Docusaurus component rules.
 */
import type { TSESTree } from "@typescript-eslint/utils";

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
            statement.type !== "ImportDeclaration" ||
            statement.source.value !== sourceModuleName
        ) {
            continue;
        }

        for (const specifier of statement.specifiers) {
            if (specifier.type === "ImportDefaultSpecifier") {
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
            attribute.type === "JSXAttribute" &&
            attribute.name.type === "JSXIdentifier" &&
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

    if (attributeValue.type === "Literal") {
        return typeof attributeValue.value === "string"
            ? attributeValue.value
            : null;
    }

    if (attributeValue.type !== "JSXExpressionContainer") {
        return null;
    }

    const expression = attributeValue.expression;

    if (expression.type === "Literal" && typeof expression.value === "string") {
        return expression.value;
    }

    return expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0
        ? (arrayFirst(expression.quasis)?.value.cooked ?? null)
        : null;
};
