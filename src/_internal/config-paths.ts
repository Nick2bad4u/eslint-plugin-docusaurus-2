import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { isDefined } from "ts-extras";
import ts from "typescript";

/**
 * @packageDocumentation
 * Shared helpers for statically resolving config-authored file paths.
 */
import {
    getExpressionFromExpressionOrIdentifier,
    getStaticStringValue,
} from "./docusaurus-config-ast.js";

/** Resolved static path information extracted from config-authored input. */
export type StaticConfiguredPathResolution = Readonly<{
    configuredPath: string;
    resolutionKind: ResolutionKind;
    resolvedPath: string;
}>;

type ResolutionKind = "path" | "require-resolve";

const existenceCache = new Map<string, boolean>();

const isAbsoluteWindowsPath = (value: string): boolean =>
    /^[A-Za-z]:(?:\/|\\\\)/v.test(value);

const isPathLikeSpecifier = (value: string): boolean =>
    value.startsWith("./") ||
    value.startsWith("../") ||
    value.startsWith("/") ||
    isAbsoluteWindowsPath(value);

const isRequireResolveCallExpression = (
    expression: Readonly<TSESTree.Expression>
): expression is TSESTree.CallExpression => {
    if (expression.type !== AST_NODE_TYPES.CallExpression) {
        return false;
    }

    const callee = expression.callee;

    return (
        callee.type === AST_NODE_TYPES.MemberExpression &&
        !callee.computed &&
        callee.object.type === AST_NODE_TYPES.Identifier &&
        callee.object.name === "require" &&
        callee.property.type === AST_NODE_TYPES.Identifier &&
        callee.property.name === "resolve"
    );
};

const getConfigFileDirectoryPath = (configFilePath: string): string =>
    path.dirname(path.resolve(configFilePath));

const createRequireFromConfigFile = (configFilePath: string) =>
    createRequire(pathToFileURL(path.resolve(configFilePath)).href);

const resolveRequireSpecifierPath = (
    configFilePath: string,
    specifier: string
): null | string => {
    if (isPathLikeSpecifier(specifier)) {
        return path.resolve(
            getConfigFileDirectoryPath(configFilePath),
            specifier
        );
    }

    try {
        return createRequireFromConfigFile(configFilePath).resolve(specifier);
    } catch {
        return null;
    }
};

/** Resolve a statically configured path or `require.resolve()` target. */
export const getStaticConfiguredPathResolution = (
    expression: Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>,
    configFilePath: string
): null | StaticConfiguredPathResolution => {
    const resolvedExpression = getExpressionFromExpressionOrIdentifier(
        expression,
        programNode
    );

    if (resolvedExpression === null) {
        return null;
    }

    const staticStringValue = getStaticStringValue(resolvedExpression);

    if (staticStringValue !== null) {
        if (!isPathLikeSpecifier(staticStringValue)) {
            return null;
        }

        return {
            configuredPath: staticStringValue,
            resolutionKind: "path",
            resolvedPath: path.resolve(
                getConfigFileDirectoryPath(configFilePath),
                staticStringValue
            ),
        };
    }

    if (!isRequireResolveCallExpression(resolvedExpression)) {
        return null;
    }

    const [firstArgument] = resolvedExpression.arguments;

    if (
        firstArgument === undefined ||
        firstArgument.type === AST_NODE_TYPES.SpreadElement
    ) {
        return null;
    }

    const requireResolveSpecifier = getStaticStringValue(firstArgument);

    if (requireResolveSpecifier === null) {
        return null;
    }

    const resolvedPath = resolveRequireSpecifierPath(
        configFilePath,
        requireResolveSpecifier
    );

    return resolvedPath === null
        ? null
        : {
              configuredPath: requireResolveSpecifier,
              resolutionKind: "require-resolve",
              resolvedPath,
          };
};

/** Check whether a resolved filesystem path currently exists. */
export const doesResolvedPathExist = (resolvedPath: string): boolean => {
    const normalizedPath = path.normalize(resolvedPath);
    const cachedExists = existenceCache.get(normalizedPath);

    if (isDefined(cachedExists)) {
        return cachedExists;
    }

    const isExists = ts.sys.fileExists(normalizedPath);

    existenceCache.set(normalizedPath, isExists);

    return isExists;
};
