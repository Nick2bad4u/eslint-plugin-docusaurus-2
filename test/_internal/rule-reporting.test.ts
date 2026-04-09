import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { describe, expect, it, vi } from "vitest";

import {
    reportResolvedAutofixOrSuggestionOutcome,
    reportWithOptionalFix,
    resolveAutofixOrSuggestionOutcome,
} from "../../src/_internal/rule-reporting";

type MessageId = "reportMessage" | "suggestMessage";

type RuleContextLike = TSESLint.RuleContext<MessageId, readonly unknown[]>;

const node = {
    type: "Identifier",
} as unknown as TSESTree.Node;

const createFix = (): TSESLint.ReportFixFunction => {
    const edit = {
        range: [0, 0] as const,
        text: "replacement",
    };

    return () => edit;
};

const createContext = () => {
    const report = vi.fn<RuleContextLike["report"]>();
    const program = {
        body: [],
        comments: [],
        range: [0, 0],
        sourceType: "module",
        tokens: [],
        type: "Program",
    } as unknown as TSESTree.Program;

    return {
        context: {
            report,
            settings: {},
            sourceCode: {
                ast: program,
            },
        } as unknown as RuleContextLike,
        report,
    };
};

describe("rule-reporting helpers", () => {
    it("reports a message-only descriptor when fix is null", () => {
        expect.hasAssertions();

        const { context, report } = createContext();

        reportWithOptionalFix({
            context,
            fix: null,
            messageId: "reportMessage",
            node,
        });

        expect(report).toHaveBeenCalledOnce();
        expect(report.mock.calls[0]?.[0]).toMatchObject({
            messageId: "reportMessage",
            node,
        });
        expect(report.mock.calls[0]?.[0]).not.toHaveProperty("fix");
    });

    it("reports a direct fix when provided", () => {
        expect.hasAssertions();

        const { context, report } = createContext();
        const fix = createFix();

        reportWithOptionalFix({
            context,
            fix,
            messageId: "reportMessage",
            node,
        });

        expect(report).toHaveBeenCalledOnce();
        expect(report.mock.calls[0]?.[0]).toMatchObject({
            fix,
            messageId: "reportMessage",
            node,
        });
    });

    it("strips the top-level fix when disableAllAutofixes is enabled", () => {
        expect.hasAssertions();

        const { context, report } = createContext();
        const fix = createFix();

        context.settings = {
            "docusaurus-2": {
                disableAllAutofixes: true,
            },
        };

        reportWithOptionalFix({
            context,
            fix,
            messageId: "reportMessage",
            node,
        });

        expect(report).toHaveBeenCalledOnce();
        expect(report.mock.calls[0]?.[0]).toMatchObject({
            messageId: "reportMessage",
            node,
        });
        expect(report.mock.calls[0]?.[0]).not.toHaveProperty("fix");
    });

    it("resolves no-fix, autofix, and suggestion outcomes consistently", () => {
        expect.hasAssertions();

        const fix = createFix();

        expect(
            resolveAutofixOrSuggestionOutcome({
                canAutofix: true,
                fix: null,
            })
        ).toStrictEqual({
            kind: "no-fix",
        });
        expect(
            resolveAutofixOrSuggestionOutcome({
                canAutofix: true,
                fix,
            })
        ).toStrictEqual({
            fix,
            kind: "autofix",
        });
        expect(
            resolveAutofixOrSuggestionOutcome({
                canAutofix: false,
                fix,
            })
        ).toStrictEqual({
            fix,
            kind: "suggestion",
        });
    });

    it("reports suggestion outcomes with suggest entries", () => {
        expect.hasAssertions();

        const { context, report } = createContext();
        const fix = createFix();

        reportResolvedAutofixOrSuggestionOutcome({
            context,
            messageId: "reportMessage",
            node,
            outcome: {
                fix,
                kind: "suggestion",
            },
            suggestionMessageId: "suggestMessage",
        });

        expect(report).toHaveBeenCalledOnce();
        expect(report.mock.calls[0]?.[0]).toMatchObject({
            messageId: "reportMessage",
            node,
            suggest: [
                {
                    fix,
                    messageId: "suggestMessage",
                },
            ],
        });
    });

    it("reports autofix outcomes through the optional-fix path", () => {
        expect.hasAssertions();

        const { context, report } = createContext();
        const fix = createFix();

        reportResolvedAutofixOrSuggestionOutcome({
            context,
            data: {
                value: "x",
            },
            messageId: "reportMessage",
            node,
            outcome: {
                fix,
                kind: "autofix",
            },
            suggestionMessageId: "suggestMessage",
        });

        expect(report).toHaveBeenCalledOnce();
        expect(report.mock.calls[0]?.[0]).toMatchObject({
            data: {
                value: "x",
            },
            fix,
            messageId: "reportMessage",
            node,
        });
    });

    it("reports no-fix outcomes without a fix property", () => {
        expect.hasAssertions();

        const { context, report } = createContext();

        reportResolvedAutofixOrSuggestionOutcome({
            context,
            messageId: "reportMessage",
            node,
            outcome: {
                kind: "no-fix",
            },
            suggestionMessageId: "suggestMessage",
        });

        expect(report).toHaveBeenCalledOnce();
        expect(report.mock.calls[0]?.[0]).toMatchObject({
            messageId: "reportMessage",
            node,
        });
        expect(report.mock.calls[0]?.[0]).not.toHaveProperty("fix");
    });

    it("preserves suggestion entries when autofixes are globally disabled", () => {
        expect.hasAssertions();

        const { context, report } = createContext();
        const fix = createFix();

        context.settings = {
            "docusaurus-2": {
                disableAllAutofixes: true,
            },
        };

        reportResolvedAutofixOrSuggestionOutcome({
            context,
            messageId: "reportMessage",
            node,
            outcome: {
                fix,
                kind: "suggestion",
            },
            suggestionMessageId: "suggestMessage",
        });

        expect(report).toHaveBeenCalledOnce();
        expect(report.mock.calls[0]?.[0]).toMatchObject({
            messageId: "reportMessage",
            node,
            suggest: [
                {
                    fix,
                    messageId: "suggestMessage",
                },
            ],
        });
    });
});
