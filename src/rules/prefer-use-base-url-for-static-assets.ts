/**
 * @packageDocumentation
 * ESLint rule implementation for `prefer-use-base-url-for-static-assets`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { isDefined } from "ts-extras";

import {
    isDocusaurusSiteComponentFilePath,
    isDocusaurusSitePageFilePath,
} from "../_internal/docusaurus-config-ast.js";
import {
    collectDefaultImportLocalNamesFromModule,
    getJsxAttributeByName,
    getStaticStringValueFromJsxAttribute,
} from "../_internal/docusaurus-jsx-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

const docusaurusUseBaseUrlModuleSource = "@docusaurus/useBaseUrl" as const;

const assetPathPattern = /^\/(?:files?|img)\//u;

type MessageIds = "preferUseBaseUrlForStaticAssets" | "wrapWithUseBaseUrl";

type StaticAssetSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const isDocusaurusSiteComponentOrPageFilePath = (filePath: string): boolean =>
    isDocusaurusSiteComponentFilePath(filePath) ||
    isDocusaurusSitePageFilePath(filePath);

const createUseBaseUrlWrappedAttributeValue = ({
    attribute,
    staticAssetPath,
    useBaseUrlLocalName,
}: Readonly<{
    attribute: Readonly<TSESTree.JSXAttribute>;
    staticAssetPath: string;
    useBaseUrlLocalName: string;
}>): string => {
    const quote =
        attribute.value?.type === "Literal" &&
        typeof attribute.value.raw === "string" &&
        attribute.value.raw.startsWith("'")
            ? "'"
            : '"';

    return `{${useBaseUrlLocalName}(${quote}${staticAssetPath}${quote})}`;
};

const createUseBaseUrlSuggestion = ({
    attribute,
    staticAssetPath,
    useBaseUrlLocalName,
}: Readonly<{
    attribute: Readonly<TSESTree.JSXAttribute> & {
        value: NonNullable<TSESTree.JSXAttribute["value"]>;
    };
    staticAssetPath: string;
    useBaseUrlLocalName: string;
}>): StaticAssetSuggestion => ({
    fix: (fixer) =>
        fixer.replaceText(
            attribute.value,
            createUseBaseUrlWrappedAttributeValue({
                attribute,
                staticAssetPath,
                useBaseUrlLocalName,
            })
        ),
    messageId: "wrapWithUseBaseUrl",
});

/** Rule module for `prefer-use-base-url-for-static-assets`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusSiteComponentOrPageFilePath(context.filename)) {
                return {};
            }

            const useBaseUrlLocalNames =
                collectDefaultImportLocalNamesFromModule(
                    context.sourceCode.ast,
                    docusaurusUseBaseUrlModuleSource
                );
            const [useBaseUrlLocalName] = [...useBaseUrlLocalNames];

            return {
                JSXOpeningElement(node: Readonly<TSESTree.JSXOpeningElement>) {
                    for (const attributeName of ["src", "poster"] as const) {
                        const attribute = getJsxAttributeByName(
                            node,
                            attributeName
                        );

                        if (attribute === null) {
                            continue;
                        }

                        const staticAssetPath =
                            getStaticStringValueFromJsxAttribute(attribute);

                        if (
                            staticAssetPath === null ||
                            !assetPathPattern.test(staticAssetPath)
                        ) {
                            continue;
                        }

                        const attributeValue = attribute.value;
                        const suggestions =
                            !isDefined(useBaseUrlLocalName) ||
                            attributeValue === null
                                ? undefined
                                : [
                                      createUseBaseUrlSuggestion({
                                          attribute: {
                                              ...attribute,
                                              value: attributeValue,
                                          },
                                          staticAssetPath,
                                          useBaseUrlLocalName,
                                      }),
                                  ];

                        context.report({
                            messageId: "preferUseBaseUrlForStaticAssets",
                            node: attribute.name,
                            ...(isDefined(suggestions)
                                ? {
                                      suggest: suggestions,
                                  }
                                : {}),
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `useBaseUrl` or an imported asset for static asset paths in Docusaurus page and component JSX.",
                frozen: false,
                presets: [
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-use-base-url-for-static-assets",
            },
            hasSuggestions: true,
            messages: {
                preferUseBaseUrlForStaticAssets:
                    "Prefer `useBaseUrl` or an imported asset for static paths like this so the docs site keeps working correctly under a non-root `baseUrl`.",
                wrapWithUseBaseUrl:
                    "Wrap this static asset path with `useBaseUrl(...)`.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-use-base-url-for-static-assets",
    });

export default rule;
