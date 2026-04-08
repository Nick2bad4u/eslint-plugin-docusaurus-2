/**
 * @packageDocumentation
 * ESLint rule implementation for `require-navbar-dropdown-items`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getObjectPropertyValueByName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    | "requireNavbarDropdownItems"
    | "requireNavbarDropdownItemsArray";

const getNavbarDropdownItemsProblemMessageId = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): MessageIds | undefined => {
    const typeExpression = getObjectPropertyValueByName(
        objectExpression,
        "type"
    );

    if (
        typeExpression === null ||
        getStaticStringValue(typeExpression) !== "dropdown"
    ) {
        return undefined;
    }

    const itemsProperty = findObjectPropertyByName(objectExpression, "items");

    if (itemsProperty === null) {
        return "requireNavbarDropdownItems";
    }

    const itemsExpression = itemsProperty.value as TSESTree.Expression;

    if (
        itemsExpression.type === "ArrayExpression" ||
        itemsExpression.type === "Identifier"
    ) {
        return undefined;
    }

    return "requireNavbarDropdownItemsArray";
};

/** Rule module for `require-navbar-dropdown-items`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    const messageId =
                        getNavbarDropdownItemsProblemMessageId(node);

                    if (messageId === undefined) {
                        return;
                    }

                    context.report({
                        messageId,
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
                    "require an `items` array for Docusaurus navbar dropdown items.",
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
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-items",
            },
            messages: {
                requireNavbarDropdownItems:
                    "Docusaurus navbar dropdown items should include an `items` array.",
                requireNavbarDropdownItemsArray:
                    "Docusaurus navbar dropdown `items` should be configured as an array when authored statically.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-navbar-dropdown-items",
    });

export default rule;
