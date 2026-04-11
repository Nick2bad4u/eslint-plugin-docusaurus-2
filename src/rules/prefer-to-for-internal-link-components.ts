/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-to-for-internal-link-components`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isInternalRouteLikeValue } from "../_internal/docusaurus-config-ast.js";
import {
    collectDefaultImportLocalNamesFromModule,
    getJsxAttributeByName,
    getStaticStringValueFromJsxAttribute,
} from "../_internal/docusaurus-jsx-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const docusaurusLinkModuleSource = "@docusaurus/Link" as const;

type MessageIds = "preferToForInternalLinkComponent";

/** Rule module for `prefer-to-for-internal-link-components`. */
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

                    const hrefAttribute = getJsxAttributeByName(node, "href");
                    const toAttribute = getJsxAttributeByName(node, "to");

                    if (hrefAttribute === null || toAttribute !== null) {
                        return;
                    }

                    const hrefValue =
                        getStaticStringValueFromJsxAttribute(hrefAttribute);

                    if (
                        hrefValue === null ||
                        !isInternalRouteLikeValue(hrefValue)
                    ) {
                        return;
                    }

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return fixer.replaceText(hrefAttribute.name, "to");
                        },
                        messageId: "preferToForInternalLinkComponent",
                        node: hrefAttribute.name,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `to` instead of `href` for internal `@docusaurus/Link` component destinations.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-link-components",
            },
            fixable: "code",
            messages: {
                preferToForInternalLinkComponent:
                    "Use `to` instead of `href` for internal `@docusaurus/Link` destinations so client-side routing and baseUrl handling stay intact.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-to-for-internal-link-components",
    });

export default rule;
