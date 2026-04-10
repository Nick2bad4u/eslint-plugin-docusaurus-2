/**
 * @packageDocumentation
 * Shared text-scanning helpers for Markdown/MDX content rules.
 */

import type { TSESTree } from "@typescript-eslint/utils";

/** Inclusive-exclusive text range measured in UTF-16 code units. */
export type TextContentLine = Readonly<{
    end: number;
    start: number;
    text: string;
}>;

/** Inclusive-exclusive text range measured in UTF-16 code units. */
export type TextContentRange = Readonly<{
    end: number;
    start: number;
}>;

/** Parsed fenced code block extracted from Markdown/MDX text. */
export type TextFencedCodeBlock = Readonly<{
    content: string;
    contentEnd: number;
    contentStart: number;
    end: number;
    infoString: string;
    start: number;
}>;

/** Locator utilities that map absolute string offsets back to ESLint locations. */
export type TextSourceLocator = Readonly<{
    createLoc: (start: number, end: number) => TSESTree.SourceLocation;
    locate: (index: number) => TSESTree.Position;
}>;

/** Check whether a file path points to an MDX document. */
export const isMdxFilePath = (filePath: string): boolean =>
    filePath.toLowerCase().endsWith(".mdx");

const clampIndex = (index: number, maxIndex: number): number => {
    if (!Number.isFinite(index)) {
        return 0;
    }

    if (index < 0) {
        return 0;
    }

    if (index > maxIndex) {
        return maxIndex;
    }

    return Math.trunc(index);
};

/**
 * Build offset-to-location helpers for raw text documents.
 *
 * @param text - Full document text.
 *
 * @returns Locator capable of turning raw offsets into ESLint locations.
 */
export const createTextSourceLocator = (text: string): TextSourceLocator => {
    const lineStartIndices = [0];
    let index = 0;

    while (index < text.length) {
        if (text[index] === "\n") {
            lineStartIndices.push(index + 1);
        }

        index += 1;
    }

    const locate = (offset: number): TSESTree.Position => {
        const clampedIndex = clampIndex(offset, text.length);
        let low = 0;
        let high = lineStartIndices.length - 1;

        while (low <= high) {
            const middle = Math.floor((low + high) / 2);
            const currentLineStart = lineStartIndices[middle] ?? 0;
            const nextLineStart = lineStartIndices[middle + 1] ?? Infinity;

            if (clampedIndex < currentLineStart) {
                high = middle - 1;
                continue;
            }

            if (clampedIndex >= nextLineStart) {
                low = middle + 1;
                continue;
            }

            return {
                column: clampedIndex - currentLineStart,
                line: middle + 1,
            };
        }

        const fallbackLineIndex = Math.max(0, lineStartIndices.length - 1);
        const fallbackLineStart = lineStartIndices[fallbackLineIndex] ?? 0;

        return {
            column: clampedIndex - fallbackLineStart,
            line: fallbackLineIndex + 1,
        };
    };

    return {
        createLoc: (start, end) => ({
            end: locate(end),
            start: locate(start),
        }),
        locate,
    };
};

const stripTrailingLineTerminators = (line: string): string => {
    if (line.endsWith("\r\n")) {
        return line.slice(0, -2);
    }

    if (line.endsWith("\n") || line.endsWith("\r")) {
        return line.slice(0, -1);
    }

    return line;
};

/**
 * Split raw Markdown/MDX text into logical lines without trailing newlines.
 *
 * @param text - Full Markdown/MDX source text.
 *
 * @returns Lines with inclusive-exclusive source ranges.
 */
export const getTextContentLines = (
    text: string
): readonly TextContentLine[] => {
    const lines: TextContentLine[] = [];
    let offset = 0;

    while (offset < text.length) {
        const nextNewlineIndex = text.indexOf("\n", offset);
        const lineEndWithTerminator =
            nextNewlineIndex === -1 ? text.length : nextNewlineIndex + 1;
        const lineWithTerminator = text.slice(offset, lineEndWithTerminator);
        const textLine = stripTrailingLineTerminators(lineWithTerminator);

        lines.push({
            end: offset + textLine.length,
            start: offset,
            text: textLine,
        });

        offset = lineEndWithTerminator;
    }

    if (text.length === 0) {
        return [];
    }

    return lines;
};

