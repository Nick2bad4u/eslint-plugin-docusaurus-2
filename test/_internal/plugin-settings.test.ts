import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { describe, expect, it } from "vitest";

import type { UnknownArray } from "../../src/_internal/types";

import { registerProgramSettingsForContext } from "../../src/_internal/plugin-settings";

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

describe(registerProgramSettingsForContext, () => {
    it("defaults to leaving autofixes enabled when plugin settings are absent", () => {
        expect.hasAssertions();

        const program = createProgramNode();
        const context = createContext({
            program,
            settings: {},
        });

        const parsedSettings = registerProgramSettingsForContext(context);

        expect(parsedSettings.disableAllAutofixes).toBeFalsy();
        expect(Object.isFrozen(parsedSettings)).toBeTruthy();
    });

    it("reads disableAllAutofixes from the docusaurus-2 settings key", () => {
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
    });

    it("reuses cached settings for the same program", () => {
        expect.hasAssertions();

        const program = createProgramNode();
        const firstContext = createContext({
            program,
            settings: {
                "docusaurus-2": {
                    disableAllAutofixes: true,
                },
            },
        });
        const secondContext = createContext({
            program,
            settings: {
                "docusaurus-2": {
                    disableAllAutofixes: false,
                },
            },
        });

        const firstSettings = registerProgramSettingsForContext(firstContext);
        const secondSettings = registerProgramSettingsForContext(secondContext);

        expect(secondSettings).toBe(firstSettings);
        expect(secondSettings.disableAllAutofixes).toBeTruthy();
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
    });
});
