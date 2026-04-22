/**
 * @packageDocumentation
 * ESLint rule implementation for `require-doc-sidebar-link-type`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayFirst } from "ts-extras";

import {
    findObjectPropertyByName,
    getObjectPropertyName,
    getStaticStringValue,
    hasGeneratedIndexMetadataProperties,
    isDocusaurusSidebarCategoryObject,
    isDocusaurusSidebarFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "preferDocLinkType" | "requireDocLinkType";

const createInsertDocTypeFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    linkObject: Readonly<TSESTree.ObjectExpression>
) => {
    const firstProperty = arrayFirst(linkObject.properties);

    if (firstProperty === undefined) {
        return fixer.insertTextAfterRange(
            [arrayFirst(linkObject.range), arrayFirst(linkObject.range) + 1],
            'type: "doc"'
        );
    }

    return fixer.insertTextBefore(firstProperty, 'type: "doc", ');
};

/** Rule module for `require-doc-sidebar-link-type`. */
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
                        !isDocusaurusSidebarCategoryObject(parentObject)
                    ) {
                        return;
                    }

                    const linkObject = node.value;

                    if (hasGeneratedIndexMetadataProperties(linkObject)) {
                        return;
                    }

                    const idProperty = findObjectPropertyByName(
                        linkObject,
                        "id"
                    );

                    if (idProperty === null) {
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
                                return createInsertDocTypeFix(
                                    fixer,
                                    linkObject
                                );
                            },
                            messageId: "requireDocLinkType",
                            node: node.key,
                        });

                        return;
                    }

                    const typeValue = getStaticStringValue(
                        typeProperty.value as TSESTree.Expression
                    );

                    if (typeValue === null || typeValue === "doc") {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return fixer.replaceText(
                                typeProperty.value,
                                '"doc"'
                            );
                        },
                        messageId: "preferDocLinkType",
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
                    'require `type: "doc"` when a Docusaurus sidebar category link object uses `id`.',
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-doc-sidebar-link-type",
            },
            fixable: "code",
            messages: {
                preferDocLinkType:
                    'This sidebar category `link.type` should be `"doc"` because the same object uses `id`.',
                requireDocLinkType:
                    'Sidebar category `link` objects that use `id` must declare `type: "doc"`.',
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-doc-sidebar-link-type",
    });

export default rule;
