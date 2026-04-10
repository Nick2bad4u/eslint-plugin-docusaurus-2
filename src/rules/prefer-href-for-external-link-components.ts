/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-href-for-external-link-components`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isExternalLinkLikeValue } from "../_internal/docusaurus-config-ast.js";
import {
    collectDefaultImportLocalNamesFromModule,
    getJsxAttributeByName,
    getStaticStringValueFromJsxAttribute,
} from "../_internal/docusaurus-jsx-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const docusaurusLinkModuleSource = "@docusaurus/Link" as const;

type MessageIds = "preferHrefForExternalLinkComponent";

/** Rule module for `prefer-href-for-external-link-components`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            const docusaurusLinkLocalNames =
                collectDefaultImportLocalNamesFromModule(
                    context.sourceCode.ast,
                    docusaurusLinkModuleSource
                );

            if (docusaurusLinkLocalNames.size === 0) {
                return {};
            }

            return {
                JSXOpeningElement(node: Readonly<TSESTree.JSXOpeningElement>) {
                    if (
                        node.name.type !== "JSXIdentifier" ||
                        !docusaurusLinkLocalNames.has(node.name.name)
                    ) {
                        return;
                    }

                    const toAttribute = getJsxAttributeByName(node, "to");
                    const hrefAttribute = getJsxAttributeByName(node, "href");

                    if (toAttribute === null || hrefAttribute !== null) {
                        return;
                    }

                    const toValue =
                        getStaticStringValueFromJsxAttribute(toAttribute);

                    if (toValue === null || !isExternalLinkLikeValue(toValue)) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return fixer.replaceText(toAttribute.name, "href");
                        },
                        messageId: "preferHrefForExternalLinkComponent",
                        node: toAttribute.name,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `href` instead of `to` for external `@docusaurus/Link` component destinations.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-link-components",
            },
            fixable: "code",
            messages: {
                preferHrefForExternalLinkComponent:
                    "Use `href` instead of `to` for external `@docusaurus/Link` destinations so the component matches Docusaurus link semantics.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-href-for-external-link-components",
    });

export default rule;
