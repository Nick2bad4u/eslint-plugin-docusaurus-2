import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared AST and filename helpers for Docusaurus config and sidebar rules.
 */
import * as path from "node:path";

import { safeCastTo } from "./runtime-utils.js";

const supportedConfigExtensions = new Set([
    ".cjs",
    ".cts",
    ".js",
    ".jsx",
    ".mjs",
    ".mts",
    ".ts",
    ".tsx",
]);

const supportedStyleExtensions = new Set([
    ".css",
    ".sass",
    ".scss",
]);

const supportedScriptExtensions = new Set([
    ".cjs",
    ".cts",
    ".js",
    ".jsx",
    ".mjs",
    ".mts",
    ".ts",
    ".tsx",
]);

const supportedTypeScriptExtensions = new Set([
    ".cts",
    ".mts",
    ".ts",
    ".tsx",
]);

const generatedIndexMetadataPropertyNames = [
    "description",
    "image",
    "keywords",
    "slug",
    "title",
] as const;

const docusaurusClassicPresetModuleNames = new Set([
    "@docusaurus/preset-classic",
    "classic",
]);

const defaultExportDeclarationType = "ExportDefaultDeclaration" as const;

const normalizeFilePath = (filePath: string): string =>
    filePath.replaceAll("\\", "/");

const getPathSegments = (filePath: string): readonly string[] =>
    normalizeFilePath(filePath)
        .split("/")
        .filter((pathSegment) => pathSegment.length > 0);

const hasPathSegmentSequence = (
    filePath: string,
    segmentSequence: readonly string[]
): boolean => {
    const pathSegments = getPathSegments(filePath);

    if (pathSegments.length < segmentSequence.length) {
        return false;
    }

    for (
        let startIndex = 0;
        startIndex <= pathSegments.length - segmentSequence.length;
        startIndex += 1
    ) {
        const matchesSequence = segmentSequence.every(
            (segment, sequenceIndex) =>
                pathSegments[startIndex + sequenceIndex] === segment
        );

        if (matchesSequence) {
            return true;
        }
    }

    return false;
};

const unwrapTransparentExpression = (
    expression: Readonly<TSESTree.Expression>
): Readonly<TSESTree.Expression> => {
    if (expression.type === "TSAsExpression") {
        return unwrapTransparentExpression(expression.expression);
    }

    if (expression.type === "TSSatisfiesExpression") {
        return unwrapTransparentExpression(expression.expression);
    }

    if (expression.type === "TSTypeAssertion") {
        return unwrapTransparentExpression(expression.expression);
    }

    return expression;
};

const getObjectExpressionFromExpression = (
    expression: Readonly<TSESTree.Expression>
): null | Readonly<TSESTree.ObjectExpression> => {
    const unwrappedExpression = unwrapTransparentExpression(expression);

    return unwrappedExpression.type === "ObjectExpression"
        ? unwrappedExpression
        : null;
};

