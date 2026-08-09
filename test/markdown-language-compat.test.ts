/**
 * @packageDocumentation
 * Integration coverage for content rules composed with ESLint Markdown.
 */
import markdown from "@eslint/markdown";
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

import docusaurus2Plugin from "../src/plugin";

const contentRuleNames = [
    "no-deprecated-admonition-title-syntax",
    "no-deprecated-heading-id-syntax",
    "no-deprecated-html-comments-in-mdx",
    "require-mermaid-elk-package-installed",
] as const;
const expectedRuleIds = contentRuleNames.map(
    (ruleName) => `docusaurus-2/${ruleName}`
);
const markdownLanguages = ["markdown/commonmark", "markdown/gfm"] as const;
const supportedTextRuleLanguages = ["js/js", ...markdownLanguages] as const;
const invalidMdxContent = [
    ":::warning Pay Attention",
    "Read this first.",
    ":::",
    "",
    "# Intro {#intro}",
    "",
    "<!-- legacy comment -->",
    "",
    "```mermaid",
    "---",
    "config:",
    "  layout: elk",
    "---",
    "flowchart LR",
    "  A --> B",
    "```",
].join("\n");

describe("markdown language compatibility", () => {
    it("publishes the complete supported-language contract", () => {
        expect.assertions(4);

        for (const ruleName of contentRuleNames) {
            const rule = docusaurus2Plugin.rules[ruleName];
            const languages = Reflect.get(rule?.meta ?? {}, "languages");

            expect(languages).toStrictEqual(supportedTextRuleLanguages);
        }
    });

    it.each(markdownLanguages)(
        "runs every content rule when a later config selects %s",
        async (language) => {
            expect.assertions(2);

            const eslint = new ESLint({
                cwd: process.cwd(),
                overrideConfig: [
                    docusaurus2Plugin.configs.content,
                    {
                        files: ["**/*.{md,mdx}"],
                        language,
                        plugins: {
                            markdown,
                        },
                    },
                ],
                overrideConfigFile: true,
            });
            const [result] = await eslint.lintText(invalidMdxContent, {
                filePath: "docs/guide.mdx",
            });
            const messages = result?.messages ?? [];

            expect(messages.some((message) => message.fatal === true)).toBe(
                false
            );
            expect(
                messages
                    .map((message) => message.ruleId)
                    .filter((ruleId): ruleId is string => ruleId !== null)
                    .toSorted((left, right) => left.localeCompare(right))
            ).toStrictEqual(
                expectedRuleIds.toSorted((left, right) =>
                    left.localeCompare(right)
                )
            );
        }
    );
});
