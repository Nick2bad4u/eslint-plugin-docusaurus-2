/**
 * @packageDocumentation
 * ESLint rule implementation for `require-generated-index-link-type`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getObjectPropertyName,
    getStaticStringValue,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferGeneratedIndexType" | "requireGeneratedIndexType";

const generatedIndexMetadataKeys = [
    "description",
    "image",
    "keywords",
    "slug",
    "title",
] as const;

const hasGeneratedIndexMetadata = (
    linkObject: Readonly<TSESTree.ObjectExpression>
): boolean =>
    generatedIndexMetadataKeys.some(
        (propertyName) =>
            findObjectPropertyByName(linkObject, propertyName) !== null
    );

const isSidebarCategoryObject = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): boolean => {
    const typeProperty = findObjectPropertyByName(objectExpression, "type");
    const typeValue =
        typeProperty === null
            ? null
            : getStaticStringValue(typeProperty.value as TSESTree.Expression);

    return (
        typeValue === "category" ||
        findObjectPropertyByName(objectExpression, "items") !== null
    );
};

const createInsertGeneratedIndexTypeFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    linkObject: Readonly<TSESTree.ObjectExpression>
) => {
    const firstProperty = linkObject.properties[0];

    if (firstProperty === undefined) {
        return fixer.insertTextAfterRange(
            [linkObject.range[0], linkObject.range[0] + 1],
            'type: "generated-index"'
        );
    }

    return fixer.insertTextBefore(firstProperty, 'type: "generated-index", ');
};

/** Rule module for `require-generated-index-link-type`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSidebarFilePath(context.filename)) {
                return {};
            }

            return {
                'Property[key.type="Identifier"][key.name="link"], Property[key.type="Literal"][key.value="link"]'(
                    node: TSESTree.Node
                ) {
                    if (
                        node.type !== "Property" ||
                        node.value.type !== "ObjectExpression"
                    ) {
                        return;
                    }

                    const propertyName = getObjectPropertyName(node);

                    if (propertyName !== "link") {
                        return;
                    }

                    const parentObject = node.parent;

                    if (
                        parentObject?.type !== "ObjectExpression" ||
                        !isSidebarCategoryObject(parentObject)
                    ) {
                        return;
                    }

                    const linkObject = node.value;

                    if (findObjectPropertyByName(linkObject, "id") !== null) {
                        return;
                    }

                    if (!hasGeneratedIndexMetadata(linkObject)) {
                        return;
                    }

                    const typeProperty = findObjectPropertyByName(
                        linkObject,
                        "type"
                    );

                    if (typeProperty === null) {
                        reportWithOptionalFix({
                            context,
                            fix(fixer) {
                                return createInsertGeneratedIndexTypeFix(
                                    fixer,
                                    linkObject
                                );
                            },
                            messageId: "requireGeneratedIndexType",
                            node: node.key,
                        });

                        return;
                    }

                    const typeValue = getStaticStringValue(
                        typeProperty.value as TSESTree.Expression
                    );

                    if (typeValue === null || typeValue === "generated-index") {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return fixer.replaceText(
                                typeProperty.value,
                                '"generated-index"'
                            );
                        },
                        messageId: "preferGeneratedIndexType",
                        node: typeProperty.value,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    'require `type: "generated-index"` when sidebar link objects use generated-index metadata.',
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-generated-index-link-type",
            },
            fixable: "code",
            messages: {
                preferGeneratedIndexType:
                    'This sidebar `link.type` should be `"generated-index"` because the same object uses generated-index metadata.',
                requireGeneratedIndexType:
                    'Sidebar `link` objects that use generated-index metadata must declare `type: "generated-index"`.',
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-generated-index-link-type",
    });

export default rule;