const resolveExpressionForIdentifier = (
    identifierName: string,
    programNode: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.Expression> => {
    for (const statement of programNode.body) {
        if (statement.type !== "VariableDeclaration") {
            continue;
        }

        for (const declaration of statement.declarations) {
            if (
                declaration.id.type !== "Identifier" ||
                declaration.id.name !== identifierName ||
                declaration.init === null
            ) {
                continue;
            }

            return declaration.init;
        }
    }

    return null;
};

const resolveObjectExpressionForIdentifier = (
    identifierName: string,
    programNode: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.ObjectExpression> => {
    for (const statement of programNode.body) {
        if (statement.type !== "VariableDeclaration") {
            continue;
        }

        for (const declaration of statement.declarations) {
            if (
                declaration.id.type !== "Identifier" ||
                declaration.id.name !== identifierName ||
                declaration.init === null
            ) {
                continue;
            }

            const objectExpression = getObjectExpressionFromExpression(
                declaration.init
            );

            if (objectExpression !== null) {
                return objectExpression;
            }
        }
    }

    return null;
};

/**
 * Determine whether a filename is a Docusaurus config module.
 *
 * @param filePath - Absolute or relative file path.
 *
 * @returns `true` when the file basename matches `docusaurus.config.*`.
 */
export const isDocusaurusConfigFilePath = (filePath: string): boolean => {
    const normalizedPath = normalizeFilePath(filePath);
    const baseName = path.posix.basename(normalizedPath);

    return (
        baseName.startsWith("docusaurus.config") &&
        supportedConfigExtensions.has(path.posix.extname(baseName))
    );
};

/**
 * Determine whether a filename is a Docusaurus sidebars module.
 *
 * @param filePath - Absolute or relative file path.
 *
 * @returns `true` when the file basename starts with `sidebars`.
 */
export const isDocusaurusSidebarFilePath = (filePath: string): boolean => {
    const normalizedPath = normalizeFilePath(filePath);
    const baseName = path.posix.basename(normalizedPath);

    return (
        baseName.startsWith("sidebars") &&
        supportedConfigExtensions.has(path.posix.extname(baseName))
    );
};

/**
 * Determine whether a filename is a TypeScript-based Docusaurus sidebars
 * module.
 */
export const isTypeScriptDocusaurusSidebarFilePath = (
    filePath: string
): boolean => {
    const normalizedPath = normalizeFilePath(filePath);
    const baseName = path.posix.basename(normalizedPath);

    return (
        baseName.startsWith("sidebars") &&
        supportedTypeScriptExtensions.has(path.posix.extname(baseName))
    );
};

/**
 * Determine whether a filename is a TypeScript-based Docusaurus config module.
 */
export const isTypeScriptDocusaurusConfigFilePath = (
    filePath: string
): boolean => {
    const normalizedPath = normalizeFilePath(filePath);
    const baseName = path.posix.basename(normalizedPath);

    return (
        baseName.startsWith("docusaurus.config") &&
        supportedTypeScriptExtensions.has(path.posix.extname(baseName))
    );
};

/**
 * Determine whether a filename belongs to a Docusaurus site component module.
 */
export const isDocusaurusSiteComponentFilePath = (filePath: string): boolean =>
    hasPathSegmentSequence(filePath, ["src", "components"]);

/**
 * Determine whether a filename belongs to a Docusaurus site page module.
 */
export const isDocusaurusSitePageFilePath = (filePath: string): boolean =>
    hasPathSegmentSequence(filePath, ["src", "pages"]);

/**
 * Determine whether a filename is a routable Docusaurus site page module.
 *
 * @remarks
 * Docusaurus ignores files prefixed with `_`, common test-file patterns, and
 * `__tests__` folders under `src/pages` by default. This helper follows those
 * same default routing exclusions when narrowing page modules for rules.
 */
export const isRoutableDocusaurusSitePageFilePath = (
    filePath: string
): boolean => {
    if (!isDocusaurusSitePageFilePath(filePath)) {
        return false;
    }

    const normalizedPath = normalizeFilePath(filePath);
    const baseName = path.posix.basename(normalizedPath);
    const extension = path.posix.extname(baseName);

    if (!supportedScriptExtensions.has(extension)) {
        return false;
    }

    if (baseName.startsWith("_")) {
        return false;
    }

    if (/\.(?:spec|test)\.[^.]+$/u.test(baseName)) {
        return false;
    }

    return !hasPathSegmentSequence(normalizedPath, ["__tests__"]);
};

/**
 * Determine whether an import specifier points at a stylesheet.
 */
export const isStylesheetImportSpecifier = (importSource: string): boolean =>
    supportedStyleExtensions.has(path.posix.extname(importSource));

/**
 * Determine whether an import specifier points at a CSS/Sass module file.
 */
export const isModuleStylesheetImportSpecifier = (
    importSource: string
): boolean =>
    /\.module\.(?:css|sass|scss)$/u.test(importSource) &&
    isStylesheetImportSpecifier(importSource);

/**
 * Determine whether a stylesheet import specifier points at a page stylesheet.
 */
export const isPageStylesheetImportSpecifier = (
    importSource: string
): boolean =>
    isModuleStylesheetImportSpecifier(importSource) &&
    hasPathSegmentSequence(importSource, ["pages"]);

/**
 * Resolve the non-computed property name when statically known.
 *
 * @param property - Candidate object property.
 *
 * @returns Static property name when available; otherwise `null`.
 */
export const getObjectPropertyName = (
    property: Readonly<TSESTree.Property>
): null | string => {
    if (property.computed) {
        return null;
    }

    if (property.key.type === "Identifier") {
        return property.key.name;
    }

    if (
        property.key.type === "Literal" &&
        typeof property.key.value === "string"
    ) {
        return property.key.value;
    }

    return null;
};

/**
 * Find a named property on an object expression.
 *
 * @param objectExpression - Object expression to inspect.
 * @param propertyName - Expected property name.
 *
 * @returns Matching property when present; otherwise `null`.
 */
export const findObjectPropertyByName = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: string
): null | TSESTree.Property => {
    for (const property of objectExpression.properties) {
        if (property.type !== "Property") {
            continue;
        }

        if (getObjectPropertyName(property) === propertyName) {
            return property;
        }
    }

    return null;
};

/**
 * Resolve an object-property value expression by property name.
 */
export const getObjectPropertyValueByName = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: string
): null | Readonly<TSESTree.Expression> => {
    const property = findObjectPropertyByName(objectExpression, propertyName);

    return property === null
        ? null
        : unwrapTransparentExpression(
              safeCastTo<Readonly<TSESTree.Expression>>(property.value)
          );
};

