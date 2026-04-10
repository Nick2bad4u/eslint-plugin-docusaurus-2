/**
 * @packageDocumentation
 * ESLint rule implementation for `no-conflicting-navbar-doc-sidebar-item-props`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { createRemoveCommaSeparatedItemsFixes } from "../_internal/comma-separated-fixes.js";
import {
    findObjectPropertyByName,
    getObjectPropertyValueByName,
    getStaticStringValue,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { getDocusaurusThemeConfigArrayItemContext } from "../_internal/docusaurus-theme-config-link-items.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noConflictingNavbarDocSidebarItemProps";

const getConflictingDirectLinkProperties = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): readonly TSESTree.Property[] =>
    [
        findObjectPropertyByName(objectExpression, "href"),
        findObjectPropertyByName(objectExpression, "html"),
        findObjectPropertyByName(objectExpression, "to"),
    ].filter((property): property is TSESTree.Property => property !== null);

/** Rule module for `no-conflicting-navbar-doc-sidebar-item-props`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                ObjectExpression(node: Readonly<TSESTree.ObjectExpression>) {
                    if (
                        getDocusaurusThemeConfigArrayItemContext(node) !==
                        "navbar"
                    ) {
                        return;
                    }

                    const typeExpression = getObjectPropertyValueByName(
                        node,
                        "type"
                    );

                    if (
                        typeExpression === null ||
                        getStaticStringValue(typeExpression) !== "docSidebar"
                    ) {
                        return;
                    }

                    const conflictingProperties =
                        getConflictingDirectLinkProperties(node);

                    if (conflictingProperties.length === 0) {
                        return;
                    }

                    const sidebarIdProperty = findObjectPropertyByName(
                        node,
                        "sidebarId"
                    );

                    reportWithOptionalFix({
                        context,
                        fix:
                            sidebarIdProperty === null
                                ? null
                                : (fixer) =>
                                      createRemoveCommaSeparatedItemsFixes(
                                          fixer,
                                          context.sourceCode,
                                          {
                                              container: node,
                                              items: node.properties,
                                              itemsToRemove:
                                                  conflictingProperties,
                                          }
                                      ),
                        messageId: "noConflictingNavbarDocSidebarItemProps",
                        node: conflictingProperties[0]?.key ?? node,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    'disallow Docusaurus navbar items with `type: "docSidebar"` from mixing in direct-link props such as `to`, `href`, or `html`.',
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-navbar-doc-sidebar-item-props",
            },
            fixable: "code",
            messages: {
                noConflictingNavbarDocSidebarItemProps:
                    'Docusaurus navbar items with `type: "docSidebar"` should not mix in direct-link props such as `to`, `href`, or `html`. Keep the `sidebarId`-based shape only.',
            },
            schema: [],
            type: "problem",
        },
        name: "no-conflicting-navbar-doc-sidebar-item-props",
    });

export default rule;
