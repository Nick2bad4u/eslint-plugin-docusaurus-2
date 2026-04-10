import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared helpers for Docusaurus classic theme option discovery.
 */
import {
    findClassicPresetOptionsObjects,
    getObjectExpressionPropertyValueByName,
} from "./docusaurus-config-ast.js";
import { findTopLevelModuleConfigurationsByName } from "./docusaurus-module-config.js";

/** Canonical module name for the Docusaurus classic theme package. */
export const themeClassicModuleName = "@docusaurus/theme-classic" as const;
/** Canonical module name for the Docusaurus classic preset package. */
export const themeClassicPresetModuleName =
    "@docusaurus/preset-classic" as const;
/** Canonical module name for the Docusaurus Algolia search theme package. */
export const themeSearchAlgoliaModuleName =
    "@docusaurus/theme-search-algolia" as const;

/**
 * Find all object-literal classic-theme option objects in preset or theme
 * config.
 */
export const findThemeClassicOptionsObjects = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>
): readonly Readonly<TSESTree.ObjectExpression>[] => {
    const themeOptionsObjects: TSESTree.ObjectExpression[] = [];

    for (const presetOptionsObject of findClassicPresetOptionsObjects(
        configObjectExpression
    )) {
        const presetThemeOptionsObject = getObjectExpressionPropertyValueByName(
            presetOptionsObject,
            "theme"
        );

        if (presetThemeOptionsObject !== null) {
            themeOptionsObjects.push(presetThemeOptionsObject);
        }
    }

    for (const themeConfiguration of findTopLevelModuleConfigurationsByName(
        configObjectExpression,
        "themes",
        themeClassicModuleName
    )) {
        if (themeConfiguration.optionsObject !== null) {
            themeOptionsObjects.push(themeConfiguration.optionsObject);
        }
    }

    return themeOptionsObjects;
};
