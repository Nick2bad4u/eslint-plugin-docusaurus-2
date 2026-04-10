import type { TSESTree } from "@typescript-eslint/utils";

import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * @packageDocumentation
 * Shared helpers for statically resolving config-authored file paths.
 */
import {
    getExpressionFromExpressionOrIdentifier,
    getStaticStringValue,
} from "./docusaurus-config-ast.js";

export type StaticConfiguredPathResolution = Readonly<{
    configuredPath: string;
    resolutionKind: ResolutionKind;
    resolvedPath: string;
}>;

type ResolutionKind = "path" | "require-resolve";

const existenceCache = new Map<string, boolean>();

const isAbsoluteWindowsPath = (value: string): boolean =>
    /^[A-Za-z]:[/\\]/u.test(value);

const isPathLikeSpecifier = (value: string): boolean =>
    value.startsWith("./") ||
    value.startsWith("../") ||
    value.startsWith("/") ||
    isAbsoluteWindowsPath(value);

const isRequireResolveCallExpression = (
    expression: Readonly<TSESTree.Expression>
): expression is TSESTree.CallExpression => {
    if (expression.type !== "CallExpression") {
        return false;
    }

    const callee = expression.callee;

    return (
        callee.type === "MemberExpression" &&
        !callee.computed &&
        callee.object.type === "Identifier" &&
        callee.object.name === "require" &&
        callee.property.type === "Identifier" &&
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

    if (firstArgument === undefined || firstArgument.type === "SpreadElement") {
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

    if (cachedExists !== undefined) {
        return cachedExists;
    }

    const exists = fs.existsSync(normalizedPath);

    existenceCache.set(normalizedPath, exists);

    return exists;
};
