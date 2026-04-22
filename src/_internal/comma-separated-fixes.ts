/**
 * @packageDocumentation
 * Shared fix helpers for removing nodes from comma-separated object and array
 * literal lists without producing invalid syntax.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayFirst, assertDefined, isDefined, isEmpty } from "ts-extras";

type CommaSeparatedContainer = Readonly<
    TSESTree.ArrayExpression | TSESTree.ObjectExpression
>;

type RemovalIndexGroup = Readonly<{
    endIndex: number;
    startIndex: number;
}>;

const createRemovalIndexGroups = (
    removalIndices: readonly number[]
): readonly RemovalIndexGroup[] => {
    const firstRemovalIndex = arrayFirst(removalIndices);

    if (!isDefined(firstRemovalIndex)) {
        return [];
    }

    const groups: RemovalIndexGroup[] = [];
    let currentStartIndex = firstRemovalIndex;
    let currentEndIndex = firstRemovalIndex;

    for (const removalIndex of removalIndices.slice(1)) {
        if (removalIndex === currentEndIndex + 1) {
            currentEndIndex = removalIndex;

            continue;
        }

        groups.push({
            endIndex: currentEndIndex,
            startIndex: currentStartIndex,
        });
        currentStartIndex = removalIndex;
        currentEndIndex = removalIndex;
    }

    groups.push({
        endIndex: currentEndIndex,
        startIndex: currentStartIndex,
    });

    return groups;
};

const getCommaSeparatedItemRemovalEnd = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    item: Readonly<TSESTree.Node>
): number => {
    const nextToken = sourceCode.getTokenAfter(item);

    return nextToken?.value === "," ? nextToken.range[1] : item.range[1];
};

const getCommaTokenAfterItem = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    item: Readonly<TSESTree.Node>
) => {
    const nextToken = sourceCode.getTokenAfter(item);

    return nextToken?.value === "," ? nextToken : undefined;
};

/**
 * Create non-overlapping fixes that remove nodes from a comma-separated list.
 *
 * @remarks
 * The helper groups contiguous removals so ESLint never receives overlapping
 * fix objects for suggestion payloads.
 */
export const createRemoveCommaSeparatedItemsFixes = <
    Item extends Readonly<TSESTree.Node>,
>(
    fixer: Readonly<TSESLint.RuleFixer>,
    sourceCode: Readonly<TSESLint.SourceCode>,
    options: Readonly<{
        container: CommaSeparatedContainer;
        items: readonly Item[];
        itemsToRemove: readonly Item[];
    }>
): readonly TSESLint.RuleFix[] => {
    const { container, items, itemsToRemove } = options;
    const removalIndices = [
        ...new Set(itemsToRemove.map((item) => items.indexOf(item))),
    ]
        .filter((index) => index >= 0)
        .toSorted((left, right) => left - right);

    if (isEmpty(removalIndices)) {
        return [];
    }

    const containerInnerStart = arrayFirst(container.range) + 1;

    return createRemovalIndexGroups(removalIndices).map(
        ({ endIndex, startIndex }) => {
            const firstItem = items[startIndex];
            const lastItem = items[endIndex];

            assertDefined(firstItem);
            assertDefined(lastItem);

            const previousItem = items[startIndex - 1];
            const nextItem = items[endIndex + 1];
            const removalEnd = getCommaSeparatedItemRemovalEnd(
                sourceCode,
                lastItem
            );

            if (previousItem === undefined && nextItem === undefined) {
                return fixer.removeRange([containerInnerStart, removalEnd]);
            }

            if (nextItem !== undefined) {
                return fixer.removeRange([
                    arrayFirst(firstItem.range),
                    arrayFirst(nextItem.range),
                ]);
            }

            assertDefined(previousItem);

            const previousSeparatorComma = getCommaTokenAfterItem(
                sourceCode,
                previousItem
            );
            const trailingComma = getCommaTokenAfterItem(sourceCode, lastItem);
            const removalStart =
                trailingComma !== undefined &&
                previousSeparatorComma !== undefined
                    ? previousSeparatorComma.range[1]
                    : previousItem.range[1];

            return fixer.removeRange([removalStart, removalEnd]);
        }
    );
};