const getFenceMarker = (
    line: string
): null | Readonly<{ character: "`" | "~"; length: number }> => {
    let cursor = 0;
    let indentationWidth = 0;

    while (cursor < line.length) {
        const currentCharacter = line[cursor];

        if (currentCharacter !== " " && currentCharacter !== "\t") {
            break;
        }

        indentationWidth += 1;

        if (indentationWidth > 3) {
            return null;
        }

        cursor += 1;
    }

    const fenceCharacter = line[cursor];

    if (fenceCharacter !== "`" && fenceCharacter !== "~") {
        return null;
    }

    let fenceLength = 0;

    while (line[cursor + fenceLength] === fenceCharacter) {
        fenceLength += 1;
    }

    return fenceLength >= 3
        ? {
              character: fenceCharacter,
              length: fenceLength,
          }
        : null;
};

const getFenceInfoString = (line: string, fenceLength: number): string => {
    let cursor = 0;
    let indentationWidth = 0;

    while (cursor < line.length) {
        const currentCharacter = line[cursor];

        if (currentCharacter !== " " && currentCharacter !== "\t") {
            break;
        }

        indentationWidth += 1;

        if (indentationWidth > 3) {
            return "";
        }

        cursor += 1;
    }

    return line.slice(cursor + fenceLength).trim();
};

/**
 * Collect fenced code blocks with their language/info string and raw content.
 *
 * @param text - Full Markdown/MDX source text.
 *
 * @returns Parsed fenced code block metadata.
 */
export const collectFencedCodeBlocks = (
    text: string
): readonly TextFencedCodeBlock[] => {
    const blocks: TextFencedCodeBlock[] = [];
    let activeFence: null | Readonly<{
        character: "`" | "~";
        contentStart: number;
        infoString: string;
        length: number;
        start: number;
    }> = null;

    for (const line of getTextContentLines(text)) {
        const fenceMarker = getFenceMarker(line.text);

        if (fenceMarker === null) {
            continue;
        }

        if (activeFence === null) {
            activeFence = {
                character: fenceMarker.character,
                contentStart: line.end,
                infoString: getFenceInfoString(line.text, fenceMarker.length),
                length: fenceMarker.length,
                start: line.start,
            };
            continue;
        }

        if (
            fenceMarker.character === activeFence.character &&
            fenceMarker.length >= activeFence.length
        ) {
            blocks.push({
                content: text.slice(activeFence.contentStart, line.start),
                contentEnd: line.start,
                contentStart: activeFence.contentStart,
                end: line.end,
                infoString: activeFence.infoString,
                start: activeFence.start,
            });
            activeFence = null;
        }
    }

    if (activeFence !== null) {
        blocks.push({
            content: text.slice(activeFence.contentStart),
            contentEnd: text.length,
            contentStart: activeFence.contentStart,
            end: text.length,
            infoString: activeFence.infoString,
            start: activeFence.start,
        });
    }

    return blocks;
};

/**
 * Collect fenced code block ranges so text rules can ignore code examples.
 *
 * @param text - Full Markdown/MDX source text.
 *
 * @returns Inclusive-exclusive ranges for every fenced code block.
 */
export const collectFencedCodeBlockRanges = (
    text: string
): readonly TextContentRange[] =>
    collectFencedCodeBlocks(text).map(({ end, start }) => ({
        end,
        start,
    }));

/**
 * Determine whether a candidate text range overlaps any ignored range.
 *
 * @param candidateStart - Candidate start offset.
 * @param candidateEnd - Candidate end offset.
 * @param ignoredRanges - Ignored text ranges.
 *
 * @returns `true` when any ignored range overlaps the candidate range.
 */
export const doesRangeOverlapIgnoredRanges = (
    candidateStart: number,
    candidateEnd: number,
    ignoredRanges: readonly TextContentRange[]
): boolean =>
    ignoredRanges.some(
        ({ end, start }) => candidateStart < end && candidateEnd > start
    );
