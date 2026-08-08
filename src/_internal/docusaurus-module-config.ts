import type { ArrayElement } from "type-fest";

import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { isPresent } from "ts-extras";

/**
 * @packageDocumentation
 * Shared helpers for top-level Docusaurus `plugins` and `themes` module arrays.
 */
import type { DocusaurusPluginConfigurationEntry } from "./docusaurus-config-ast.js";

import {
    getArrayExpressionPropertyValueByName,
    getObjectExpressionFromExpressionOrIdentifier,
} from "./docusaurus-config-ast.js";

/** Top-level Docusaurus module array property names. */
export type DocusaurusTopLevelModuleArrayPropertyName = "plugins" | "themes";
/** Module entry shape shared by top-level `plugins` and `themes` arrays. */
export type DocusaurusTopLevelModuleConfigurationEntry =
    DocusaurusPluginConfigurationEntry;

const isMatchingModuleSpecifier = (
    moduleSpecifier:
        | Readonly<ArrayElement<TSESTree.ArrayExpression["elements"]>>
        | undefined,
    moduleName: string
): moduleSpecifier is TSESTree.Literal =>
    moduleSpecifier?.type === AST_NODE_TYPES.Literal &&
    typeof moduleSpecifier.value === "string" &&
    moduleSpecifier.value === moduleName;

const getModuleOptionsObject = (
    moduleOptions: Readonly<TSESTree.Expression>,
    programNode?: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.ObjectExpression> => {
    if (programNode === undefined) {
        return moduleOptions.type === AST_NODE_TYPES.ObjectExpression
            ? moduleOptions
            : null;
    }

    return getObjectExpressionFromExpressionOrIdentifier(
        moduleOptions,
        programNode
    );
};

/** Find all module configurations declared under one top-level array. */
export const findTopLevelModuleConfigurationsByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: DocusaurusTopLevelModuleArrayPropertyName,
    moduleName: string,
    programNode?: Readonly<TSESTree.Program>
): readonly DocusaurusTopLevelModuleConfigurationEntry[] => {
    const modulesArrayExpression = getArrayExpressionPropertyValueByName(
        configObjectExpression,
        propertyName,
        programNode
    );

    if (modulesArrayExpression === null) {
        return [];
    }

    const moduleEntries: DocusaurusTopLevelModuleConfigurationEntry[] = [];

    for (const element of modulesArrayExpression.elements) {
        if (
            element?.type === AST_NODE_TYPES.Literal &&
            typeof element.value === "string" &&
            element.value === moduleName
        ) {
            moduleEntries.push({
                node: element,
                optionsObject: null,
            });

            continue;
        }

        if (element?.type !== AST_NODE_TYPES.ArrayExpression) {
            continue;
        }

        const [moduleSpecifier, moduleOptions] = element.elements;

        if (!isMatchingModuleSpecifier(moduleSpecifier, moduleName)) {
            continue;
        }

        if (
            !isPresent(moduleOptions) ||
            moduleOptions.type === AST_NODE_TYPES.SpreadElement
        ) {
            moduleEntries.push({
                node: element,
                optionsObject: null,
            });

            continue;
        }

        moduleEntries.push({
            node: element,
            optionsExpression: moduleOptions,
            optionsObject: getModuleOptionsObject(moduleOptions, programNode),
        });
    }

    return moduleEntries;
};

/** Find module configurations across both `plugins` and `themes`. */
export const findAnyTopLevelModuleConfigurationsByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    moduleName: string,
    programNode?: Readonly<TSESTree.Program>
): readonly DocusaurusTopLevelModuleConfigurationEntry[] => [
    ...findTopLevelModuleConfigurationsByName(
        configObjectExpression,
        "plugins",
        moduleName,
        programNode
    ),
    ...findTopLevelModuleConfigurationsByName(
        configObjectExpression,
        "themes",
        moduleName,
        programNode
    ),
];

/** Check whether a module is configured in either top-level module array. */
export const hasAnyTopLevelModuleConfigurationByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    moduleName: string,
    programNode?: Readonly<TSESTree.Program>
): boolean =>
    findAnyTopLevelModuleConfigurationsByName(
        configObjectExpression,
        moduleName,
        programNode
    ).length > 0;

/** Get the literal module specifier node for a top-level module entry. */
export const getTopLevelModuleConfigurationSpecifierNode = (
    entry: Readonly<DocusaurusTopLevelModuleConfigurationEntry>
): null | Readonly<TSESTree.Literal> => {
    if (entry.node.type === AST_NODE_TYPES.Literal) {
        return entry.node;
    }

    const [moduleSpecifier] = entry.node.elements;

    return moduleSpecifier?.type === AST_NODE_TYPES.Literal &&
        typeof moduleSpecifier.value === "string"
        ? moduleSpecifier
        : null;
};
