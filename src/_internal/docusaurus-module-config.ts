import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared helpers for top-level Docusaurus `plugins` and `themes` module arrays.
 */
import type { DocusaurusPluginConfigurationEntry } from "./docusaurus-config-ast.js";

import { getArrayExpressionPropertyValueByName } from "./docusaurus-config-ast.js";

export type DocusaurusTopLevelModuleArrayPropertyName = "plugins" | "themes";
export type DocusaurusTopLevelModuleConfigurationEntry =
    DocusaurusPluginConfigurationEntry;

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

export const hasAnyTopLevelModuleConfigurationByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    moduleName: string
): boolean =>
    findAnyTopLevelModuleConfigurationsByName(
        configObjectExpression,
        moduleName
    ).length > 0;

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
