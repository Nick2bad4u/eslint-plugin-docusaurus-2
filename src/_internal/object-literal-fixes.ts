import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayAt, arrayFirst } from "ts-extras";

/**
 * @packageDocumentation
 * Shared fixer helpers for inserting properties into object literals.
 */

/** Create a single fix that inserts a property into an object literal. */
export const createInsertObjectPropertyFix = (
    options: Readonly<{
        fixer: Readonly<TSESLint.RuleFixer>;
        indentation: string;
        objectExpression: Readonly<TSESTree.ObjectExpression>;
        propertyText: string;
        sourceCode: Readonly<TSESLint.SourceCode>;
    }>
): TSESLint.RuleFix => {
    const { fixer, indentation, objectExpression, propertyText, sourceCode } =
        options;
    const lastProperty = arrayAt(objectExpression.properties, -1);

    if (lastProperty === undefined) {
        return fixer.insertTextAfterRange(
            [
                arrayFirst(objectExpression.range),
                arrayFirst(objectExpression.range) + 1,
            ],
            `\n${indentation}${propertyText}\n`
        );
    }

    const trailingToken = sourceCode.getTokenAfter(lastProperty);

    if (trailingToken?.value === ",") {
        return fixer.insertTextAfter(
            trailingToken,
            `\n${indentation}${propertyText}`
        );
    }

    return fixer.insertTextAfter(
        lastProperty,
        `,\n${indentation}${propertyText}`
    );
};