/**
 * Resolve an object-expression property value by property name.
 */
export const getObjectExpressionPropertyValueByName = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: string,
    programNode?: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.ObjectExpression> => {
    const propertyValue = getObjectPropertyValueByName(
        objectExpression,
        propertyName
    );

    if (propertyValue === null) {
        return null;
    }

    return programNode === undefined
        ? getObjectExpressionFromExpression(propertyValue)
        : getObjectExpressionFromExpressionOrIdentifier(
              propertyValue,
              programNode
          );
};

/**
 * Resolve an array-expression property value by property name.
 */
export const getArrayExpressionPropertyValueByName = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: string,
    programNode?: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.ArrayExpression> => {
    const propertyValue = getObjectPropertyValueByName(
        objectExpression,
        propertyName
    );

    if (propertyValue === null) {
        return null;
    }

    return programNode === undefined
        ? propertyValue.type === "ArrayExpression"
            ? propertyValue
            : null
        : getArrayExpressionFromExpressionOrIdentifier(
              propertyValue,
              programNode
          );
};

/**
 * Resolve a nested property by a sequence of object-property names.
 */
export const findNestedObjectPropertyByNamePath = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyNamePath: readonly string[]
): null | TSESTree.Property => {
    let currentObjectExpression: Readonly<TSESTree.ObjectExpression> =
        objectExpression;
    let currentProperty: null | TSESTree.Property = null;

    for (const [index, propertyName] of propertyNamePath.entries()) {
        currentProperty = findObjectPropertyByName(
            currentObjectExpression,
            propertyName
        );

        if (currentProperty === null) {
            return null;
        }

        if (index === propertyNamePath.length - 1) {
            return currentProperty;
        }

        if (currentProperty.value.type !== "ObjectExpression") {
            return null;
        }

        currentObjectExpression = currentProperty.value;
    }

    return currentProperty;
};

/**
 * Resolve a static string value from a literal or no-expression template.
 *
 * @param expression - Candidate expression.
 *
 * @returns Static string value when available; otherwise `null`.
 */
export const getStaticStringValue = (
    expression: Readonly<TSESTree.Expression>
): null | string => {
    const unwrappedExpression = unwrapTransparentExpression(expression);

    if (
        unwrappedExpression.type === "Literal" &&
        typeof unwrappedExpression.value === "string"
    ) {
        return unwrappedExpression.value;
    }

    if (
        unwrappedExpression.type === "TemplateLiteral" &&
        unwrappedExpression.expressions.length === 0
    ) {
        return unwrappedExpression.quasis[0]?.value.cooked ?? null;
    }

    return null;
};

/**
 * Resolve a static string value from a literal, template, or identifier bound
 * to a static string expression in the same program.
 */
export const getStaticStringValueFromExpressionOrIdentifier = (
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): null | string => {
    const directValue = getStaticStringValue(expression);

    if (directValue !== null) {
        return directValue;
    }

    if (expression.type !== "Identifier") {
        return null;
    }

    const resolvedExpression = resolveExpressionForIdentifier(
        expression.name,
        programNode
    );

    return resolvedExpression === null
        ? null
        : getStaticStringValue(resolvedExpression);
};

/**
 * Resolve a static boolean value from a literal or identifier bound to a static
 * boolean expression in the same program.
 */
