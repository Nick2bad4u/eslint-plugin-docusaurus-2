/**
 * @packageDocumentation
 * ESLint rule implementation for `require-site-url-origin`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { reportWithOptionalFix } from "../_internal/rule-reporting.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const localhostHostNames = new Set([
    "127.0.0.1",
    "::1",
    "[::1]",
    "localhost",
]);

type MessageIds = "normalizeSiteUrlOrigin" | "requireSiteUrlOrigin";

type SiteUrlSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const isStaticLiteralLikeExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    expression.type === "Literal" ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const canAutofixSiteUrlExpression = (
    expression: Readonly<TSESTree.Expression>
): boolean =>
    (expression.type === "Literal" && typeof expression.value === "string") ||
    (expression.type === "TemplateLiteral" &&
        expression.expressions.length === 0);

const parseSiteUrlOrNull = (siteUrlValue: string): null | URL => {
    try {
        return new URL(siteUrlValue);
    } catch {
        return null;
    }
};

const normalizeSiteUrlValue = (siteUrl: Readonly<URL>): string => {
    const normalizedUrl = new URL(siteUrl.toString());

    if (
        normalizedUrl.protocol === "http:" &&
        !localhostHostNames.has(normalizedUrl.hostname)
    ) {
        normalizedUrl.protocol = "https:";
    }

    normalizedUrl.pathname = "/";
    normalizedUrl.search = "";
    normalizedUrl.hash = "";

    return normalizedUrl.origin;
};

const createNormalizeSiteUrlSuggestion = (
    expression: Readonly<TSESTree.Expression>,
    normalizedSiteUrlValue: string
): SiteUrlSuggestion => ({
    fix: (fixer) =>
        fixer.replaceText(expression, JSON.stringify(normalizedSiteUrlValue)),
    messageId: "normalizeSiteUrlOrigin",
});

/** Rule module for `require-site-url-origin`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                Program(programNode: TSESTree.Program) {
                    const configObjectExpression =
                        getDefaultExportedObjectExpression(programNode);

                    if (configObjectExpression === null) {
                        return;
                    }

                    const siteUrlProperty = findObjectPropertyByName(
                        configObjectExpression,
                        "url"
                    );

                    if (siteUrlProperty === null) {
                        context.report({
                            messageId: "requireSiteUrlOrigin",
                            node: configObjectExpression,
                        });

                        return;
                    }

                    const siteUrlExpression =
                        siteUrlProperty.value as TSESTree.Expression;
                    const staticSiteUrlValue =
                        getStaticStringValueFromExpressionOrIdentifier(
                            siteUrlExpression,
                            programNode
                        );

                    if (staticSiteUrlValue === null) {
                        if (!isStaticLiteralLikeExpression(siteUrlExpression)) {
                            return;
                        }

                        context.report({
                            messageId: "requireSiteUrlOrigin",
                            node: siteUrlExpression,
                        });

                        return;
                    }

                    const trimmedSiteUrlValue = staticSiteUrlValue.trim();
                    const parsedSiteUrl =
                        parseSiteUrlOrNull(trimmedSiteUrlValue);

                    if (parsedSiteUrl === null) {
                        context.report({
                            messageId: "requireSiteUrlOrigin",
                            node: siteUrlExpression,
                        });

                        return;
                    }

                    const normalizedSiteUrlValue =
                        normalizeSiteUrlValue(parsedSiteUrl);

                    if (trimmedSiteUrlValue === normalizedSiteUrlValue) {
                        return;
                    }

                    if (canAutofixSiteUrlExpression(siteUrlExpression)) {
                        reportWithOptionalFix({
                            context,
                            fix: (fixer) =>
                                fixer.replaceText(
                                    siteUrlExpression,
                                    JSON.stringify(normalizedSiteUrlValue)
                                ),
                            messageId: "requireSiteUrlOrigin",
                            node: siteUrlExpression,
                        });

                        return;
                    }

                    const suggestions =
                        siteUrlExpression.type === "Identifier"
                            ? [
                                  createNormalizeSiteUrlSuggestion(
                                      siteUrlExpression,
                                      normalizedSiteUrlValue
                                  ),
                              ]
                            : undefined;

                    context.report({
                        messageId: "requireSiteUrlOrigin",
                        node: siteUrlExpression,
                        ...(suggestions === undefined
                            ? {}
                            : {
                                  suggest: suggestions,
                              }),
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require top-level Docusaurus `url` to be an absolute origin (for example `https://example.com`) without path/query/hash.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-site-url-origin",
            },
            fixable: "code",
            hasSuggestions: true,
            messages: {
                normalizeSiteUrlOrigin:
                    "Replace with a normalized absolute site origin URL.",
                requireSiteUrlOrigin:
                    "Configure top-level `url` as an absolute origin (for example `https://example.com`) without path/query/hash. Production sites should use `https`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-site-url-origin",
    });

export default rule;
