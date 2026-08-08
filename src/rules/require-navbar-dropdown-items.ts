/**
 * @packageDocumentation
 * ESLint rule implementation for `require-navbar-dropdown-items`.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { isDefined } from "ts-extras";

import {
    findObjectPropertyByName,
    getObjectPropertyValueByName,
    getObjectPropertyValueExpression,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds =
    "requireNavbarDropdownItems" | "requireNavbarDropdownItemsArray";

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

    const itemsExpression = getObjectPropertyValueExpression(itemsProperty);

    if (
        itemsExpression.type === AST_NODE_TYPES.ArrayExpression ||
        itemsExpression.type === AST_NODE_TYPES.Identifier
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

                    if (!isDefined(messageId)) {
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
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-items",
            },
            languages: ["js/js"],
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