export const getStaticBooleanValueFromExpressionOrIdentifier = (
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean | null | undefined => {
    const unwrappedExpression = unwrapTransparentExpression(expression);

    if (
        unwrappedExpression.type === "Literal" &&
        typeof unwrappedExpression.value === "boolean"
    ) {
        return unwrappedExpression.value;
    }

    if (
        unwrappedExpression.type === "Literal" ||
        (unwrappedExpression.type === "TemplateLiteral" &&
            unwrappedExpression.expressions.length === 0)
    ) {
        return null;
    }

    if (unwrappedExpression.type !== "Identifier") {
        return undefined;
    }

    const resolvedExpression = resolveExpressionForIdentifier(
        unwrappedExpression.name,
        programNode
    );

    if (resolvedExpression === null) {
        return undefined;
    }

    return getStaticBooleanValueFromExpressionOrIdentifier(
        resolvedExpression,
        programNode
    );
};

/**
 * Resolve an expression from a direct expression or an identifier bound in the
 * same program.
 */
export const getExpressionFromExpressionOrIdentifier = (
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.Expression> => {
    const unwrappedExpression = unwrapTransparentExpression(expression);

    if (unwrappedExpression.type !== "Identifier") {
        return unwrappedExpression;
    }

    const resolvedExpression = resolveExpressionForIdentifier(
        unwrappedExpression.name,
        programNode
    );

    return resolvedExpression === null
        ? null
        : unwrapTransparentExpression(resolvedExpression);
};

/**
 * Resolve an object expression from a direct expression or an identifier bound
 * to an object expression in the same program.
 */
export const getObjectExpressionFromExpressionOrIdentifier = (
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.ObjectExpression> => {
    const resolvedExpression = getExpressionFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (resolvedExpression === null) {
        return null;
    }

    return getObjectExpressionFromExpression(resolvedExpression);
};

/**
 * Resolve an array expression from a direct expression or from an identifier
 * bound to an array expression in the same program.
 */
export const getArrayExpressionFromExpressionOrIdentifier = (
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.ArrayExpression> => {
    if (expression.type === "ArrayExpression") {
        return expression;
    }

    if (expression.type !== "Identifier") {
        return null;
    }

    const resolvedExpression = resolveExpressionForIdentifier(
        expression.name,
        programNode
    );

    return resolvedExpression?.type === "ArrayExpression"
        ? resolvedExpression
        : null;
};

/**
 * Determine whether an object expression looks like a Docusaurus sidebar
 * category item.
 */
export const isDocusaurusSidebarCategoryObject = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean => {
    const typeProperty = findObjectPropertyByName(objectExpression, "type");
    const typeValue =
        typeProperty === null
            ? null
            : getStaticStringValue(typeProperty.value as TSESTree.Expression);

    return (
        typeValue === "category" ||
        findObjectPropertyByName(objectExpression, "items") !== null
    );
};

/**
 * Determine whether an object expression uses generated-index metadata keys.
 */
export const hasGeneratedIndexMetadataProperties = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean =>
    generatedIndexMetadataPropertyNames.some(
        (propertyName) =>
            findObjectPropertyByName(objectExpression, propertyName) !== null
    );

/**
 * Determine whether a string is an internal route-like value for Docusaurus.
 *
 * @param value - Static string value to inspect.
 *
 * @returns `true` when the string looks like a site-internal absolute route.
 */
export const isInternalRouteLikeValue = (value: string): boolean =>
    value.startsWith("/") && !value.startsWith("//");

/**
 * Determine whether a string is an external link-like value for Docusaurus.
 *
 * @param value - Static string value to inspect.
 *
 * @returns `true` when the string looks like an external destination.
 */
export const isExternalLinkLikeValue = (value: string): boolean =>
    /^https?:\/\//u.test(value) ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("//");

/**
 * Resolve the default-exported object expression from a Docusaurus config file.
 */
export const getDefaultExportedObjectExpression = (
    programNode: Readonly<TSESTree.Program>
): null | Readonly<TSESTree.ObjectExpression> => {
    for (const statement of programNode.body) {
        if (statement.type !== defaultExportDeclarationType) {
            continue;
        }

        const exportDeclaration = statement.declaration;

        if (exportDeclaration.type === "Identifier") {
            return resolveObjectExpressionForIdentifier(
                exportDeclaration.name,
                programNode
            );
        }

        if (exportDeclaration.type === "ObjectExpression") {
            return exportDeclaration;
        }

        if (
            exportDeclaration.type === "TSAsExpression" ||
            exportDeclaration.type === "TSSatisfiesExpression" ||
            exportDeclaration.type === "TSTypeAssertion"
        ) {
            return getObjectExpressionFromExpression(exportDeclaration);
        }
    }

    return null;
};

/**
 * Find all classic-preset option objects declared in a Docusaurus config.
 */
export const findClassicPresetOptionsObjects = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    programNode?: Readonly<TSESTree.Program>
): readonly Readonly<TSESTree.ObjectExpression>[] => {
    const presetsArrayExpression = getArrayExpressionPropertyValueByName(
        configObjectExpression,
        "presets",
        programNode
    );

    if (presetsArrayExpression === null) {
        return [];
    }

    const presetOptionsObjects: TSESTree.ObjectExpression[] = [];

    for (const element of presetsArrayExpression.elements) {
        if (element?.type !== "ArrayExpression") {
            continue;
        }

        const [presetSpecifier, presetOptions] = element.elements;

        if (
            presetSpecifier?.type !== "Literal" ||
            typeof presetSpecifier.value !== "string" ||
            !docusaurusClassicPresetModuleNames.has(presetSpecifier.value) ||
            presetOptions === undefined ||
            presetOptions === null ||
            presetOptions.type === "SpreadElement"
        ) {
            continue;
        }

        const presetOptionsObject =
            programNode === undefined
                ? presetOptions.type === "ObjectExpression"
                    ? presetOptions
                    : null
                : getObjectExpressionFromExpressionOrIdentifier(
                      presetOptions,
                      programNode
                  );

        if (presetOptionsObject === null) {
            continue;
        }

        presetOptionsObjects.push(presetOptionsObject);
    }

    return presetOptionsObjects;
};

/** Plugin configuration entry resolved from the top-level `plugins` array. */
export type DocusaurusPluginConfigurationEntry = Readonly<{
    node: Readonly<TSESTree.ArrayExpression | TSESTree.Literal>;
    optionsExpression?: Readonly<TSESTree.Expression>;
    optionsObject: null | Readonly<TSESTree.ObjectExpression>;
}>;

/**
 * Find all plugin configurations declared for one plugin specifier.
 */
export const findPluginConfigurationsByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    pluginName: string,
    programNode?: Readonly<TSESTree.Program>
): readonly DocusaurusPluginConfigurationEntry[] => {
    const pluginsArrayExpression = getArrayExpressionPropertyValueByName(
        configObjectExpression,
        "plugins",
        programNode
    );

    if (pluginsArrayExpression === null) {
        return [];
    }

    const pluginEntries: DocusaurusPluginConfigurationEntry[] = [];

    for (const element of pluginsArrayExpression.elements) {
        if (
            element?.type === "Literal" &&
            typeof element.value === "string" &&
            element.value === pluginName
        ) {
            pluginEntries.push({
                node: element,
                optionsObject: null,
            });

            continue;
        }

        if (element?.type !== "ArrayExpression") {
            continue;
        }

        const [pluginSpecifier, pluginOptions] = element.elements;

        if (
            pluginSpecifier?.type !== "Literal" ||
            typeof pluginSpecifier.value !== "string" ||
            pluginSpecifier.value !== pluginName
        ) {
            continue;
        }

        if (
            pluginOptions === undefined ||
            pluginOptions === null ||
            pluginOptions.type === "SpreadElement"
        ) {
            pluginEntries.push({
                node: element,
                optionsObject: null,
            });

            continue;
        }

        pluginEntries.push({
            node: element,
            optionsExpression: pluginOptions,
            optionsObject:
                pluginOptions.type === "ObjectExpression"
                    ? pluginOptions
                    : null,
        });
    }

    return pluginEntries;
};

/**
 * Find all object-literal plugin options declared for one plugin specifier.
 */
export const findPluginOptionsObjectsByName = (
    configObjectExpression: Readonly<TSESTree.ObjectExpression>,
    pluginName: string,
    programNode?: Readonly<TSESTree.Program>
): readonly Readonly<TSESTree.ObjectExpression>[] =>
    findPluginConfigurationsByName(
        configObjectExpression,
        pluginName,
        programNode
    )
        .map((entry) => entry.optionsObject)
        .filter(
            (optionsObject): optionsObject is TSESTree.ObjectExpression =>
                optionsObject !== null
        );
