import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared AST and filename helpers for Docusaurus config and sidebar rules.
 */
import * as path from "node:path";

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

const supportedTypeScriptExtensions = new Set([
    ".cts",
    ".mts",
    ".ts",
    ".tsx",
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
    if (expression.type === "Literal" && typeof expression.value === "string") {
        return expression.value;
    }

    if (
        expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0
    ) {
        return expression.quasis[0]?.value.cooked ?? null;
    }

    return null;
};

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
