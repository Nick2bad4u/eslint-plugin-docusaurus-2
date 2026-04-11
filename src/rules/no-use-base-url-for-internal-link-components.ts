/**
 * @packageDocumentation
 * ESLint rule implementation for `no-use-base-url-for-internal-link-components`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getStaticStringValue,
    isInternalRouteLikeValue,
} from "../_internal/docusaurus-config-ast.js";
import {
    collectDefaultImportLocalNamesFromModule,
    getJsxAttributeByName,
} from "../_internal/docusaurus-jsx-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const docusaurusLinkModuleSource = "@docusaurus/Link" as const;
const docusaurusUseBaseUrlModuleSource = "@docusaurus/useBaseUrl" as const;

type MessageIds = "noUseBaseUrlForInternalLinkComponent";

const getUseBaseUrlWrappedInternalRoute = (
    attribute: Readonly<TSESTree.JSXAttribute>,
    useBaseUrlLocalNames: ReadonlySet<string>
): null | string => {
    const attributeValue = attribute.value;

    if (attributeValue?.type !== "JSXExpressionContainer") {
        return null;
    }

    const expression = attributeValue.expression;

    if (
        expression.type !== "CallExpression" ||
        expression.arguments.length !== 1 ||
        expression.callee.type !== "Identifier" ||
        !useBaseUrlLocalNames.has(expression.callee.name)
    ) {
        return null;
    }

    const [firstArgument] = expression.arguments;

    if (firstArgument === undefined || firstArgument.type === "SpreadElement") {
        return null;
    }

    const routeValue = getStaticStringValue(firstArgument);

    return routeValue !== null && isInternalRouteLikeValue(routeValue)
        ? routeValue
        : null;
};

const createJsxStringLiteralText = (
    routeValue: string,
    quoteStyle: "'" | '"'
): string => `${quoteStyle}${routeValue}${quoteStyle}`;

/** Rule module for `no-use-base-url-for-internal-link-components`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            const docusaurusLinkLocalNames =
                collectDefaultImportLocalNamesFromModule(
                    context.sourceCode.ast,
                    docusaurusLinkModuleSource
                );
            const useBaseUrlLocalNames =
                collectDefaultImportLocalNamesFromModule(
                    context.sourceCode.ast,
                    docusaurusUseBaseUrlModuleSource
                );

            if (
                docusaurusLinkLocalNames.size === 0 ||
                useBaseUrlLocalNames.size === 0
            ) {
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
                    const toRouteValue =
                        toAttribute === null
                            ? null
                            : getUseBaseUrlWrappedInternalRoute(
                                  toAttribute,
                                  useBaseUrlLocalNames
                              );
                    const hrefRouteValue =
                        hrefAttribute === null || toAttribute !== null
                            ? null
                            : getUseBaseUrlWrappedInternalRoute(
                                  hrefAttribute,
                                  useBaseUrlLocalNames
                              );

                    if (
                        toRouteValue !== null &&
                        toAttribute !== null &&
                        toAttribute.value !== null
                    ) {
                        const toAttributeName = toAttribute.name;
                        const toAttributeValue = toAttribute.value;

                        reportWithOptionalFix({
                            context,
                            fix(fixer) {
                                return fixer.replaceText(
                                    toAttributeValue,
                                    createJsxStringLiteralText(
                                        toRouteValue,
                                        '"'
                                    )
                                );
                            },
                            messageId: "noUseBaseUrlForInternalLinkComponent",
                            node: toAttributeName,
                        });

                        return;
                    }

                    const hrefAttributeValue = hrefAttribute?.value;

                    if (
                        hrefRouteValue === null ||
                        hrefAttributeValue === undefined ||
                        hrefAttributeValue === null ||
                        hrefAttribute === null
                    ) {
                        return;
                    }

                    const hrefAttributeName = hrefAttribute.name;

                    reportWithOptionalFix({
                        context,
                        fix(fixer) {
                            return [
                                fixer.replaceText(hrefAttributeName, "to"),
                                fixer.replaceText(
                                    hrefAttributeValue,
                                    createJsxStringLiteralText(
                                        hrefRouteValue,
                                        '"'
                                    )
                                ),
                            ];
                        },
                        messageId: "noUseBaseUrlForInternalLinkComponent",
                        node: hrefAttributeName,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow wrapping internal `@docusaurus/Link` destinations with `useBaseUrl(...)`.",
                frozen: false,
                presets: [
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-use-base-url-for-internal-link-components",
            },
            fixable: "code",
            messages: {
                noUseBaseUrlForInternalLinkComponent:
                    "Do not wrap internal `@docusaurus/Link` destinations with `useBaseUrl(...)`. Docusaurus already handles baseUrl for those links.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-use-base-url-for-internal-link-components",
    });

export default rule;
