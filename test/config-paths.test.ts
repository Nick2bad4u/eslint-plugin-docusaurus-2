/**
 * @packageDocumentation
 * Vitest coverage for internal configured-path resolution helpers.
 */

import type { TSESTree } from "@typescript-eslint/utils";

import tsParser from "@typescript-eslint/parser";
import { describe, expect, it } from "vitest";

import {
    doesResolvedPathExist,
    getStaticConfiguredPathResolution,
} from "../src/_internal/config-paths";
import {
    getDefaultExportedObjectExpression,
    getObjectPropertyValueByName,
} from "../src/_internal/docusaurus-config-ast";
import { repoPath } from "./_internal/ruleTester";

const getConfigPropertyExpression = (
    code: string,
    propertyName: string
): Readonly<{
    expression: TSESTree.Expression;
    programNode: TSESTree.Program;
}> => {
    const programNode = tsParser.parse(code, {
        ecmaVersion: "latest",
        sourceType: "module",
    });
    const configObjectExpression =
        getDefaultExportedObjectExpression(programNode);

    if (configObjectExpression === null) {
        throw new TypeError("Expected default-exported config object.");
    }

    const propertyExpression = getObjectPropertyValueByName(
        configObjectExpression,
        propertyName
    );

    if (propertyExpression === null) {
        throw new TypeError(`Expected property '${propertyName}'.`);
    }

    return {
        expression: propertyExpression,
        programNode,
    };
};

describe("config-paths", () => {
    it("resolves static relative path strings", () => {
        expect.hasAssertions();

        const { expression, programNode } = getConfigPropertyExpression(
            'export default { customCss: "./src/css/custom.css" };',
            "customCss"
        );

        expect(
            getStaticConfiguredPathResolution(
                expression,
                programNode,
                repoPath("docs", "docusaurus", "docusaurus.config.ts")
            )
        ).toStrictEqual({
            configuredPath: "./src/css/custom.css",
            resolutionKind: "path",
            resolvedPath: repoPath(
                "docs",
                "docusaurus",
                "src",
                "css",
                "custom.css"
            ),
        });
    });

    it("returns null for non-path static strings", () => {
        expect.hasAssertions();

        const { expression, programNode } = getConfigPropertyExpression(
            'export default { customCss: "theme-search" };',
            "customCss"
        );

        expect(
            getStaticConfiguredPathResolution(
                expression,
                programNode,
                repoPath("docs", "docusaurus", "docusaurus.config.ts")
            )
        ).toBeNull();
    });

    it("resolves require.resolve targets", () => {
        expect.hasAssertions();

        const { expression, programNode } = getConfigPropertyExpression(
            'export default { customCss: require.resolve("./src/css/custom.css") };',
            "customCss"
        );
        const resolution = getStaticConfiguredPathResolution(
            expression,
            programNode,
            repoPath("docs", "docusaurus", "docusaurus.config.ts")
        );

        expect(resolution).toStrictEqual({
            configuredPath: "./src/css/custom.css",
            resolutionKind: "require-resolve",
            resolvedPath: repoPath(
                "docs",
                "docusaurus",
                "src",
                "css",
                "custom.css"
            ),
        });
    });

    it("returns null for dynamic require.resolve arguments", () => {
        expect.hasAssertions();

        const { expression, programNode } = getConfigPropertyExpression(
            'const value = "./src/css/custom.css"; export default { customCss: require.resolve(value) };',
            "customCss"
        );

        expect(
            getStaticConfiguredPathResolution(
                expression,
                programNode,
                repoPath("docs", "docusaurus", "docusaurus.config.ts")
            )
        ).toBeNull();
    });

    it("checks resolved path existence", () => {
        expect.hasAssertions();

        expect(
            doesResolvedPathExist(
                repoPath("docs", "docusaurus", "src", "css", "custom.css")
            )
        ).toBeTruthy();
        expect(
            doesResolvedPathExist(
                repoPath("docs", "docusaurus", "src", "css", "missing.css")
            )
        ).toBeFalsy();
    });
});
