import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { describe, expect, it } from "vitest";

import type { UnknownArray } from "../../src/_internal/types";

import {
    isImportInsertionFixesDisabledForNode,
    registerProgramSettingsForContext,
} from "../../src/_internal/plugin-settings";

const createProgramNode = (): TSESTree.Program =>
    ({
        body: [],
        comments: [],
        range: [0, 0],
        sourceType: "module",
        tokens: [],
        type: "Program",
    }) as unknown as TSESTree.Program;

const createContext = ({
    program,
    settings,
}: Readonly<{
    program: TSESTree.Program;
    settings: unknown;
}>): TSESLint.RuleContext<string, UnknownArray> =>
    ({
        filename: "test-file.ts",
        id: "plugin-settings-test-rule",
        languageOptions: {
            parser: {
                meta: {
                    name: "@typescript-eslint/parser",
                },
            },
        },
        options: [],
        report: () => undefined,
        settings,
        sourceCode: {
            ast: program,
        },
    }) as unknown as TSESLint.RuleContext<string, UnknownArray>;

const createNodeInProgram = (program: TSESTree.Program): TSESTree.Node =>
    ({
        parent: program,
        type: "Identifier",
    }) as unknown as TSESTree.Node;

describe(registerProgramSettingsForContext, () => {
    it("reads disableImportInsertionFixes from the docusaurus-2 settings key", () => {
        expect.hasAssertions();

        const program = createProgramNode();
        const context = createContext({
            program,
            settings: {
                "docusaurus-2": {
                    disableImportInsertionFixes: true,
                },
            },
        });

        const parsedSettings = registerProgramSettingsForContext(context);

        expect(parsedSettings.disableAllAutofixes).toBeFalsy();
        expect(parsedSettings.disableImportInsertionFixes).toBeTruthy();
        expect(Object.isFrozen(parsedSettings)).toBeTruthy();
    });

    it("treats disableAllAutofixes as dominant over import-only settings", () => {
        expect.hasAssertions();

        const program = createProgramNode();
        const context = createContext({
            program,
            settings: {
                "docusaurus-2": {
                    disableAllAutofixes: true,
                },
            },
        });

        const parsedSettings = registerProgramSettingsForContext(context);

        expect(parsedSettings.disableAllAutofixes).toBeTruthy();
        expect(parsedSettings.disableImportInsertionFixes).toBeTruthy();
    });

    it("reuses cached settings for the same program", () => {
        expect.hasAssertions();

        const program = createProgramNode();
        const firstContext = createContext({
            program,
            settings: {
                "docusaurus-2": {
                    disableImportInsertionFixes: true,
                },
            },
        });
        const secondContext = createContext({
            program,
            settings: {
                "docusaurus-2": {
                    disableImportInsertionFixes: false,
                },
            },
        });

        const firstSettings = registerProgramSettingsForContext(firstContext);
        const secondSettings = registerProgramSettingsForContext(secondContext);

        expect(secondSettings).toBe(firstSettings);
        expect(secondSettings.disableImportInsertionFixes).toBeTruthy();
    });

    it("treats invalid plugin settings as disabled", () => {
        expect.hasAssertions();

        const program = createProgramNode();
        const context = createContext({
            program,
            settings: {
                "docusaurus-2": ["invalid"],
            },
        });

        const parsedSettings = registerProgramSettingsForContext(context);

        expect(parsedSettings.disableAllAutofixes).toBeFalsy();
        expect(parsedSettings.disableImportInsertionFixes).toBeFalsy();
    });
});

describe(isImportInsertionFixesDisabledForNode, () => {
    it("reads memoized settings from the enclosing program", () => {
        expect.hasAssertions();

        const program = createProgramNode();
        const context = createContext({
            program,
            settings: {
                "docusaurus-2": {
                    disableImportInsertionFixes: true,
                },
            },
        });
        const node = createNodeInProgram(program);

        registerProgramSettingsForContext(context);

        expect(isImportInsertionFixesDisabledForNode(node)).toBeTruthy();
    });
});
