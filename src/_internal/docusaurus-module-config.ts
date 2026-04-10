import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared helpers for top-level Docusaurus `plugins` and `themes` module arrays.
 */
import type { DocusaurusPluginConfigurationEntry } from "./docusaurus-config-ast.js";

import { getArrayExpressionPropertyValueByName } from "./docusaurus-config-ast.js";

/** Top-level Docusaurus module array property names. */
export type DocusaurusTopLevelModuleArrayPropertyName = "plugins" | "themes";
/** Module entry shape shared by top-level `plugins` and `themes` arrays. */
export type DocusaurusTopLevelModuleConfigurationEntry =
    DocusaurusPluginConfigurationEntry;

/** Find all module configurations declared under one top-level array. */
export const findTopLevelModuleConfigurationsByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: DocusaurusTopLevelModuleArrayPropertyName,
    moduleName: string
): readonly DocusaurusTopLevelModuleConfigurationEntry[] => {
    const modulesArrayExpression = getArrayExpressionPropertyValueByName(
        configObjectExpression,
        propertyName
    );

    if (modulesArrayExpression === null) {
        return [];
    }

    const moduleEntries: DocusaurusTopLevelModuleConfigurationEntry[] = [];

    for (const element of modulesArrayExpression.elements) {
        if (
            element?.type === "Literal" &&
            typeof element.value === "string" &&
            element.value === moduleName
        ) {
            moduleEntries.push({
                node: element,
                optionsObject: null,
            });

            continue;
        }

        if (element?.type !== "ArrayExpression") {
            continue;
        }

        const [moduleSpecifier, moduleOptions] = element.elements;

        if (
            moduleSpecifier?.type !== "Literal" ||
            typeof moduleSpecifier.value !== "string" ||
            moduleSpecifier.value !== moduleName
        ) {
            continue;
        }

        if (
            moduleOptions === undefined ||
            moduleOptions === null ||
            moduleOptions.type === "SpreadElement"
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
            optionsObject:
                moduleOptions.type === "ObjectExpression"
                    ? moduleOptions
                    : null,
        });
    }

    return moduleEntries;
};

/** Find module configurations across both `plugins` and `themes`. */
export const findAnyTopLevelModuleConfigurationsByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    moduleName: string
): readonly DocusaurusTopLevelModuleConfigurationEntry[] => [
    ...findTopLevelModuleConfigurationsByName(
        configObjectExpression,
        "plugins",
        moduleName
    ),
    ...findTopLevelModuleConfigurationsByName(
        configObjectExpression,
        "themes",
        moduleName
    ),
];

/** Check whether a module is configured in either top-level module array. */
export const hasAnyTopLevelModuleConfigurationByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    moduleName: string
): boolean =>
    findAnyTopLevelModuleConfigurationsByName(
        configObjectExpression,
        moduleName
    ).length > 0;

/** Get the literal module specifier node for a top-level module entry. */
export const getTopLevelModuleConfigurationSpecifierNode = (
    entry: Readonly<DocusaurusTopLevelModuleConfigurationEntry>
): null | Readonly<TSESTree.Literal> => {
    if (entry.node.type === "Literal") {
        return entry.node;
    }

    const [moduleSpecifier] = entry.node.elements;

    return moduleSpecifier?.type === "Literal" &&
        typeof moduleSpecifier.value === "string"
        ? moduleSpecifier
        : null;
};
