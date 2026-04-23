/**
 * @packageDocumentation
 * ESLint rule implementation for `require-mermaid-elk-package-installed`.
 */

import type { TSESLint } from "@typescript-eslint/utils";

import { arrayFirst, isDefined, stringSplit } from "ts-extras";

import { isPackageDeclaredInNearestManifest } from "../_internal/package-manifest.js";
import {
    collectFencedCodeBlocks,
    createTextSourceLocator,
} from "../_internal/text-content-lint.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const mermaidElkPackageName = "@mermaid-js/layout-elk" as const;

type MessageIds = "requireMermaidElkPackageInstalled";

const getPrimaryFenceLanguage = (infoString: string): string => {
    const firstWhitespaceIndex = infoString.search(/\s/u);

    return (
        firstWhitespaceIndex === -1
            ? infoString
            : infoString.slice(0, firstWhitespaceIndex)
    )
        .trim()
        .toLowerCase();
};

const usesMermaidElkLayout = (blockContent: string): boolean => {
    const trimmedContent = blockContent.trimStart();

    if (!trimmedContent.startsWith("---")) {
        return false;
    }

    const normalizedFrontmatterContent = trimmedContent.replaceAll(
        "\r\n",
        "\n"
    );
    const frontmatterLines = stringSplit(normalizedFrontmatterContent, "\n");

    if (frontmatterLines.length < 3 || arrayFirst(frontmatterLines) !== "---") {
        return false;
    }

    for (let index = 1; index < frontmatterLines.length; index += 1) {
        const normalizedLine = frontmatterLines[index]?.trim();

        if (!isDefined(normalizedLine)) {
            continue;
        }

        if (normalizedLine === "---") {
            break;
        }

        if (normalizedLine === "layout: elk") {
            return true;
        }
    }

    return false;
};

/** Rule module for `require-mermaid-elk-package-installed`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            return {
                Program(): void {
                    const text = context.sourceCode.getText();
                    const locator = createTextSourceLocator(text);

                    if (
                        isPackageDeclaredInNearestManifest(
                            context.filename,
                            mermaidElkPackageName
                        )
                    ) {
                        return;
                    }

                    for (const codeBlock of collectFencedCodeBlocks(text)) {
                        if (
                            getPrimaryFenceLanguage(codeBlock.infoString) !==
                                "mermaid" ||
                            !usesMermaidElkLayout(codeBlock.content)
                        ) {
                            continue;
                        }

                        context.report({
                            loc: locator.createLoc(
                                codeBlock.contentStart,
                                codeBlock.contentEnd
                            ),
                            messageId: "requireMermaidElkPackageInstalled",
                        });
                    }
                },
            } satisfies TSESLint.RuleListener;
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                configs: ["content"],
                description:
                    "require `@mermaid-js/layout-elk` when Mermaid code blocks opt into `layout: elk`.",
                frozen: false,
                presets: [],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-mermaid-elk-package-installed",
            },
            messages: {
                requireMermaidElkPackageInstalled:
                    "Mermaid ELK layouts require the `@mermaid-js/layout-elk` package to be declared in the nearest package.json.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-mermaid-elk-package-installed",
    });

export default rule;
