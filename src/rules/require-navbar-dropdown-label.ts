/**
 * @packageDocumentation
 * ESLint rule implementation for `require-navbar-dropdown-label`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getObjectPropertyValueByName,
    getStaticStringValue,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "requireNavbarDropdownLabel";

const isNavbarDropdownObject = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean => {
    const typeExpression = getObjectPropertyValueByName(
        objectExpression,
        "type"
    );

    return (
        typeExpression !== null &&
        getStaticStringValue(typeExpression) === "dropdown"
    );
};

const hasPresentNavbarDropdownLabel = (
    labelExpression: null | Readonly<TSESTree.Expression>,
    programNode: Readonly<TSESTree.Program>
): boolean => {
    if (labelExpression === null) {
        return false;
    }

    const staticValue = getStaticStringValueFromExpressionOrIdentifier(
        labelExpression,
        programNode
    );

    if (staticValue !== null) {
        return staticValue.trim().length > 0;
    }

    return labelExpression.type !== "Literal";
};

/** Rule module for `require-navbar-dropdown-label`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (!isNavbarDropdownObject(node)) {
                        return;
                    }

                    const labelExpression = getObjectPropertyValueByName(
                        node,
                        "label"
                    );

                    if (
                        hasPresentNavbarDropdownLabel(
                            labelExpression,
                            context.sourceCode.ast
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "requireNavbarDropdownLabel",
                        node,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require a non-empty `label` for Docusaurus navbar dropdown items.",
                frozen: false,
                presets: [
                    "recommended",
                    "recommended-type-checked",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-label",
            },
            messages: {
                requireNavbarDropdownLabel:
                    "Docusaurus navbar dropdown items should include a non-empty `label`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-navbar-dropdown-label",
    });

export default rule;
