/**
 * @packageDocumentation
 * Minimal parser used by opt-in Markdown/MDX text-scanning rules.
 */

import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

import { createTextSourceLocator } from "./text-content-lint.js";

/**
 * Parser contract returned to ESLint for raw text content rules.
 *
 * @remarks
 * The AST is intentionally empty because the associated rules operate on
 * `SourceCode#text` and report by raw text locations/ranges.
 */
export type TextContentParser = Readonly<{
    parse: (code: string) => TSESTree.Program;
    parseForESLint: (code: string) => Readonly<{
        ast: TSESTree.Program;
        services: Readonly<Record<string, never>>;
        visitorKeys: Readonly<{ Program: readonly [] }>;
    }>;
}>;

const createTextProgramAst = (code: string): TSESTree.Program => {
    const locator = createTextSourceLocator(code);

    return {
        body: [],
        comments: [],
        loc: locator.createLoc(0, code.length),
        range: [0, code.length],
        sourceType: "module",
        tokens: [],
        type: AST_NODE_TYPES.Program,
    };
};

/** Minimal parser object for text-based Markdown/MDX upgrade rules. */
const textContentParser: TextContentParser = {
    parse(code) {
        return createTextProgramAst(code);
    },
    parseForESLint(code) {
        return {
            ast: createTextProgramAst(code),
            services: {},
            visitorKeys: {
                Program: [],
            },
        };
    },
};

export default textContentParser;
