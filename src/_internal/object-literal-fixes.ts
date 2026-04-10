import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared fixer helpers for inserting properties into object literals.
 */

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
    const lastProperty = objectExpression.properties.at(-1);

    if (lastProperty === undefined) {
        return fixer.insertTextAfterRange(
            [objectExpression.range[0], objectExpression.range[0] + 1],
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
